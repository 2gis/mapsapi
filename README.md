DG MAPS API 2.0
====

Новая версия картографического API компании 2GIS.

Построено на базе библиотеки Leaflet.

Текущая версия 2.0.0

## Окружение и зависимости приложения

Приложение имеет следующие зависимости:

1. [Node.js]
2. [PhantomJS (не обязательно, только для запуска unit тестов)]

[Node.js]: http://nodejs.org/
[PhantomJS (не обязательно, только для запуска unit тестов)]: http://phantomjs.org/download.html

Подробно про установку окружения: [Installation environment]

[Installation environment]: https://github.com/yarikos/DG.MapsAPI/wiki/Installation-environment

## Установка модулей

```bash
npm install -g grunt-cli
npm install
```

## Работа с приложением

### Получить список всех доступных команд

```bash
grunt
```

Результат:

```bash
grunt lint      # Check JS files for errors with JSHint  
grunt build     # Combine and minify source files  
grunt doc       # Generate documentation from .md source files
grunt test      # Rebuild and run unit tests  
```

### Проверка исходных JS файлов с помощью [JSHint]

Выполняет проверку всех исходных файлов проекта.

```bash
grunt lint
```

В случае ошибки выводит путь к файлу, номер строки, колонки и сообщение. Например:

```bash
./src/ProjectDetector/src/ProjectDetector.js  line 13 col 23	 Missing space after ':'.
./src/ProjectDetector/src/ProjectDetector.js  line 17 col 13	 Missing space after ':'.
./src/ProjectDetector/src/ProjectDetector.js  line 18 col 13	 Missing space after ':'.
```

[JSHint]: http://jshint.com/docs/

### Сборка и минификация

##### Базовая команда, результатом которой будет максимально полная сборка API:

```bash
grunt build
```

Результат:

```bash
dist/dg-map-custom-src.js  (исходный код)
dist/dg-map-custom.js      (минимизированный код)
```
Эти файлы находятся в игноре git-a.

##### Cборка кастомного варианта API с указанием имен модулей:

Применяется если необходимо собрать некий кастомный вариант API.

```bash
grunt build -m Module1,Module2,Module3
```
где Module1,Module2,Module3 - имя модулей API. 

Пример:

```bash
grunt build -m Core,TileLayer,JSONP
```

Результат:

```bash
dist/dg-map-custom-src.js  (исходный код)
dist/dg-map-custom.js      (минимизированный код)
```
Эти файлы находятся в игноре git-a.

##### Cборка кастомного варианта API по заранее описаным пакетами:

```bash
grunt build -p build_name
```

где build_name - имя сборки. Доступные пакеты: base, standart, full.
Описание пакетов находится в файле build/packs.js.

Пример:

```bash
grunt build -p base
```

Результат:

```bash
dist/dg-map-custom-src.js  (исходный код)
dist/dg-map-custom.js      (минимизированный код)
```
Эти файлы находятся в игноре git-a.

##### Для обновления полных публичных сборок (которые доступны на GitHub в папке dist) выполните следующие команды:

```bash
grunt build -p public
```

Результат:

```bash
dist/dg-map-src.js  (исходный код)
dist/dg-map.js      (минимизированный код)
```
Эти файлы находятся в индексе git-a.

##### Описание вывода в консоль

При выполнении сборки весь процесс сопровождается выводом сообщений к консоль.

Пример:

```bash
Build modules:
  * Core
  * EPSG3395
  * TileLayer
  * TileLayerWMS
  * TileLayerCanvas
  * ImageOverlay
  * Marker
  * DivIcon
  * Popup
  * LayerGroup
  * FeatureGroup
  * Path
  * PathVML
  + Polyline (deps of PathCanvas)
  + Polygon (deps of PathCanvas)
  + Circle (deps of PathCanvas)
  * PathCanvas
  * MultiPoly
  * Rectangle
  * CircleMarker
  * VectorsCanvas
  * GeoJSON
  * MapDrag
  * MouseZoom
  + MapAnimationZoom (deps of TouchZoom)
  * TouchZoom
  * BoxZoom
  * Keyboard
  * MarkerDrag
  * ControlZoom
  * ControlAttrib
  * ControlScale
  * ControlLayers
  * AnimationPan
  * AnimationTimer
  * AnimationZoom
  * Geolocation
  * DGCore
  * DGLayer
  * JSONP
  * ProjectDetector
  * Localization
  * DGControlZoom

Concatenating JS in 42 modules...

Concatenating CSS in 2 modules...

Compressing JS...

   Uncompressed size: 208.0 KB
   Compressed size:   116.6 KB

Compressing CSS...

   Uncompressed size: 15.4 KB
   Compressed size:   12.2 KB

Build successfully completed!
```

### Запуск unit тестов

Собирается свежий билд API (dist/dg-map-custom.js) и запускается веб-сервер для тестирования JSONP модуля на 3005 порту.

Запуск тестов происходит с помощью Karma.

##### Запуск unit тестов в PhantomJS (по-умолчанию)

```bash
grunt test
```

##### Запуск unit тестов в нативных браузерах текущей операционной системы

```bash
grunt test --ff --chrome
```

Доступны следующие браузеры:

    (default)   PhantomJS
    --chrome    Chrome
    --ff        Firefox
    --opera     Opera
    --safari    Safari
    --ie        IE (only Windows)
