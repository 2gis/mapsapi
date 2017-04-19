## Processing of events

{toc}

### Description

The following are examples of working with events. For more information go to the
<a href="/doc/maps/en/manual/base-classes#dgevented">DG.Evented</a> and the
<a href="/doc/maps/en/manual/base-classes#events">Events</a> sections of documentation.

### Subscribe to events

Sample subscriptions to various events (click on the marker map, geometry):

You clicked on: <span id="clicked_element">nowhere</span>
<script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
<div id="map" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function() {
        var map,
            clickedElement = document.getElementById('clicked_element'),
            coords = [
                [54.99, 82.88],
                [54.985, 82.94],
                [54.984, 82.925],
                [54.981, 82.928]
            ];

        map = DG.map('map', {
            center: [54.98, 82.89],
            zoom: 13
        });

        map.on('click', function(e) {
            clickedElement.innerHTML = 'map, coorinates ' + e.latlng.lat + ', ' + e.latlng.lng;
        });

        DG.marker([54.98, 82.89])
            .on('click', function() {
                clickedElement.innerHTML = 'marker';
            })
            .addTo(map);

        DG.polygon(coords)
            .on('click', function() {
                clickedElement.innerHTML = 'polygon';
            })
            .addTo(map);
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Subscribe to events</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            You clicked on: <span id="clicked_element">nowhere</span>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                DG.then(function() {
                    var map,
                        clickedElement = document.getElementById('clicked_element'),
                        coords = [
                            [54.99, 82.88],
                            [54.985, 82.94],
                            [54.984, 82.925],
                            [54.981, 82.928]
                        ];

                    map = DG.map('map', {
                        center: [54.98, 82.89],
                        zoom: 13
                    });

                    map.on('click', function(e) {
                        clickedElement.innerHTML = 'map, coorinates ' + e.latlng.lat + ', ' + e.latlng.lng;
                    });

                    DG.marker([54.98, 82.89])
                        .on('click', function() {
                            clickedElement.innerHTML = 'marker';
                        })
                        .addTo(map);

                    DG.polygon(coords)
                        .on('click', function() {
                            clickedElement.innerHTML = 'polygon';
                        })
                        .addTo(map);
                });
            </script>
        </body>
    </html>

### Subscribe to changes of 2GIS project

If you change the <a href="/doc/maps/en/manual/map#map-projectdetector">project</a> the boundaries of the current one are highlighted:

<div id="map1" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function() {
        var map, currentProjectBound;

        map = DG.map('map1', {
            center: DG.latLng(54.98, 82.89),
            zoom: 9
        });

        // subscribe to the changes of the current 2GIS project
        map.on('projectchange', function(e) {
            var bounds = e.getProject().bound;
            currentProjectBound = DG.geoJSON(bounds, {
                color:"#f03",
                weight:1
            }).addTo(map);
        });

        // subscribe to the event of leaving a 2GIS proejct
        map.on('projectleave', function(e) {
            if (currentProjectBound) {
                map.removeLayer(currentProjectBound);
            }
        });
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Subscribe to changes of 2GIS project</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                DG.then(function() {
                    var map, currentProjectBound;

                    map = DG.map('map', {
                        center: DG.latLng(54.98, 82.89),
                        zoom: 9
                    });

                    // subscribe to the changes of the current 2GIS project
                    map.on('projectchange', function(e) {
                        var bounds = e.getProject().bound;
                        currentProjectBound = DG.geoJSON(bounds, {
                            color:"#f03",
                            weight:1
                        }).addTo(map);
                    });

                    // subscribe to the event of leaving a 2GIS project
                    map.on('projectleave', function(e) {
                        if (currentProjectBound) {
                            map.removeLayer(currentProjectBound);
                        }
                    });
                });
            </script>
        </body>
    </html>
