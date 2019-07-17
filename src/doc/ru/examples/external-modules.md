## Внешние модули

{toc}

### Описание

Ниже приведены примеры подключения и использования внешних модулей. Для получения подробной информации перейдите
в раздел документации <a href="/doc/maps/ru/manual/dg-external-modules">Внешние модули</a>.

### Кластеризатор

Пример подключения кластеризатора. Кластеризатор часто используется для отображения большого количества маркеров.
Код модуля и его документация доступна в <a href="https://github.com/Leaflet/Leaflet.markercluster" target="_blank">GitHub-репозитории</a> автора.

<script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
<link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css" />
<link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css" />
<script src="https://maps.api.2gis.ru/2.0/cluster_realworld.js"></script>
<div id="map" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function() {
        // загрузка кода модуля
        return DG.plugin('https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js');
    }).then(function() {
        map = DG.map('map', {
            center: DG.latLng(54.92, 82.82),
            zoom: 9
        });

        var markers = DG.markerClusterGroup();

        for (var i = 0; i < addressPoints.length; i++) {
            var a = addressPoints[i];
            var title = a[2];
            var marker = DG.marker([a[0], a[1]], { title: title });
            marker.bindPopup(title);
            markers.addLayer(marker);
        }

        map.addLayer(markers);
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Кластеризатор</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
            <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css" />
            <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css" />
            <script src="https://maps.api.2gis.ru/2.0/cluster_realworld.js"></script>
        </head>
        <body>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                DG.then(function() {
                    // загрузка кода модуля
                    return DG.plugin('https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js');
                }).then(function() {
                    map = DG.map('map', {
                        center: DG.latLng(54.92, 82.82),
                        zoom: 9
                    });

                    var markers = DG.markerClusterGroup();

                    // обработка координат для установки маркеров
                    for (var i = 0; i < addressPoints.length; i++) {
                        var a = addressPoints[i];
                        var title = a[2];
                        var marker = DG.marker([a[0], a[1]], { title: title });
                        marker.bindPopup(title);
                        markers.addLayer(marker);
                    }

                    map.addLayer(markers);
                });
            </script>
        </body>
    </html>


### Тепловая карта

Пример подключения тепловой карты. Тепловая карта позволяет визуализировать количественные данные в зависимости
от географического региона. Интенсивность окраски каждого региона зависит от соответствующих ему значений.

<script src="https://maps.api.2gis.ru/2.0/heat_realworld.js"></script>
<div id="map1" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function() {
        // загрузка кода модуля
        return DG.plugin('https://unpkg.com/leaflet.heat@0.2.0/dist/leaflet-heat.js');
    }).then(function() {
        map = DG.map('map1', {
            center: DG.latLng(54.89, 82.45),
            zoom: 10
        });

        DG.heatLayer(addressPoints1).addTo(map);
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Тепловая карта</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
            <script src="https://maps.api.2gis.ru/2.0/heat_realworld.js"></script>
        </head>
        <body>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                DG.then(function() {
                    // загрузка кода модуля
                    return DG.plugin('https://unpkg.com/leaflet.heat@0.2.0/dist/leaflet-heat.js');
                }).then(function() {
                    map = DG.map('map', {
                        center: DG.latLng(54.89, 82.45),
                        zoom: 10
                    });

                    DG.heatLayer(addressPoints1).addTo(map);
                });
            </script>
        </body>
    </html>
