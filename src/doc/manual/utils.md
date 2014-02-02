## Утилиты

{toc}

### Описание

Служебный функционал, необходимый для работы API карт и разработки <a href="https://github.com/2gis/maps-api-2.0/blob/master/CONTRIBUTING.md#%D0%9A%D0%B0%D0%BA-%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0%D1%82%D1%8C-%D1%81%D0%BE%D0%B1%D1%81%D1%82%D0%B2%D0%B5%D0%BD%D0%BD%D1%8B%D0%B9-%D0%BC%D0%BE%D0%B4%D1%83%D0%BB%D1%8C" target="_blank">собственных модулей</a>.

### DG.Class

`DG.Class` предоставляет возможность использовать ООП подход в разработке функционала API карт, используется для реализации большинства классов, приведенных в этой документации.

Кроме реализации простой классической модели наследования имеются несколько свойств для удобной организации кода, такие как `options`, `includes` и `statics`.

    var MyClass = DG.Class.extend({
        initialize: function (greeter) {
            this.greeter = greeter;
            // конструктор класса
        },

        greet: function (name) {
            alert(this.greeter + ', ' + name)
        }
    });

    // создает объект класса MyClass и передает "Hello" в конструктор
    var a = new MyClass("Hello");

    // вызывает метод greet, который показывает всплывающее окно с текстом "Hello, World"
    a.greet("World");


#### Наследование

Для определения новых классов используется конструкция `DG.Class.extend`, также метод `extend` можно использовать в любом классе, который наследуется от `DG.Class`:

    var MyChildClass = MyClass.extend({
        // ... новые свойства и методы
    });

Данный код создаст класс, который наследует все методы и свойства родительского класса (через цепочку прототипов), также возможно добавление или переопределение родительских методов и свойств. Кроме того, корректно обрабатывается оператор `instanceof`:

    var a = new MyChildClass();
    a instanceof MyChildClass; // true
    a instanceof MyClass; // true

Вы можете вызывать родительские методы (включая конструктор) из потомков (так, как вы бы делали это с помощью вызова `super` в других языках программирования) с помощью JavaScript функций `call` или `apply`:

    var MyChildClass = MyClass.extend({
        initialize: function () {
            MyClass.prototype.initialize.call("Yo");
        },

        greet: function (name) {
            MyClass.prototype.greet.call(this, 'bro ' + name + '!');
        }
    });

    var a = new MyChildClass();
    a.greet('Jason'); // выведет "Yo, bro Jason!"

#### Опции

`options` &mdash; это специальное свойство, которое в отличии от других объектов передаваемых через `extend` будет слито с аналогичным свойством родителя, вместо полного переопределения, это позволяет управлять конфигурацией объектов и значениями по умолчанию:

    var MyClass = DG.Class.extend({
        options: {
            myOption1: 'foo',
            myOption2: 'bar'
        }
    });

    var MyChildClass = DG.Class.extend({
        options: {
            myOption1: 'baz',
            myOption3: 5
        }
    });

    var a = new MyChildClass();
    a.options.myOption1; // 'baz'
    a.options.myOption2; // 'bar'
    a.options.myOption3; // 5

Также имеется метод `DG.Util.setOptions`, который позволяет сливать опции переданные в конструктор с изначально заданными опциями:

    var MyClass = DG.Class.extend({
        options: {
            foo: 'bar',
            bla: 5
        },

        initialize: function (options) {
            DG.Util.setOptions(this, options);
            ...
        }
    });

    var a = new MyClass({bla: 10});
    a.options; // {foo: 'bar', bla: 10}

#### Включения

`includes` &mdash; это специальное свойство, которое подмешивает объекты в класс (такие объекты называются mixin-ами).

     var MyMixin = {
        foo: function () { ... },
        bar: 5
    };

    var MyClass = DG.Class.extend({
        includes: MyMixin
    });

    var a = new MyClass();
    a.foo();

Также вы можете подмешивать объекты в процессе выполнения программы с помощью метода `include`:

    MyClass.include(MyMixin);

#### Статика

`statics` &mdash; это свойство, в котором описываются статические элементы класса, удобно использовать для определения констант:

    var MyClass = DG.Class.extend({
        statics: {
            FOO: 'bar',
            BLA: 5
        }
    });

    MyClass.FOO; // 'bar'

#### Фабрики классов

Для создания новых объектов классов используются фабричные методы, которые имеют такое же название, как и у класса, но начинаются с нижнего регистра. Это аналог ключевого слова `new`, то есть, данные строки кода эквивалентны:

    new DG.Map('map');
    DG.map('map');

Реализовать фабричный метод в собственных классах довольно просто, например:

    DG.map = function (id, options) {
        return new DG.Map(id, options);
    };

#### Зацепки конструктора

Если вы разрабатываете модуль к API, тогда велика вероятность того, что вам понадобится выполнить дополнительные действия при инициализации объектов существующих классов (например, при инициализации объекта `DG.Polyline`). Для подобного рода задач имеется метод `addInitHook`:

    MyClass.addInitHook(function () {
        // ... выполнить дополнительные действия при вызове конструктора
        // например, добавить обработчики событий, установить значения свойств и т.п.
    });

Также можно использовать сокращенную запись, если необходимо вызвать лишь один метод при инициализации:

    MyClass.addInitHook('methodName', arg1, arg2, …);

### DG.Browser

Объект со свойствами, необходимыми для определения браузера/фичи, например:

    if (DG.Browser.ie6) {
        alert('Вам срочно нужно обновить свой браузер!');
    }

<table>
    <thead>
        <tr>
            <th>Свойство</th>
            <th>Тип</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>ie</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> для всех версий Internet Explorer.</td>
        </tr>
        <tr>
            <td><code><b>ie6</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> для Internet Explorer 6.</td>
        </tr>
        <tr>
            <td><code><b>ie7</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> для Internet Explorer 7.</td>
        </tr>
        <tr>
            <td><code><b>webkit</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> для браузеров на основе WebKit, таких как Chrome и Safari (включая мобильные версии).</td>
        </tr>
        <tr>
            <td><code><b>webkit3d</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> для браузеров на основе WebKit, поддерживающих CSS 3D трансформации.</td>
        </tr>
        <tr>
            <td><code><b>android</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> для мобильных браузеров Android устройств.</td>
        </tr>
        <tr>
            <td><code><b>android23</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> для мобильных браузеров на старых версиях Android устройств (2 и 3).</td>
        </tr>
        <tr>
            <td><code><b>mobile</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> для браузеров, работающих на современных мобильных устройствах (включая iOS Safari и различные Android устройства).</td>
        </tr>
        <tr>
            <td><code><b>mobileWebkit</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> для мобильных браузеров на основе WebKit.</td>
        </tr>
        <tr>
            <td><code><b>mobileOpera</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> для мобильной версии Opera.</td>
        </tr>
        <tr>
            <td><code><b>touch</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> для всех браузеров, работающих на тач-устройствах.</td>
        </tr>
        <tr>
            <td><code><b>msTouch</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> для браузеров с тач-моделью от Microsoft (например, IE10).</td>
        </tr>
        <tr>
            <td><code><b>retina</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> для устройств с Retina экранами.</td>
        </tr>
    </tbody>
</table>

### DG.Util

Общие служебные методы и свойства.

#### Методы

<table>
    <thead>
        <tr>
            <th>Метод</th>
            <th>Возвращает</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>extend</b>(
                <nobr>&lt;Object&gt; <i>dest</i></nobr>,
                <nobr>&lt;Object&gt; <i>src?..</i> )</nobr>
            </code></td>

            <td><code>Object</code></td>
            <td>Сливает свойства объекта <code>src</code> (или нескольких объектов) в свойства объекта <code>dest</code> и возвращает последний. Также имеется псевдоним <code>DG.extend</code>.</td>
        </tr>
        <tr>
            <td><code><b>bind</b>(
                <nobr>&lt;Function&gt; <i>fn</i></nobr>,
                <nobr>&lt;Object&gt; <i>obj</i> )</nobr>
            </code></td>
            <td><code>Function</code></td>
            <td>Возвращает функцию, которая выполняет функцию <code>fn</code> с определенным объектом контекста <code>obj</code> (так, чтобы ключевое слово <code>this</code> внутри функции указывало на <code>obj</code>). Также имеется псевдоним <code>DG.bind</code>.</td>
        </tr>
        <tr>
            <td><code><b>stamp</b>(
                <nobr>&lt;Object&gt; <i>obj</i> )</nobr>
            </code></td>

            <td><code>String</code></td>
            <td> Применяет уникальный ключ к объекту и возвращает его значение. Полезно для получения быстрого доступа к объекту, находящемуся в группе.</td>
        </tr>
        <!-- TODO Commented out for the time being:
        https://github.com/Leaflet/Leaflet/pull/793#discussion_r1134904
        <tr>
            <td><code><b>requestAnimFrame</b>()</code></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td><code><b>cancelAnimFrame</b>()</code></td>
            <td></td>
            <td></td>
        </tr>
        -->
        <tr>
            <td><code><b>limitExecByInterval</b>(
                <nobr>&lt;Function&gt; <i>fn</i></nobr>,
                <nobr>&lt;Number&gt; <i>time</i></nobr>,
                <nobr>&lt;Object&gt; <i>context?</i> )</nobr>
            </code></td>

            <td><code>Function</code></td>
            <td>Возвращает обертку над функцией <code>fn</code>, которая гарантирует, что функция не будет вызвана чаще, чем раз в указанный интервал времени <code>time</code> (например, используется при запросах к тайлам во время перетаскивания карты), опционально можно передать контекст (<code>context</code>), в котором будет вызываться функция.</td>
        </tr>
        <tr>
            <td><code><b>formatNum</b>(
                <nobr>&lt;Number&gt; <i>num</i></nobr>,
                <nobr>&lt;Number&gt; <i>digits</i> )</nobr>
            </code></td>

            <td><code>Number</code></td>
            <td>Возвращает число <code>num</code> округленное до <code>digits</code> знаков.</td>
        </tr>
        <tr>
            <td><code><b>splitWords</b>(
                <nobr>&lt;String&gt; <i>str</i> )</nobr>
            </code></td>

            <td><code>String[]</code></td>
            <td>Обрезает и разделяет строку на части, используя в качестве разделителя пробел, возвращает массив с этими частями.</code></td>
        </tr>
        <tr>
            <td><code><b>setOptions</b>(
                <nobr>&lt;Object&gt; <i>obj</i></nobr>,
                <nobr>&lt;Object&gt; <i>options</i> )</nobr>
            </code></td>

            <td><code>Object</code></td>
            <td>Сливает переданные опции со свойством <code>options</code> объекта <code>obj</code>, возвращает результирующий объект. См. <a href="#class-options">Опции класса</a>. Также имеется псевдоним <code>DG.setOptions</code>.</td>
        </tr>
        <tr>
            <td><code><b>getParamString</b>(
                <nobr>&lt;Object&gt; <i>obj</i> )</nobr>
            </code></td>

            <td><code>String</code></td>
            <td>Преобразует объект в URL-строку, например, <nobr><code>{a: "foo", b: "bar"}</code></nobr> будет преобразован в <code><span class="string">'?a=foo&amp;b=bar'</span></code>.</td>
        </tr>
        <tr>
            <td><code><b>template</b>(
                <nobr>&lt;String&gt; <i>str</i>, &lt;Object&gt; <i>data</i> )</nobr>
            </code></td>

            <td><code>String</code></td>
            <td>Простая функция-шаблонизатор, создает строку применяя значения из объекта <code>data</code> в формате <code>{a: 'foo', b: 'bar', &hellip;}</code> к строке шаблона в формате <code>'Hello {a}, {b}'</code> &mdash; в этом примере будет возвращена строка <code>'Hello foo, bar'</code>.</td>
        </tr>
        <tr>
            <td><code><b>isArray</b>(
                <nobr>&lt;Object&gt; <i>obj</i> )</nobr>
            </code></td>

            <td><code>Boolean</code></td>
            <td>Возвращает <code>true</code>, если переданный объект является массивом.</td>
        </tr>
        <tr>
            <td><code><b>trim</b>(
                <nobr>&lt;String&gt; <i>str</i> )</nobr>
            </code></td>

            <td><code>String</code></td>
            <td>Обрезает пробелы с обеих сторон строки и возвращает результат.</td>
        </tr>
    </tbody>
</table>

#### Свойства

<table>
    <tr>
        <th>Свойство</th>
        <th>Тип</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>emptyImageUrl</b></code></td>
        <td><code>String</code></td>
        <td>URI, содержащий пустое GIF изображение, закодированное в base64. Используется для освобождения памяти неиспользуемых картинок в мобильных WebKit браузерах (память освобождается установкой свойства <code>src</code> в данное значение).</td>
    </tr>
</table>

### DG.Locale

Функционал, с помощью которого осуществляется <a href="#">перевод пользовательского интерфейса</a>.

Подмешивает в карту два метода: <a href="">setLang</a> и <a href="">getLang</a>. Также имеется объект DG.Locale, который можно подмешать в любой <a href="">внешний модуль</a>, после чего в нем появится метод t, с помощью которого можно осуществить перевод. Объекты модулей, к которым примешивается DG.Locale должны содержать внутри себя свойство `_map` и статическое свойство `Dictionary`. Базовым для всех словарей является словарь `DG.Dictionary`, в котором хранятся правила перевода слов во множественные формы (plural rules). При создании модуля, использующего свои словари, необходимо их разместить в папке lang. К примеру, если вы будете использовать итальянский и русский языки, тогда необходимо создать файлы lang/it.js и lang/ru.js. Примеры создания словарей рассмотрены ниже.

#### Пример использования
Подмешивание (mixin) функционала локализации в модуль:

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

### DG.LineUtil

Набор методов для обработки ломаных.

<table>
    <thead>
        <tr>
            <th>Метод</th>
            <th>Возвращает</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>simplify</b>(
                <nobr>&lt;<a href="#point">Point</a>[]&gt; <i>points</i></nobr>,
                <nobr>&lt;Number&gt; <i>tolerance</i> )</nobr>
            </code></td>
            <td><code><a href="#point">Point</a>[]</code></td>
            <td>Уменьшает количество точек в ломаной и возвращает новую упрощенную ломаную. Позволяет увеличить производительность обработки/отображения ломаных на карте. Параметр <code>tolerance</code> влияет на величину упрощения (чем меньше значение, тем лучше качество геометрии и ниже производительность).</td>
        </tr>
        <tr>
            <td><code><b>pointToSegmentDistance</b>(
                <nobr>&lt;<a href="#point">Point</a>&gt; <i>p</i></nobr>,
                <nobr>&lt;<a href="#point">Point</a>&gt; <i>p1</i></nobr>,
                <nobr>&lt;<a href="#point">Point</a>&gt; <i>p2</i> )</nobr>
            </code></td>
            <td><code>Number</code></td>
            <td>Возвращает расстояние между точкой <code>p</code> и сегментом между точками <code>p1</code> и <code>p2</code>.
        </tr>
        <tr>
            <td><code><b>closestPointOnSegment</b>(
                <nobr>&lt;<a href="#point">Point</a>&gt; <i>p</i></nobr>,
                <nobr>&lt;<a href="#point">Point</a>&gt; <i>p1</i></nobr>,
                <nobr>&lt;<a href="#point">Point</a>&gt; <i>p2</i> )</nobr>
            </code></td>
            <td><code><a href="#point">Point</a></code></td>
            <td>Возвращает ближайшую точку на сегменте <code>p1</code> <code>p2</code> до точки <code>p</code>.</td>
        </tr>
        <tr>
            <td><code><b>clipSegment</b>(
                <nobr>&lt;<a href="#point">Point</a>&gt; <i>a</i></nobr>,
                <nobr>&lt;<a href="#point">Point</a>&gt; <i>b</i></nobr>,
                <nobr>&lt;<a href="#bounds">Bounds</a>&gt; <i>bounds</i> )</nobr>
            </code></td>
            <td><code>-</code></td>
            <td>Обрезает сегмент <code>a</code> <code>b</code> по прямоугольной области (модифицируются непосредственно точки сегмента).</td>
        </tr>
    </tbody>
</table>

### DG.PolyUtil

Набор методов для обработки точек многоугольников.

<table>
    <tr>
        <th>Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>clipPolygon</b>(
            <nobr>&lt;<a href="#point">Point</a>[]&gt; <i>points</i></nobr>,
            <nobr>&lt;<a href="#bounds">Bounds</a>&gt; <i>bounds</i> )</nobr>
        </code></td>
        <td><code><a href="#point">Point</a>[]</code></td>
        <td>Обрезает многоугольник по прямоугольной области.</td>
    </tr>
</table>