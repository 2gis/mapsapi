DG MAPS API 2.0
====

Обновление Leaflet

    git submodule init
    git submodule update 

Обновить все субмодули

    git submodule foreach 'git checkout master && git pull origin master'
    
Склонить репозиторий и обновить все субмодули

    git clone --recursive https://github.com/yarikos/DG.MapsAPI.git
