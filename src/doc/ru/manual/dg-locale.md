## Локализация

{toc}

### Описание

API карт предоставляет возможность отображения элементов пользовательского интерфейса на нескольких языках.

По умолчанию задается такой же язык, как и у корневого тега html:

    <html lang="it">
        <head></head>
        <body></body>
    </html>

Если язык в корневом теге не указан, тогда будет использоваться язык по умолчанию — русский.

Получить или динамически изменить язык можно с помощью соответствующих методов карты
<a href="/doc/maps/ru/manual/map#map-getlang">getLang</a> и <a href="/doc/maps/ru/manual/map#map-setlang">setLang</a>:

    map.setLang('it');
    map.getLang(); // вернет 'it'

или проинициализировав карту со следующей опцией <a href="/doc/maps/ru/manual/map#map-currentlang">currentLang</a>.

На данный момент поддерживаются следующие языки:

* en &mdash; английский;
* ru &mdash; русский;
* it &mdash; итальянский;
* cs &mdash; чешский;
* es &mdash; испанский;
* ar &mdash; арабский.

### DG.Locale

Осуществляет <a href="/doc/maps/ru/manual/dg-locale">перевод пользовательского интерфейса</a>.

Добавляет в карту два метода: <a href="/doc/maps/ru/manual/map#map-setlang">setLang</a> и
<a href="/doc/maps/ru/manual/map#map-getlang">getLang</a>. Также имеется объект DG.Locale, который можно подмешать
в любой <a href="/doc/maps/ru/manual/dg-external-modules">внешний модуль</a>, после чего в нем появится метод t,
с помощью которого можно осуществить перевод. Классы модулей, к которым примешивается DG.Locale должны
содержать внутри себя свойство <code>_map</code> и статическое свойство <code>Dictionary</code>.

Базовым для всех словарей является словарь <code>DG.Dictionary</code>, в котором хранятся правила перевода слов во
множественные формы (plural rules). При создании модуля, использующего свои словари, необходимо их разместить
в папке lang. К примеру, если вы будете использовать итальянский и русский языки, тогда необходимо создать
файлы <code>lang/it.js</code> и <code>lang/ru.js</code>. Примеры создания словарей рассмотрены ниже.

#### Пример использования

Подмешивание (mixin) возможности локализации в модуль:

    DG.LocaleExample = DG.Control.extend({
        includes: DG.Locale,
        statics: {
            Dictionary: {}
        }
        ...
    }

Подписка на событие langchange:

    this._map.on('langchange', this._updateText, this);

Перевод строки на текущий язык карты:

    container.innerHTML = this.t("{n} people", 16700000) + ' ' + this.t("regularly use 2GIS");

Создание собственных словарей на итальянском и русском языках:

Cодержимое файла lang/it.js:

    DG.LocaleExample.Dictionary.it = DG.extend({
        "{n} people" : ["{n} utente", "{n} utenti"],
        "regularly use 2GIS" : "utilizzano regolarmente 2GIS"
    }, DG.Dictionary.it);

Cодержимое файла lang/ru.js:

     DG.LocaleExample.Dictionary.ru = DG.extend({
        "{n} people" : ["{n} пользователь", "{n} пользователя", "{n} пользователей"],
        "regularly use 2GIS" : "регулярно используют 2GIS"
    }, DG.Dictionary.ru);
