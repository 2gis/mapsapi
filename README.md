DG MAPS API 2.0
====

Новая версия картографического API компании 2GIS.

Построено на базе библиотеки Leaflet.

Текущая версия 2.0.0

## Документация

## Зависимости

Приложение имеет следующие зависимости:

1. [Node.js]

[Node.js]: http://nodejs.org/

## Установка окружения

```bash
npm install -g jake
npm install
```

## Работа с приложением

### Получить список всех доступных команд

```bash
jake -ls
```

Результат:

```bash
jake lint      # Check JS files for errors with JSHint  
jake build     # Combine and minify source files  
jake test      # Rebuild and run unit tests  
jake watch     # Rebuild dist on changes src directory  
```


### Проверка исходных JS файлов с помощью [JSHint]

Выполняет проверку всех исходных файлов проекта.

```bash
jake lint
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
jake buld
```

##### Сборка с указанием имен модулей:

Применяется если необходимо собрать некий кастомный вариант API.

```bash
jake buld m=Module1,Module2,Module3
```
где Module1,Module2,Module3 - имя модулей API. 

Пример:

```bash
jake buld m=Core,TileLayer,JSONP
```

Результат:

```bash
dist/dg-map-custom-src.js  (исходный код)
dist/dg-map-custom.js      (минимизированный код)
```
Эти файлы находятся в игноре git-a.

##### Вариант сборки API в соответствии с заранее описаными пакетами:

```bash
jake buld b=build_name
```

где build_name - имя сборки. Доступные пакеты: base, standart, full.
Описание пакетов находится в файле build/packages.js.

Пример:

```bash
jake buld b=base
```

Результат:

```bash
dist/dg-map-custom-src.js  (исходный код)
dist/dg-map-custom.js      (минимизированный код)
```
Эти файлы находятся в игноре git-a.

##### Для обновления публичных сборок (которые доступны на GitHub в папке dist) выполните следующие команды:

```bash
jake buld b=public
```

Результат:

```bash
dist/dg-map-src.js  (исходный код)
dist/dg-map.js      (минимизированный код)
```
Эти файлы находятся в индексе git-a.

### Запуск тестов
