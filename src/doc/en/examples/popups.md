## Work with popups

{toc}

### Description

The following are examples of usage of pop-ups.
For more information go to the <a href="/doc/maps/en/manual/popup">Popups</a> section of documentation.

### Open a popup by clicking on a marker

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
            <title>Opens a popup when clicking on the marker</title>
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

### Open a popup by default and on demand

<input id="showPopup" type="button" value="Open popup" />
<div id="map1" style="width: 100%; height: 400px;"></div>
<script>
    var showButton = document.getElementById('showPopup');

    DG.then(function() {
        var map,
            myPopUp;

        map = DG.map('map1', {
            center: [54.98, 82.89],
            zoom: 13
        });

        DG.popup([54.98, 82.89])
            .setLatLng([54.98, 82.89])
            .setContent('I am opened by default')
            .openOn(map);

        myPopUp = DG.popup()
            .setLatLng([54.98, 82.89])
            .setContent('I have been opened on demand and closed the previous popup!');

        showButton.onclick = function() {myPopUp.openOn(map)};
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Open a popup by default and on demand</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <input id="showPopup" type="button" value="Открыть попап" />
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                var showButton = document.getElementById('showPopup');

                DG.then(function() {
                    var map,
                        myPopUp;

                    map = DG.map('map', {
                        center: [54.98, 82.89],
                        zoom: 13
                    });

                    DG.popup([54.98, 82.89])
                        .setLatLng([54.98, 82.89])
                        .setContent('I am opened by default')
                        .openOn(map);

                    myPopUp = DG.popup()
                        .setLatLng([54.98, 82.89])
                        .setContent('I have been opened on demand and closed the previous popup!');

                    showButton.onclick = function() {myPopUp.openOn(map)};
                });
            </script>
        </body>
    </html>

### Add several popups to the map

<div id="map2" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function() {
        var map,
            popups = DG.featureGroup(),
            coordinates = [];

        map = DG.map('map2', {
            center: [54.98, 82.89],
            zoom: 13
        });

        for (var i = 0; i < 10; i++) {
            coordinates[0] = 54.98 - Math.random();
            coordinates[1] = 82.89 + Math.random();
            DG.popup()
                .setLatLng(coordinates)
                .setContent('I am popup №' + i)
                .addTo(popups);
        }

        popups.addTo(map);
        map.fitBounds(popups.getBounds());
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Add several popups to the map</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <div id="map" style="width: 100%; height: 400px;"></div>
            <script>
                DG.then(function() {
                    var map,
                        popups = DG.featureGroup(),
                        coordinates = [];

                    map = DG.map('map', {
                        center: [54.98, 82.89],
                        zoom: 13
                    });

                    // create 10 popups in random places and add them to the group
                    for (var i = 0; i < 10; i++) {
                        coordinates[0] = 54.98 - Math.random();
                        coordinates[1] = 82.89 + Math.random();
                        DG.popup()
                            .setLatLng(coordinates)
                            .setContent('I am popup №' + i)
                            .addTo(popups);
                    }

                    popups.addTo(map);

                    // focus the scope on popups
                    map.fitBounds(popups.getBounds());
                });
            </script>
        </body>
    </html>

### The behavior of a popup with the sprawling parameter

<div id="map3" style="width: 300px; height: 150px;"></div>
<input style="width: 300px;" type="button" id="sprawling" value="The popup with enabled sprawling parameter" />
<input style="width: 300px;" type="button" id="no-sprawling" value="Popup without the sprawling parameter" />
<input style="width: 300px;" type="button" id="minWidth" value="Popup with a minimum width of 320px" />
<script>
    DG.then(function () {
        var latLng = DG.latLng([54.98, 82.89]),
            map = DG.map('map3', {
                center: latLng,
                zoom: 13,
                fullscreenControl: false,
                zoomControl: false
            });

        document.getElementById('sprawling').onclick = function () {
            DG.popup({
                maxWidth: 350,
                sprawling: true
            })
            .setLatLng(latLng)
            .setContent('I am a popup!')
            .openOn(map);
        };

        document.getElementById('no-sprawling').onclick = function () {
            DG.popup({
                maxWidth: 350
            })
            .setLatLng(latLng)
            .setContent('I am a popup!')
            .openOn(map);
        };

        document.getElementById('minWidth').onclick = function () {
            DG.popup({
                maxWidth: 350,
                minWidth: 320
            })
            .setLatLng(latLng)
            .setContent('I am a popup!')
            .openOn(map);
        };
    });
</script>

    <!DOCTYPE html>
    <html>
        <head>
            <title>Behaviour of the popup with the sprawling parameter</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js"></script>
        </head>
        <body>
            <div id="map" style="width: 300px; height: 150px;"></div>
            <input style="width: 300px;" type="button" id="sprawling" value="The popup with enabled sprawling parameter" />
            <input style="width: 300px;" type="button" id="no-sprawling" value="Popup without the sprawling parameter" />
            <input style="width: 300px;" type="button" id="minWidth" value="Popup with a minimum width of 320px" />
            <script>
                DG.then(function () {
                    var latLng = DG.latLng([54.98, 82.89]),
                        map;

                    // let's initialize the map with a width of 300 pixels
                    map = DG.map('map', {
                        center: latLng,
                        zoom: 13,
                        fullscreenControl: false,
                        zoomControl: false
                    });

                    // the popup with the enabled sprawling parameter
                    // will strech to the boundaries of the map
                    document.getElementById('sprawling').onclick = function () {
                        DG.popup({
                            maxWidth: 350,
                            sprawling: true
                        })
                        .setLatLng(latLng)
                        .setContent('I am a popup!')
                        .openOn(map);
                    };

                    // the popup with no sprawling parameter
                    // will adjust to the width of the content
                    document.getElementById('no-sprawling').onclick = function () {
                        DG.popup({
                            maxWidth: 350
                        })
                        .setLatLng(latLng)
                        .setContent('I am a popup!')
                        .openOn(map);
                    };

                    // the popup with a minimum width of  320px
                    // will go outside the boundaries of the map
                    document.getElementById('minWidth').onclick = function () {
                        DG.popup({
                            maxWidth: 350,
                            minWidth: 320
                        })
                        .setLatLng(latLng)
                        .setContent('I am a popup!')
                        .openOn(map);
                    };
                });
            </script>
        </body>
    </html>
