"""Seed the database with demo data for testing the network graph."""
from app import app, db
import models
import constants

with app.app_context():
    # Create a test result
    class FakeResult:
        def __init__(self):
            self.kws = {
                'name': 'Demo User',
                'age': 30,
                'gender': 'Male',
                'workExperience': 8,
                'countriesLived': 3,
                'networkDiversity': 4,
                'networkObligation': 3,
                'eliteNetwork': 5,
                'technicalNetwork': 4,
                'guidanceNetwork': 3,
                'financialNetwork': 2,
                'numTies': 12,
                'netDensity': 0.45,
                'higherRank': 0.33,
                'sameRank': 0.42,
                'lowerRank': 0.25,
                'notInOrg': 0.35,
                'yourUnit': 0.40,
                'veryCloseTies': 0.25,
                'closeTies': 0.50,
                'econResources': 3.2,
                'careerResources': 4.1,
                'getThingsDoneResources': 3.8,
                'socialResources': 4.5,
                'diffRace': 0.42,
                'differentNationality': 0.33,
                'emotionalTrust': 4,
                'getThingsDoneTrust': 3,
                'obligation': 3,
                'percentRelated': 8,
                'differentUniversity': 58,
                'numDegrees': 2,
            }

    r = FakeResult()
    d = models.DBResult(r)
    db.session.add(d)
    db.session.commit()
    result_id = d.id
    print(f'Created result with id={result_id}')

    # Add 12 connections
    names = ['Alice Chen', 'Bob Martinez', 'Carol Singh', 'David Kim',
             'Eva Okafor', 'Frank Weber', 'Grace Liu', 'Henry Brown',
             'Iris Patel', 'James Wilson', 'Karen Lee', 'Luis Garcia']

    contexts = ['work', 'work', 'school', 'work', 'family', 'work',
                'school', 'social', 'work', 'social', 'school', 'work']

    for i, name in enumerate(names):
        conn_data = {
            'connectionName': name,
            'context': {'label': contexts[i]},
            'closeness': {'label': 'Close' if i < 6 else 'Acquaintance'},
            'rank': {'label': 'Same Rank'},
            'frequency': {'label': 'Weekly' if i < 4 else 'Monthly'},
            'related': False,
            'diffRace': i % 3 == 0,
            'diffGender': i % 2 == 0,
            'differentNationality': i % 4 == 0,
            'differentUniversity': i % 2 == 1,
            'relationshipDuration': 3 + i,
            'differentSkillSet': 3,
            'hourFavorObligation': 4,
            'dayFavorObligation': 3,
            'countriesLived': 1 + (i % 3),
            'resources': {'label': 'Career'},
            'difficultyComfort': 3,
            'hopesComfort': 4,
            'inconvenientFavorObligation': 3,
            'completeTaskTrust': 4,
            'experienceYears': 5 + i,
            'competenceTrust': 4,
            'connectionAge': 25 + i,
            'numDegrees': 1 + (i % 3),
        }
        c = models.Connection(conn_data, result_id)
        db.session.add(c)
    db.session.commit()

    # Add matrix elements (who knows who)
    strong_pairs = [
        ('Alice Chen', 'Bob Martinez'),
        ('Alice Chen', 'Carol Singh'),
        ('Bob Martinez', 'David Kim'),
        ('Carol Singh', 'Grace Liu'),
        ('Eva Okafor', 'Frank Weber'),
        ('Grace Liu', 'Karen Lee'),
        ('Henry Brown', 'James Wilson'),
        ('Iris Patel', 'Luis Garcia'),
        ('David Kim', 'Frank Weber'),
        ('Alice Chen', 'Eva Okafor'),
    ]

    weak_pairs = [
        ('Bob Martinez', 'Grace Liu'),
        ('Carol Singh', 'Henry Brown'),
        ('David Kim', 'Iris Patel'),
        ('Eva Okafor', 'James Wilson'),
        ('Frank Weber', 'Karen Lee'),
        ('Luis Garcia', 'Alice Chen'),
        ('Henry Brown', 'Luis Garcia'),
        ('Karen Lee', 'Bob Martinez'),
    ]

    for a, b in strong_pairs:
        m = models.MatrixElement(result_id, a, b, constants.STRONG)
        db.session.add(m)

    for a, b in weak_pairs:
        m = models.MatrixElement(result_id, a, b, 'Weak')
        db.session.add(m)

    db.session.commit()
    print(f'Seeded {len(names)} connections, {len(strong_pairs)} strong + {len(weak_pairs)} weak edges')
    print(f'View at: http://127.0.0.1:1997/show/{result_id}')
