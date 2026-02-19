#!/usr/bin/env python3
import constants
import csv
import file_utils
import numpy as np
import matplotlib
import os
import re
import shutil
import smtplib
import time

matplotlib.use('Agg')
import matplotlib.pyplot as plt
import networkx as nx
from io import BytesIO
from PIL import Image, ImageDraw

from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

fig_num = 0

def add_watermark(image_file):
    """ Creates a printed page with the image and the watermark. """
    network_map = Image.open(image_file)

    watermark = Image.open('static/img/johnson.jpg')

    larger_im = Image.new('RGB', (638, 825), 'white')
    larger_im.paste(network_map, (0, 0))
    width, height = larger_im.size

    offset = (int(width * 0.5), int(height * 0.8))
    larger_im.paste(watermark, offset)
    buf = BytesIO()
    larger_im.save(buf, 'png')

    return buf

def graph_centrality(nodes, edges):
    """ Computes the centrality of each node in a graph."""
    result = {}
    for node in nodes:
        degree = 0
        for edge in edges:
            if edge[0] == node or edge[1] == node:
                degree += 1
        result[node] = degree*1.0/len(nodes)
    return result

def get_result(result_csv, result_id):
    """ Gets a result row based on the DB result ID. """
    reader = csv.reader(open(result_csv, 'r'))
    for row in reader:
        if row[0] == result_id:
            return row

def get_connections(connection_csv, result_id):
    """ Gets connection rows based on the DB result ID. """
    reader = csv.reader(open(connection_csv, 'r'))
    return [row for row in reader if len(row) > 1 and row[1] == result_id]

def get_connection_by_name(connection_csv, connection_name):
    """ Gets a connection by connection name. """
    reader = csv.reader(open(connection_csv, 'r'))
    for row in reader:
        if len(row) > 16 and row[16] == connection_name:
            return row

def get_matrix_elements(matrix_csv, result_id):
    """ Gets matrix elements by the DB result ID. """
    reader = csv.reader(open(matrix_csv, 'r'))
    return [row for row in reader if len(row) > 1 and row[1] == result_id]

def visualize(result_id):
    """ Creates a visualization. """
    fig = plt.figure()
    _, ax = plt.subplots()
    ax.axis('off')
    plt.xticks([])    
    plt.yticks([])

    result_csv = file_utils.download_csv(constants.RESULTS_DOWNLOAD_CSV)
    connection_csv = file_utils.download_csv(constants.CONNECTIONS_DOWNLOAD_CSV)
    matrix_csv = file_utils.download_csv(constants.MATRICES_DOWNLOAD_CSV) 

    me = get_result(result_csv, result_id)
    if me[2] is not None:
        my_name = me[2]
    else:
        my_name = ''
    try:
        plt.title("{}'s Network".format(str(my_name)))
    except Exception:
        plt.title("Your Network")

    print(my_name)
    matrix = get_matrix_elements(matrix_csv, result_id) 
    connections = get_connections(connection_csv, result_id) 

    mat = np.zeros((len(connections), len(connections)))
    for matrix_el in matrix:
        c_a = get_connection_by_name(connection_csv, matrix_el[2])
        c_b = get_connection_by_name(connection_csv, matrix_el[3])
        if c_a in connections and c_b in connections and matrix_el[4] == constants.STRONG:
            mat[connections.index(c_a)][connections.index(c_b)] = constants.STRONG_EDGE
            mat[connections.index(c_b)][connections.index(c_a)] = constants.STRONG_EDGE
        elif c_a in connections and c_b in connections and matrix_el[4] == constants.WEAK:
            mat[connections.index(c_a)][connections.index(c_b)] = constants.WEAK_EDGE
            mat[connections.index(c_b)][connections.index(c_a)] = constants.WEAK_EDGE
    
    strong_edge_rows, strong_edge_cols = np.where(mat == constants.STRONG_EDGE)
    strong_edges = list(zip(strong_edge_rows.tolist(), strong_edge_cols.tolist()))
    
    weak_edge_rows, weak_edge_cols = np.where(mat == constants.WEAK_EDGE)
    weak_edges = list(zip(weak_edge_rows.tolist(), weak_edge_cols.tolist()))


    gr = nx.Graph()
    gr.add_nodes_from([i for i in range(len(connections))])
    gr.add_edges_from(strong_edges + weak_edges)
    pos = nx.drawing.nx_agraph.graphviz_layout(gr)

    centralities = graph_centrality(gr.nodes(), weak_edges+strong_edges)

    for i in range(len(connections)):
        shape = None
        color = None
        if len(connections[i]) > 22:
            if connections[i][22] == constants.ANOTHER_ORG and connections[i][17]:
                shape = "o"
            elif connections[i][22] == constants.DEPARTMENT:
                shape = "^"
            elif connections[i][22] == constants.MY_ORG:
                shape = "s"
            else:
                shape = "o"
            if connections[i][17] == 'True':
                color = "#058eff"
            else:
                color = "#ed1730"
                nx.draw_networkx_nodes(gr, pos, nodelist=[i], node_shape = shape, node_color = color, node_size=15*int(connections[i][-1]))

    nx.draw_networkx_edges(gr, pos, edgelist=strong_edges, edge_color='#AAAAAA', width=2.0)
    nx.draw_networkx_edges(gr, pos, edgelist=weak_edges, edge_color='#AAAAAA', width=1.0)

    nodes = gr.nodes().items()
    labels = {}
    for i, (node, _) in enumerate(nodes):
        if len(connections[i]) > 16:
            name = ""
            tokens = connections[i][16].split()
            if len(tokens) > 1 and len(tokens[1]) > 0:
                name = "{} {}".format(tokens[0], tokens[1])
            elif len(tokens) == 1:
                name = tokens[0]
            else:
                name = ''
            if centralities[i] >= constants.MIN_CENTRALITY:
                labels[node] = name

    label_pos = nx.drawing.nx_agraph.graphviz_layout(gr)
    nx.draw_networkx_labels(gr, label_pos, labels, font_size=9, font_weight='bold')

    buf = BytesIO()
    plt.savefig(buf, format="png")
    buf = add_watermark(buf)
    plt.close(fig)
    return buf

def save_all():
    # Use /tmp for writable storage in serverless environments
    tmp_dir = "/tmp/visuals"
    if not os.path.exists(tmp_dir):
        os.makedirs(tmp_dir)
        
    print("Downloading questionnaire data...")
    result_csv = file_utils.download_csv(constants.RESULTS_DOWNLOAD_CSV)
    reader = csv.reader(open(result_csv, 'r'))
    print("Questionnaire data downloaded.")
    for i, row in enumerate(reader):
        if i == 0:
            pass
        print("Generating visual for {}".format(row[2]))
        buf = visualize(row[0])
        safe_filename = row[2].replace(' ', '_')
        with open(os.path.join(tmp_dir, f'{safe_filename}.png'), 'w') as f:
            buf.seek(0)
            shutil.copyfileobj(buf, f)
    # No need to remove tmp as it is ephemeral in lambda, but good practice if persistent
    # shutil.rmtree(tmp_dir)

def send_viz_email(buf, name):
    """ Sends email of someone's visualization. """
    username = os.environ.get('SMTP_USERNAME', '')
    password = os.environ.get('SMTP_PASSWORD', '')
    to_addr = os.environ.get('SMTP_TO_ADDRESS', username)

    if not username or not password:
        print("SMTP credentials not configured; skipping email.")
        return

    server = smtplib.SMTP('smtp.gmail.com:587')
    server.ehlo()
    server.starttls()
    server.login(username, password)

    print("Email sent to: " + to_addr)

    multipart = MIMEMultipart()
    multipart['From'] = username
    multipart['To'] = to_addr
    multipart['Subject'] = 'Network Map (blanks fixed): {}'.format(name)
    multipart.attach(MIMEText('Visualization for {}'.format(name)))

    viz_filename = "{}.png".format(name.replace(" ", "_"))
    viz_part = MIMEImage(
        buf.getvalue(),
    )
    viz_part['Content-Disposition'] = 'attachment; filename="{}"'.format(viz_filename)
    multipart.attach(viz_part)
    server.sendmail(username, [to_addr], multipart.as_string())
    server.quit()

def run_daemon():
    while True:
        result_csv = file_utils.download_csv(constants.RESULTS_DOWNLOAD_CSV)
        downloaded_reader = csv.reader(open(result_csv, 'r'))
        downloaded_rows = [row for row in downloaded_reader]
        current_rows = []
        if os.path.exists("current_copy.csv"):
            current_reader = csv.reader(open("current_copy.csv", 'r'))
            current_rows = [row for row in current_reader]
        print("Rows in current copy: {}".format(len(current_rows)))
        print("Rows in downloaded copy: {}".format(len(downloaded_rows)))
        if len(downloaded_rows) > len(current_rows):
            shutil.copy(result_csv, "current_copy.csv")
            most_recent_rows = downloaded_rows[len(current_rows):]
            print("Sending visualizations for new rows...")
            for i, row in enumerate(most_recent_rows):
                print("\t- {}".format(row[2]))
                buf = visualize(row[0])
                send_viz_email(buf, row[2])
        else:
            print("No new rows detected.")
        print("Checking again in 5 minutes...\n")
        time.sleep(300)

if __name__ == '__main__':
    run_daemon()

