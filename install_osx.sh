#!/usr/bin/env bash

echo 'Preparing to install Node.js & mapsapi'

node -v || brew install node
npm install
sudo npm install -g gulp

echo 'Installation process finished'
