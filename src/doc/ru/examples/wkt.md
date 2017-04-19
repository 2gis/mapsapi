## Работа с WKT

{toc}

### Описание

Ниже приведены примеры работы с WKT. Для получения подробной информации перейдите в раздел документации
<a href="/doc/maps/ru/manual/dg-wkt">WKT</a>.

### Отображение простых векторных слоев

<script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
<div id="map" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function() {
        var map,
            coord1 = 'POLYGON((82.91699 55.042136, 82.917522 55.040187, 82.918063 55.040235, 82.917540 55.042184,82.91699 55.042136))',
            coord2 = 'LINESTRING(82.91799 55.043136, 82.918522 55.041187, 82.919063 55.041235)',
            coord3 = 'POINT(82.914 55.042136)';

        map = DG.map('map', {
            center: [55.042136, 82.91699],
            zoom: 16
        });

        DG.Wkt.geoJsonLayer(coord1).addTo(map);

        DG.Wkt.geoJsonLayer(coord2).addTo(map);

        DG.Wkt.geoJsonLayer(coord3).addTo(map);
    })
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Отображение простых векторных слоев</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                DG.then(function() {
                    var map,
                        coord1 = 'POLYGON((82.91699 55.042136, 82.917522 55.040187, 82.918063 55.040235, 82.917540 55.042184,82.91699 55.042136))',
                        coord2 = 'LINESTRING(82.91799 55.043136, 82.918522 55.041187, 82.919063 55.041235)',
                        coord3 = 'POINT(82.914 55.042136)';

                    map = DG.map('map', {
                        center: [55.042136, 82.91699],
                        zoom: 16
                    });

                    DG.Wkt.geoJsonLayer(coord1).addTo(map);

                    DG.Wkt.geoJsonLayer(coord2).addTo(map);

                    DG.Wkt.geoJsonLayer(coord3).addTo(map);
                })
            </script>
        </body>
    </html>

### Отображение составных векторных слоев

<div id="map1" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function() {
        var map = DG.map('map1', {
            center: [55.041836, 82.91699],
            zoom: 16
        });

        DG.Wkt.geoJsonLayer('MULTIPOLYGON(((82.91699 55.042136, 82.917522 55.040187, 82.918063 55.040235, 82.917540 55.042184,82.91699 55.042136)), ((82.91599 55.041136, 82.916522 55.039187, 82.917063 55.039235, 82.916540 55.041184,82.91599 55.041136)))').addTo(map);
        DG.Wkt.geoJsonLayer('MULTILINESTRING((82.91799 55.043136, 82.918522 55.041187, 82.919063 55.041235), (82.91899 55.044136, 82.919522 55.042187, 82.920063 55.042235))').addTo(map);
        DG.Wkt.geoJsonLayer('MULTIPOINT(82.914 55.042136, 82.915 55.043136, 82.915 55.042136, 82.914 55.043136)').addTo(map);
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Отображение составных векторных слоев</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                DG.then(function() {
                    var map,
                        coord1 = 'MULTIPOLYGON(((82.91699 55.042136, 82.917522 55.040187, 82.918063 55.040235, 82.917540 55.042184,82.91699 55.042136)), ((82.91599 55.041136, 82.916522 55.039187, 82.917063 55.039235, 82.916540 55.041184,82.91599 55.041136)))',
                        coord2 = 'MULTILINESTRING((82.91799 55.043136, 82.918522 55.041187, 82.919063 55.041235), (82.91899 55.044136, 82.919522 55.042187, 82.920063 55.042235))',
                        coord3 = 'MULTIPOINT(82.914 55.042136, 82.915 55.043136, 82.915 55.042136, 82.914 55.043136)';

                    map = DG.map('map', {
                        center: [55.041836, 82.91699],
                        zoom: 16
                    });

                    DG.Wkt.geoJsonLayer(coord1).addTo(map);

                    DG.Wkt.geoJsonLayer(coord2).addTo(map);

                    DG.Wkt.geoJsonLayer(coord3).addTo(map);
                });
            </script>
        </body>
    </html>
