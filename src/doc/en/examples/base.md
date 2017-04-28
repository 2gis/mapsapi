## Basic usage

{toc}

### Description

The following are examples of the basic usage of the map. For more information about the work with the map use the
<a href="/doc/maps/en/manual/dg-loading">Connect API</a> and <a href="/doc/maps/en/manual/map">Map</a> documentation sections.

### Create map

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
            <title>Map creation</title>
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

### Create map on demand

Map initialization on demand (useful when displaying the map in a popup window):
<input id="create" type="button" value="Show map" />
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
            <title>Create map on demand</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js?lazy=true"></script>
        </head>
        <body>
            <input id="create" type="button" value="Display map" />
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

### The use of connection options

The following is an example of calling the map with the following set of options: <code>pkg=basic</code>, <code>skin=light</code>.
As the result we get a build with basic functionality in the light theme. All options can be viewed in the
<a href="/doc/maps/en/manual/dg-loading#connectionoptions">Connection Options</a> section.

    <!DOCTYPE html>
    <html>
        <head>
            <title>Use of connection options</title>
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

### Change map size

When you click the button, the size of the container changes and the map adjusts to the new size:
<input id="changeSize" type="button" value="Change size" />
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
            <title>Change map size</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <input id="changeSize" type="button" value="Change size" />
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
                        // map update
                        map.invalidateSize();
                    }
                });
            </script>
        </body>
    </html>

### Disabling interaction options

Example of static map display:

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
            <title>Disabling interaction options</title>
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

### Determining the user's location

An example of determining the user's geographic location:

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
                  .setContent('Location access denied')
                  .openOn(map);
            });
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Determination of user's location</title>
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
                              .setContent('Location access denied')
                              .openOn(map);
                        });
                });
            </script>
        </body>
    </html>
