## Work with GeoJSON

{toc}

### Description

The following is an example of working with GeoJSON. For more information go to the
<a href="/doc/maps/en/manual/other-layers#dggeojson">GeoJSON</a> section of documentation.

### Example of usage

Display of objects described in the GeoJSON format:

<script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
<div id="map" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function() {
        var map = DG.map('map', {
            center: [55.042136, 82.91699],
            zoom: 16
        });

        var data = [
            {
                "type": "Feature",
                "properties": {
                    "info": "Я маркер"
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [82.91799, 55.043136]
                }
            },
            {
                "type": "Feature",
                "properties": {
                    "info": "Я полигон"
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [82.91699, 55.042136],
                            [82.917522, 55.040187],
                            [82.918063, 55.040235],
                            [82.917540, 55.042184],
                            [82.91699, 55.042136]
                        ]
                    ]
                }
            }
        ];

        DG.geoJson(data, {
            onEachFeature: function (feature, layer) {
                layer.bindPopup(feature.properties.info);
            }
        }).addTo(map);
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>GeoJSON</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                DG.then(function() {
                    var map = DG.map('map', {
                        center: [55.042136, 82.91699],
                        zoom: 16
                    });

                    var data = [
                        {
                            "type": "Feature",
                            "properties": {
                                "info": "I am a marker"
                            },
                            "geometry": {
                                "type": "Point",
                                "coordinates": [82.91799, 55.043136]
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {
                                "info": "I am a polyline"
                            },
                            "geometry": {
                                "type": "Polygon",
                                "coordinates": [
                                    [
                                        [82.91699, 55.042136],
                                        [82.917522, 55.040187],
                                        [82.918063, 55.040235],
                                        [82.917540, 55.042184],
                                        [82.91699, 55.042136]
                                    ]
                                ]
                            }
                        }
                    ];

                    DG.geoJson(data, {
                        onEachFeature: function (feature, layer) {
                            layer.bindPopup(feature.properties.info);
                        }
                    }).addTo(map);
                });
            </script>
        </body>
    </html>
