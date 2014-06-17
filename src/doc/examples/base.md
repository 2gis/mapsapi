## Базовое использование

{toc}

### Описание

Ниже приведены базовые примеры использования карты. Для получения подробной информации о работе с картой воспользуйтесь разделами документации [Подключение API](/doc/maps/2.0/manual/loading) и [Карта](/doc/maps/2.0/manual/map).

### Создание карты

<script src="http://maps.api.2gis.ru/2.0/loader.js?pkg=full" data-id="dgLoader"></script>
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
            <meta charset='utf-8' />
            <title>Создание карты</title>
            <script src="http://maps.api.2gis.ru/2.0/loader.js?pkg=full"
            data-id="dgLoader"></script>
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
    var createButton = document.getElementById("create");

    createButton.onclick = function() {
        var container = document.createElement('div'),
            mapBlock = document.getElementById('mapBlock');
        
        container.id = 'map1';
        container.style.width = "100%";
        container.style.height = "400px";
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
            <meta charset='utf-8' />
            <title>Создание карты по требованию</title>
            <script src="http://maps.api.2gis.ru/2.0/loader.js?pkg=full&lazy=true"
            data-id="dgLoader"></script>
        </head>
        <body>
            <input id="create" type="button" value="Показать карту" />
            <div id="mapBlock"></div>
            <script>
                var createButton = document.getElementById("create");

                createButton.onclick = function() {
                    var container = document.createElement('div'),
                        mapBlock = document.getElementById('mapBlock');

                    container.id = 'map';
                    container.style.width = "100%";
                    container.style.height = "400px";
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

Ниже представлен пример вызова карты с таким набором опций: 'pkg=full', 'skin=dark', 'mode=debug', 'sprite=true'. Как результат мы получим неминифицированные исходники и иконки собранные в спрайт. Все возможные опции можно посмотреть в разделе [Опции подключения](/doc/maps/2.0/manual/loading/#sel=21:1,21:2). На выходе имеем такую карту:
<div id="map" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function() {
        DG.map('map', {
            center: [54.98, 82.89],
            zoom: 13,
            geoclicker: true
        });
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <meta charset='utf-8' />
            <title>Использование опций подключения</title>
            <script src="http://maps.api.2gis.ru/2.0/loader.js?pkg=full&skin=dark&mode=debug&sprite=true"
             data-id="dgLoader"></script>       
        </head>
        <body>
        <div id="map" style="width: 100%; height: 400px;"></div>
        <script>
            DG.then(function() {
                DG.map('map', {
                    center: [54.98, 82.89],
                    zoom: 13,
                    geoclicker: true
                });
            });
        </script>
        </body>
    </html>

### Изменение размера карты

При клике на кнопку изменяется размер контейнера и карта подстраивается под новый размер:
<input id="changeSize" type="button" value="Изменить размер" />
<div id="map2" style="width: 100%; height: 200px;"></div>
<script>
    var changeSizeButton = document.getElementById('changeSize');

    DG.then(function() {
        var map;

        map = DG.map('map2', {
            center: [54.98, 82.89],
            zoom: 15,
            animate: true
        });
        
        changeSizeButton.onclick = function() {
            var mapDiv = document.getElementById('map2');
            mapDiv.style.height = "400px";
            map.invalidateSize();
        }
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <meta charset='utf-8' />
            <title>Изменение размера карты</title>
            <script src="http://maps.api.2gis.ru/2.0/loader.js?pkg=full"
            data-id="dgLoader"></script>
        </head>
        <body>
            <input id="changeSize" type="button" value="Изменить размер" />
            <div id="map" style="width: 100%; height: 200px;"></div>
            <script>
                var changeSizeButton = document.getElementById('changeSize');

                DG.then(function() {
                    var map;

                    map = DG.map('map', {
                        center: [54.98, 82.89],
                        zoom: 15,
                        animate: true
                    });
                    
                    changeSizeButton.onclick = function() {
                        var mapDiv = document.getElementById('map');
                        mapDiv.style.height = "400px";
                        //обновление карты
                        map.invalidateSize();
                    }
                });
            </script>
        </body>
    </html>

### Отключение опций взаимодействия

Пример отображения статической карты:

<div id="map3" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function() {
        DG.map('map3', {
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
            <meta charset='utf-8' />
            <title>Отключение опций взаимодействия</title>
            <script src="http://maps.api.2gis.ru/2.0/loader.js?pkg=full"
            data-id="dgLoader"></script>
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

<div id="map4" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function() {
        var map;

        map = DG.map('map4', {
            center: [54.98, 82.89],
            zoom: 13
        });
        
        map.locate({setView: true, watch: true})
        .on('locationfound', function(e){
            DG.marker([e.latitude, e.longitude]).addTo(map);
        })
       .on('locationerror', function(e){
            console.log(e);
            alert("Location access denied.");
        });
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <meta charset='utf-8' />
            <title>Определение местоположения пользователя</title>
            <script src="http://maps.api.2gis.ru/2.0/loader.js?pkg=full"
            data-id="dgLoader"></script>
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
                    .on('locationfound', function(e){
                        DG.marker([e.latitude, e.longitude]).addTo(map);
                    })
                   .on('locationerror', function(e){
                        console.log(e);
                        alert("Location access denied.");
                    });
                });
            </script>
        </body>
    </html>
