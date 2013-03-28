DG MAPS API 2.0
====

Новая версия картографического API компании 2GIS.

Построено на базе библиотеки Leaflet.

Текущая версия 2.0.0

## Окружение и зависимости приложения

Приложение имеет следующие зависимости:

1. [Node.js]
2. [PhantomJS (для запуска unit тестов)]

[Node.js]: http://nodejs.org/
[PhantomJS (для запуска unit тестов)]: http://phantomjs.org/download.html

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
grunt -ls
```

Результат:

```bash
grunt lint      # Check JS files for errors with JSHint  
grunt build     # Combine and minify source files  
grunt test      # Rebuild and run unit tests  
grunt watch     # Rebuild dist on changes src directory  
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

##### Сборка с указанием имен модулей:

Применяется если необходимо собрать некий кастомный вариант API.

```bash
grunt build:Module1,Module2,Module3
```
где Module1,Module2,Module3 - имя модулей API. 

Пример:

```bash
grunt build:Core,TileLayer,JSONP
```

Результат:

```bash
dist/dg-map-custom-src.js  (исходный код)
dist/dg-map-custom.js      (минимизированный код)
```
Эти файлы находятся в игноре git-a.

##### Вариант сборки API в соответствии с заранее описаными пакетами:

```bash
grunt build:build_name
```

где build_name - имя сборки. Доступные пакеты: base, standart, full.
Описание пакетов находится в файле build/packages.js.

Пример:

```bash
grunt build:base
```

Результат:

```bash
dist/dg-map-custom-src.js  (исходный код)
dist/dg-map-custom.js      (минимизированный код)
```
Эти файлы находятся в игноре git-a.

##### Для обновления публичных сборок (которые доступны на GitHub в папке dist) выполните следующие команды:

```bash
grunt build:public
```

Результат:

```bash
dist/dg-map-src.js  (исходный код)
dist/dg-map.js      (минимизированный код)
```
Эти файлы находятся в индексе git-a.

### Запуск тестов

```bash
grunt test
```

Собирается билд API (dist/dg-map-custom-src.js) и запускается веб-сервер для тестирования JSONP модуля на 3005 порту.

Тесты запускаются с помощью Karma, по-умолчанию в PhantomJS.

##### Запуск тестов в нативных браузерах текущей операционной системы

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
