from datetime import datetime
import io
import os
import random
import requests
import shutil
import time
import zipfile

from requests.auth import HTTPBasicAuth

def download_csv(url):
    if not os.path.exists('tmp'):
        os.mkdir('tmp')
    auth_user = os.environ.get('AUTH_USERNAME', 'admin')
    auth_pass = os.environ.get('AUTH_PASSWORD', 'changeme')
    r = requests.get(url, auth=HTTPBasicAuth(auth_user, auth_pass))
    contents = r.text
    filename = 'tmp/{}.csv'.format(time.mktime(time.localtime()) * random.random())
    tmpfile = open(filename, 'w')
    tmpfile.write(contents)
    tmpfile.close()
    return filename
