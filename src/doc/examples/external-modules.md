## Внешние модули

{toc}

### Описание

Ниже приведены примеры подключения и использования внешних модулей. Для получения подробной информации перейдите в раздел документации <a href="/doc/maps/manual/external-modules">Внешние модули</a>.

### Кластеризатор

Пример подключения кластеризатора. Кластеризатор часто используется для отображения большого количества маркеров. Код модуля и его документация доступна в <a href="https://github.com/Leaflet/Leaflet.markercluster" target="_blank">GitHub-репозитории</a> автора.

<script src="http://maps.api.2gis.ru/2.0/loader.js?pkg=full"
data-id="dgLoader"></script>
<link rel="stylesheet" href="http://leaflet.github.io/Leaflet.markercluster/example/screen.css" />
<link rel="stylesheet" href="http://leaflet.github.io/Leaflet.markercluster/dist/MarkerCluster.css" />
<link rel="stylesheet" href="http://leaflet.github.io/Leaflet.markercluster/dist/MarkerCluster.Default.css" />
<script src="http://maps.api.2gis.ru/2.0/cluster_realworld.js"></script>
<div id="map" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function() {
        // загрузка кода модуля
        return DG.plugin('http://leaflet.github.io/Leaflet.markercluster/dist/leaflet.markercluster-src.js');
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
            <meta charset='utf-8' />
            <title>Кластеризатор</title>
            <script src="http://maps.api.2gis.ru/2.0/loader.js?pkg=full"
            data-id="dgLoader"></script>
            <link rel="stylesheet" href="http://leaflet.github.io/Leaflet.markercluster/example/screen.css" />
            <link rel="stylesheet" href="http://leaflet.github.io/Leaflet.markercluster/dist/MarkerCluster.css" />
            <link rel="stylesheet" href="http://leaflet.github.io/Leaflet.markercluster/dist/MarkerCluster.Default.css" />
            <script src="http://maps.api.2gis.ru/2.0/cluster_realworld.js"></script>
        </head>
        <body>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                DG.then(function() {
                    // загрузка кода модуля
                    return DG.plugin('http://leaflet.github.io/Leaflet.markercluster/dist/leaflet.markercluster-src.js');
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

Пример подключения тепловой карты. Тепловая карта позволяет визуализировать количественные данные в зависимости от географического региона. Интенсивность окраски каждого региона зависит от соответствующих ему значений. Код модуля и его документация доступна в <a href="https://github.com/Leaflet/Leaflet.heat" target="_blank">GitHub-репозитории</a> автора.

<script src="http://maps.api.2gis.ru/2.0/heat_realworld.js"></script>
<div id="map1" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function() {
        // загрузка кода модуля
        return DG.plugin('http://leaflet.github.io/Leaflet.heat/dist/leaflet-heat.js');
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
            <meta charset='utf-8' />
            <title>Тепловая карта</title>
            <script src="http://maps.api.2gis.ru/2.0/loader.js?pkg=full"
            data-id="dgLoader"></script>
            <script src="http://maps.api.2gis.ru/2.0/heat_realworld.js"></script>
        </head>
        <body>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                DG.then(function() {
                    // загрузка кода модуля
                    return DG.plugin('http://leaflet.github.io/Leaflet.heat/dist/leaflet-heat.js');
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