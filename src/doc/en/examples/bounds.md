## Work with map bounds

{toc}

### Description

The following are examples of limitations of map boundaries and zoom levels. For more information about the work with
the map, see the <a href="/doc/maps/en/manual/map">Map</a> documentation section.

### Limit of boundaries and scale

The restriction of the viewable area by boundaries of Novosibirsk, as well as zoom levels ranging from 10 to 15:

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
            <title>Limitation of boarders and scale</title>
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
### Map with a panel

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
            <title>Map with a left panel</title>
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
