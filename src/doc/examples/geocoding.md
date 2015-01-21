## Работа с API геоданных

{toc}

### Описание

Ниже приведены примеры работы с геокодером 2ГИС при помощи AJAX-запросов. Для получения подробной информации о работе с AJAX перейдите в раздел документации <a href="/doc/maps/manual/ajax">AJAX-запросы</a>. Для получения информации о геокодере перейдите в раздел документации [API геоданных](http://api.2gis.ru/doc/geo/search/).

### Прямое геокодирование

Определение координат объекта по его адресу:

<script src="http://maps.api.2gis.ru/2.0/loader.js" data-id="dgLoader"></script>
<div id="map" style="width: 100%; height: 400px;"></div>
<script type="text/javascript">
    DG.then(function () {

            var map, point, lat, lng, marker;

            map = DG.map('map', {
                center: [54.9802, 82.8980],
                zoom: 18
            });

            DG.ajax({
                url: 'http://catalog.api.2gis.ru/geo/search',
                data: {
                    key: 'ruxlih0718',
                    version: 1.3,
                    q: 'Москва, Красная площадь, 2'
                },
                type: 'GET',
                success: function(data) {
                    if(typeof marker !== 'undefined') {
                        map.removeLayer(marker);
                    }
                    // считываем строку в WKT-формате и возвращаем объект Point
                    point = DG.Wkt.toPoints(data.result[0].centroid);
                    // извлекаем координаты для маркера
                    lng = point[0];
                    lat = point[1];
                    // создаем и добавляем маркер на карту
                    marker = DG.marker([lat, lng]);
                    map.addLayer(marker);
                    // центрируем карту в координаты маркера
                    map.panTo([lat, lng]);
                },
                error: function(error) {
                    console.log(error);
                }
            });
        });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <script src="http://maps.api.2gis.ru/2.0/loader.js?"
            data-id="dgLoader"></script>
        </head>

        <body>
            <div id="map" style="width:100%; height:400px"></div>
            <script type="text/javascript">
                DG.then(function () {
                    var map, point, lat, lng, marker;

                    map = DG.map('map', {
                        center: [54.9802, 82.8980],
                        zoom: 18
                    });

                    DG.ajax({
                        url: 'http://catalog.api.2gis.ru/geo/search',
                        data: {
                            key: '12345',
                            version: 1.3,
                            q: 'Москва, Красная площадь, 2'
                        },
                        type: 'GET',
                        success: function(data) {
                            if(typeof marker !== 'undefined') {
                                map.removeLayer(marker);
                            }
                            // считываем строку в WKT-формате и возвращаем объект Point
                            point = DG.Wkt.toPoints(data.result[0].centroid);
                            // извлекаем координаты для маркера
                            lng = point[0];
                            lat = point[1];
                            // создаем и добавляем маркер на карту
                            marker = DG.marker([lat, lng]);
                            map.addLayer(marker);
                            // центрируем карту в координаты маркера
                            map.panTo([lat, lng]);
                        },
                        error: function(error) {
                            console.log(error);
                        }
                    });
                });
            </script>
        </body>
    </html>

### Обратное геокодирование

Получение информации об объекте по его координатам:

<div id="map1" style="width:100%; height:400px"></div>
<script type="text/javascript">
    DG.then(function () {
        var map,
            latLng = [55.752517, 37.623349];

        map = DG.map('map1', {
            center: latLng,
            zoom: 18
        });

        DG.ajax({
            url: 'http://catalog.api.2gis.ru/geo/search',
            data: {
                key: 'ruxlih0718',
                version: 1.3,
                q: latLng[1] + ',' + latLng[0]
            },
            success: function(data) {
                var marker = DG.marker(latLng),
                    text = data.result[0].name + '.<br />';

                text += data.result[0].attributes.buildingname;
                marker.bindPopup(text);
                marker.addTo(map);
            },
            error: function(error) {
                console.log(error);
            }
        });
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <script src="http://maps.api.2gis.ru/2.0/loader.js"
            data-id="dgLoader"></script>
        </head>

        <body>
            <div id="map" style="width:100%; height:400px"></div>
            <script>
                DG.then(function () {
                    var map,
                        latLng = [55.752517, 37.623349];

                    map = DG.map('map', {
                        center: latLng,
                        zoom: 18
                    });

                    DG.ajax({
                        url: 'http://catalog.api.2gis.ru/geo/search',
                        data: {
                            key: '12345',
                            version: 1.3,
                            q: latLng[1] + ',' + latLng[0]
                        },
                        success: function(data) {
                            var marker = DG.marker(latLng),
                                text = data.result[0].name + '.<br />';

                            text += data.result[0].attributes.buildingname;
                            marker.bindPopup(text);
                            marker.addTo(map);
                        },
                        error: function(error) {
                            console.log(error);
                        }
                    });
                });
            </script>
        </body>
    </html>

### Поиск геообъектов

Поиск станций метро в радиусе 250 м. вокруг заданной точки:

<div id="map2" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function () {
        var map, point,
            latLng = [55.751288, 37.607741];

        map = DG.map('map2', {
            center: latLng,
            zoom: 17
        });

        DG.ajax({
            url: 'http://catalog.api.2gis.ru/geo/search',
            data: {
                key: 'ruxlih0718',
                version: 1.3,
                q: latLng[1] + ',' + latLng[0],
                types: 'metro',
                radius: 250,
                limit: 100
            },
            success: function(data) {
                data.result.forEach(function(metro) {
                    // считываем строку в WKT-формате
                    point = DG.Wkt.toPoints(metro.centroid);
                    // извлекаем координаты для маркера
                    var lng = point[0];
                    var lat = point[1];
                    // создаем и добавляем маркер на карту
                    marker = DG.marker([lat, lng]);
                    marker.bindPopup(metro.name);
                    map.addLayer(marker);
                });
            },
            error: function(error) {
                console.log(error);
            }
        });
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <script src="http://maps.api.2gis.ru/2.0/loader.js"
            data-id="dgLoader"></script>
        </head>

        <body>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                DG.then(function () {
                    var map, point,
                        latLng = [55.751288, 37.607741];

                    map = DG.map('map', {
                        center: latLng,
                        zoom: 17
                    });

                    DG.ajax({
                        url: 'http://catalog.api.2gis.ru/geo/search',
                        data: {
                            key: '12345',
                            version: 1.3,
                            q: latLng[1] + ',' + latLng[0],
                            types: 'metro',
                            radius: 250,
                            limit: 100
                        },
                        success: function(data) {
                            data.result.forEach(function(metro) {
                                // считываем строку в WKT-формате
                                point = DG.Wkt.toPoints(metro.centroid);
                                // извлекаем координаты для маркера
                                var lng = point[0];
                                var lat = point[1];
                                // создаем и добавляем маркер на карту
                                marker = DG.marker([lat, lng]);
                                marker.bindPopup(metro.name);
                                map.addLayer(marker);
                            });
                        },
                        error: function(error) {
                            console.log(error);
                        }
                    });
                });
            </script>
        </body>
    </html>
