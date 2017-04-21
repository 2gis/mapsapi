## Control elements

{toc}

### Description

The following are examples of adding, placing, and working with control elements. For more information about the work
with control elements use the <a href="/doc/maps/en/manual/controls">Controls</a> section of documentation.

### Hide the default control elements

If you need to obtain a "clear" map, with no extra control elements, then the following example will help you:

<script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
<div id="map" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function() {
        var map = DG.map('map', {
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
            <title>Hide control elements by default</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                DG.then(function() {
                    var map = DG.map('map', {
                        center: [54.98, 82.89],
                        zoom: 13,
                        fullscreenControl: false,
                        zoomControl: false
                    });
                });
            </script>
        </body>
    </html>

### The display of control elements in different parts of the map

<div id="map1" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function() {
        var map = DG.map('map1', {
            center: [54.98, 82.89],
            zoom: 13
        });

        DG.control.location({position: 'bottomright'}).addTo(map);
        DG.control.scale().addTo(map);
        DG.control.ruler({position: 'bottomleft'}).addTo(map);
        DG.control.traffic().addTo(map);
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Dislay of control elements in different parts of the map</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                DG.then(function() {
                    var map = DG.map('map', {
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
