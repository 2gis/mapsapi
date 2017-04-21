## Работа с маркерами

{toc}

### Описание

Ниже приведены примеры использования маркеров. Маркер можно добавить на карту с помощью метода
<code>addTo()</code>, но если вы планируете работать с группой марекров, мы рекомендуем использовать для этого
<code>FeatureGroup</code> (смотрите разделы "Обработка событий группы маркеров" и "Отображение нескольких
маркеров и подстройка границ"). Для получения подробной информации о маркерах перейдите в раздел документации
<a href="/doc/maps/ru/manual/markers">Маркеры</a>.

### Маркер с попапом

Маркер, при клике на который открывается попап с информацией:

<script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
<div id="map" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function () {
        var map = DG.map('map', {
            center: [54.98, 82.89],
            zoom: 15
        });

        DG.marker([54.98, 82.89]).addTo(map).bindPopup('Я попап!');
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Маркер с попапом</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                DG.then(function() {
                    var map = DG.map('map', {
                        center: [54.98, 82.89],
                        zoom: 15
                    });

                    DG.marker([54.98, 82.89]).addTo(map).bindPopup('Я попап!');
                });
            </script>
        </body>
    </html>

### Перетаскиваемый маркер

Маркер, который пользователи могут перетаскивать:

Координаты маркера: <div id="location">54.981, 82.891</div>

<div id="map1" style="width: 100%; height: 400px;"></div>
<script type="text/javascript">
    var locationInfo = document.getElementById('location');
    DG.then(function () {
        var map,
            marker;

        map = DG.map('map1', {
            center: [54.981, 82.891],
            zoom: 15
        });

        marker = DG.marker([54.981, 82.891], {
            draggable: true
        }).addTo(map);

        marker.on('drag', function(e) {
            var lat = e.target._latlng.lat.toFixed(3),
                lng = e.target._latlng.lng.toFixed(3);

            locationInfo.innerHTML = lat + ', ' + lng;
        });
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Перетаскиваемый маркер</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            Координаты маркера: <div id="location">LatLng(54.98, 82.89)</div>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script type="text/javascript">
                var locationInfo = document.getElementById('location');

                DG.then(function () {
                    var map,
                        marker;

                    map = DG.map('map', {
                        center: [54.981, 82.891],
                        zoom: 15
                    });

                    marker = DG.marker([54.981, 82.891], {
                        draggable: true
                    }).addTo(map);

                    marker.on('drag', function(e) {
                        var lat = e.target._latlng.lat.toFixed(3),
                            lng = e.target._latlng.lng.toFixed(3);

                        locationInfo.innerHTML = lat + ', ' + lng;
                    });
                });
            </script>
        </body>
    </html>

### Маркер с пользовательской иконкой

Вы можете задать маркеру собственную иконку или простой элемент div вместо изображения:

<div id="map2" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function() {
        var map,
            myIcon,
            myDivIcon;

        map = DG.map('map2', {
            center: [54.98, 82.89],
            zoom: 13
        });

        myIcon = DG.icon({
            iconUrl: 'https://maps.api.2gis.ru/2.0/example_logo.png',
            iconSize: [48, 48]
        });
        DG.marker([54.98, 82.89], {
            icon: myIcon
        }).addTo(map);

        myDivIcon = DG.divIcon({
            iconSize: [70, 20],
            html: '<b style="color:blue;">HTML-код</b>'
        });
        DG.marker([54.98, 82.87], {
            icon: myDivIcon
        }).addTo(map);
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Маркер с пользовательской иконкой</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                DG.then(function() {
                    var map,
                        myIcon,
                        myDivIcon;

                    map = DG.map('map', {
                        center: [54.98, 82.89],
                        zoom: 13
                    });

                    myIcon = DG.icon({
                        iconUrl: 'https://maps.api.2gis.ru/2.0/example_logo.png',
                        iconSize: [48, 48]
                    });
                    DG.marker([54.98, 82.89], {
                        icon: myIcon
                    }).addTo(map);

                    myDivIcon = DG.divIcon({
                        iconSize: [70, 20],
                        html: '<b style="color:blue;">HTML-код</b>'
                    });
                    DG.marker([54.98, 82.87], {
                        icon: myDivIcon
                    }).addTo(map);
                });
            </script>
        </body>
    </html>

### Программное открытие маркера

Есть возможность открыть попап "по требованию". К примеру, по клику в ссылку или кнопку:

<button id='open-popup'>Открыть попап</button>
<div id="map3" style="width: 100%; height: 400px;"></div>
<script>
    var openPopupBtn = document.getElementById('open-popup');

    DG.then(function() {
        var map,
            marker;

        map = DG.map('map3', {
            center: [54.98, 82.89],
            zoom: 15
        });

        marker = DG.marker([54.98, 82.89]).addTo(map);
        marker.bindPopup('Я попап!');

        openPopupBtn.onclick = function() {
            marker.openPopup();
        }
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Программное открытие маркера</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <button id='open-popup'>Открыть попап</button>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                var openPopupBtn = document.getElementById('open-popup');

                DG.then(function() {
                    var map,
                        marker;

                    map = DG.map('map', {
                        center: [54.98, 82.89],
                        zoom: 15
                    });

                    marker = DG.marker([54.98, 82.89]).addTo(map);
                    marker.bindPopup('Я попап!');

                    openPopupBtn.onclick = function() {
                        marker.openPopup();
                    }
                });
            </script>
        </body>
    </html>

### Маркер с подсказкой

У маркера есть два вида подсказок, обычная и статическая. Оба варианта рассматриваются в следующем примере:

<div id="map4" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function() {
        var map = DG.map('map4', {
            center: [54.98, 82.89],
            zoom: 15
        });

        DG.marker([54.98, 82.89])
            .addTo(map)
            .bindLabel('Я статическая подсказка!', {
                static: true
            });

        DG.marker([54.98, 82.88])
            .addTo(map)
            .bindLabel('Я обычная подсказка!');
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Маркер с подсказкой</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                DG.then(function() {
                    var map = DG.map('map', {
                        center: [54.98, 82.89],
                        zoom: 15
                    });

                    DG.marker([54.98, 82.89])
                        .addTo(map)
                        .bindLabel('Я статическая подсказка!', {
                            static: true
                        });

                    DG.marker([54.98, 82.88])
                        .addTo(map)
                        .bindLabel('Я обычная подсказка!');
                });
            </script>
        </body>
    </html>

### Обработка событий группы маркеров

При клике в маркер, карта будет центрироваться по его позиции:

<div id="map5" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function() {
        var map,
            marker1,
            marker2,
            marker3,
            group;

        map = DG.map('map5', {
            center: [54.98, 82.89],
            zoom: 13
        });

        marker1 = DG.marker([54.96, 82.889]).addTo(map);
        marker2 = DG.marker([54.98, 82.893]).addTo(map);
        marker3 = DG.marker([54.99, 82.896]).addTo(map);

        group = DG.featureGroup([marker1, marker2, marker3]);
        group.addTo(map);
        group.on('click', function(e) {
            map.setView([e.latlng.lat, e.latlng.lng]);
        });
    });
</script>


    <!DOCTYPE html>
    <html>
        <head>
            <title>Обработка событий группы маркеров</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                DG.then(function() {
                    var map,
                        marker1,
                        marker2,
                        marker3,
                        group;

                    map = DG.map('map', {
                        center: [54.98, 82.89],
                        zoom: 13
                    });

                    marker1 = DG.marker([54.96, 82.889]).addTo(map);
                    marker2 = DG.marker([54.98, 82.893]).addTo(map);
                    marker3 = DG.marker([54.99, 82.896]).addTo(map);

                    group = DG.featureGroup([marker1, marker2, marker3]);
                    group.addTo(map);
                    group.on('click', function(e) {
                        map.setView([e.latlng.lat, e.latlng.lng]);
                    });
                });
            </script>
        </body>
    </html>

### Анимированное движение маркера

Пример маркера, который двигается по заданой траектории:
<div id="map6" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function() {
        var map,
            marker;

        map = DG.map('map6', {
            center: [54.98, 82.89],
            zoom: 13
        });

        marker = DG.marker([54.98, 82.89]).addTo(map);

        var increment = 0.001;

        function move() {
            if (!map.getBounds().contains(marker.getLatLng())) {
                increment *= -1;
            }

            var newLat = marker.getLatLng().lat + increment,
                newLng = marker.getLatLng().lng + increment;

            marker.setLatLng([newLat, newLng]);
        }

        setInterval(move, 60);
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Анимированное движение маркера</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                DG.then(function() {
                    var map,
                        marker;

                    map = DG.map('map', {
                        center: [54.98, 82.89],
                        zoom: 13
                    });

                    marker = DG.marker([54.98, 82.89]).addTo(map);

                    var increment = 0.001;

                    function move() {
                        if (!map.getBounds().contains(marker.getLatLng())) {
                            increment *= -1;
                        }

                        var newLat = marker.getLatLng().lat + increment,
                            newLng = marker.getLatLng().lng + increment;

                        marker.setLatLng([newLat, newLng]);
                    }

                    setInterval(move, 60);
                });
            </script>
        </body>
    </html>

### Отображение нескольких маркеров и подстройка границ

Пример отображения и скрытия группы маркеров с автоматическим определением рамок карты:

<input id="show" type="button" value="Показать маркеры" /><input id="hide" type="button" value="Скрыть маркеры" />
<div id="map7" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function() {
        var map,
            markers = DG.featureGroup(),
            coordinates = [];

        map = DG.map('map7', {
            center: [54.98, 82.89],
            zoom: 13
        });

        for (var i = 0; i < 100; i++) {
            coordinates[0] = 54.98 + Math.random();
            coordinates[1] = 82.89 + Math.random();
            DG.marker(coordinates).addTo(markers);
        }

        document.getElementById('hide').onclick = hideMarkers;
        document.getElementById('show').onclick = showMarkers;

        function showMarkers() {
            markers.addTo(map);
            map.fitBounds(markers.getBounds());
        };

        function hideMarkers() {
            markers.removeFrom(map);
        };
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Отображение/удаление нескольких маркеров, fitBounds</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <input id="hide" type="button" value="hide markers" />
            <input id="show" type="button" value="show markers" />
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
            DG.then(function() {
                var map,
                    markers = DG.featureGroup(),
                    coordinates = [];

                map = DG.map('map', {
                    center: [54.98, 82.89],
                    zoom: 13
                });

                for (var i = 0; i < 100; i++) {
                    coordinates[0] = 54.98 + Math.random();
                    coordinates[1] = 82.89 + Math.random();
                    DG.marker(coordinates).addTo(markers);
                }

                document.getElementById('hide').onclick = hideMarkers;
                document.getElementById('show').onclick = showMarkers;

                function showMarkers() {
                    markers.addTo(map);
                    map.fitBounds(markers.getBounds());
                };

                function hideMarkers() {
                    markers.removeFrom(map);
                };
            });
        </script>
        </body>
    </html>
