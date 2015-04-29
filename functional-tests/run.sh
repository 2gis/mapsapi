#!/usr/bin/env bash
source .env/bin/activate
cp -R pages ../public
PYTHONPATH=$(pwd) .env/bin/lode_runner -v tests/ --with-xunit