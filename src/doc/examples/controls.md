## Элементы управления

{toc}

### Описание

Ниже приведены примеры добавления, размещения и работы с элементами управления. Для получения подробной информации о работе с элементами управления воспользуйтесь разделом документации [Элементы управления](/doc/maps/manual/controls).

### Скрытие элементов управления по умолчанию

Если необходимо получить "чистую" карту, без лишних элементов управления, тогда вам поможет следующий пример:

<script src="http://maps.api.2gis.ru/2.0/loader.js" data-id="dgLoader"></script>
<div id="map" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function() {
        var map;
        map = DG.map('map', {
            center: [54.98, 82.89],
            zoom: 13,
            fullscreenControl: false,
            zoomControl: false
        });
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8" />
            <title>Скрытие элементов управления по умолчанию</title>
            <script src="http://maps.api.2gis.ru/2.0/loader.js"
            data-id="dgLoader"></script>
        </head>
        <body>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                DG.then(function() {
                    var map;
                    map = DG.map('map', {
                        center: [54.98, 82.89],
                        zoom: 13,
                        fullscreenControl: false,
                        zoomControl: false
                    });
                });
            </script>
        </body>
    </html>

### Отображение элементов управления в разных частях карты

<div id="map1" style="width: 100%; height: 400px;"></div>
<script>
    var map;
    DG.then(function() {
        map = DG.map('map1', {
            center: [54.98, 82.89],
            zoom: 13
        });
        DG.control.location({position: 'bottomright'}).addTo(map);
        DG.control.scale().addTo(map);
        DG.control.ruler({position: 'bottomleft'}).addTo(map);
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8" />
            <title>Отображение элементов управления в разных частях карты</title>
            <script src="http://maps.api.2gis.ru/2.0/loader.js"
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
                    DG.control.location({position: 'bottomright'}).addTo(map);
                    DG.control.scale().addTo(map);
                    DG.control.ruler({position: 'bottomleft'}).addTo(map);
                    DG.control.traffic().addTo(map);
                });
            </script>
        </body>
    </html>
