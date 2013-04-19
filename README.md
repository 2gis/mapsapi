DG MAPS API 2.0
====

Новая версия картографического API компании 2GIS.

Построено на базе библиотеки Leaflet.

Текущая версия: 2.0.0

## Окружение и зависимости приложения

Приложение имеет следующие зависимости:

1. [Node.js](http://nodejs.org/)
2. [Grunt](The JavaScript Task Runner) (сборка приложения, генерация документации)
3. [PhantomJS](http://phantomjs.org/download.html) (не является обязательным, необходим только для запуска unit тестов)

[Подробно про установку окружения для разных операционных систем](https://github.com/yarikos/DG.MapsAPI/wiki/%D0%A3%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0-%D0%BE%D0%BA%D1%80%D1%83%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F-Maps-API-2.0)

## Работа с CLI приложения

##### Получить список всех доступных команд:

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

Подробное описание работы команд и соглашения по работе можно найти в [Документации разработчика API Карт](#)

## Документация для разработчика API Карт
* [Структура папок в репозитории](https://github.com/yarikos/DG.MapsAPI/wiki/Структура-репозитория)
* [Сборка API Карт](https://github.com/yarikos/DG.MapsAPI/wiki/Сборка-API-Карт)
 * Возможности, схема работы
 * Конфигурация
 * Проверка исходного кода с помощью JSHint
 * Сборка
 * Запуск веб-сервиса для раздачи собранного АПИ
* [Unit-тесты](https://github.com/yarikos/DG.MapsAPI/wiki/Unit-тесты)
 * Структура файлов с тестами
 * Запуск тестов
* [Документация](https://github.com/yarikos/DG.MapsAPI/wiki/Генерация-и-структура-документации)
 * Структура файлов с документацией
 * Генерация документации
