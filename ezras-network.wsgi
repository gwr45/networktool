#! /usr/bin/python3.6

import logging
import sys
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0, '/var/www/ezras-network/ezras-network')
from ezras-network import app as application
application.secret_key = 'anything you wish'
