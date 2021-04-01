## All capabilities of 2GIS API&SDK
[dev.2gis.com](https://dev.2gis.com/)

## Full updated documentation
[docs.2gis.com/en](https://docs.2gis.com/en)


## General information

With maps API you can:

* <span style="color:323232">create interactive maps on the web page;</span>
* <span style="color:323232">display various objects on the map (markers, pop-ups, geometric objects);</span>
* <span style="color:323232">search on the map: to determine the coordinates of geoobjects by their names and the names by the coordinates.</span>

The source code of the maps API is available on [GitHub](https://github.com/2gis/mapsapi), the project is open to suggestions and pull-requests.

### Getting started

The following is a simple example of creating a map.

#### Connect API

To connect API JavaScript code, add the following code to the head section of the HTML page:

    <script src="https://maps.api.2gis.ru/2.0/loader.js?pkg=full"></script>

If you are interested in including the API code using npm, go to the [Connection API](/doc/maps/en/manual/dg-loading#npm) section.

#### Create a map container

To create a container in which the map will be displayed, you must add a block HTML element of the required size:

    <body>
        <div id="map" style="width:500px; height:400px"></div>
    </body>


#### Create map

Now everything is prepared for the map creation. To do this, add the following code to the head section:

    <script type="text/javascript">
        var map;

        DG.then(function () {
            map = DG.map('map', {
                center: [54.98, 82.89],
                zoom: 13
            });
        });
    </script>

In this example map takes two parameters:

* <span style="color:323232">center - the coordinates of the center of the map in the following format [latitude, longitude];</span>
* <span style="color:323232">zoom - the scale factor in the range from 1 to 18.</span>

#### Add marker to the map

After creating the map you can display a marker on it by adding one line of the code to the previously written one:

    <script type="text/javascript">
        var map;

        DG.then(function () {
            map = DG.map('map', {
                center: [54.98, 82.89],
                zoom: 13
            });

            DG.marker([54.98, 82.89]).addTo(map);
        });
    </script>

#### Show pop-up with information

If to extend a little the above added string of the code with a marker, then when clicking on the marker, a popup
will be displayed (pop up block) with the information you need:

    <script type="text/javascript">
        var map;

        DG.then(function () {
            map = DG.map('map', {
                center: [54.98, 82.89],
                zoom: 13
            });

            DG.marker([54.98, 82.89]).addTo(map).bindPopup('You've clicked on me!');
        });
    </script>

#### All together

Resulting code:

    <!DOCTYPE html>
    <html>
        <head>
            <title>API карт 2ГИС</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js?pkg=full"></script>
            <script type="text/javascript">
                var map;

                DG.then(function () {
                    map = DG.map('map', {
                        center: [54.98, 82.89],
                        zoom: 13
                    });

                    DG.marker([54.98, 82.89]).addTo(map).bindPopup('You have clicked on me!');
                });
            </script>
        </head>
        <body>
            <div id="map" style="width:500px; height:400px"></div>
        </body>
    </html>

### Further steps

Was everything successful? Now you can see the <a href="/doc/maps/en/manual/dg-loading">developer guide</a>
and <a href="/doc/maps/en/examples/base">examples of use</a>.

### Technical support

If you have any difficulties in working with the maps API &mdash;
<a href="mailto:api@2gis.ru">email us</a> and we will help you to solve the problem.
