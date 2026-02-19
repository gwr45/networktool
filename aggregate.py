import constants
import models

def network_density(mat):
    """ Algorithm for finding network density of an adjacency list """
    possible_connections = len(mat) * (len(mat) - 1)
    total = 0
    for _, v in enumerate(mat):
        total += len(v)
    return total / possible_connections

def get_db_average(field):
    """ Gets the average of a field in the DB. """
    return float(sum([getattr(result, field) for result in models.DBResult.query.all()])) / len(models.DBResult.query.all())

def get_db_proportion(field, value):
    """ Returns the amount of items in the DB that are part of a specific category. """
    return float(sum([getattr(result, field) for result in models.DBResult.query.all()]))/len(models.DBResult.query.all())

def proportion(conns, attr, val):
    """ Returns the proportion of connections whose attribute matches a value. """
    matched = [c for c in conns if (c[attr]["label"] == val if isinstance(c[attr], dict) else c[attr] == val)]
    return float(len(matched)) / len(conns)

def proportion_by_list(conns, attr, val):
    """ Returns the proportion of connections whose attribute contains a value. """
    matched = [c for c in conns if val in c[attr]]
    return float(len(matched)) / len(conns)

def average(conns, attr):
    """ Returns the mean of an attribute over all connections. """
    vals = [conn[attr] for conn in conns if conn.get(attr) is not None]
    if not vals:
        return 0
    return float(sum(vals)) / len(vals)



class Result:
    numTies = 0
    netDensity = 0.0
    higherRank = 0
    sameRank = 0
    lowerRank = 0
    notInOrg = 0
    yourUnit = 0
    veryCloseTies = 0
    closeTies = 0

    econResources = 0
    careerResources = 0
    getThingsDoneResources = 0
    socialResources = 0

    emotionalTrust = 0
    getThingsDoneTrust = 0
    obligation = 0

    eliteNetwork = 0
    guidanceNetwork = 0
    technicalNetwork = 0
    financialNetwork = 0

    differentNationality = 0
    diffRace = 0

    percentRelated = 0
    differentUniversity = 0
    numDegrees = 0

    def __init__(self, kws):
        self.kws = dict(kws)  # instance copy, not shared class-level mutable
        for key in kws:
            setattr(self, key, kws[key])


class Averages:
    """ A container for various Result objects which each represent an "average" value. """
    class_average = None
    tech_mba_2015 = None
    tech_mba_2014 = None
    senior_execs = None
    full_time_mba = None


def calculate_result_dict(conns, mat_or_net_density, form_data):
    result_dict = {}

    for field in constants.QUESTIONNAIRE_FIELD_LIST:
        result_dict[field] = form_data[field]

    # small modification to 'gender' field, since it's a select
    if isinstance(result_dict["gender"], dict):
        result_dict["gender"] = form_data["gender"]["value"] if form_data["gender"] else constants.NO_ANSWER 

    result_dict["numTies"] = len(conns)
    if isinstance(mat_or_net_density, float) or isinstance(mat_or_net_density, int):
        result_dict["netDensity"] = mat_or_net_density
    else:
        result_dict["netDensity"] = network_density(mat_or_net_density)

    for triple in [
            ("higherRank", "rank", constants.HIGHER_RANK),
            ("sameRank", "rank", constants.SAME_RANK),
            ("lowerRank", "rank", constants.LOWER_RANK),
            ("notInOrg", "context", constants.ANOTHER_ORG),
            ("yourUnit", "context", constants.DEPARTMENT),
            ("veryCloseTies", "closeness", constants.VERY_STRONG),
            ("closeTies", "closeness", constants.STRONG),
            ("econResources", "resources", constants.ECONOMIC_RESOURCES),
            ("careerResources", "resources", constants.CAREER_RESOURCES),
            ("getThingsDoneResources", "resources", constants.GET_THINGS_DONE_RESOURCES),
            ("socialResources", "resources", constants.SOCIAL_RESOURCES),
            ("diffRace", "diffRace", constants.CHECKED),
            ("differentNationality", "differentNationality", constants.CHECKED),
            ("percentRelated", "related", constants.CHECKED),
            ("differentUniversity", "differentUniversity", constants.CHECKED),
        ]:
        result_field, conn_field, value = triple
        result_dict[result_field] = proportion(conns, conn_field, value)

    result_dict["emotionalTrust"] = (average(conns, "difficultyComfort") + average(conns, "hopesComfort"))/2.0
    result_dict["getThingsDoneTrust"] = average(conns, "completeTaskTrust")
    result_dict["obligation"] = (average(conns, "hourFavorObligation") + average(conns, "dayFavorObligation"))/2.0 
    result_dict["numDegrees"] = average(conns, "numDegrees")
    return result_dict

def calculate_result_dict_from_id(id):
    conns = [conn.__dict__ for conn in models.Connection.query.filter_by(db_result_id=id).all()]
    form_data = models.DBResult.query.get(id).__dict__
    
    total_pairs = models.MatrixElement.query.filter_by(db_result_id=id).all()
    if len(total_pairs) == 0:
        net_density = 0
    else:
        n_connected_pairs = len([pair for pair in total_pairs if pair.strength != "No connection"])
        net_density = float(n_connected_pairs)/len(total_pairs)

    r = calculate_result_dict(conns, net_density, form_data)
    return r


def remove_duplicates(result_dicts):
    if len(result_dicts) > 0:
        new = [result_dicts[0]]
        for i in range(1, len(result_dicts)):
            if result_dicts[i]["name"] != result_dicts[i-1]["name"]:
                new.append(result_dicts[i])
        return new
    else:
        return result_dicts

def get_averages():
    a = Averages()
    class_avg_dict = {}

    lowest_class_id = constants.LOWEST_CLASS_ID
    class_results = sorted(
        models.DBResult.query.all(),
        key=lambda r: r.id
    )[lowest_class_id:]

    result_dicts = []

    if len(class_results) < 20:
        segment = class_results
    elif len(class_results) < 100:
        segment = class_results[::5]
    else:
        segment = class_results[::10]

    for result in segment:
        result_dicts.append(calculate_result_dict_from_id(result.id))
    result_dicts = remove_duplicates(result_dicts)

    for field in constants.FIELD_LIST:
        if len(result_dicts) > 0:
            class_avg_dict[field] = sum([result_dict[field] for result_dict in result_dicts])/len(result_dicts)
        else:
            class_avg_dict[field] = 0

    a.class_average = Result(class_avg_dict)

    for person in [
        constants.MBA2015,
        constants.MBA2014,
        constants.EXEC,
        constants.FULLTIME
    ]:
        avg_dict = {}
        for field in constants.FIELD_LIST:
            avg_dict[field] = constants.DEFAULTS[field][person]
        setattr(a, person, Result(avg_dict))
    return a
