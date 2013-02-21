Leaflet DG Project Detector Plugin
====================================

Плагин для обнаружения текущего проекта на карте.

Текущая версия 1.0.0

Copyright (c) 2013, 2GIS, Dima Rudenko

# Документация

Плагин добавляет новый хендлер projectDetector, и тригирит два события: "projectsloaded" и "projectchange"

## Переопределяемые функции:

    getAllProject      {Function}   Переопределяемая функция, вызывающаяся когда список всех проектов будет доступен
    getCurrentProject  {Function}   Переопределяемая функция, вызывающаяся когда текущий проект будет определен

## События

    projectsloaded   Событие возникает при получении списка всех доступных проектов
    projectchange    Событие возникает при смене проекта

### Методы событий

    getProjectList  {Function}  Возвращает все доступные проекты
    getProgect      {Function}  Возвращает текущий проект

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
        var projectsList = e.getProjectsList();

        for (var i = 0; i < projectsList.length; i++) {
            bound = projectList[i].LatLngBounds;
            L.rectangle(bound, {color:"#ff7800", weight:1}).addTo(map);
        }
    });

## Получить все доступные проекты:

    var map = new L.Map('map', {
            center:new L.LatLng(54.980206086231, 82.898068362003),
            zoom:10
    });

    map.projectDetector.getAllProjects = function(projectsList){
        // код, использующий список всех проектов
    }

## Получить текущий проект:

    var map = new L.Map('map', {
            center:new L.LatLng(54.980206086231, 82.898068362003),
            zoom:10
    });

    map.projectDetector.getCurrentProject = function(project){
        // код, использующий текущий проект
    }
