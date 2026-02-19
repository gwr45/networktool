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
    # Use /tmp for serverless environment
    tmp_parent = '/tmp'
    if not os.path.exists(tmp_parent):
        try:
            os.makedirs(tmp_parent)
        except OSError:
            # Fallback to local tmp if /tmp is not accessible (e.g. Windows, though unlikely here)
            tmp_parent = 'tmp'
            if not os.path.exists(tmp_parent):
                os.makedirs(tmp_parent)

    auth_user = os.environ.get('AUTH_USERNAME', 'admin')
    auth_pass = os.environ.get('AUTH_PASSWORD', 'changeme')
    
    # Use requests.get with auth
    try:
        r = requests.get(url, auth=HTTPBasicAuth(auth_user, auth_pass))
        r.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"Error downloading CSV: {e}")
        return None

    contents = r.text
    # Use a safe filename
    filename = os.path.join(tmp_parent, '{}.csv'.format(time.time() + random.random()))
    
    with open(filename, 'w') as tmpfile:
        tmpfile.write(contents)
    
    return filename
