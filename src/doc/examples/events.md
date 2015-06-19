## Обработка событий

{toc}

### Описание

Ниже приведены примеры работы с событиями. Для получения подробной информации перейдите в раздел документации <a href="/doc/maps/manual/events">События</a>.

### Подписка на события

Пример подписки на различные события (клик в маркер, карту, геометрию):

Вы кликнули в: <span id="clicked_element">никуда</span>
<script src="http://maps.api.2gis.ru/2.0/loader.js"></script>
<div id="map" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function() {
        var map,
            clickedElement = document.getElementById('clicked_element'),
            coords = [
                [54.99, 82.88],
                [54.985, 82.94],
                [54.984, 82.925],
                [54.981, 82.928]
            ];

        map = DG.map('map', {
            center: [54.98, 82.89],
            zoom: 13
        });

        map.on('click', function(e) {
            clickedElement.innerHTML = 'карту, координаты ' + e.latlng.lat + ', ' + e.latlng.lng;
        });

        DG.marker([54.98, 82.89])
            .on('click', function() {
                clickedElement.innerHTML = 'маркер';
            })
            .addTo(map);

        DG.polygon(coords)
            .on('click', function() {
                clickedElement.innerHTML = 'многоугольник';
            })
            .addTo(map);
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8" />
            <title>Подписка на события</title>
            <script src="http://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            Вы кликнули в: <span id="clicked_element">никуда</span>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                DG.then(function() {
                    var map,
                        clickedElement = document.getElementById('clicked_element'),
                        coords = [
                            [54.99, 82.88],
                            [54.985, 82.94],
                            [54.984, 82.925],
                            [54.981, 82.928]
                        ];

                    map = DG.map('map', {
                        center: [54.98, 82.89],
                        zoom: 13
                    });

                    map.on('click', function(e) {
                        clickedElement.innerHTML = 'карту, координаты ' + e.latlng.lat + ', ' + e.latlng.lng;
                    });

                    DG.marker([54.98, 82.89])
                        .on('click', function() {
                            clickedElement.innerHTML = 'маркер';
                        })
                        .addTo(map);

                    DG.polygon(coords)
                        .on('click', function() {
                            clickedElement.innerHTML = 'многоугольник';
                        })
                        .addTo(map);
                });
            </script>
        </body>
    </html>

### Подписка на изменение проекта 2ГИС

При изменении [проекта](/doc/maps/manual/map#map-projectdetector) выделяются границы текущего:

<div id="map1" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function() {
        var map, currentProjectBound;

        map = DG.map('map1', {
            center: DG.latLng(54.98, 82.89),
            zoom: 9
        });

        // подписываемся на событие изменения текущего проекта 2GIS
        map.on('projectchange', function(e) {
            var bounds = e.getProject().latLngBounds;

            currentProjectBound = DG.rectangle(bounds, {
                color:"#f03",
                weight:1
            }).addTo(map);
        });

        // подписываемся на событие выхода из проекта 2GIS
        map.on('projectleave', function(e) {
            if (currentProjectBound) {
                map.removeLayer(currentProjectBound);
            }
        });
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8" />
            <title>Подписка на изменение проекта 2ГИС</title>
            <script src="http://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                DG.then(function() {
                    var map, currentProjectBound;

                    map = DG.map('map', {
                        center: DG.latLng(54.98, 82.89),
                        zoom: 9
                    });

                    // подписываемся на событие изменения текущего проекта 2GIS
                    map.on('projectchange', function(e) {
                        var bounds = e.getProject().latLngBounds;
                        currentProjectBound = DG.rectangle(bounds, {
                            color:"#f03",
                            weight:1
                        }).addTo(map);
                    });

                    // подписываемся на событие выхода из проекта 2GIS
                    map.on('projectleave', function(e) {
                        if (currentProjectBound) {
                            map.removeLayer(currentProjectBound);
                        }
                    });
                });
            </script>
        </body>
    </html>
