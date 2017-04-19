## Work with vector layers

{toc}

### Description

The following are basic examples of usage of geometric objects. For more information about the work with vector layers
use the <a href="/doc/maps/en/manual/vector-layers">Vector Layers</a> section of documentation.

### Polyline display

<script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
<div id="map" style="width: 100%; height: 500px;"></div>
<script>
    DG.then(function() {
        var map,
            coordinates,
            polyline;

        map = DG.map('map', {
            center: [55.036446, 82.897983],
            zoom: 11
        });

        coordinates = [[55.069288, 82.991367], [55.069288, 82.816615], [55.011648, 82.902103], [54.944714, 82.903152], [54.928935, 82.850967], [54.928541, 82.976280], [54.944517, 82.916541], [55.011704, 82.916885], [55.056508, 82.973514], [55.056508, 82.835498], [55.056705, 82.973857], [55.069288, 82.991367], [55.069288, 82.941928], [55.097193, 82.959094], [55.046282, 82.919956], [55.045692, 82.904163], [55.036446, 82.897983], [55.029756, 82.907596], [55.018932, 82.903819], [55.029362, 82.914119], [55.030543, 82.927165], [55.037823, 82.933345], [55.045101, 82.925105], [55.069681, 82.941928]];

        // create a polyline from an array of geographical points
        polyline = DG.polyline(coordinates, {color: 'blue'}).addTo(map);

        // adjust the center of the map and the scale to make the polyline visible
        map.fitBounds(polyline.getBounds());
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Polyline display</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <div id="map" style="width: 100%; height: 500px;"></div>
            <script>
                DG.then(function() {
                    var map,
                        coordinates,
                        polyline;

                    map = DG.map('map', {
                        center: [55.036446, 82.897983],
                        zoom: 11
                    });

                    coordinates = [[55.069288, 82.991367], [55.069288, 82.816615], [55.011648, 82.902103], [54.944714, 82.903152], [54.928935, 82.850967], [54.928541, 82.976280], [54.944517, 82.916541], [55.011704, 82.916885], [55.056508, 82.973514], [55.056508, 82.835498], [55.056705, 82.973857], [55.069288, 82.991367], [55.069288, 82.941928], [55.097193, 82.959094], [55.046282, 82.919956], [55.045692, 82.904163], [55.036446, 82.897983], [55.029756, 82.907596], [55.018932, 82.903819], [55.029362, 82.914119], [55.030543, 82.927165], [55.037823, 82.933345], [55.045101, 82.925105], [55.069681, 82.941928]];

                    // create a polyline from an array of geographical points
                    polyline = DG.polyline(coordinates, {
                        color: 'blue'
                    }).addTo(map);

                    // adjust the center of the map and the scale to make the polyline visible
                    map.fitBounds(polyline.getBounds());
                });
            </script>
        </body>
    </html>

### Display rectangles

<div id="map1" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function() {
        var map,
            coords1 = [[54.98, 82.87], [54.975, 82.91]],
            coords2 = [[54.985, 82.87], [54.982, 82.91]],
            coords3 = [[54.99, 82.87], [54.987, 82.91]],
            rectangles = DG.featureGroup();

        map = DG.map('map1', {
            center: [54.98, 82.89],
            zoom: 14
        });

        // Add rectangles to the group
        DG.rectangle(coords1, {color: "blue"}).addTo(rectangles);
        DG.rectangle(coords2, {color: "red"}).addTo(rectangles);
        DG.rectangle(coords3, {color: "green"}).addTo(rectangles);

        // Add group to the map
        rectangles.addTo(map);

        // Adjust boundaries of the map
        map.fitBounds(rectangles.getBounds());
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Display of rectangles</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                DG.then(function() {
                    var map,
                        coords1 = [[54.98, 82.87], [54.975, 82.91]],
                        coords2 = [[54.985, 82.87], [54.982, 82.91]],
                        coords3 = [[54.99, 82.87], [54.987, 82.91]],
                        rectangles = DG.featureGroup();

                    map = DG.map('map', {
                        center: [54.98, 82.89],
                        zoom: 14
                    });

                    // Add rectangles to the group
                    DG.rectangle(coords1, {color: "blue"}).addTo(rectangles);
                    DG.rectangle(coords2, {color: "red"}).addTo(rectangles);
                    DG.rectangle(coords3, {color: "green"}).addTo(rectangles);

                    // Add group to the map
                    rectangles.addTo(map);

                    // Adjust boundaries of the map
                    map.fitBounds(rectangles.getBounds());
                });
            </script>
        </body>
    </html>

### Display polygons

<div id="map2" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function() {
        var map,
            coords1 = [
                [54.98, 82.87],
                [54.975, 82.91],
                [54.974, 82.915],
                [54.971, 82.918],
                [54.970, 82.921]
            ],
            coords2 = [
                [54.985, 82.875],
                [54.98, 82.96],
                [54.979, 82.92],
                [54.976, 82.923]
            ],
            coords3 = [
                [54.99, 82.88],
                [54.985, 82.971],
                [54.984, 82.925],
                [54.981, 82.928],
                [54.980, 82.931]
            ],
            polygons = DG.featureGroup();

        map = DG.map('map2', {
            center: [54.98, 82.89],
            zoom: 13
        });

        DG.polygon(coords1, {color: "blue"}).addTo(polygons);
        DG.polygon(coords2, {color: "red"}).addTo(polygons);
        DG.polygon(coords3, {color: "green"}).addTo(polygons);

        polygons.addTo(map);
        map.fitBounds(polygons.getBounds());
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Display polygons</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                DG.then(function() {
                    var map,
                        coords1 = [
                            [54.98, 82.87],
                            [54.975, 82.91],
                            [54.974, 82.915],
                            [54.971, 82.918],
                            [54.970, 82.921]
                        ],
                        coords2 = [
                            [54.985, 82.875],
                            [54.98, 82.96],
                            [54.979, 82.92],
                            [54.976, 82.923]
                        ],
                        coords3 = [
                            [54.99, 82.88],
                            [54.985, 82.971],
                            [54.984, 82.925],
                            [54.981, 82.928],
                            [54.980, 82.931]
                        ],
                        polygons = DG.featureGroup();

                    map = DG.map('map', {
                        center: [54.98, 82.89],
                        zoom: 13
                    });

                    // Add polygons to a group
                    DG.polygon(coords1, {color: "blue"}).addTo(polygons);
                    DG.polygon(coords2, {color: "red"}).addTo(polygons);
                    DG.polygon(coords3, {color: "green"}).addTo(polygons);

                    // Add a group to the map
                    polygons.addTo(map);

                    // Adjust the boundaries of the map
                    map.fitBounds(polygons.getBounds());
                });
            </script>
        </body>
    </html>

### Display a circle and a round marker

<div id="map3" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function() {
        var map = DG.map('map3', {
            center: [54.98, 82.89],
            zoom: 14
        });

        DG.circle([54.98, 82.89], 200, {color: 'red'}).addTo(map);
        DG.circleMarker([54.985, 82.89]).setRadius(100).addTo(map);
    })
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Display a circle and a round marker</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                DG.then(function() {
                    var map = DG.map('map', {
                        center: [54.98, 82.89],
                        zoom: 14
                    });

                    DG.circle([54.98, 82.89], 200, {color: 'red'}).addTo(map);
                    DG.circleMarker([54.985, 82.89]).setRadius(100).addTo(map);
                })
            </script>
        </body>
    </html>

### Vector layers with tips and pop-ups

<div id="map4" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function() {
        var map = DG.map('map4', {
            center: [54.98, 82.89],
            zoom: 14
        });

        DG.circle([54.98, 82.87], 200, {color: 'red'})
            .bindPopup('I am a circle')
            .bindLabel('Click on the circle')
            .addTo(map);

        DG.circleMarker([54.985, 82.89])
            .bindPopup('I am a circle marker')
            .bindLabel('Click on a circle marker')
            .setRadius(100)
            .addTo(map);

        DG.rectangle(
            [[54.98, 82.87], [54.975, 82.91]],
            {color: 'green'})
            .bindPopup('I am a rectangle')
            .bindLabel('Click on a rectangle')
            .addTo(map);

        DG.polygon(
            [[54.985, 82.875], [54.98, 82.96], [54.979, 82.92]],
            {color: 'yellow'})
            .bindPopup('I am a polygon')
            .bindLabel('Click on a polygon')
            .addTo(map);
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Vector layers with tips and pop-ups</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                DG.then(function() {
                    var map = DG.map('map', {
                        center: [54.98, 82.89],
                        zoom: 14
                    });

                    DG.circle([54.98, 82.87], 200, {color: 'red'})
                        .bindPopup('I am a circle')
                        .bindLabel('Click on the circle')
                        .addTo(map);

                    DG.circleMarker([54.985, 82.89])
                        .bindPopup('I am a circle marker')
                        .bindLabel('Click on a circle marker')
                        .setRadius(100)
                        .addTo(map);

                    DG.rectangle(
                        [[54.98, 82.87], [54.975, 82.91]],
                        {color: 'green'})
                        .bindPopup('I am a rectangle')
                        .bindLabel('Click on a rectangle')
                        .addTo(map);

                    DG.polygon(
                        [[54.985, 82.875], [54.98, 82.96], [54.979, 82.92]],
                        {color: 'yellow'})
                        .bindPopup('I am a polygon')
                        .bindLabel('Click on a polygon')
                        .addTo(map);
                });
            </script>
        </body>
    </html>

### Animation of the polyline rendering

<input id="playAnimation" type="button" value="Start animation" />
<div id="map5" style="width: 100%; height: 400px;"></div>
<script>
    var playAnimationButton = document.getElementById('playAnimation');

    DG.then(function() {
        var map = DG.map('map5', {
            center: [54.98, 82.94],
            zoom: 13
        });

        playAnimation.onclick = function() {
            var polyline = DG.polyline([]).addTo(map),
                counter = 0;

            (function draw() {
                polyline.addLatLng([54.98, 82.89 + counter / 10000]);

                if (++counter < 1000) {
                    window.setTimeout(draw, 10);
                } else {
                    counter = 0;
                    draw();
                };
            })();
        }
    })
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Animation of the polyline rendering</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <input id="playAnimation" type="button" value="Start animation" />
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                var playAnimationButton = document.getElementById('playAnimation');

                DG.then(function() {
                    var map = DG.map('map', {
                        center: [54.98, 82.94],
                        zoom: 13
                    });

                    playAnimation.onclick = function() {
                        var polyline = DG.polyline([]).addTo(map),
                            counter = 0;

                        (function draw() {
                            polyline.addLatLng([54.98, 82.89 + counter / 10000]);

                            if (++counter < 1000) {
                                window.setTimeout(draw, 10);
                            } else {
                                counter = 0;
                                draw();
                            };
                        })();
                    }
                })
            </script>
        </body>
    </html>
