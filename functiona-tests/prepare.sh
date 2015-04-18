#!/usr/bin/env bash
virtualenv --python=python .env
source .env/bin/activate
pip install -U git+https://github.com/2gis/contesto.git
pip install -U git+https://github.com/nwlunatic/lode_runner.git
pip install -U selenium
