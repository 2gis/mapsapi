# -*- coding: utf-8 -*-
from classes.util.misc import extend


def pages():
    parts = dict(
        base={
            'title': u'base',
            'mapInit':
            u"""
            DG.then(function() {
                map = DG.map('map', {
                center: [54.98, 82.89],
                zoom: 13,
                geoclicker: true,
                worldCopyJump: true,
                zoomAnimation: false
            });

                DG.control.location({position: 'bottomright'}).addTo(map);
                DG.control.scale().addTo(map);
                DG.control.ruler({position: 'bottomleft'}).addTo(map);
                DG.control.traffic().addTo(map);
            });"""
        },
        demo={
            'title': u'demo',
            'mapInit':
            u"""
            var  options,
             balloonHTML;

            DG.then(function () {
                map = DG.map('map', {
                    center: [54.980156831455, 82.897440725094],
                    zoom: 13,
                    geoclicker: true,
                    worldCopyJump: true,
                    zoomControl: false,
                    fullscreenControl: false,
                    zoomAnimation: false
                });

                // change control position on touch devices
                if (DG.Browser.touch) {
                    options = { position: 'bottomright' };
                }

                DG.control.zoom(options).addTo(map);
                DG.control.traffic(options).addTo(map);
                DG.control.location(options).addTo(map);
                DG.control.ruler(options).addTo(map);
                if (DG.screenfull.isAvailable()) {
                    DG.control.fullscreen(options).addTo(map);
                }
                balloonHTML = '<a href="http://www.2gis.ru/" target="_blank">\\n\\
                <img src="/2.0/img/2gis-logo.png" alt="2GIS" title="2GIS" width="146" height="70" style="border: none"></a>\\n\\
                <p>Компания «ДубльГИС»</p>Тел.: (383) 363-05-55<br />Адрес: г. Новосибирск, Карла Маркса площадь, 7<br />\\n\\
                (МФК «Сан Сити»), 13 этаж';

                marker = DG.marker([54.980156831455, 82.897440725094]).addTo(map).bindPopup(balloonHTML).openPopup();
            });
            """,
            'headStyle':
            u"""
            html,body { height: 100%; margin: 0; padding: 0; }
            .leaflet-touch .leaflet-bottom .dg-attribution { margin-top: 70px; }
            .leaflet-touch .leaflet-bottom .dg-zoom {margin: 40px 10px 40px 0; }
            """
        },
        draggableMarker={
            'title': u'draggableMarker',
            'mapInit':
            u"""
            DG.then(function () {
                map = DG.map('map', {
                    center: [54.981, 82.891],
                    zoom: 15,
                    zoomAnimation: false
                });

                marker = DG.marker([54.981, 82.891], {
                    draggable: true
                }).addTo(map);
            });
            """
        },
        groupBalloon={
            'title': u'groupBalloon',
            'mapInit':
            u"""
            DG.then(function() {
                var map,
                    popups = DG.featureGroup(),
                    coordinates = [];
                map = DG.map('map', {
                    center: [54.98, 82.89],
                    zoom: 13,
                    zoomAnimation: false
                });
                for (var i = 0; i < 10; i++) {
                    coordinates[0] = 54.98 - Math.random();
                    coordinates[1] = 82.89 + Math.random();
                    DG.popup()
                        .setLatLng(coordinates)
                        .setContent('Я балун №' + i)
                        .addTo(popups);
                }

                popups.addTo(map);
                map.fitBounds(popups.getBounds());
            });
            """
        },
        groupMarkerEvent={
            'title': u'groupMarkerEvent',
            'mapInit':
            u"""
             DG.then(function() {

                map = DG.map('map', {
                    center: [54.98, 82.89],
                    zoom: 10,
                    zoomAnimation: false
                });

                marker1 = DG.marker([54.96, 82.889]).addTo(map);
                marker2 = DG.marker([54.98, 82.893]).addTo(map);
                marker3 = DG.marker([54.847182907052186, 83.06230008602144]).addTo(map);

                group = DG.featureGroup([marker1, marker2, marker3]);
                group.addTo(map);
                group.on('click', function(e) {
                    map.setView([e.latlng.lat, e.latlng.lng],{animate: false});
                });
            });
            """
        },
        markerLabels={
            'title': u'markerLabels',
            'mapInit':
            u"""
             DG.then(function() {
                map = DG.map('map', {
                    center: [54.98, 82.89],
                    zoom: 15,
                    zoomAnimation: false
                });

                DG.marker([54.98, 82.89])
                    .addTo(map)
                    .bindLabel("static", {
                        static: true
                    });

                DG.marker([54.98, 82.88])
                    .addTo(map)
                    .bindLabel('default');
            });
            """

        },
        openBalloons={
            'title': u'openBalloons',
            'mapInit':
            u"""
                DG.then(function() {
                    map = DG.map('map', {
                        center: [54.98, 82.89],
                        zoom: 13,
                        zoomAnimation: false
                    });

                    DG.popup([54.98, 82.89])
                        .setLatLng([54.98, 82.89])
                        .setContent('default')
                        .openOn(map);

                    myPopUp = DG.popup()
                        .setLatLng([54.98, 82.89])
                        .setContent('request');
                });
                function openPopUp() {myPopUp.openOn(map)};
            """,
            'controls':
            u"""
            <input id="showPopup" type="button" value="Открыть балун" onclick="openPopUp()"/>
            """
        },
        sprawlingBalloon={
            'title': u'sprawlingBalloon',
            'mapInit':
            u"""
            DG.then(function () {
                        latLng = DG.latLng([54.98, 82.89]);

                    map = DG.map('map', {
                        center: latLng,
                        zoom: 13,
                        fullscreenControl: false,
                        zoomControl: false,
                        zoomAnimation: false
                    });

                    document.getElementById('sprawling').onclick = function () {
                        DG.popup({
                            maxWidth: 350,
                            sprawling: true
                        })
                        .setLatLng(latLng)
                        .setContent('Я балун!')
                        .openOn(map);
                    };

                    document.getElementById('no-sprawling').onclick = function () {
                        DG.popup({
                            maxWidth: 350
                        })
                        .setLatLng(latLng)
                        .setContent('Я балун!')
                        .openOn(map);
                    };

                    document.getElementById('minWidth').onclick = function () {
                        DG.popup({
                            maxWidth: 350,
                            minWidth: 320
                        })
                        .setLatLng(latLng)
                        .setContent('Я балун!')
                        .openOn(map);
                    };
                });
                function resize(pixels){
                    document.getElementById('map').style.width = pixels + "px";
                    map.invalidateSize(false);
                }
            """,
            'controls':
            u"""
            <div>
                <input style="width: 300px;" type="button" id="sprawling" value="Sprawling"><br />
                <input style="width: 300px;" type="button" id="no-sprawling" value="No sprawling"><br />
                <input style="width: 300px;" type="button" id="minWidth" value="Minimal width 320px"><br />
                <input style="width: 300px;" type="button" id="small" value="Small map" onclick="resize(200)"><br />
                <input style="width: 300px;" type="button" id="mid" value="Medium map" onclick="resize(300)"><br />
                <input style="width: 300px;" type="button" id="large" value="Large map" onclick="resize(500)">
            </div>
            """,
            'style': u"""width: 300px; height: 150px;"""
        },
        scrollBarBaloon={
            'title': u'scrollBarBalloon',
            'mapInit':
            u"""
            DG.then(function () {
                        latLng = DG.latLng([54.98, 82.89]);

                    map = DG.map('map', {
                        center: latLng,
                        zoom: 13,
                        fullscreenControl: false,
                        zoomControl: false,
                        zoomAnimation: false
                    });

                    document.getElementById('scrollBar').onclick = function () {
                        DG.popup({
                            maxHeight: 300,
                        })
                        .setLatLng(latLng)
                        .setContent('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus ipsam itaque velit aut error ipsa sunt neque, ut molestiae. Omnis officia architecto similique, enim et voluptates sunt doloremque error repudiandae, iure est a quisquam, nulla voluptatibus quis nostrum voluptas vel ipsa consequatur ipsum velit. Nam laudantium, nemo iste enim ut soluta et explicabo amet nulla impedit sequi animi consectetur alias repellendus, laboriosam dolor dolorum tenetur quod modi sunt sapiente recusandae, pariatur! Delectus nihil provident hic perferendis veniam atque id, ad ipsum error laudantium, quo praesentium qui! Odit saepe distinctio aperiam autem dolor beatae nam, nostrum voluptate, reprehenderit tenetur quidem aspernatur!')
                        .openOn(map);
                    };

                    document.getElementById('noMaxHeight').onclick = function () {
                        DG.popup()
                        .setLatLng(latLng)
                        .setContent('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, perspiciatis corrupti? Minima beatae sed delectus obcaecati, officia eos! Sint, excepturi facere iusto, sapiente facilis repellat. Eum facere, illo necessitatibus voluptatibus, illum quas. Cumque nisi incidunt, facere laboriosam asperiores nihil fugiat dolor dolorum sequi soluta consectetur non nulla vel praesentium omnis.')
                        .openOn(map);
                    };

                    document.getElementById('noScrollBar').onclick = function () {
                        DG.popup({
                            maxHeight: 300
                        })
                        .setLatLng(latLng)
                        .setContent('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas numquam distinctio impedit, quod totam eveniet dolorum qui? Corporis praesentium ipsum officiis impedit quas, inventore laboriosam ipsam nobis soluta maxime delectus quasi voluptatem, tenetur obcaecati laudantium error. Velit expedita, reprehenderit natus nihil cupiditate doloribus quis? In obcaecati cupiditate vero laudantium maiores.')
                        .openOn(map);
                    };
                });
            """,
            'controls':
            u"""
            <div>
                <input style="width: 300px;" type="button" id="scrollBar" ><br />
                <input style="width: 300px;" type="button" id="noMaxHeight"><br />
                <input style="width: 300px;" type="button" id="noScrollBar"><br />
            </div>
            """,
            'style': u"""width: 300px; height: 500px;"""
        },
        boundsNsk={
            'title': u'boundsNsk',
            'mapInit':
            u"""
            DG.then(function() {
                map = DG.map('map', {
                    center: [54.98, 82.89],
                    zoom: 10,
                    maxBounds: [
                        [54.8220, 82.4304],
                        [55.1372, 83.3505]
                    ],
                    minZoom: 10,
                    maxZoom: 15,
                    zoomAnimation: false
                });
            });
            """,
            'style': 'width: 670px; height: 400px;'
        },
        clickEvent={
            'title': u'clickEvent',
            'mapInit':
            u"""
            DG.then(function() {
                    var clickedElement = document.getElementById('info'),
                    coords = [
                        [54.99, 82.88],
                        [54.985, 82.94],
                        [54.984, 82.925],
                        [54.981, 82.928]
                    ];

                map = DG.map('map', {
                    center: [54.98, 82.89],
                    zoom: 13,
                    zoomAnimation: false
                });

                map.on('click', function(e) {
                    clickedElement.innerHTML = 'map ' + e.latlng.lat + ', ' + e.latlng.lng;
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
            """,
            'style': u"width: 100%; height: 400px;"
        },
        lazyLoad={
            'title': u'lazyLoad',
            'getParams': u'?lazy=true'
        },
        notLazyLoad={
            'title': u'notLazyLoad',
            'getParams': u'?lazy=false'
        }
    )
    defaults = dict(
        style='width: 1000px; height: 600px;',
        loaderPath='..',
        dgLoader='data-id="dgLoader"'
    )
    return extend(defaults, parts)
