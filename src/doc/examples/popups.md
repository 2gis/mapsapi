## Работа с балунами

{toc}

### Описание

Ниже приведены примеры использования балунов. Для получения подробной информации перейдите в раздел документации [Балуны](/doc/maps/manual/popups).

### Открытие балуна при клике на маркер

<script src="http://maps.api.2gis.ru/2.0/loader.js"></script>
<div id="map" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function () {
        var map = DG.map('map', {
            center: [54.98, 82.89],
            zoom: 15
        });

        DG.marker([54.98, 82.89]).addTo(map).bindPopup('Я балун!');
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8" />
            <title>Открытие балуна при клике на маркер</title>
            <script src="http://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                DG.then(function() {
                    var map = DG.map('map', {
                        center: [54.98, 82.89],
                        zoom: 15
                    });

                    DG.marker([54.98, 82.89]).addTo(map).bindPopup('Я балун!');
                });
            </script>
        </body>
    </html>

### Открытие балуна по умолчанию и по требованию

<input id="showPopup" type="button" value="Открыть балун" />
<div id="map1" style="width: 100%; height: 400px;"></div>
<script>
    var showButton = document.getElementById('showPopup');

    DG.then(function() {
        var map,
            myPopUp;

        map = DG.map('map1', {
            center: [54.98, 82.89],
            zoom: 13
        });

        DG.popup([54.98, 82.89])
            .setLatLng([54.98, 82.89])
            .setContent('Я открыт по умолчанию')
            .openOn(map);

        myPopUp = DG.popup()
            .setLatLng([54.98, 82.89])
            .setContent('Я открылся по требованию и закрыл прошлый балун!');

        showButton.onclick = function() {myPopUp.openOn(map)};
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8" />
            <title>Открытие балуна по умолчанию и по требованию</title>
            <script src="http://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <input id="showPopup" type="button" value="Открыть балун" />
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                var showButton = document.getElementById('showPopup');

                DG.then(function() {
                    var map,
                        myPopUp;

                    map = DG.map('map', {
                        center: [54.98, 82.89],
                        zoom: 13
                    });

                    DG.popup([54.98, 82.89])
                        .setLatLng([54.98, 82.89])
                        .setContent('Я открыт по умолчанию')
                        .openOn(map);

                    myPopUp = DG.popup()
                        .setLatLng([54.98, 82.89])
                        .setContent('Я открылся по требованию и закрыл прошлый балун!');

                    showButton.onclick = function() {myPopUp.openOn(map)};
                });
            </script>
        </body>
    </html>

### Добавление нескольких балунов на карту

<div id="map2" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function() {
        var map,
            popups = DG.featureGroup(),
            coordinates = [];

        map = DG.map('map2', {
            center: [54.98, 82.89],
            zoom: 13
        });

        for (var i = 0; i < 10; i++) {
            coordinates[0] = 54.98 - Math.random();
            coordinates[1] = 82.89 + Math.random();
            DG.popup()
                .setLatLng(coordinates)
                .setContent('Я балун №' + i)
                .addTo(popups);
        }

        popups.addTo(map);
        map.fitBounds(popups.getBounds());
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8" />
            <title>Добавление нескольких балунов на карту</title>
            <script src="http://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                DG.then(function() {
                    var map,
                        popups = DG.featureGroup(),
                        coordinates = [];

                    map = DG.map('map', {
                        center: [54.98, 82.89],
                        zoom: 13
                    });

                    // создаем 10 балунов в случайных местах и добавляем их в группу
                    for (var i = 0; i < 10; i++) {
                        coordinates[0] = 54.98 - Math.random();
                        coordinates[1] = 82.89 + Math.random();
                        DG.popup()
                            .setLatLng(coordinates)
                            .setContent('Я балун №' + i)
                            .addTo(popups);
                    }

                    popups.addTo(map);

                    // фокусируем область видимости на балунах
                    map.fitBounds(popups.getBounds());
                });
            </script>
        </body>
    </html>

### Поведение балуна с параметром sprawling

<div id="map3" style="width: 300px; height: 150px;"></div>
<input style="width: 300px;" type="button" id="sprawling" value="Балун с включенным параметром sprawling"><br />
<input style="width: 300px;" type="button" id="no-sprawling" value="Балун без параметра sprawling"><br />
<input style="width: 300px;" type="button" id="minWidth" value="Балун с минимальной шириной 320px">
<script>
    DG.then(function () {
        var latLng = DG.latLng([54.98, 82.89]),
            map = DG.map('map3', {
                center: latLng,
                zoom: 13,
                fullscreenControl: false,
                zoomControl: false
            });

        document.getElementById('sprawling').onclick = function () {
            DG.popup({
                maxWidth: 350,
                sprawling: true
            })
            .setLatLng(latLng)
            .setContent('Я балун!')
            .openOn(map);
        };

        document.getElementById('no-sprawling').onclick = function () {
            DG.popup({
                maxWidth: 350
            })
            .setLatLng(latLng)
            .setContent('Я балун!')
            .openOn(map);
        };

        document.getElementById('minWidth').onclick = function () {
            DG.popup({
                maxWidth: 350,
                minWidth: 320
            })
            .setLatLng(latLng)
            .setContent('Я балун!')
            .openOn(map);
        };
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>Поведение балуна с параметром sprawling</title>
            <script src="http://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <div id="map" style="width: 300px; height: 150px;"></div>
            <input style="width: 300px;" type="button" id="sprawling" value="Балун с включенным параметром sprawling"><br />
            <input style="width: 300px;" type="button" id="no-sprawling" value="Балун без параметра sprawling"><br />
            <input style="width: 300px;" type="button" id="minWidth" value="Балун с минимальной шириной 320px">
            <script>
                DG.then(function () {
                    var latLng = DG.latLng([54.98, 82.89]),
                        map;

                    // проинициализируем карту с шириной 300 пикселей
                    map = DG.map('map', {
                        center: latLng,
                        zoom: 13,
                        fullscreenControl: false,
                        zoomControl: false
                    });

                    // балун с включенным параметром sprawling
                    // растянется до границ карты
                    document.getElementById('sprawling').onclick = function () {
                        DG.popup({
                            maxWidth: 350,
                            sprawling: true
                        })
                        .setLatLng(latLng)
                        .setContent('Я балун!')
                        .openOn(map);
                    };

                    // балун без параметра sprawling
                    // подстроится под ширину контента
                    document.getElementById('no-sprawling').onclick = function () {
                        DG.popup({
                            maxWidth: 350
                        })
                        .setLatLng(latLng)
                        .setContent('Я балун!')
                        .openOn(map);
                    };

                    // балун с минимальной шириной 320px
                    // залезет за границу карты
                    document.getElementById('minWidth').onclick = function () {
                        DG.popup({
                            maxWidth: 350,
                            minWidth: 320
                        })
                        .setLatLng(latLng)
                        .setContent('Я балун!')
                        .openOn(map);
                    };
                });
            </script>
        </body>
    </html>
