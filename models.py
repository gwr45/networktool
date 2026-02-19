from datetime import datetime
from app import db
import aggregate

class DBResult(db.Model):
    """
    Represents a response.
    """
    __tablename__ = "dbresult"
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime)

    name = db.Column(db.String(80))
    age = db.Column(db.Integer)
    gender = db.Column(db.String(10))
    workExperience = db.Column(db.Integer)
    countriesLived = db.Column(db.Integer)
    networkDiversity = db.Column(db.Integer)
    networkObligation = db.Column(db.Integer)
    eliteNetwork = db.Column(db.Integer)
    technicalNetwork = db.Column(db.Integer)
    guidanceNetwork = db.Column(db.Integer)
    financialNetwork = db.Column(db.Integer)

    numTies = db.Column(db.Integer)
    netDensity = db.Column(db.Float)
    higherRank = db.Column(db.Float)
    sameRank = db.Column(db.Float)
    lowerRank = db.Column(db.Float)
    notInOrg = db.Column(db.Float)
    yourUnit = db.Column(db.Float)
    veryCloseTies = db.Column(db.Float)
    closeTies = db.Column(db.Float)

    econResources = db.Column(db.Float)
    careerResources = db.Column(db.Float)
    getThingsDoneResources = db.Column(db.Float)
    socialResources = db.Column(db.Float)

    diffRace = db.Column(db.Float)
    differentNationality = db.Column(db.Float)

    emotionalTrust = db.Column(db.Integer)
    getThingsDoneTrust = db.Column(db.Integer)
    obligation = db.Column(db.Integer)

    percentRelated = db.Column(db.Integer)
    differentUniversity = db.Column(db.Integer)
    numDegrees = db.Column(db.Integer)

    def __init__(self, result):
        self.created_at = datetime.now()
        for key in result.kws:
            setattr(self, key, result.kws[key])
            
    def to_result(self):
        attrs = [k for k in DBResult.__dict__.keys() if not k.startswith("__") and not k.endswith("__")]
        d = {}
        for attr in attrs:
            d[attr] = getattr(self, attr)
        return aggregate.Result(d)

class MatrixElement(db.Model):
    """ Represents a connection matrix. """
    id = db.Column(db.Integer, primary_key=True)
    db_result_id = db.Column(db.Integer, db.ForeignKey("dbresult.id"))
    person_a = db.Column(db.String(100))
    person_b = db.Column(db.String(100))
    strength = db.Column(db.String(100))

    def __init__(self, db_result_id, person_a, person_b, strength):
        self.db_result_id = db_result_id
        self.person_a = person_a
        self.person_b = person_b
        self.strength = strength

class Connection(db.Model):
    __tablename__ = "connection"
    id = db.Column(db.Integer, primary_key=True)
    db_result_id = db.Column(db.Integer, db.ForeignKey("dbresult.id"))
    related = db.Column(db.Boolean)
    closeness = db.Column(db.String(50))
    rank = db.Column(db.String(50))
    frequency = db.Column(db.String(50))
    relationshipDuration = db.Column(db.Integer)
    differentSkillSet = db.Column(db.Integer)
    hourFavorObligation = db.Column(db.Integer)
    countriesLived = db.Column(db.Integer)
    resources = db.Column(db.String(50))
    difficultyComfort = db.Column(db.Integer)
    hopesComfort = db.Column(db.Integer)
    inconvenientFavorObligation = db.Column(db.Integer)
    completeTaskTrust = db.Column(db.Integer)
    diffRace = db.Column(db.Boolean)
    connectionName = db.Column(db.String(80))
    diffGender = db.Column(db.Boolean)
    differentNationality = db.Column(db.Boolean)
    dayFavorObligation = db.Column(db.Integer)
    experienceYears = db.Column(db.Integer)
    competenceTrust = db.Column(db.Integer)
    context = db.Column(db.String)
    connectionAge = db.Column(db.Integer)
    differentUniversity = db.Column(db.Boolean)
    numDegrees = db.Column(db.Integer)

    BOOLEAN_FIELDS = {"diffRace", "diffGender", "related", "differentNationality", "differentUniversity"}

    def __init__(self, conn, db_result_id):
        self.db_result_id = db_result_id
        for key in conn:
            if isinstance(conn[key], dict):
                setattr(self, key, conn[key]["label"])
            elif key in self.BOOLEAN_FIELDS:
                setattr(self, key, conn[key] == "on")
            elif key == "resources" and conn[key] == []:
                setattr(self, key, None)
            else:
                setattr(self, key, conn[key])
