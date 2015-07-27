#!/usr/bin/env bash
virtualenv --python=python .env
source .env/bin/activate
pip install -U git+https://github.com/2gis/contesto.git
pip install -U git+https://github.com/2gis/lode_runner.git
pip install -U selenium
pip install -U pep8
pip install -U jinja2
