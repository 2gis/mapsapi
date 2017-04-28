## Базовое использование

{toc}

### Описание

Ниже приведены примеры базового использования карты. Для получения подробной информации о работе с картой воспользуйтесь
разделами документации <a href="/doc/maps/ru/manual/dg-loading">Подключение API</a> и <a href="/doc/maps/ru/manual/map">Карта</a>.

### Создание карты

<script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
<div id="map" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function() {
        DG.map('map', {
            center: [54.98, 82.89],
            zoom: 13
        });
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Создание карты</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                DG.then(function() {
                    DG.map('map', {
                        center: [54.98, 82.89],
                        zoom: 13
                    });
                });
            </script>
        </body>
    </html>

### Создание карты по требованию

Инициализация карты по требованию (удобно при отображении карты во всплывающем окне):
<input id="create" type="button" value="Показать карту" />
<div id="mapBlock"></div>
<script>
    var createButton = document.getElementById('create');

    createButton.onclick = function() {
        var container = document.createElement('div'),
            mapBlock = document.getElementById('mapBlock');

        container.id = 'map1';
        container.style.width = '100%';
        container.style.height = '400px';
        mapBlock.appendChild(container);

        DG.then(function(){
            DG.map('map1', {
                center: [54.98, 82.89],
                zoom: 13
            });
        });

        createButton.onclick = null;
    }
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Создание карты по требованию</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js?lazy=true"></script>
        </head>
        <body>
            <input id="create" type="button" value="Показать карту" />
            <div id="mapBlock"></div>
            <script>
                var createButton = document.getElementById('create');

                createButton.onclick = function() {
                    var container = document.createElement('div'),
                        mapBlock = document.getElementById('mapBlock');

                    container.id = 'map';
                    container.style.width = '100%';
                    container.style.height = '400px';
                    mapBlock.appendChild(container);

                    DG.then(function(){
                        DG.map('map', {
                            center: [54.98, 82.89],
                            zoom: 13
                        });
                    });
                }
            </script>
        </body>
    </html>

### Использование опций подключения

Ниже представлен пример вызова карты с таким набором опций: <code>pkg=basic</code>, <code>skin=light</code>. Как
результат мы получим сборку с базовой функциональностью в светлой теме. Все возможные опции можно посмотреть в разделе
<a href="/doc/maps/ru/manual/dg-loading#опцииподключения">Опции подключения</a>.

    <!DOCTYPE html>
    <html>
        <head>
            <title>Использование опций подключения</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js?pkg=basic&skin=light"></script>
        </head>
        <body>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                DG.then(function() {
                    DG.map('map', {
                        center: [54.98, 82.89],
                        zoom: 13
                    });
                });
            </script>
        </body>
    </html>

### Изменение размера карты

При клике на кнопку изменяется размер контейнера и карта подстраивается под новый размер:
<input id="changeSize" type="button" value="Изменить размер" />
<div id="map3" style="width: 100%; height: 200px;"></div>
<script>
    var changeSizeButton = document.getElementById('changeSize');

    DG.then(function() {
        var map,
            enabled = false;

        map = DG.map('map3', {
            center: [54.98, 82.89],
            zoom: 15,
            animate: true
        });

        changeSizeButton.onclick = function() {
            var mapDiv = document.getElementById('map3');
            mapDiv.style.height = (enabled ? '200' : '400') + 'px';
            enabled = !enabled;
            map.invalidateSize();
        }
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Изменение размера карты</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <input id="changeSize" type="button" value="Изменить размер" />
            <div id="map" style="width: 100%; height: 200px;"></div>
            <script>
                var changeSizeButton = document.getElementById('changeSize');

                DG.then(function() {
                    var map,
                        enabled = false;

                    map = DG.map('map', {
                        center: [54.98, 82.89],
                        zoom: 15,
                        animate: true
                    });

                    changeSizeButton.onclick = function() {
                        var mapDiv = document.getElementById('map');
                        mapDiv.style.height = (enabled ? '200' : '400') + 'px';
                        // обновление карты
                        map.invalidateSize();
                    }
                });
            </script>
        </body>
    </html>

### Отключение опций взаимодействия

Пример отображения статической карты:

<div id="map4" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function() {
        DG.map('map4', {
            center: [54.98, 82.89],
            zoom: 13,
            dragging : false,
            touchZoom: false,
            scrollWheelZoom: false,
            doubleClickZoom: false,
            boxZoom: false,
            geoclicker: false,
            zoomControl: false,
            fullscreenControl: false
        });
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Отключение опций взаимодействия</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                DG.then(function() {
                    DG.map('map', {
                        center: [54.98, 82.89],
                        zoom: 13,
                        dragging : false,
                        touchZoom: false,
                        scrollWheelZoom: false,
                        doubleClickZoom: false,
                        boxZoom: false,
                        geoclicker: false,
                        zoomControl: false,
                        fullscreenControl: false
                    });
                });
            </script>
        </body>
    </html>

### Определение местоположения пользователя

Пример определения географического расположения пользователя:

<div id="map5" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function() {
        var map;

        map = DG.map('map5', {
            center: [54.98, 82.89],
            zoom: 13
        });

        map.locate({setView: true, watch: true})
            .on('locationfound', function(e) {
                DG.marker([e.latitude, e.longitude]).addTo(map);
            })
            .on('locationerror', function(e) {
                DG.popup()
                  .setLatLng(map.getCenter())
                  .setContent('Доступ к определению местоположения отключён')
                  .openOn(map);
            });
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Определение местоположения пользователя</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                DG.then(function() {
                    var map;

                    map = DG.map('map', {
                        center: [54.98, 82.89],
                        zoom: 13
                    });

                    map.locate({setView: true, watch: true})
                        .on('locationfound', function(e) {
                            DG.marker([e.latitude, e.longitude]).addTo(map);
                        })
                        .on('locationerror', function(e) {
                            DG.popup()
                              .setLatLng(map.getCenter())
                              .setContent('Доступ к определению местоположения отключён')
                              .openOn(map);
                        });
                });
            </script>
        </body>
    </html>
