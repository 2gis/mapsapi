DG MAPS API 2.0
====

## Зависимости

Приложение имеет следующие зависимости:

[Node.js] (желательно последняя версия)

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

### Проверка исходных JS файлов с помощью [JSHint]

Выполняет проверку всех исходных файлов проекта.

```bash
jake lint
```

В случае ошибки выводит путь к файлу, номер строки, колонки и сообщение. Например:

```bash
./src/ProjectDetector/src/ProjectDetector.js  line 13 col 23	 Missing space after ':'.
./src/ProjectDetector/src/ProjectDetector.js	line 17 col 13	 Missing space after ':'.
./src/ProjectDetector/src/ProjectDetector.js	line 18 col 13	 Missing space after ':'.
```

[JSHint]: http://jshint.com/docs/

### Сборка и минификация

Базовая команда, результатом которой будет максимально полная сборка API:

```bash
jake buld
```

