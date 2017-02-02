#!/usr/bin/env bash

echo 'Preparing to install Node.js & mapsapi'

node -v || brew install node
sudo npm install -g npm@2.x
npm install
sudo npm install -g gulp

echo 'Installation process finished'
