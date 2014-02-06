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

<div id="map1" style="width: 100%; height: 400px; border: 1px solid #ccc;"></div>
<script type="text/javascript">
    var map;
    DG.then(function () {
        map = DG.map('map1', {
            center: [54.98, 82.89],
            zoom: 15
        });
        DG.marker([54.98, 82.89], {
        	draggable: true
        }).addTo(map);
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
		    <div id="map" style="width: 100%; height: 400px;"></div>
			<script>
			    var map;
			    DG.then(function () {
			        map = DG.map('map', {
			            center: [54.98, 82.89],
			            zoom: 15
			        });
			        DG.marker([54.98, 82.89], {
			        	draggable: true
			        }).addTo(map);
			    });
			</script>
		</body>
	</html>

### Маркер с пользовательской иконкой

Вы можете задать маркеру собственную иконку:

<div id="map2" style="width: 100%; height: 400px; border: 1px solid #ccc;"></div>
<script>
    var map;
	DG.then(function() {
        map = DG.map('map2', {
            center: [54.98, 82.89],
            zoom: 15
        });
	    var myIcon = DG.icon({
	        iconUrl: 'http://maps.api.2gis.ru/2.0/example_logo.png',
	        iconSize: [48, 48]
	    });
	    DG.marker([54.98, 82.89], {
	        icon: myIcon
	    }).addTo(map);
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
			            zoom: 15
			        });
				    var myIcon = DG.icon({
				        iconUrl: 'http://maps.api.2gis.ru/2.0/example_logo.png',
				        iconSize: [48, 48]
				    });
				    DG.marker([54.98, 82.89], {
				        icon: myIcon
				    }).addTo(map);
				});
		    </script>
		</body>
	</html>
<!--
### Программное открытие маркера

Есть возможность открыть балун "по требованию". К примеру, по клику в ссылку, кнопку. Пример подобного случая представлен ниже.

<button id='open-popup'>open popup</button>

<div id="map3" style="width: 600px; height: 500px; border: 1px solid #ccc;"></div>
<script type="text/javascript">
    var map3;

	 DG.then(function () {
	    map3 = new DG.Map('map3', {
	        center: new DG.LatLng(54.981, 82.891),
	        zoom: 15,
	        dgGeoclicker: true
	    });

	    var marker = DG.marker([54.981, 82.891]).addTo(map3).bindPopup('Я открылся!');

	    document.getElementById('open-popup').onclick = clickButton;

		function clickButton() {
		    marker.openPopup();
		}
	});
</script>

Вешаем событие на кнопку
	
	document.getElementById('open-popup').onclick = clickButton;

Пишем обработчик события
    
    function clickButton() {
        marker.openPopup();
    }

Теперь при клике в элемент с id = open-popup у нас будет открываться балун маркера. Полный код примера ниже.

 	<!DOCTYPE html>
	<html>
		<head>
		    <meta charset='utf-8'>
		    <title>DG.marker Demo</title>
		    <script src="http://maps.api.2gis.ru/2.0/loader.js?pkg=full" data-id="dgLoader"></script>
		</head>
		<body>
		    <div id="map" style="width: 600px; height: 500px;"></div>
		    <script type="text/javascript">
			    var map;

				 DG.then(function () {
				    map3 = new DG.Map('map', {
				        center: new DG.LatLng(54.981, 82.891),
				        zoom: 15,
				        dgGeoclicker: true
				    });

				    var marker = DG.marker([54.981, 82.891]).addTo(map).bindPopup('Я открылся!');

				    document.getElementById('open-popup').onclick = clickButton;

					function clickButton() {
					    marker.openPopup();
					}
				});
		    </script>
		</body>
	</html>
-->