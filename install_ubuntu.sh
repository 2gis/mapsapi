#!/usr/bin/env bash

echo 'Preparing to install Node.js & mapsapi'

sudo apt-get update
sudo apt-get install -y python-software-properties make gcc g++
sudo add-apt-repository -y ppa:chris-lea/node.js
sudo apt-get update
node -v || sudo apt-get install -y nodejs
sudo npm install -g npm@2.x
npm install
sudo npm install -g gulp

echo 'Installation process finished'
