from flask import render_template, request, Response, make_response, send_file, jsonify
import json
import os
import csv
import io
import networkx as nx

from app import app
import aggregate
import constants
from decorators import requires_auth
import file_utils
import models
import visualize

@app.route("/", methods=['GET'])
def index():
    return render_template("index.html")

@app.route("/visualize/<db_result_id>")
@requires_auth
def viz(db_result_id):
    img = visualize.visualize(db_result_id)
    response = make_response(img.getvalue())
    img.close()
    response.headers['Content-Type'] = 'image/png'
    return response

@app.route("/gen_visualizations/<start>/<end>")
@requires_auth
def gen_visualizations(start, end):
    start, end  = int(start), int(end)
    zipf = file_utils.gen_visualizations(start, end)
    return send_file(zipf, download_name="maps.zip", as_attachment=True)

@app.route("/data/results", methods=['GET'])
@requires_auth
def dump_results():
    output = io.StringIO()
    writer = csv.writer(output)
    results = models.DBResult.query.all()
    rows = []
    rows.append([column.name for column in models.DBResult.__mapper__.columns])
    for result in results:
        row = [str(getattr(result, column.name)) for column in models.DBResult.__mapper__.columns]
        if row[2] not in [row_[2] for row_ in rows]:
            rows.append(row)
    for row in rows:
        writer.writerow(row)
    return Response(
        output.getvalue(),
        mimetype="text/csv",
        headers={"Content-disposition":
        "attachment; filename=results.csv"}
    )

@app.route("/data/connections", methods=['GET'])
@requires_auth
def dump_connections():
    output = io.StringIO()
    writer = csv.writer(output)
    matrix_elements = models.Connection.query.all()
    writer.writerow([column.name for column in models.Connection.__mapper__.columns])
    for mat_el in matrix_elements:
        writer.writerow([str(getattr(mat_el, column.name)) for column in models.Connection.__mapper__.columns])
    return Response(
        output.getvalue(),
        mimetype="text/csv",
        headers={"Content-disposition":
        "attachment; filename=connections.csv"}
    )

def page(q):
    offset = 0
    item_exists = True
    while item_exists:
        page_exists = False
        for elem in q[offset:offset+1000]:
            page_exists = True
            yield elem
        offset += 1000
        if not page_exists:
            item_exists = False

@app.route("/data/matrices", methods=['GET'])
@requires_auth
def dump_matrices():
    output = io.StringIO()
    writer = csv.writer(output)
    matrix_elements = page(models.MatrixElement.query)
    writer.writerow([column.name for column in models.MatrixElement.__mapper__.columns])
    for mat_el in matrix_elements:
        writer.writerow([str(getattr(mat_el, column.name)) for column in models.MatrixElement.__mapper__.columns])
    return Response(
        output.getvalue(),
        mimetype="text/csv",
        headers={"Content-disposition":
        "attachment; filename=matrices.csv"}
    )

@app.route("/backend", methods=['GET'])
@requires_auth
def backend():
    db_results = models.DBResult.query.all()
    return render_template("backend.html", results=db_results)


@app.route("/calculate", methods=['POST'])
def calculate():
    req = request.get_json()
    form_data = req["formData"]
    conns = form_data["connections"]
    strong_mat = form_data["connectionStrongMatrix"]
    weak_mat = form_data["connectionWeakMatrix"]

    mat = []
    for i in range(len(strong_mat)):
        mat.append(strong_mat[i] + weak_mat[i])

    result_dict = aggregate.calculate_result_dict(conns, mat, form_data)

    r = aggregate.Result(result_dict)
    d = models.DBResult(r)
    models.db.session.add(d)
    models.db.session.commit()

    for conn in conns:
        c = models.Connection(conn, d.id)
        models.db.session.add(c)
    models.db.session.commit()

    for i in range(len(mat)):
        conn_names = [conn["connectionName"] for conn in conns]
        name_i = conns[i]["connectionName"]
        for j in range(len(mat[i])):
            name_j = mat[i][j]["label"] 
            already_exists = models.MatrixElement.query.filter(
                (models.MatrixElement.db_result_id==d.id) & 
                (
                    ((models.MatrixElement.person_a==name_i) & (models.MatrixElement.person_b==name_j)) |
                    ((models.MatrixElement.person_a==name_j) & (models.MatrixElement.person_b==name_i))
                )
            ).first()
            if not already_exists:
                m = models.MatrixElement(d.id, name_i, name_j, constants.STRONG)
                models.db.session.add(m)
            conn_names.remove(name_j)
        for remaining_name in conn_names:
            already_exists = models.MatrixElement.query.filter(
                (models.MatrixElement.db_result_id==d.id) & 
                (
                    ((models.MatrixElement.person_a==name_i) & (models.MatrixElement.person_b==remaining_name)) | 
                    ((models.MatrixElement.person_a==remaining_name) & (models.MatrixElement.person_b==name_i))
                )
            ).first()
            if not already_exists:
                m = models.MatrixElement(d.id, name_i, remaining_name, constants.NO_CONNECTION)
                models.db.session.add(m)
    models.db.session.commit()
    graph_json = json.dumps(_build_graph_data(d.id))
    return render_template("results.html", result=r, avgs=aggregate.get_averages(), result_id=d.id, graph_data_json=graph_json)


@app.route("/show/<id>", methods=['GET'])
@requires_auth
def calculate_from_db(id):
    r = aggregate.calculate_result_dict_from_id(id)
    graph_json = json.dumps(_build_graph_data(id))
    return render_template("results.html", result=r, avgs=aggregate.get_averages(), result_id=id, graph_data_json=graph_json)

@app.route("/printout/<result_id>", methods=['GET'])
@requires_auth
def printout(result_id):
    r = models.DBResult.query.filter_by(id=result_id).all()
    c = models.Connection.query.filter_by(db_result_id=result_id).all()
    m = models.MatrixElement.query.filter_by(db_result_id=result_id).all()
    instanceobjs = [r, c, m]
    output = io.StringIO()
    writer = csv.writer(output)
    classobjs = [models.DBResult, models.Connection, models.MatrixElement]
    for i in range(len(classobjs)):
        classobj = classobjs[i]
        instanceobj = instanceobjs[i]
        writer.writerow([column.name for column in classobj.__mapper__.columns])
        for instance in instanceobj:
            writer.writerow([str(getattr(instance, column.name)) for column in classobj.__mapper__.columns])
    return Response(
        output.getvalue(),
        mimetype="text/csv",
        headers={"Content-disposition":
        "attachment; filename=printout.csv"}
    )

def _build_graph_data(result_id):
    """Build graph data dict (nodes + edges) for a given result."""
    connections = models.Connection.query.filter_by(db_result_id=result_id).all()
    matrix_elements = models.MatrixElement.query.filter_by(db_result_id=result_id).all()
    db_result = models.DBResult.query.filter_by(id=result_id).first()

    if not db_result:
        return {"nodes": [], "edges": []}

    G = nx.Graph()
    ego_name = db_result.name or "You"
    G.add_node(ego_name, is_ego=True, context="ego")

    for conn in connections:
        name = conn.connectionName
        if not name:
            continue
        G.add_node(name, is_ego=False, context=getattr(conn, 'context', 'external'))
        G.add_edge(ego_name, name, strength='strong')

    for mat_el in matrix_elements:
        if mat_el.strength and mat_el.strength != constants.NO_CONNECTION:
            if G.has_node(mat_el.person_a) and G.has_node(mat_el.person_b):
                strength = 'strong' if mat_el.strength == constants.STRONG else 'weak'
                G.add_edge(mat_el.person_a, mat_el.person_b, strength=strength)

    degree_cent = nx.degree_centrality(G)
    try:
        betweenness = nx.betweenness_centrality(G)
    except Exception:
        betweenness = {n: 0 for n in G.nodes()}
    try:
        closeness = nx.closeness_centrality(G)
    except Exception:
        closeness = {n: 0 for n in G.nodes()}

    nodes = []
    for node in G.nodes(data=True):
        name, data = node[0], node[1]
        nodes.append({
            "id": name,
            "isEgo": data.get("is_ego", False),
            "context": data.get("context", "external"),
            "degree": degree_cent.get(name, 0),
            "betweenness": betweenness.get(name, 0),
            "closeness": closeness.get(name, 0),
        })

    edges = []
    for edge in G.edges(data=True):
        edges.append({
            "source": edge[0],
            "target": edge[1],
            "strength": edge[2].get("strength", "weak"),
        })

    return {"nodes": nodes, "edges": edges}


@app.route("/api/graph/<result_id>", methods=['GET'])
def graph_data(result_id):
    """JSON API endpoint for graph data."""
    return jsonify(_build_graph_data(result_id))


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 1997))
    with app.app_context():
        models.db.create_all()
    app.run(host='0.0.0.0', port=port)
