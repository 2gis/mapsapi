## Работа с балунами

{toc}

### Описание

Ниже приведены примеры использования балунов. Для получения подробной информации перейдите в раздел документации [Балуны](/doc/2.0/maps/manual/popup).

### Открытие балуна при клике на маркер

<script src="http://maps.api.2gis.ru/2.0/loader.js?pkg=full" data-id="dgLoader"></script>
<div id="map" style="width: 100%; height: 400px;"></div>
<script>
    DG.then(function () {
    	var map;
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
		    <title>Открытие балуна при клике на маркер</title>
		    <script src="http://maps.api.2gis.ru/2.0/loader.js?pkg=full"
		    data-id="dgLoader"></script>
		</head>
		<body>
		    <div id="map" style="width: 100%; height: 400px;"></div>
			<script>
			    DG.then(function() {
			    	var map;
			        map = DG.map('map', {
			            center: [54.98, 82.89],
			            zoom: 15
			        });
			        DG.marker([54.98, 82.89]).addTo(map).bindPopup('Я балун!');
			    });
			</script>
		</body>
	</html>

### Открытие балуна по умолчанию и по требованию

<input id="showPopup" type="button" value="Открыть балун" />
<div id="map1" style="width: 100%; height: 400px;"></div>
<script>
    var showButton = document.getElementById('showPopup');
	DG.then(function() {
		var map;
     	map = DG.map('map1', {
            center: [54.98, 82.89],
            zoom: 13
    	});
    	DG.popup([54.98, 82.89])
    		.setLatLng([54.98, 82.89])
    		.setContent('Я открыт по умолчанию')
    		.openOn(map);
		var myPopUp = DG.popup()
			.setLatLng([54.98, 82.89])
			.setContent('Я открылся по требованию и закрыл прошлый балун!');
		showButton.onclick = function() {myPopUp.openOn(map)};
	});
</script>

	<!DOCTYPE html>
	<html>
		<head>
		    <meta charset='utf-8' />
		    <title>Открытие балуна по умолчанию и по требованию</title>
		    <script src="http://maps.api.2gis.ru/2.0/loader.js?pkg=full"
		    data-id="dgLoader"></script>
		</head>
		<body>
			<input id="showPopup" type="button" value="Открыть балун" />
			<div id="map" style="width: 100%; height: 400px;"></div>
			<script>
			    var showButton = document.getElementById('showPopup');
				DG.then(function() {
					var map;
			     	map = DG.map('map', {
			            center: [54.98, 82.89],
			            zoom: 13
			    	});
			    	DG.popup([54.98, 82.89])
			    		.setLatLng([54.98, 82.89])
			    		.setContent('Я открыт по умолчанию')
			    		.openOn(map);
					var myPopUp = DG.popup()
						.setLatLng([54.98, 82.89])
						.setContent('Я открылся по требованию и закрыл прошлый балун!');
					showButton.onclick = function() {myPopUp.openOn(map)};
				});
			</script>
		</body>
	</html>

### Добавление нескольких балунов на карту

<div id="map2" style="width: 100%; height: 400px;"></div>
<script>
	DG.then(function() {
		var map;
			popups = DG.featureGroup(),
	        coordinates = [];

     	map = DG.map('map2', {
            center: [54.98, 82.89],
            zoom: 13
    	});

    	for (i = 0; i < 10; i++) {
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
</script>

	<!DOCTYPE html>
	<html>
		<head>
		    <meta charset='utf-8' />
		    <title>Добавление нескольких балунов на карту</title>
		    <script src="http://maps.api.2gis.ru/2.0/loader.js?pkg=full"
		    data-id="dgLoader"></script>
		</head>
		<body>
			<div id="map" style="width: 100%; height: 400px;"></div>
			<script>
				DG.then(function() {
					var map;
						popups = DG.featureGroup(),
				        coordinates = [];

			     	map = DG.map('map', {
			            center: [54.98, 82.89],
			            zoom: 13
			    	});

			     	// создаем 10 баулнов в случайных местах и добавляем их в группу
			    	for (i = 0; i < 10; i++) {
			            coordinates[0] = 54.98 - Math.random();
			            coordinates[1] = 82.89 + Math.random();
			            DG.popup()
			            	.setLatLng(coordinates)
			            	.setContent('Я балун №' + i)
			            	.addTo(popups);
			        }

			        popups.addTo(map);
			        //фокусируем область видимости на балунах
			        map.fitBounds(popups.getBounds());
				});
			</script>
		</body>
	</html>
