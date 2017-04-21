## Работа с векторными слоями

{toc}

### Описание

Ниже приведены базовые примеры использования геометрических объектов. Для получения подробной информации о работе
с векторными слоями воспользуйтесь разделом документации <a href="/doc/maps/ru/manual/vector-layers">Векторные слои</a>.

### Отображение ломаной

<script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
<div id="map" style="width: 100%; height: 500px;"></div>
<script>
    DG.then(function() {
        var map,
            coordinates,
            polyline;

        map = DG.map('map', {
            center: [55.036446, 82.897983],
            zoom: 11
        });

        coordinates = [[55.069288, 82.991367], [55.069288, 82.816615], [55.011648, 82.902103], [54.944714, 82.903152], [54.928935, 82.850967], [54.928541, 82.976280], [54.944517, 82.916541], [55.011704, 82.916885], [55.056508, 82.973514], [55.056508, 82.835498], [55.056705, 82.973857], [55.069288, 82.991367], [55.069288, 82.941928], [55.097193, 82.959094], [55.046282, 82.919956], [55.045692, 82.904163], [55.036446, 82.897983], [55.029756, 82.907596], [55.018932, 82.903819], [55.029362, 82.914119], [55.030543, 82.927165], [55.037823, 82.933345], [55.045101, 82.925105], [55.069681, 82.941928]];

        // создаем ломаную из массива географических точек
        polyline = DG.polyline(coordinates, {color: 'blue'}).addTo(map);

        // подстраиваем центр карты и масштаб так, чтобы ломаную было видно
        map.fitBounds(polyline.getBounds());
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Отображение ломаной</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <div id="map" style="width: 100%; height: 500px;"></div>
            <script>
                DG.then(function() {
                    var map,
                        coordinates,
                        polyline;

                    map = DG.map('map', {
                        center: [55.036446, 82.897983],
                        zoom: 11
                    });

                    coordinates = [[55.069288, 82.991367], [55.069288, 82.816615], [55.011648, 82.902103], [54.944714, 82.903152], [54.928935, 82.850967], [54.928541, 82.976280], [54.944517, 82.916541], [55.011704, 82.916885], [55.056508, 82.973514], [55.056508, 82.835498], [55.056705, 82.973857], [55.069288, 82.991367], [55.069288, 82.941928], [55.097193, 82.959094], [55.046282, 82.919956], [55.045692, 82.904163], [55.036446, 82.897983], [55.029756, 82.907596], [55.018932, 82.903819], [55.029362, 82.914119], [55.030543, 82.927165], [55.037823, 82.933345], [55.045101, 82.925105], [55.069681, 82.941928]];

                    // создаем ломаную из массива географических точек
                    polyline = DG.polyline(coordinates, {
                        color: 'blue'
                    }).addTo(map);

                    // подстраиваем центр карты и масштаб, чтобы ломаную было видно
                    map.fitBounds(polyline.getBounds());
                });
            </script>
        </body>
    </html>

### Отображение прямоугольников

<div id="map1" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function() {
        var map,
            coords1 = [[54.98, 82.87], [54.975, 82.91]],
            coords2 = [[54.985, 82.87], [54.982, 82.91]],
            coords3 = [[54.99, 82.87], [54.987, 82.91]],
            rectangles = DG.featureGroup();

        map = DG.map('map1', {
            center: [54.98, 82.89],
            zoom: 14
        });

        // Добавление прямоугольников в группу
        DG.rectangle(coords1, {color: "blue"}).addTo(rectangles);
        DG.rectangle(coords2, {color: "red"}).addTo(rectangles);
        DG.rectangle(coords3, {color: "green"}).addTo(rectangles);

        // Добавление группы на карту
        rectangles.addTo(map);

        // Подстройка границ карты
        map.fitBounds(rectangles.getBounds());
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Отображение прямоугольников</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                DG.then(function() {
                    var map,
                        coords1 = [[54.98, 82.87], [54.975, 82.91]],
                        coords2 = [[54.985, 82.87], [54.982, 82.91]],
                        coords3 = [[54.99, 82.87], [54.987, 82.91]],
                        rectangles = DG.featureGroup();

                    map = DG.map('map', {
                        center: [54.98, 82.89],
                        zoom: 14
                    });

                    // Добавление прямоугольников в группу
                    DG.rectangle(coords1, {color: "blue"}).addTo(rectangles);
                    DG.rectangle(coords2, {color: "red"}).addTo(rectangles);
                    DG.rectangle(coords3, {color: "green"}).addTo(rectangles);

                    // Добавление группы на карту
                    rectangles.addTo(map);

                    // Подстройка границ карты
                    map.fitBounds(rectangles.getBounds());
                });
            </script>
        </body>
    </html>

### Отображение многоугольников

<div id="map2" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function() {
        var map,
            coords1 = [
                [54.98, 82.87],
                [54.975, 82.91],
                [54.974, 82.915],
                [54.971, 82.918],
                [54.970, 82.921]
            ],
            coords2 = [
                [54.985, 82.875],
                [54.98, 82.96],
                [54.979, 82.92],
                [54.976, 82.923]
            ],
            coords3 = [
                [54.99, 82.88],
                [54.985, 82.971],
                [54.984, 82.925],
                [54.981, 82.928],
                [54.980, 82.931]
            ],
            polygons = DG.featureGroup();

        map = DG.map('map2', {
            center: [54.98, 82.89],
            zoom: 13
        });

        DG.polygon(coords1, {color: "blue"}).addTo(polygons);
        DG.polygon(coords2, {color: "red"}).addTo(polygons);
        DG.polygon(coords3, {color: "green"}).addTo(polygons);

        polygons.addTo(map);
        map.fitBounds(polygons.getBounds());
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Отображение многоугольников</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                DG.then(function() {
                    var map,
                        coords1 = [
                            [54.98, 82.87],
                            [54.975, 82.91],
                            [54.974, 82.915],
                            [54.971, 82.918],
                            [54.970, 82.921]
                        ],
                        coords2 = [
                            [54.985, 82.875],
                            [54.98, 82.96],
                            [54.979, 82.92],
                            [54.976, 82.923]
                        ],
                        coords3 = [
                            [54.99, 82.88],
                            [54.985, 82.971],
                            [54.984, 82.925],
                            [54.981, 82.928],
                            [54.980, 82.931]
                        ],
                        polygons = DG.featureGroup();

                    map = DG.map('map', {
                        center: [54.98, 82.89],
                        zoom: 13
                    });

                    // Добавление многоугольников в группу
                    DG.polygon(coords1, {color: "blue"}).addTo(polygons);
                    DG.polygon(coords2, {color: "red"}).addTo(polygons);
                    DG.polygon(coords3, {color: "green"}).addTo(polygons);

                    // Добавление группы на карту
                    polygons.addTo(map);

                    // Подстройка границ карты
                    map.fitBounds(polygons.getBounds());
                });
            </script>
        </body>
    </html>

### Отображение окружности и круглого маркера

<div id="map3" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function() {
        var map = DG.map('map3', {
            center: [54.98, 82.89],
            zoom: 14
        });

        DG.circle([54.98, 82.89], 200, {color: 'red'}).addTo(map);
        DG.circleMarker([54.985, 82.89]).setRadius(100).addTo(map);
    })
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Отображение круга и круглого маркера</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                DG.then(function() {
                    var map = DG.map('map', {
                        center: [54.98, 82.89],
                        zoom: 14
                    });

                    DG.circle([54.98, 82.89], 200, {color: 'red'}).addTo(map);
                    DG.circleMarker([54.985, 82.89]).setRadius(100).addTo(map);
                })
            </script>
        </body>
    </html>

### Векторные слои с подсказками и попапами

<div id="map4" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function() {
        var map = DG.map('map4', {
            center: [54.98, 82.89],
            zoom: 14
        });

        DG.circle([54.98, 82.87], 200, {color: 'red'})
            .bindPopup('Я круг.')
            .bindLabel('нажми на круг')
            .addTo(map);

        DG.circleMarker([54.985, 82.89])
            .bindPopup('Я круглый маркер')
            .bindLabel('Нажми на круглый маркер')
            .setRadius(100)
            .addTo(map);

        DG.rectangle(
            [[54.98, 82.87], [54.975, 82.91]],
            {color: 'green'})
            .bindPopup('Я прямоугольник')
            .bindLabel('Нажми на прямоугольник')
            .addTo(map);

        DG.polygon(
            [[54.985, 82.875], [54.98, 82.96], [54.979, 82.92]],
            {color: 'yellow'})
            .bindPopup('Я многоугольник')
            .bindLabel('Нажми на многоугольник')
            .addTo(map);
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Векторные слои с подсказками и попапами</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                DG.then(function() {
                    var map = DG.map('map', {
                        center: [54.98, 82.89],
                        zoom: 14
                    });

                    DG.circle([54.98, 82.87], 200, {color: 'red'})
                        .bindPopup('Я круг')
                        .bindLabel('Нажми на круг')
                        .addTo(map);

                    DG.circleMarker([54.985, 82.89])
                        .bindPopup('Я круглый маркер')
                        .bindLabel('Нажми на круглый маркер')
                        .setRadius(100)
                        .addTo(map);

                    DG.rectangle(
                        [[54.98, 82.87], [54.975, 82.91]],
                        {color: 'green'})
                        .bindPopup('Я прямоугольник')
                        .bindLabel('Нажми на прямоугольник')
                        .addTo(map);

                    DG.polygon(
                        [[54.985, 82.875], [54.98, 82.96], [54.979, 82.92]],
                        {color: 'yellow'})
                        .bindPopup('Я многоугольник')
                        .bindLabel('Нажми на многоугольник')
                        .addTo(map);
                });
            </script>
        </body>
    </html>

### Анимация отрисовки ломаной

<input id="playAnimation" type="button" value="Запустить анимацию" />
<div id="map5" style="width: 100%; height: 400px;"></div>
<script>
    var playAnimationButton = document.getElementById('playAnimation'); 

    DG.then(function() {
        var map = DG.map('map5', {
            center: [54.98, 82.94],
            zoom: 13
        });

        playAnimation.onclick = function() {
            var polyline = DG.polyline([]).addTo(map),
                counter = 0;

            (function draw() {
                polyline.addLatLng([54.98, 82.89 + counter / 10000]);

                if (++counter < 1000) {
                    window.setTimeout(draw, 10);
                } else {
                    counter = 0;
                    draw();
                };
            })();
        }
    })
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Анимация отрисовки ломаной</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <input id="playAnimation" type="button" value="Запустить анимацию" />
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                var playAnimationButton = document.getElementById('playAnimation'); 

                DG.then(function() {
                    var map = DG.map('map', {
                        center: [54.98, 82.94],
                        zoom: 13
                    });

                    playAnimation.onclick = function() {
                        var polyline = DG.polyline([]).addTo(map),
                            counter = 0;

                        (function draw() {
                            polyline.addLatLng([54.98, 82.89 + counter / 10000]);

                            if (++counter < 1000) {
                                window.setTimeout(draw, 10);
                            } else {
                                counter = 0;
                                draw();
                            };
                        })();
                    }
                })
            </script>
        </body>
    </html>
