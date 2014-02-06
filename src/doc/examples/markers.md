## Работа с маркерами

{toc}

### Описание

В разделе описаны четыре примера по использованию маркеров.

Для получения полной информации следует обратиться к разделу  <a href="/doc/2.0/maps/manual/markers">Маркеры</a>.

### Маркер с балуном

Рассмотрим пример создания обычного маркера с балуном и нанесения их на карту.

<script src="http://maps.api.2gis.ru/2.0/loader.js?pkg=full" data-id="dgLoader"></script>
<div id="map" style="width: 600px; height: 500px; border: 1px solid #ccc;"></div>
<script type="text/javascript">
    var map;

    DG.then(function () {
        map = new DG.Map('map', {
            center: new DG.LatLng(54.981, 82.891),
            zoom: 15,
            dgGeoclicker: true
        });

        DG.marker([54.981, 82.891], {
            title: 'На меня можно жать',
        }).addTo(map).bindPopup('Я открылся!');
    });
</script>

Для начала необходимо подключить карту,

	<script src="http://maps.api.2gis.ru/2.0/loader.js?pkg=full" data-id="dgLoader"></script>

инициализировать 

	DG.then(function () {
        map = new DG.Map('map', {
            center: new DG.LatLng(54.981, 82.891),
            zoom: 15,
            dgGeoclicker: true
        });
    });

и отобразить.

	<div id="map" style="width: 600px; height: 500px;"></div>

Дальше создаем маркер и добавить его на карту.
	    
	DG.marker([54.981, 82.891], {
        title: 'На меня можно жать',
    }).addTo(map).bindPopup('Я открылся!');

 Финальный код страницы будет иметь такой вид:

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
			        map = new DG.Map('map', {
			            center: new DG.LatLng(54.98, 82.89),
			            zoom: 15,
			            dgGeoclicker: true
			        });

			        DG.marker([54.981, 82.891], {
			            title: 'На меня можно жать',
			        }).addTo(map).bindPopup('Я открылся!');
			    });
		    </script>
		</body>
	</html>

'title' даёт возможность сделать подсказку при наведении.
C помощью 'addTo(map)', добавляем маркер на карту. 
'bindPopup('Я открылся!')' создает балун с текстом, который появится при нажатии на маркер.

### Драгабельный маркер

Для некоторых задач необходимо иметь возможность переносить маркер. Пример такой возможности показан ниже.

<div id="map1" style="width: 600px; height: 500px; border: 1px solid #ccc;"></div>
<script type="text/javascript">
        var map1;

	    DG.then(function () {
	        map1 = new DG.Map('map1', {
	            center: new DG.LatLng(54.981, 82.891),
	            zoom: 15,
	            dgGeoclicker: true
	        });

	        DG.marker([54.981, 82.891], {
	            draggable: true,
	            title: 'Меня можно переносить',
	        }).addTo(map1);
	    });
</script>

Код, благодаря которому, подобную возможность можно осуществить

    DG.marker([54.981, 82.891], {
        draggable: true,
        title: 'Меня можно переносить',
    }).addTo(map);

Такого эффекта мы добились с помощью 'draggable: true' в опциях маркера.

Полный текст примера:


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
			        map = new DG.Map('map', {
			            center: new DG.LatLng(54.981, 82.891),
			            zoom: 15,
			            dgGeoclicker: true
			        });

			        DG.marker([54.981, 82.891], {
			            draggable: true,
			            title: 'Меня можно переносить',
			        }).addTo(map);
			 	});
		    </script>
		</body>
	</html>

### Кастомный маркер

Есть возможность так же отображать маркера не со стандартной, а с кастомной картинкой, пример ниже.

<div id="map2" style="width: 600px; height: 500px; border: 1px solid #ccc;"></div>
<script type="text/javascript">
    var map2;

	 DG.then(function () {
	    map2 = new DG.Map('map2', {
	        center: new DG.LatLng(54.981, 82.891),
	        zoom: 15,
	        dgGeoclicker: true
	    });

	    var myIcon = DG.icon({
	        iconUrl: 'http://maps.api.2gis.ru/2.0/example_logo.png',
	        iconSize: [48, 48]
	    });
	    DG.marker([54.981, 82.891], {
	        icon: myIcon
	    }).addTo(map2).bindPopup('Я кастомный маркер!');
	});
</script>

Для отображения кастомной картинки необходимо в опциях маркера указать параметр 'icon'.
Класс <a href='/doc/2.0/maps/manual/markers#класс-dgicon'>DG.icon</a> поможет нам в создании значения переменной 'icon'. В примере по создаем экземпляр, который содержит в своих опциях путь к картинке и размер маркера.

    var myIcon = DG.icon({
        iconUrl: 'http://maps.api.2gis.ru/2.0/example_logo.png',
        iconSize: [48, 48]
    });

Финальный текст примера:

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
				    map = new DG.Map('map', {
				        center: new DG.LatLng(54.981, 82.891),
				        zoom: 15,
				        dgGeoclicker: true
				    });

				    var myIcon = DG.icon({
				        iconUrl: 'http://maps.api.2gis.ru/2.0/example_logo.png',
				        iconSize: [48, 48]
				    });
				    DG.marker([54.981, 82.891], {
				        icon: myIcon
				    }).addTo(map).bindPopup('Я кастомный маркер!');
				});
		    </script>
		</body>
	</html>

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
