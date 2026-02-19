LOCAL_DB_PATH = 'sqlite:///network.db'

QUESTIONNAIRE_FIELD_LIST = [
    "name",
    "age",
    "gender",
    "workExperience",
    "countriesLived",
    "networkDiversity",
    "networkObligation",
    "eliteNetwork",
    "technicalNetwork",
    "guidanceNetwork",
    "financialNetwork"
]

FIELD_LIST = [
    "numTies",
    "netDensity",
    "higherRank",
    "sameRank",
    "lowerRank",
    "notInOrg",
    "yourUnit",
    "veryCloseTies",
    "closeTies",
    "econResources",
    "careerResources",
    "getThingsDoneResources",
    "socialResources",
    "emotionalTrust",
    "getThingsDoneTrust",
    "obligation"
]

MBA2015 = "tech_mba_2015"
MBA2014 = "tech_mba_2014"
EXEC = "senior_execs"
FULLTIME = "full_time_mba"


DEFAULTS = {
    "numTies": {
        MBA2015: 62,
        MBA2014: 43,
        EXEC: 65,
        FULLTIME: 30
    },
    "netDensity": {
        MBA2015: 0.27,
        MBA2014: 0.47,
        EXEC: 0.46,
        FULLTIME: 0.41
    },
    "higherRank": {
        MBA2015: 0.4,
        MBA2014: 0.3,
        EXEC: 0.29,
        FULLTIME: 0.29
    },
    "sameRank": {
        MBA2015: 0.4,
        MBA2014: 0.4,
        EXEC: 0.39,
        FULLTIME: 0.33
    },
    "lowerRank": {
        MBA2015: 0.19,
        MBA2014: 0.3,
        EXEC: 0.32,
        FULLTIME: 0.3
    },
    "notInOrg": {
        MBA2015: 0.54,
        MBA2014: 0.44,
        EXEC: 0.59,
        FULLTIME: 0.37
    },
    "yourUnit": {
        MBA2015: 0.2,
        MBA2014: 0.24,
        EXEC: 0.19,
        FULLTIME: 0.36
    },
    "veryCloseTies": {
        MBA2015: 0.27,
        MBA2014: 0.3,
        EXEC: 0.3,
        FULLTIME: 0.15
    },
    "closeTies": {
        MBA2015: 0.41,
        MBA2014: 0.47,
        EXEC: 0.5,
        FULLTIME: 0.42
    },
    "econResources": {
        MBA2015: 0.24,
        MBA2014: 0.23,
        EXEC: 0.22,
        FULLTIME: 0.33
    },
    "careerResources": {
        MBA2015: 0.52,
        MBA2014: 0.56,
        EXEC: 0.25,
        FULLTIME: 0.26
    },
    "getThingsDoneResources": {
        MBA2015: 0.54,
        MBA2014: 0.71,
        EXEC: 0.47,
        FULLTIME: 0.64
    },
    "socialResources": {
        MBA2015: 0.61,
        MBA2014: 0.56,
        EXEC: 0.61,
        FULLTIME: 0.34
    },
    "emotionalTrust": {
        MBA2015: 3,
        MBA2014: 3.24,
        EXEC: 2.85,
        FULLTIME: 2.27
    },
    "getThingsDoneTrust": {
        MBA2015: 3.9,
        MBA2014: 4.05,
        EXEC: 3.49,
        FULLTIME: 3.82
    },
    "obligation": {
        MBA2015: 3.4,
        MBA2014: 3.39,
        EXEC: 2.81,
        FULLTIME: 3.54
    }
}

NO_CONNECTION = "No connection"
VERY_STRONG = "Very Strong"
STRONG = "Strong"
WEAK = "Weak"
ANOTHER_ORG = "In another organization"
DEPARTMENT = "In my department"
MY_ORG = "My organization, but not in my department"
HIGHER_RANK = "Higher rank"
SAME_RANK = "About the same"
LOWER_RANK = "Lower rank"
ECONOMIC_RESOURCES = "Economic/Financial"
CAREER_RESOURCES = "Information on entrepreneurial opportunities"
GET_THINGS_DONE_RESOURCES = "Help in tasks execution"
SOCIAL_RESOURCES = "Friendship, social enjoyment and support"

NO_ANSWER = "No answer"

MIN_CENTRALITY = 0
STRONG_EDGE = 2
WEAK_EDGE = 1

RESULTS_DOWNLOAD_CSV = 'http://ezras.network/data/results'
CONNECTIONS_DOWNLOAD_CSV = 'http://ezras.network/data/connections'
MATRICES_DOWNLOAD_CSV = 'http://ezras.network/data/matrices'

#RESULTS_DOWNLOAD_CSV = 'http://localhost:1997/data/results'
#CONNECTIONS_DOWNLOAD_CSV = 'http://localhost:1997/data/connections'
#MATRICES_DOWNLOAD_CSV = 'http://localhost:1997/data/matrices'

LOWEST_CLASS_ID = 0
CHECKED = "on"
