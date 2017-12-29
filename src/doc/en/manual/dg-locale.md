## Localization

{toc}

### Description

Maps API provides a possibility to display elements of user interface in several languages.

The default language is the same as that of the root html tag:

    <html lang="it">
        <head></head>
        <body></body>
    </html>

If the language is not specified in the root tag, then the default language — Russian — will be used.

Get or dynamically change the language using the corresponding methods of the map
<a href="/doc/maps/en/manual/map#map-getlang">getLang</a> and <a href="/doc/maps/en/manual/map#map-setlang">setLang</a>:

    map.setLang('it');
    map.getLang(); // returns 'it'

or by initializing the map with the following option <a href="/doc/maps/en/manual/map#map-currentlang">currentLang</a>.

Currently supports the following languages:

* en &mdash; English;
* ru &mdash; Russian;
* it &mdash; Italian;
* cs &mdash; Czech;
* es &mdash; Spanish;
* ar &mdash; Arabic.

### DG.Locale

Performs <a href="/doc/maps/en/manual/dg-locale">the translation of the user interface</a>.


Adds two methods to the map: <a href="/doc/maps/en/manual/map#map-setlang">setLang</a>
and <a href="/doc/maps/en/manual/map#map-getlang">getLang</a>. There is also a DG object.Locale object,
which you can add to any <a href="/doc/maps/en/manual/dg-external-modules">external module</a>,
and there will appear the t method which you can use to perform a translation.
Classes of modules, to which DG.Locale is added must contain the <code>_map</code> property and the <code>Dictionary</code>
static property inside.

The basic dictionary for all dictionaries is <code>DG.Dictionary</code>, which stores the translation rules
for words in plural forms (plural rules). When you create a module which uses its own dictionaries,
you need to put them to the lang folder. For example, if you want to use Italian and Russian languages,
you need to create the <code>lang/it.js</code> and <code>lang/ru.js</code> files. Examples of creation of dictionaries are given below.

#### Example of usage

Mixing of localization features to the module:

    DG.LocaleExample = DG.Control.extend({
        includes: DG.Locale,
        statics: {
            Dictionary: {}
        }
        ...
    }

Subscribe to the langchange event:

    this._map.on('langchange', this._updateText, this);

The translation of the string to the current language of the map:

    container.innerHTML = this.t("{n} people", 16700000) + ' ' + this.t("regularly use 2GIS");

Create your own dictionaries in Italian and Russian:

lang/it.js file contents:

    DG.LocaleExample.Dictionary.it = DG.extend({
        "{n} people" : ["{n} utente", "{n} utenti"],
        "regularly use 2GIS" : "utilizzano regolarmente 2GIS"
    }, DG.Dictionary.it);

lang/ru.js file contents:

     DG.LocaleExample.Dictionary.ru = DG.extend({
        "{n} people" : ["{n} пользователь", "{n} пользователя", "{n} пользователей"],
        "regularly use 2GIS" : "регулярно используют 2GIS"
    }, DG.Dictionary.ru);
