## Базовое использование

{toc}

### Описание

Ниже приведены базовые примеры использования карты. Для получения подробной информации о работе с картой воспользуйтесь разделами документации [Подключение API](/doc/2.0/maps/manual/loading) и [Карта](/doc/2.0/maps/manual/map).

### Создание карты

<script src="http://maps.api.2gis.ru/2.0/loader.js?pkg=full" data-id="dgLoader"></script>
<div id="map" style="width: 100%; height: 400px;"></div>
<script>
    var map;
    DG.then(function() {
        map = DG.map('map', {
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
            var map;
            DG.then(function() {
                map = DG.map('map', {
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
    var mapBlock = document.getElementById('mapBlock'),
        createButton = document.getElementById("create");

    createButton.onclick = function() {
        var map,
            container = document.createElement('div');
        
        container.id = 'map1';
        container.style.width = "100%";
        container.style.height = "400px";
        mapBlock.appendChild(container);

        DG.then(function(){
            map = DG.map('map1', {
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
                var mapBlock = document.getElementById('mapBlock'),
                    createButton = document.getElementById("create");

                createButton.onclick = function() {
                    var map,
                        container = document.createElement('div');
                    
                    container.id = 'map';
                    container.style.width = "100%";
                    container.style.height = "400px";
                    mapBlock.appendChild(container);

                    DG.then(function(){
                        map = DG.map('map', {
                            center: [54.98, 82.89],
                            zoom: 13
                        });
                    });                    
                }
            </script>
        </body>
    </html>

### Изменение размера карты

При клике на кнопку изменяется размер контейнера и карта подстраивается под новый размер:
<input id="changeSize" type="button" value="Изменить размер" />
<div id="map2" style="width: 100%; height: 200px;"></div>
<script>
    var map,
        changeSizeButton = document.getElementById('changeSize');

    DG.then(function () {
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
                var map,
                    changeSizeButton = document.getElementById('changeSize');

                DG.then(function () {
                    map = DG.map('map', {
                        center: [54.98, 82.89],
                        zoom: 15,
                        animate: true
                    });
                    
                    changeSizeButton.onclick = function() {
                        var mapDiv = document.getElementById('map');
                        mapDiv.style.height = "400px";
                        map.invalidateSize();
                    }
                });
            </script>
        </body>
    </html>