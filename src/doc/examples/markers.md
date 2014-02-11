## Работа с маркерами

{toc}

### Описание

Ниже приведены примеры использования маркеров. Для получения подробной информации перейдите в раздел документации <a href="/doc/2.0/maps/manual/markers">Маркеры</a>.

### Маркер с балуном

Маркер, при клике на который открывается балун с информацией:

<script src="http://maps.api.2gis.ru/2.0/loader.js?pkg=full" data-id="dgLoader"></script>
<div id="map" style="width: 100%; height: 400px; border: 1px solid #ccc;"></div>
<script>
    var map;

    DG.then(function () {
        map = DG.map('map', {
            center: [54.98, 82.89],
            zoom: 15
        });

        DG.marker([54.98, 82.89]).addTo(map).bindPopup('Я балун!');
    });
</script>

	<!DOCTYPE html>
	<html>
		<head>
		    <meta charset='utf-8' />
		    <title>Маркер с балуном</title>
		    <script src="http://maps.api.2gis.ru/2.0/loader.js?pkg=full"
		    data-id="dgLoader"></script>
		</head>
		<body>
		    <div id="map" style="width: 100%; height: 400px;"></div>
			<script>
			    var map;
			    DG.then(function () {
			        map = DG.map('map', {
			            center: [54.98, 82.89],
			            zoom: 15
			        });
			        DG.marker([54.98, 82.89]).addTo(map).bindPopup('Я балун!');
			    });
			</script>
		</body>
	</html>

### Перетаскиваемый маркер

Маркер, который пользователи могут перетаскивать:

Координаты маркера: <div id = "location">54.981, 82.891</div>

<div id="map1" style="width: 100%; height: 400px; border: 1px solid #ccc;"></div>
<script type="text/javascript">
    var map,
    marker;
    DG.then(function () {
        map = DG.map('map1', {
            center: [54.981, 82.891],
            zoom: 15
        });
        marker = DG.marker([54.981, 82.891], {
        	draggable: true
        }).addTo(map);
        marker.on('dragend', function(e) {
        	document.getElementById('location').innerHTML = e.target._latlng.lat.toFixed(3) + ", " + e.target._latlng.lng.toFixed(3);
        });
    });
</script>

	<!DOCTYPE html>
	<html>
		<head>
		    <meta charset='utf-8' />
		    <title>Перетаскиваемый маркер</title>
		    <script src="http://maps.api.2gis.ru/2.0/loader.js?pkg=full"
		    data-id="dgLoader"></script>
		</head>
		<body>
			Координаты маркера: <div id = "location">LatLng(54.98, 82.89)</div>
		    <div id="map" style="width: 100%; height: 400px;"></div>
			<script>
			    var map,
			    marker;
			    DG.then(function () {
			        map = DG.map('map', {
			            center: [54.98, 82.89],
			            zoom: 15
			        });
			        marker = DG.marker([54.98, 82.89], {
			        	draggable: true
			        }).addTo(map);
			        marker.on('dragend', function(e) {
        				document.getElementById('location').innerHTML = e.target._latlng.lat.toFixed(3) + ", " + e.target._latlng.lng.toFixed(3);
        			});
			    });
			</script>
		</body>
	</html>

### Маркер с пользовательской иконкой

Вы можете задать маркеру собственную иконку или простой элемент div вместо изображения:

<div id="map2" style="width: 100%; height: 400px; border: 1px solid #ccc;"></div>
<script>
    var map;
	DG.then(function() {
        map = DG.map('map2', {
            center: [54.98, 82.89],
            zoom: 13
        });
	    var myIcon = DG.icon({
	        iconUrl: 'http://maps.api.2gis.ru/2.0/example_logo.png',
	        iconSize: [48, 48]
	    });
	    DG.marker([54.98, 82.89], {
	        icon: myIcon
	    }).addTo(map);
		var myIcon = DG.divIcon(); 
		DG.marker([54.98, 82.87], {icon: myIcon}).addTo(map);
	});
</script>

	<!DOCTYPE html>
	<html>
		<head>
		    <meta charset='utf-8' />
		    <title>Маркер с пользовательской иконкой</title>
		    <script src="http://maps.api.2gis.ru/2.0/loader.js?pkg=full"
		    data-id="dgLoader"></script>
		</head>
		<body>
			<div id="map" style="width: 100%; height: 400px;"></div>
		    <script type="text/javascript">
			    var map;
				DG.then(function() {
			        map = DG.map('map', {
			            center: [54.98, 82.89],
			            zoom: 13
			        });
				    var myIcon = DG.icon({
				        iconUrl: 'http://maps.api.2gis.ru/2.0/example_logo.png',
				        iconSize: [48, 48]
				    });
				    DG.marker([54.98, 82.89], {
				        icon: myIcon
				    }).addTo(map);
				    var myIcon = DG.divIcon(); 
				    //По умолчанию установлен класс 'leaflet-div-icon', который стилизован как небольшой белый квадрат с тенью.
					DG.marker([54.98, 82.87], {icon: myIcon}).addTo(map);
				});
		    </script>
		</body>
	</html>

### Программное открытие маркера

Есть возможность открыть балун "по требованию". К примеру, по клику в ссылку, кнопку.

<button id='open-popup'>open popup</button>
<div id="map3" style="width: 100%; height: 400px; border: 1px solid #ccc;"></div>
<script>
    var map;
	DG.then(function() {
        map = DG.map('map3', {
            center: [54.98, 82.89],
            zoom: 15
    });
	var marker = DG.marker([54.98, 82.89]).addTo(map).bindPopup('Я балун!');
	var el = document.getElementById('open-popup');
	el.addEventListener('click', clickButton, false);
	function clickButton() {
	    marker.openPopup();
	}
	});
</script>

	<!DOCTYPE html>
	<html>
		<head>
		    <meta charset='utf-8' />
		    <title>Программное открытие маркера</title>
		    <script src="http://maps.api.2gis.ru/2.0/loader.js?pkg=full"
		    data-id="dgLoader"></script>
		</head>
		<body>
		    <div id="map" style="width: 100%; height: 400px;"></div>
			<script>
			    var map;
				DG.then(function() {
			        map = DG.map('map', {
			            center: [54.98, 82.89],
			            zoom: 15
			    });
				var marker = DG.marker([54.98, 82.89]).addTo(map).bindPopup('Я балун!');
				var el = document.getElementById('open-popup');
				el.addEventListener('click', clickButton, false);
				function clickButton() {
				    marker.openPopup();
				}
				});
			</script>
		</body>
	</html>

### Маркер с подсказкой

У маркера существует два вида подсказок, обычная и статическая. Обе рассмотрим в примере.

<div id="map4" style="width: 100%; height: 400px; border: 1px solid #ccc;"></div>
<script>
    var map;
	DG.then(function() {
        map = DG.map('map4', {
            center: [54.98, 82.89],
            zoom: 15
    });
	DG.marker([54.98, 82.89]).addTo(map).bindLabel('Я статическая подсказка!', { static: true });
	DG.marker([54.98, 82.88]).addTo(map).bindLabel('Я обычная подсказка!');
	});
</script>


	<!DOCTYPE html>
	<html>
		<head>
		    <meta charset='utf-8' />
		    <title>Маркер с подсказкой</title>
		    <script src="http://maps.api.2gis.ru/2.0/loader.js?pkg=full"
		    data-id="dgLoader"></script>
		</head>
		<body>
		    <div id="map" style="width: 100%; height: 400px;"></div>
				<script>
				    var map;
					DG.then(function() {
				        map = DG.map('map', {
				            center: [54.98, 82.89],
				            zoom: 15
				    });
					DG.marker([54.98, 82.89]).addTo(map).bindLabel('Я статическая подсказка!', { static: true });
					DG.marker([54.98, 82.88]).addTo(map).bindLabel('Я обычная подсказка!');
					});
				</script>
		</body>
	</html>

### Центрирование карты по маркеру

При клике в маркер, карта будет центрироваться по его позиции.

<div id="map5" style="width: 100%; height: 400px; border: 1px solid #ccc;"></div>
<script>
    var map;
	DG.then(function() {
        map = DG.map('map5', {
            center: [54.98, 82.89],
            zoom: 13
    });
	var marker1 = DG.marker([54.96, 82.889]).addTo(map);
	var marker2 = DG.marker([54.98, 82.893]).addTo(map);
	var marker3 = DG.marker([54.99, 82.896]).addTo(map);
	DG.featureGroup([marker1, marker2, marker3])
    .on('click', function(e) {
    	this._map.setView([e.latlng.lat, e.latlng.lng]);
    })
    .addTo(map);
	});
</script>


	<!DOCTYPE html>
	<html>
		<head>
		    <meta charset='utf-8' />
		    <title>Центрирование карты по маркеру</title>
		    <script src="http://maps.api.2gis.ru/2.0/loader.js?pkg=full"
		    data-id="dgLoader"></script>
		</head>
		<body>
		    <div id="map" style="width: 100%; height: 400px;"></div>
				<script>
				    var map;
					DG.then(function() {
				        map = DG.map('map', {
				            center: [54.98, 82.89],
				            zoom: 13
				    });
					var marker1 = DG.marker([54.97, 82.890]).addTo(map);
					var marker2 = DG.marker([54.98, 82.893]).addTo(map);
					var marker3 = DG.marker([54.99, 82.896]).addTo(map);
					DG.featureGroup([marker1, marker2, marker3])
				    .on('click', function(e) {
				    	map.setView([e.latlng.lat, e.latlng.lng]);
				    })
				    .addTo(map);
					});
				</script>
		</body>
	</html>

### Анимированное движение маркера

Пример маркера, который двигается по заданой траектории, в данном случае- круг.
<input id="move" type="button" value="move marker" />
<div id="map6" style="width: 100%; height: 400px; border: 1px solid #ccc;"></div>
<script>
    var map;
	DG.then(function() {
     	map = DG.map('map6', {
            center: [54.98, 82.89],
            zoom: 13
    	});
	var data = { type: 'LineString', coordinates: [] },    
		start = [],
	    center = [82.89, 54.98],
	    steps = 300,
	    radius = 0.009;
	for (var i = 0; i <= steps; i++) {
	    start[0] = (center[0] + radius * Math.cos(2 * Math.PI * i / steps));
	    start[1] = (center[1] + radius * Math.sin(2 * Math.PI * i / steps));
	    data.coordinates.push(start.slice());
	}

	var geojsonLayer = DG.geoJson(data).addTo(map)
	    marker = DG.marker([54.98, 82.89]).addTo(map),
	    j = 0;
		document.getElementById("move").onclick = move;
		function move() {
		    marker.setLatLng([data.coordinates[j][1], data.coordinates[j][0]]);
		    if (++j < data.coordinates.length) setTimeout(move, 100);
		}
	});
</script>

	<!DOCTYPE html>
	<html>
		<head>
		    <meta charset='utf-8' />
		    <title>Анимированное движение маркера</title>
		    <script src="http://maps.api.2gis.ru/2.0/loader.js?pkg=full"
		    data-id="dgLoader"></script>
		</head>
		<body>
			<input id="move" type="button" value="move marker" />
			<div id="map" style="width: 100%; height: 400px; border: 1px solid #ccc;"></div>
			<script>
			    var map;
				DG.then(function() {
			     	map = DG.map('map', {
			            center: [54.98, 82.89],
			            zoom: 13
			    	});
				var data = { type: 'LineString', coordinates: [] },    
					start = [],
				    center = [82.89, 54.98],
				    steps = 300,
				    radius = 0.009;
				for (var i = 0; i <= steps; i++) {
				    start[0] = (center[0] + radius * Math.cos(2 * Math.PI * i / steps));
				    start[1] = (center[1] + radius * Math.sin(2 * Math.PI * i / steps));
				    data.coordinates.push(start.slice());
				}

				var geojsonLayer = DG.geoJson(data).addTo(map)
				    marker = DG.marker([54.98, 82.89]).addTo(map),
				    j = 0;
					move();
					document.getElementById("move").onclick = move;
					function move() {
					    marker.setLatLng([data.coordinates[j][1], data.coordinates[j][0]]);
					    if (++j < data.coordinates.length) setTimeout(move, 100);
					}
				});
			</script>
		</body>
	</html>

### Отображение/удаление нескольких маркеров, fitBounds

Пример отображения и скрытия группы маркеров с автометическим определением рамок карты.

<input id="hide" type="button" value="hide markers" />
<input id="show" type="button" value="show markers" />
<div id="map7" style="width: 100%; height: 400px; border: 1px solid #ccc;"></div>
<script>
    var map;
    DG.then(function() {
        map = DG.map('map7', {
            center: [54.98, 82.89],
            zoom: 13
        });

        var markers = DG.featureGroup(),
        coordinates = [];
        for (i = 0; i  < 100; i++){
            coordinates[0] = 54.98 + Math.random();
            coordinates[1] = 82.89 + Math.random();
            DG.marker(coordinates).addTo(markers);
        }

        document.getElementById("hide").onclick = hideMarkers;
        document.getElementById("show").onclick = showMarkers;

        function showMarkers(){
            markers.addTo(map);
            map.fitBounds(markers.getBounds());
        };

        function hideMarkers(){
            markers.eachLayer(function (layer){ map.removeLayer(layer) } );
            console.log(markers);
        };
    });
</script>

	<!DOCTYPE html>
	<html>
		<head>
		    <meta charset='utf-8' />
		    <title>Отображение/удаление нескольких маркеров, fitBounds</title>
		    <script src="http://maps.api.2gis.ru/2.0/loader.js?pkg=full"
		    data-id="dgLoader"></script>
		</head>
	    <body>
	        <input id="hide" type="button" value="hide markers" />
	        <input id="show" type="button" value="show markers" />
	        <div id="map" style="width: 100%; height: 400px; border: 1px solid #ccc;"></div>
	        <script>
	            var map;
	            DG.then(function() {
	                map = DG.map('map', {
	                    center: [54.98, 82.89],
	                    zoom: 13
	                });

	                var markers = DG.featureGroup(),
	                coordinates = [];
	                for (i = 0; i  < 100; i++){
	                    coordinates[0] = 54.98 + Math.random();
	                    coordinates[1] = 82.89 + Math.random();
	                    DG.marker(coordinates).addTo(markers);
	                }

	                document.getElementById("hide").onclick = hideMarkers;
	                document.getElementById("show").onclick = showMarkers;

	                function showMarkers(){
	                    markers.addTo(map);
	                    map.fitBounds(markers.getBounds());
	                };

	                function hideMarkers(){
	                    markers.eachLayer(function (layer){ map.removeLayer(layer) } );
	                    console.log(markers);
	                };
	            });
	        </script>
	    </body>
	</html>
