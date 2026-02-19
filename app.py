"""
Application factory — creates Flask app and SQLAlchemy db instances.
Imported by both index.py and models.py to break circular imports.
"""
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

import constants

load_dotenv()

app = Flask(__name__)
app.debug = os.environ.get('FLASK_DEBUG', 'false').lower() == 'true'
app.secret_key = os.environ.get('SECRET_KEY', 'change-me-in-production')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

database_url = os.environ.get('DATABASE_URL', constants.LOCAL_DB_PATH)
if 'jdbc' not in database_url:
    app.config['SQLALCHEMY_DATABASE_URI'] = database_url
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = constants.LOCAL_DB_PATH

db = SQLAlchemy(app)
