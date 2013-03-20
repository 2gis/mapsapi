Leaflet DG Project Detector Plugin
====================================

Плагин для обнаружения текущего проекта на карте.

Текущая версия 1.0.0

Copyright (c) 2013, 2GIS, Dima Rudenko

# Документация

Плагин добавляет новый хендлер projectDetector, и тригирит два события: "projectchange" и "projectleave"

## События

    projectchange    Событие возникает при смене проекта.
    projectleave     Событие возникает при выходе из текущего проекта.

### Методы событий

    getProjectList  {Function}  Возвращает все доступные проекты.
    getProject      {Function}  Возвращает текущий проект.

# Примеры
## Событие при смене проекта:

    var bounds;
    map.on('projectchange', function (e) {
        if (currentProjectBound) {
            currentProjectBound.onRemove(map);
        }

        bounds = e.getProject().LatLngBounds;
        currentProjectBound = L.rectangle(bounds, {color:"#f03", weight:1}).addTo(map);
    });

## Событие на выход из проекта:

    map.on('projectleave', function (e) {
       alert("Вы покинули проект.");
    });
