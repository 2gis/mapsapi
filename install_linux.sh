#!/usr/bin/env bash

echo 'Preparing to install Node.js & mapsapi'

node -v || sudo apt-get install -y nodejs
sudo npm install -g npm@2.x
sudo apt-get -y install librsvg2-dev
npm install
sudo npm install -g gulp

echo 'Installation process finished'
