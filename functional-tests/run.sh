#!/usr/bin/env bash
source .env/bin/activate
PYTHONPATH=$(pwd) .env/bin/lode_runner -v tests/ --with-xunit
exit 0;
