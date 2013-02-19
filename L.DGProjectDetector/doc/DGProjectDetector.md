Leaflet DG Project Detector Plugin
====================================

Плагин для обнаружения текущего проекта на карте.

Текущая версия 1.0.0

Copyright (c) 2013, 2GIS, Dima Rudenko

# Документация

Плагин добавляет новый хендлер projectDetector, и тригирит два событияю

## События
    projectsloaded   Событие возникает при получении списка всех доступных проектов
    projectchange    Событие возникает при смене проекта
## Методы

    getProgect()     Возвращает текущий проект
    getProjectList() Возвращает все доступные проекты

# Примеры
## Событие при смене проекта:

    map.on('projectchange', function (e) {
        if (currentProjectBound) {
            currentProjectBound.onRemove(map);
        }

        var bounds = e.getProject().LatLngBounds;
        currentProjectBound = L.rectangle(bounds, {color:"#f03", weight:1}).addTo(map);
    });

## Событие на загрузку списка проектов:

    map.on('projectsloaded', function (e) {
        var bound;
        var projectList = e.getProjectsList();

        for (var i = 0; i < projectList.length; i++) {
            bound = projectList[i].LatLngBounds;
            L.rectangle(bound, {color:"#ff7800", weight:1}).addTo(map);
        }
    });

