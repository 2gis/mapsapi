#!/usr/bin/env bash
virtualenv --python=python .env
source .env/bin/activate
pip install -U git+https://github.com/2gis/contesto.git@53ff11259171a8fca74cbc04bf83bbdec668424d
pip install -U git+https://github.com/2gis/lode_runner.git@7cbd608328058b4c622fcd8795a8804ef121cae7
pip install -U selenium
pip install -U pep8
pip install -U jinja2
