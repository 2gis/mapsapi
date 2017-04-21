## Работа с попапами

{toc}

### Описание

Ниже приведены примеры использования попапов. Для получения подробной информации перейдите в раздел документации
<a href="/doc/maps/ru/manual/popup">Попапы</a>.

### Открытие попапа при клике на маркер

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
            <title>Открытие попапа при клике на маркер</title>
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

### Открытие попапа по умолчанию и по требованию

<input id="showPopup" type="button" value="Открыть попап" />
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
            .setContent('Я открылся по требованию и закрыл прошлый попап!');

        showButton.onclick = function() {myPopUp.openOn(map)};
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Открытие попапа по умолчанию и по требованию</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <input id="showPopup" type="button" value="Открыть попап" />
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
                        .setContent('Я открылся по требованию и закрыл прошлый попап!');

                    showButton.onclick = function() {myPopUp.openOn(map)};
                });
            </script>
        </body>
    </html>

### Добавление нескольких попапов на карту

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
                .setContent('Я попап №' + i)
                .addTo(popups);
        }

        popups.addTo(map);
        map.fitBounds(popups.getBounds());
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Добавление нескольких попапов на карту</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
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

                    // создаем 10 попапов в случайных местах и добавляем их в группу
                    for (var i = 0; i < 10; i++) {
                        coordinates[0] = 54.98 - Math.random();
                        coordinates[1] = 82.89 + Math.random();
                        DG.popup()
                            .setLatLng(coordinates)
                            .setContent('Я попап №' + i)
                            .addTo(popups);
                    }

                    popups.addTo(map);

                    // фокусируем область видимости на попапах
                    map.fitBounds(popups.getBounds());
                });
            </script>
        </body>
    </html>

### Поведение попапа с параметром sprawling

<div id="map3" style="width: 300px; height: 150px;"></div>
<input style="width: 300px;" type="button" id="sprawling" value="Попап с включенным параметром sprawling"><br />
<input style="width: 300px;" type="button" id="no-sprawling" value="Попап без параметра sprawling"><br />
<input style="width: 300px;" type="button" id="minWidth" value="Попап с минимальной шириной 320px">
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
            .setContent('Я попап!')
            .openOn(map);
        };

        document.getElementById('no-sprawling').onclick = function () {
            DG.popup({
                maxWidth: 350
            })
            .setLatLng(latLng)
            .setContent('Я попап!')
            .openOn(map);
        };

        document.getElementById('minWidth').onclick = function () {
            DG.popup({
                maxWidth: 350,
                minWidth: 320
            })
            .setLatLng(latLng)
            .setContent('Я попап!')
            .openOn(map);
        };
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Поведение попапа с параметром sprawling</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <div id="map" style="width: 300px; height: 150px;"></div>
            <input style="width: 300px;" type="button" id="sprawling" value="Попап с включенным параметром sprawling"><br />
            <input style="width: 300px;" type="button" id="no-sprawling" value="Попап без параметра sprawling"><br />
            <input style="width: 300px;" type="button" id="minWidth" value="Попап с минимальной шириной 320px">
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

                    // попап с включенным параметром sprawling
                    // растянется до границ карты
                    document.getElementById('sprawling').onclick = function () {
                        DG.popup({
                            maxWidth: 350,
                            sprawling: true
                        })
                        .setLatLng(latLng)
                        .setContent('Я попап!')
                        .openOn(map);
                    };

                    // попап без параметра sprawling
                    // подстроится под ширину контента
                    document.getElementById('no-sprawling').onclick = function () {
                        DG.popup({
                            maxWidth: 350
                        })
                        .setLatLng(latLng)
                        .setContent('Я попап!')
                        .openOn(map);
                    };

                    // попап с минимальной шириной 320px
                    // выйдет за границы карты
                    document.getElementById('minWidth').onclick = function () {
                        DG.popup({
                            maxWidth: 350,
                            minWidth: 320
                        })
                        .setLatLng(latLng)
                        .setContent('Я попап!')
                        .openOn(map);
                    };
                });
            </script>
        </body>
    </html>
