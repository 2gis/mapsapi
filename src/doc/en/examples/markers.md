## Work with markers

{toc}

### Description

The following are examples of usage of markers. A marker can be added to the map using the <code>addTo()</code> method,
but if you are planning to work with a group of markers, we recommend you to use <code>FeatureGroup</code>
(see the Processing of events of markers group, and Multiple markers display and adjustment of boundaries sections).
For more information about markers, go to the <a href="/doc/maps/en/manual/markers">Markers</a> section of documentation.

### A marker with a popup

A marker, clicking on which you open a popup with the information:

<script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
<div id="map" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function () {
        var map = DG.map('map', {
            center: [54.98, 82.89],
            zoom: 15
        });

        DG.marker([54.98, 82.89]).addTo(map).bindPopup('I am a popup!');
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>A marker with a popup</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                DG.then(function() {
                    var map = DG.map('map', {
                        center: [54.98, 82.89],
                        zoom: 15
                    });

                    DG.marker([54.98, 82.89]).addTo(map).bindPopup('I am a popup!');
                });
            </script>
        </body>
    </html>

### Draggable marker

The marker, which users can drag and drop:

Marker coordinates: <div id="location">54.981, 82.891</div>

<div id="map1" style="width: 100%; height: 400px;"></div>
<script type="text/javascript">
    var locationInfo = document.getElementById('location');
    DG.then(function () {
        var map,
            marker;

        map = DG.map('map1', {
            center: [54.981, 82.891],
            zoom: 15
        });

        marker = DG.marker([54.981, 82.891], {
            draggable: true
        }).addTo(map);

        marker.on('drag', function(e) {
            var lat = e.target._latlng.lat.toFixed(3),
                lng = e.target._latlng.lng.toFixed(3);

            locationInfo.innerHTML = lat + ', ' + lng;
        });
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Draggable marker</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            Marker coordinates: <div id="location">LatLng(54.98, 82.89)</div>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script type="text/javascript">
                var locationInfo = document.getElementById('location');

                DG.then(function () {
                    var map,
                        marker;

                    map = DG.map('map', {
                        center: [54.981, 82.891],
                        zoom: 15
                    });

                    marker = DG.marker([54.981, 82.891], {
                        draggable: true
                    }).addTo(map);

                    marker.on('drag', function(e) {
                        var lat = e.target._latlng.lat.toFixed(3),
                            lng = e.target._latlng.lng.toFixed(3);

                        locationInfo.innerHTML = lat + ', ' + lng;
                    });
                });
            </script>
        </body>
    </html>

### A marker with a custom icon

You can select a custom icon or a simple div element for the marker instead of an image:

<div id="map2" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function() {
        var map,
            myIcon,
            myDivIcon;

        map = DG.map('map2', {
            center: [54.98, 82.89],
            zoom: 13
        });

        myIcon = DG.icon({
            iconUrl: 'https://maps.api.2gis.ru/2.0/example_logo.png',
            iconSize: [48, 48]
        });
        DG.marker([54.98, 82.89], {
            icon: myIcon
        }).addTo(map);

        myDivIcon = DG.divIcon({
            iconSize: [70, 20],
            html: '<b style="color:blue;">HTML-код</b>'
        });
        DG.marker([54.98, 82.87], {
            icon: myDivIcon
        }).addTo(map);
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>A marker with a custom icon</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                DG.then(function() {
                    var map,
                        myIcon,
                        myDivIcon;

                    map = DG.map('map', {
                        center: [54.98, 82.89],
                        zoom: 13
                    });

                    myIcon = DG.icon({
                        iconUrl: 'https://maps.api.2gis.ru/2.0/example_logo.png',
                        iconSize: [48, 48]
                    });
                    DG.marker([54.98, 82.89], {
                        icon: myIcon
                    }).addTo(map);

                    myDivIcon = DG.divIcon({
                        iconSize: [70, 20],
                        html: '<b style="color:blue;">HTML-код</b>'
                    });
                    DG.marker([54.98, 82.87], {
                        icon: myDivIcon
                    }).addTo(map);
                });
            </script>
        </body>
    </html>

### Open a marker programmatically

It is possible to open a popup on demand. For example, by clicking on a link or button:

<button id='open-popup'>Open popup</button>
<div id="map3" style="width: 100%; height: 400px;"></div>
<script>
    var openPopupBtn = document.getElementById('open-popup');

    DG.then(function() {
        var map,
            marker;

        map = DG.map('map3', {
            center: [54.98, 82.89],
            zoom: 15
        });

        marker = DG.marker([54.98, 82.89]).addTo(map);
        marker.bindPopup('I am a popup!');

        openPopupBtn.onclick = function() {
            marker.openPopup();
        }
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Open a marker programmatically</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <button id='open-popup'>Open popup</button>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                var openPopupBtn = document.getElementById('open-popup');

                DG.then(function() {
                    var map,
                        marker;

                    map = DG.map('map', {
                        center: [54.98, 82.89],
                        zoom: 15
                    });

                    marker = DG.marker([54.98, 82.89]).addTo(map);
                    marker.bindPopup('I am a popup!');

                    openPopupBtn.onclick = function() {
                        marker.openPopup();
                    }
                });
            </script>
        </body>
    </html>

### Marker with a tip

The marker has two kinds of tips: a regular and a static ones. Both options are considered in the following example:

<div id="map4" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function() {
        var map = DG.map('map4', {
            center: [54.98, 82.89],
            zoom: 15
        });

        DG.marker([54.98, 82.89])
            .addTo(map)
            .bindLabel('I am a static tip!', {
                static: true
            });

        DG.marker([54.98, 82.88])
            .addTo(map)
            .bindLabel('I am a simple tip!');
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Marker with a tip</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                DG.then(function() {
                    var map = DG.map('map', {
                        center: [54.98, 82.89],
                        zoom: 15
                    });

                    DG.marker([54.98, 82.89])
                        .addTo(map)
                        .bindLabel('I am a static tip!', {
                            static: true
                        });

                    DG.marker([54.98, 82.88])
                        .addTo(map)
                        .bindLabel('I am a simple tip!');
                });
            </script>
        </body>
    </html>

### Processing events of the group of markers

When clicking on the marker, the map will be centered in its position:

<div id="map5" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function() {
        var map,
            marker1,
            marker2,
            marker3,
            group;

        map = DG.map('map5', {
            center: [54.98, 82.89],
            zoom: 13
        });

        marker1 = DG.marker([54.96, 82.889]).addTo(map);
        marker2 = DG.marker([54.98, 82.893]).addTo(map);
        marker3 = DG.marker([54.99, 82.896]).addTo(map);

        group = DG.featureGroup([marker1, marker2, marker3]);
        group.addTo(map);
        group.on('click', function(e) {
            map.setView([e.latlng.lat, e.latlng.lng]);
        });
    });
</script>


    <!DOCTYPE html>
    <html>
        <head>
            <title>Processing of events of markers group</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                DG.then(function() {
                    var map,
                        marker1,
                        marker2,
                        marker3,
                        group;

                    map = DG.map('map', {
                        center: [54.98, 82.89],
                        zoom: 13
                    });

                    marker1 = DG.marker([54.96, 82.889]).addTo(map);
                    marker2 = DG.marker([54.98, 82.893]).addTo(map);
                    marker3 = DG.marker([54.99, 82.896]).addTo(map);

                    group = DG.featureGroup([marker1, marker2, marker3]);
                    group.addTo(map);
                    group.on('click', function(e) {
                        map.setView([e.latlng.lat, e.latlng.lng]);
                    });
                });
            </script>
        </body>
    </html>

### Animated movement of marker

An example of a marker that moves along a given trajectory:
<div id="map6" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function() {
        var map,
            marker;

        map = DG.map('map6', {
            center: [54.98, 82.89],
            zoom: 13
        });

        marker = DG.marker([54.98, 82.89]).addTo(map);

        var increment = 0.001;

        function move() {
            if (!map.getBounds().contains(marker.getLatLng())) {
                increment *= -1;
            }

            var newLat = marker.getLatLng().lat + increment,
                newLng = marker.getLatLng().lng + increment;

            marker.setLatLng([newLat, newLng]);
        }

        setInterval(move, 60);
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Animated marker movement</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                DG.then(function() {
                    var map,
                        marker;

                    map = DG.map('map', {
                        center: [54.98, 82.89],
                        zoom: 13
                    });

                    marker = DG.marker([54.98, 82.89]).addTo(map);

                    var increment = 0.001;

                    function move() {
                        if (!map.getBounds().contains(marker.getLatLng())) {
                            increment *= -1;
                        }

                        var newLat = marker.getLatLng().lat + increment,
                            newLng = marker.getLatLng().lng + increment;

                        marker.setLatLng([newLat, newLng]);
                    }

                    setInterval(move, 60);
                });
            </script>
        </body>
    </html>

### Multiple markers display and adjustment of boundaries

Example of display and hiding of groups of markers with automatic detection of map boundaries:

<input id="show" type="button" value="Show markers" /><input id="hide" type="button" value="Hide markers" />
<div id="map7" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function() {
        var map,
            markers = DG.featureGroup(),
            coordinates = [];

        map = DG.map('map7', {
            center: [54.98, 82.89],
            zoom: 13
        });

        for (var i = 0; i < 100; i++) {
            coordinates[0] = 54.98 + Math.random();
            coordinates[1] = 82.89 + Math.random();
            DG.marker(coordinates).addTo(markers);
        }

        document.getElementById('hide').onclick = hideMarkers;
        document.getElementById('show').onclick = showMarkers;

        function showMarkers() {
            markers.addTo(map);
            map.fitBounds(markers.getBounds());
        };

        function hideMarkers() {
            markers.removeFrom(map);
        };
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Display/removal of several markers, fitBounds</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <input id="hide" type="button" value="hide markers" />
            <input id="show" type="button" value="show markers" />
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
            DG.then(function() {
                var map,
                    markers = DG.featureGroup(),
                    coordinates = [];

                map = DG.map('map', {
                    center: [54.98, 82.89],
                    zoom: 13
                });

                for (var i = 0; i < 100; i++) {
                    coordinates[0] = 54.98 + Math.random();
                    coordinates[1] = 82.89 + Math.random();
                    DG.marker(coordinates).addTo(markers);
                }

                document.getElementById('hide').onclick = hideMarkers;
                document.getElementById('show').onclick = showMarkers;

                function showMarkers() {
                    markers.addTo(map);
                    map.fitBounds(markers.getBounds());
                };

                function hideMarkers() {
                    markers.removeFrom(map);
                };
            });
        </script>
        </body>
    </html>
