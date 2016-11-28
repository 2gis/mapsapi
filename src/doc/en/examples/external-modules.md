## External modules

{toc}

### Description

The following are examples of connection and usage of external modules. For more information go to the
<a href="/doc/maps/en/manual/dg-external-modules">External Modules</a> section of documentation.

### Clusterer

Example of clusterer enabling. Clusterer is often used to display big amount of markers. The module code and its documentation
is available on <a href="https://github.com/Leaflet/Leaflet.markercluster" target="_blank">GitHub repository</a> of the author.

<script src="http://maps.api.2gis.ru/2.0/loader.js"></script>
<link rel="stylesheet" href="http://2gis.github.io/mapsapi/vendors/Leaflet.markerCluster/MarkerCluster.css" />
<link rel="stylesheet" href="http://2gis.github.io/mapsapi/vendors/Leaflet.markerCluster/MarkerCluster.Default.css" />
<script src="http://maps.api.2gis.ru/2.0/cluster_realworld.js"></script>
<div id="map" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function() {
        // module code loading
        return DG.plugin('http://2gis.github.io/mapsapi/vendors/Leaflet.markerCluster/leaflet.markercluster-src.js');
    }).then(function() {
        map = DG.map('map', {
            center: DG.latLng(54.92, 82.82),
            zoom: 9
        });

        var markers = DG.markerClusterGroup();

        // processing of coordinates for installation of markers
        for (var i = 0; i < addressPoints.length; i++) {
            var a = addressPoints[i];
            var title = a[2];
            var marker = DG.marker([a[0], a[1]], { title: title });
            marker.bindPopup(title);
            markers.addLayer(marker);
        }

        map.addLayer(markers);
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Clusterer</title>
            <script src="http://maps.api.2gis.ru/2.0/loader.js"></script>
            <link rel="stylesheet" href="http://2gis.github.io/mapsapi/vendors/Leaflet.markerCluster/MarkerCluster.css" />
            <link rel="stylesheet" href="http://2gis.github.io/mapsapi/vendors/Leaflet.markerCluster/MarkerCluster.Default.css" />
            <script src="http://maps.api.2gis.ru/2.0/cluster_realworld.js"></script>
        </head>
        <body>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                DG.then(function() {
                    // module code loading
                    return DG.plugin('http://2gis.github.io/mapsapi/vendors/Leaflet.markerCluster/leaflet.markercluster-src.js');
                }).then(function() {
                    map = DG.map('map', {
                        center: DG.latLng(54.92, 82.82),
                        zoom: 9
                    });

                    var markers = DG.markerClusterGroup();

                    // processing of coordinates for installation of markers
                    for (var i = 0; i < addressPoints.length; i++) {
                        var a = addressPoints[i];
                        var title = a[2];
                        var marker = DG.marker([a[0], a[1]], { title: title });
                        marker.bindPopup(title);
                        markers.addLayer(marker);
                    }

                    map.addLayer(markers);
                });
            </script>
        </body>
    </html>


### Heat map

Example of the heat map enabling. The heat map allows you to visualize the quantitative data depending on
a geographical region. The color intensity for each region depends on the values that correspond to it.

<script src="http://maps.api.2gis.ru/2.0/heat_realworld.js"></script>
<div id="map1" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function() {
        // Module code loading
        return DG.plugin('http://2gis.github.io/mapsapi/vendors/HeatLayer/heatLayer.js');
    }).then(function() {
        map = DG.map('map1', {
            center: DG.latLng(54.89, 82.45),
            zoom: 10
        });

        DG.heatLayer(addressPoints1).addTo(map);
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Heat map</title>
            <script src="http://maps.api.2gis.ru/2.0/loader.js"></script>
            <script src="http://maps.api.2gis.ru/2.0/heat_realworld.js"></script>
        </head>
        <body>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                DG.then(function() {
                    // Module code loading
                    return DG.plugin('http://2gis.github.io/mapsapi/vendors/HeatLayer/heatLayer.js');
                }).then(function() {
                    map = DG.map('map', {
                        center: DG.latLng(54.89, 82.45),
                        zoom: 10
                    });

                    DG.heatLayer(addressPoints1).addTo(map);
                });
            </script>
        </body>
    </html>
