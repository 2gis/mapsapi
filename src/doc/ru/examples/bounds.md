## Работа с границами карты

{toc}

### Описание

Ниже приведены примеры ограничения границ карты и уровней масштабирования. Для получения подробной информации о работе
с картой воспользуйтесь разделом документации <a href="/doc/maps/ru/manual/map">Карта</a>.

### Ограничение границ и масштаба

Ограничение просматриваемой области границами города Новосибирск, а также уровней масштабирования диапазоном от 10 до 15:

<script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
<div id="map" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function() {
        DG.map('map', {
            center: [54.98, 82.89],
            zoom: 10,
            maxBounds: [
                [54.8220, 82.4304],
                [55.1372, 83.3505]
            ],
            minZoom: 10,
            maxZoom: 15
        });
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Ограничение границ и масштаба</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                DG.then(function() {
                    DG.map('map', {
                        center: [54.98, 82.89],
                        zoom: 10,
                        maxBounds: [
                            [54.8220, 82.4304],
                            [55.1372, 83.3505]
                        ],
                        minZoom: 10,
                        maxZoom: 15
                    });
                });
            </script>
        </body>
    </html>

<!--
### Карта с панелью

После инициализации карты её центр подстраивается таким образом, чтобы центр Москвы был посередине видимой области
(с учетом левой панели):

<style>
    #container {
        height:400px;
        position: relative;
    }
    #content {
        position: absolute;
        background:#000;
        background:rgba(51,51,51,.9);
        width:200px;
        height: 400px;
        z-index: 1000;
    }
</style>
<div id='container'>
    <div id='content'></div>
    <div id="map1" style="width: 100%; height: 400px;"></div>
</div>
<script>
    DG.then(function() {
        var map;
        map = DG.map('map1', {
            center: [55.753559, 37.609218],
            zoom: 10,
            zoomControl: false,
            fullscreenControl: false
        });
        DG.control.zoom({position: 'topright'}).addTo(map);
        map.fitBounds(map.getBounds(), {
            paddingTopLeft: [200, 0]
        });
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Карта с левой панелью</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
            <style>
                #container {
                    height:400px;
                    position: relative;
                }
                #content {
                    position: absolute;
                    background:#000;
                    background:rgba(51,51,51,.9);
                    width:200px;
                    height: 400px;
                    z-index: 1000;
                }
            </style>
        </head>
        <body>
            <div id='container'>
                <div id='content'></div>
                <div id="map" style="width: 100%; height: 400px;"></div>
            </div>
            <script>
                DG.then(function() {
                    var map;
                    map = DG.map('map', {
                        center: [55.753559, 37.609218],
                        zoom: 10,
                        zoomControl: false,
                        fullscreenControl: false
                    });
                    DG.control.zoom({position: 'topright'}).addTo(map);
                    map.fitBounds(map.getBounds(), {
                        paddingTopLeft: [200, 0]
                    });
                });
            </script>
        </body>
    </html>
-->
