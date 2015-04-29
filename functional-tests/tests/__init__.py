import os

import contesto
from contesto import config as cfg

contesto.config.add_config_file(os.path.abspath(os.path.dirname(__file__)) + "/config.ini")
contesto.config.add_config_file(os.path.abspath(os.path.dirname(__file__)) + "/config.my.ini")

config = cfg
