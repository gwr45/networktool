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

app = Flask(__name__, instance_path='/tmp')
app.debug = os.environ.get('FLASK_DEBUG', 'false').lower() == 'true'
app.secret_key = os.environ.get('SECRET_KEY', 'change-me-in-production')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

database_url = os.environ.get('DATABASE_URL')
if database_url:
    # Fix for SQLAlchemy 1.4+ which requires postgresql:// instead of postgres://
    if database_url.startswith("postgres://"):
        database_url = database_url.replace("postgres://", "postgresql://", 1)
    app.config['SQLALCHEMY_DATABASE_URI'] = database_url
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = constants.LOCAL_DB_PATH

db = SQLAlchemy(app)
