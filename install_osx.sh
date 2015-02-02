#!/usr/bin/env bash

echo 'Preparing to install Node.js & mapsapi'
node -v || brew install node
sudo npm install -g npm@2.x
brew install pkg-config
brew install librsvg
export PKG_CONFIG_PATH=/opt/X11/lib/pkgconfig
npm install
sudo npm install -g gulp

echo 'Installation process finished'
