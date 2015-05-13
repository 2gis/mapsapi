#!/usr/bin/env bash
source .env/bin/activate
python template_render.py
PYTHONPATH=$(pwd) .env/bin/lode_runner -v tests/ --with-xunit