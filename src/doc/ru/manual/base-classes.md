## Базовые классы

Служебные классы библотеки, необходимые для работы API карт и разработки
<a href="https://github.com/2gis/maps-api-2.0/blob/master/CONTRIBUTING.md#%D0%9A%D0%B0%D0%BA-%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0%D1%82%D1%8C-%D1%81%D0%BE%D0%B1%D1%81%D1%82%D0%B2%D0%B5%D0%BD%D0%BD%D1%8B%D0%B9-%D0%BC%D0%BE%D0%B4%D1%83%D0%BB%D1%8C" target="_blank">собственных модулей</a>.

{toc}

### DG.Class

<code>DG.Class</code> предоставляет возможность использовать ООП подход в разработке API карт, и используется
для реализации большинства классов, приведенных в этой документации.

Кроме реализации простой классической модели наследования, имеются несколько свойств для удобной организации кода,
такие как <code>options</code>, <code>includes</code> и <code>statics</code>.

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

#### Фабрики классов

Объекты в API карт можно создавать без использования ключевого слова <code>new</code>. Это достигается путем
дополнения описания каждого класса статическим методом, имеющим наименование класса, только в нижнем регистре.

    new DG.Map('map');
    DG.map('map');      // эквивалентный вызов

Вы можете использовать такой подход в своих классах, т.к. подобные методы реализованы достаточно просто:

    DG.map = function (id, options) {
        return new DG.Map(id, options);
    };

#### Наследование

Для определения новых классов используется <code>DG.Class.extend</code>, также метод <code>extend</code> можно использовать
в любом другом классе, который наследуется от <code>DG.Class</code>:

    var MyChildClass = MyClass.extend({
        // ... новые свойства и методы
    });

Данный код создаст класс, который унаследует все методы и свойства родительского класса (через цепочку прототипов),
при необходимости добавляя или переопределяя родительские методы и свойства. Кроме того, корректно обрабатывается
оператор <code>instanceof</code>:

    var a = new MyChildClass();
    a instanceof MyChildClass; // true
    a instanceof MyClass; // true

Вы можете вызывать родительские методы (включая конструктор) из дочерних классов (так, как вы бы делали это с помощью
вызова <code>super</code> в других языках программирования) с помощью JavaScript функций <code>call</code> или <code>apply</code>:

    var MyChildClass = MyClass.extend({
        initialize: function () {
            MyClass.prototype.initialize.call(this, "Yo");
        },

        greet: function (name) {
            MyClass.prototype.greet.call(this, 'bro ' + name + '!');
        }
    });

    var a = new MyChildClass();
    a.greet('Jason'); // выведет "Yo, bro Jason!"

#### Объект опций

<code>options</code> &mdash; ссылка на специальный объект, свойства которого, в отличии от других объектов
передаваемых через <code>extend</code>, будут объединены со свойствами аналогичного объекта родителя, вместо
полного переопределения объекта. Это позволяет управлять конфигурацией объектов и значениями по умолчанию:

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

Также существует метод <a href="/doc/maps/ru/manual/utils#util-setoptions"><code>DG.Util.setOptions</code></a>,
который позволяет объединять опции, переданные в конструктор, с опциями, заданными по умолчанию:

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

#### Поддержка создания миксинов

<code>includes</code> &mdash; ссылка на специальный объект, свойства и методы которого будут объединены со свойствами
и методами экземпляров класса (такие объекты называются mixin-ами).

     var MyMixin = {
        foo: function () { ... },
        bar: 5
    };

    var MyClass = DG.Class.extend({
        includes: MyMixin
    });

    var a = new MyClass();
    a.foo();

Также, вы можете подмешивать объекты в процессе выполнения программы, с помощью метода <code>include</code>:

    MyClass.include(MyMixin);

#### Поддержка статических членов класса

<code>statics</code> &mdash; ссылка на специальный объект, свойства и методы которого будут объединены со статическими
свойствами и методами класса. Бывает удобно использовать для определения констант:

    var MyClass = DG.Class.extend({
        statics: {
            FOO: 'bar',
            BLA: 5
        }
    });

    MyClass.FOO; // 'bar'

#### Перехватчики конструктора

Если вы разрабатываете модуль к API карт, существует вероятность того, что вам понадобится выполнить
дополнительные действия при инициализации объектов существующих классов (например, при инициализации
объекта <a href="/doc/maps/ru/manual/geometries#polyline"><code>DG.Polyline</code></a>).

Для подобного рода задач есть метод <code>addInitHook</code>:

    MyClass.addInitHook(function () {
        // ... выполнить дополнительные действия при вызове конструктора
        // например, добавить обработчики событий, установить значения свойств и т.п.
    });

Также можно использовать сокращенную запись, если вам надо сделать всего лишь один дополнительный вызов метода:

    MyClass.addInitHook('methodName', arg1, arg2, …);

#### Функции

<table>
    <thead>
        <tr>
            <th>Функция</th>
            <th>Возвращает</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr id="class-extend">
            <td><code><b>extend</b>(
                <nobr>&lt;Object&gt; <i>props</i> )</nobr>
            </code></td>

            <td><code>Function</code></td>
            <td>Возвращает функцию Javascript, являющуюся конструктором класса (в дальнейшем, функция должна вызываться с
                <code>new</code>), который <a href="#наследование">наследует</a> методы и свойства базового класса.</td>
        </tr>
        <tr id="class-include">
            <td><code><b>include</b>(
                <nobr>&lt;Object&gt; <i>properties</i> )</nobr>
            </code></td>

            <td><code></code></td>
            <td>Подмешивает методы и свойства объекта в текущий класс.</td>
        </tr>
        <tr id="class-mergeoptions">
            <td><code><b>mergeOptions</b>(
                <nobr>&lt;Object&gt; <i>options</i> )</nobr>
            </code></td>

            <td><code></code></td>
            <td>Объединяет объект опций с объектом опций класса по умолчанию.</td>
        </tr>
        <tr id="class-addinithook">
            <td><code><b>addInitHook</b>(
                <nobr>&lt;Function&gt; <i>fn</i> )</nobr>
            </code></td>

            <td><code></code></td>
            <td>Добавляет функцию-перехватчик конструктора к классу.</td>
        </tr>
    </tbody>
</table>

### DG.Evented

Классы, использующие событийную модель (такие как <a href="/doc/maps/ru/manual/map#dgmap"><code>Map</code></a>
и <a href="/doc/maps/ru/manual/markers#dgmarker"><code>Marker</code></a>), наследуют методы <code>DG.Evented</code>.
В общем случае, класс дает возможность инициировать выполнение последовательности функций, при возникновении
какого-либо события, связанного с объектом (например, пользователь щелкнул мышью по карте, тем самым создав
событие <code>&#39;click&#39;</code>).

    map.on('click', function(e) {
        alert(e.latlng);
    } );

Для того, чтобы можно было добавить и впоследствии удалить обработчик события, опишите обработчик
с помощью внешней функции, ссылку на которую потом можно будет передать в методы данного класса:

    function onClick(e) { ... }
    map.on('click', onClick);
    map.off('click', onClick);

#### Методы

<table id="dgevented-methods">
    <thead>
        <tr>
            <th>Метод</th>
            <th>Возвращает</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr id="evented-on">
            <td><code><b>on</b>(
                <nobr>&lt;String&gt; <i>type</i></nobr>,
                <nobr>&lt;Function&gt; <i>fn</i></nobr>,
                <nobr>&lt;Object&gt; <i>context?</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Добавляет обработчик (<code>fn</code>) для определенного типа событий. Вы также можете указать
                контекст вызова обработчика (объект, на который ссылается ключевое слово <code>this</code>
                внутри обработчика). Также, можно указать несколько типов событий, разделив их пробелами
                (например: <code>&#39;click dblclick&#39;</code>).</td>
        </tr>
        <tr>
            <td><code><b>on</b>(
                <nobr>&lt;Object&gt; <i>eventMap</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Добавляет набор пар &#39;тип/обработчик&#39; в качестве обработчиков событий
                (например: <code>{click: onClick, mousemove: onMouseMove}</code>).</td>
        </tr>
        <tr id="evented-off">
            <td><code><b>off</b>(
                <nobr>&lt;String&gt; <i>type</i></nobr>,
                <nobr>&lt;Function&gt; <i>fn?</i></nobr>,
                <nobr>&lt;Object&gt; <i>context?</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Удаляет ранее добавленную функцию обработчика событий. Если функция не указана, то у объекта будут удалены
                все обработчики для данного типа событий. Замечание: если методу <code>on</code> передавался
                контекст, этот же контекст должен быть передан и методу <code>off</code>, для того чтобы обработчик был удален.</td>
        </tr>
        <tr>
            <td><code><b>off</b>(
                <nobr>&lt;Object&gt; <i>eventMap</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Удаляет набор пар &#39;тип/обработчик&#39; обработчиков событий.</td>
        </tr>
        <tr>
            <td><code><b>off</b>()</code></td>

            <td><code>this</code></td>
            <td>Удаляет все обработчики для всех типов событий.</td>
        </tr>
        <tr id="evented-fire">
            <td><code><b>fire</b>(
                <nobr>&lt;String&gt; <i>type</i></nobr>,
                <nobr>&lt;Object&gt; <i>data?</i></nobr>,
                <nobr>&lt;Boolean&gt; <i>propagate?</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Инициирует событие определенного типа. Опционально можно передать объект с данными события,
                который будет передан первым параметром в функцию-обработчик. Также возможно указать,
                чтобы событие распространилось на родительские объекты.</td>
        </tr>
        <tr id="evented-listens">
            <td><code><b>listens</b>(
                <nobr>&lt;String&gt; <i>type</i> )</nobr>
            </code></td>

            <td><code>Boolean</code></td>
            <td>Возвращает <code>true</code>, если существуют хотя бы один обработчик для заданного типа событий.</td>
        </tr>
        <tr id="evented-once">
            <td><code><b>once</b>(<i>…</i>)</code></td>

            <td><code>this</code></td>
            <td>Метод эквивалентен <a href="#evented-on"><code>on(…)</code></a>, но обработчик события будет вызван
                один раз, после чего удален.</td>
        </tr>
        <tr id="evented-addeventparent">
            <td><code><b>addEventParent</b>(
                <nobr>&lt;<a href="#dgevented">Evented</a>&gt; <i>obj</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Добавляет объект <a href="#dgevented"><code>Evented</code></a> в качестве получателя событий от
                текущего объекта.</td>
        </tr>
        <tr id="evented-removeeventparent">
            <td><code><b>removeEventParent</b>(
                <nobr>&lt;<a href="#dgevented">Evented</a>&gt; <i>obj</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Удаляет объект, ранее добавленный методом <a href="#evented-addeventparent"><code>addEventParent</code></a>.</td>
        </tr>
        <tr id="evented-addeventlistener">
            <td><code><b>addEventListener</b>(<i>…</i>)</code></td>

            <td><code>this</code></td>
            <td>Псевдоним для <a href="#evented-on"><code>on(…)</code></a></td>
        </tr>
        <tr id="evented-removeeventlistener">
            <td><code><b>removeEventListener</b>(<i>…</i>)</code></td>

            <td><code>this</code></td>
            <td>Псевдоним для <a href="#evented-off"><code>off(…)</code></a></td>
        </tr>
        <tr id="evented-clearalleventlisteners">
            <td><code><b>clearAllEventListeners</b>(<i>…</i>)</code></td>

            <td><code>this</code></td>
            <td>Псевдоним для <a href="#evented-off"><code>off()</code></a></td>
        </tr>
        <tr id="evented-addonetimeeventlistener">
            <td><code><b>addOneTimeEventListener</b>(<i>…</i>)</code></td>

            <td><code>this</code></td>
            <td>Псевдоним для <a href="#evented-once"><code>once(…)</code></a></td>
        </tr>
        <tr id="evented-fireevent">
            <td><code><b>fireEvent</b>(<i>…</i>)</code></td>

            <td><code>this</code></td>
            <td>Псевдоним для <a href="#evented-fire"><code>fire(…)</code></a></td>
        </tr>
        <tr id="evented-haseventlisteners">
            <td><code><b>hasEventListeners</b>(<i>…</i>)</code></td>

            <td><code>Boolean</code></td>
            <td>Псевдоним для <a href="#evented-listens"><code>listens(…)</code></a></td>
        </tr>
    </tbody>
</table>

### DG.Layer

Все объекты слоев API карт, так или иначе, задействуют методы базового класса <code>DG.Layer</code>.
Класс наследует все методы, свойства и событийную модель от <a href="#dgevented"><code>DG.Evented</code></a>.

    var layer = DG.Marker(latlng).addTo(map);
    layer.addTo(map);
    layer.remove();

#### Опции

<table id="dglayer-options">
    <thead>
        <tr>
            <th>Опция</th>
            <th>Тип</th>
            <th>Значение<br>по умолчанию</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr id="layer-pane">
            <td><code><b>pane</b></code></td>
            <td><code>String</code></td>
            <td><code>&#x27;overlayPane&#x27;</code></td>
            <td>По умолчанию, слои добавляются в т.н. <a href="/doc/maps/ru/manual/map#map-overlaypane">панель слоев</a>.
                Поведение по умолчанию можно изменить, переопределив данную опцию.</td>
        </tr>
    </tbody>
</table>

#### События

<table id="dglayer-events">
    <thead>
        <tr>
            <th>Событие</th>
            <th>Данные</th>
            <th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="layer-add">
            <td><code><b>add</b></code></td>
            <td><code><a href="#объекты-событий">Event</a></code></td>
            <td>Возникает после того, как слой будет добавлен к карте.</td>
        </tr>
        <tr id="layer-remove">
            <td><code><b>remove</b></code></td>
            <td><code><a href="#объекты-событий">Event</a></code></td>
            <td>Возникает после того, как слой будет удален с карты.</td>
        </tr>
    </tbody>
</table>

##### События попапов

<table id="dglayer-popup-events">
    <thead>
        <tr>
            <th>Событие</th>
            <th>Данные</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr id="layer-popupopen">
            <td><code><b>popupopen</b></code></td>
            <td><code>PopupEvent</code></td>
            <td>Возникает при открытии попапа, прикрепленного к данному слою.</td>
        </tr>
        <tr id="layer-popupclose">
            <td><code><b>popupclose</b></code></td>
            <td><code>PopupEvent</code></td>
            <td>Возникает при закрытии попапа, привязанного к данному слою.</td>
        </tr>
    </tbody>
</table>

#### Методы

<table id="dglayer-methods">
    <thead>
        <tr>
            <th>Метод</th>
            <th>Возвращает</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr id="layer-addto">
            <td><code><b>addTo</b>(
                <nobr>&lt;<a href="/doc/maps/ru/manual/map#dgmap">Map</a>&gt; <i>map</i>)</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Добавляет слой на карту.</td>
        </tr>
        <tr id="layer-remove">
            <td><code><b>remove</b>()</code></td>

            <td><code>this</code></td>
            <td>Удаляет слой с карты, к которой он в данный момент прикреплен.</td>
        </tr>
        <tr id="layer-removefrom">
            <td><code><b>removeFrom</b>(
                <nobr>&lt;<a href="/doc/maps/ru/manual/map#dgmap">Map</a>&gt; <i>map</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Удаляет слой с карты.</td>
        </tr>
        <tr id="layer-getpane">
            <td><code><b>getPane</b>(
                <nobr>&lt;String&gt; <i>name?</i> )</nobr>
            </code></td>

            <td><code>HTMLElement</code></td>
            <td>Возвращает <code>HTMLElement</code>, представляющий панель на карте с данным именем.
                Если аргумент <code>name</code> не задан, возвращает панель, в которой находится данный слой.</td>
        </tr>
    </tbody>
</table>

##### Методы попапов

Все слои поддерживают набор методов, удобных для связывания с ними попапов.

    var layer = DG.Polygon(latlngs).bindPopup('Hi There!').addTo(map);
    layer.openPopup();
    layer.closePopup();

Попапы автоматически открываются при щелчке мышью по слою, а также закрываются,
при удалении слоя или открытии другого попапа.

<table id="dglayer-popup-methods">
    <thead>
        <tr>
            <th>Метод</th>
            <th>Возвращает</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr id="layer-bindpopup">
            <td><code><b>bindPopup</b>(
                <nobr>&lt;String|HTMLElement|Function|Popup&gt; <i>content</i>,</nobr>
                <nobr>&lt;<a href="/doc/maps/ru/manual/popup#popup-option">Popup options</a>&gt; <i>options?</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Связывает попап со слоем и устанавливает необходимые обработчики событий.
                Если в качестве параметра передать функцию, она получит текущий объект в качестве своего
                первого аргумента и должна вернуть <code>String</code> или <code>HTMLElement</code>.</td>
        </tr>
        <tr id="layer-unbindpopup">
            <td><code><b>unbindPopup</b>()</code></td>

            <td><code>this</code></td>
            <td>Удаляет попап, ранее привязанный с помощью <code>bindPopup</code>.</td>
        </tr>
        <tr id="layer-openpopup">
            <td><code><b>openPopup</b>(
                <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latlng?</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Открывает, связанный со слоем попап, в заданных координатах
                <a href="/doc/maps/ru/manual/basic-types#dglatlng"><code>latlng</code></a>
                или в координатах, сохраненных в параметрах самого элемента.</td>
        </tr>
        <tr id="layer-closepopup">
            <td><code><b>closePopup</b>()</code></td>

            <td><code>this</code></td>
            <td>Закрывает, связанный со слоем попап, если он ранее был открыт. Также, может работать
                как триггер, открывая или закрывая связанный элемент, в зависимости от его предыдущего состояния.
                Возвращает <code>true</code>, если попап, был открыт в момент вызова метода.</td>
        </tr>
        <tr id="layer-setpopupcontent">
            <td><code><b>setPopupContent</b>(
            <nobr>&lt;String|HTMLElement|Popup&gt; <i>content</i>,</nobr>
                <nobr>&lt;<a href="/doc/maps/ru/manual/popup#popup-option">Popup options</a>&gt; <i>options?</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Задает содержимое попапа, связанного с данным слоем.</td>
        </tr>
        <tr id="layer-getpopup">
            <td><code><b>getPopup</b>()</code></td>

            <td><code><a href="/doc/maps/ru/manual/popup#dgpopup">Popup</a></code></td>
            <td>Возвращает попап, связанный с данным слоем.</td>
        </tr>
    </tbody>
</table>

##### Методы расширения

Каждый слой, который наследуется от <a href="#dglayer"><code>DG.Layer</code></a>, должен реализовать следующие методы.

<table>
    <thead>
        <tr>
            <th>Метод</th>
            <th>Возвращает</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr id="layer-onadd">
            <td><code><b>onAdd</b>(
                <nobr>&lt;<a href="/doc/maps/ru/manual/map#dgmap">Map</a>&gt; <i>map</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Должен содержать код, который создает DOM элемент для слоя и добавляет его в одну из панелей карты,
                а также создает обработчики для соответствующих событий карты. Вызывается из
                <a href="/doc/maps/ru/manual/map#map-addlayer"><code>map.addLayer(layer)</code></a>.</td>
        </tr>
        <tr id="layer-onremove">
            <td><code><b>onRemove</b>(
                <nobr>&lt;<a href="/doc/maps/ru/manual/map#dgmap">Map</a>&gt; <i>map</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Должен содержать код, который убирает слой и сопутствующие элементы из DOM, а также удаляет обработчики,
                ранее выставленные в <a href="#layer-onadd"><code>onAdd</code></a>. Вызывается из
                <a href="/doc/maps/ru/manual/map#map-removelayer"><code>map.removeLayer(layer)</code></a>.</td>
        </tr>
        <tr id="layer-getevents">
            <td><code><b>getEvents</b>()</code></td>

            <td><code>Object</code></td>
            <td>Опциональный метод, который должен возвращать объект вида <code>{ viewreset: this._reset }</code>,
                подходящего для вызова <a href="#evented-addeventlistener"><code>addEventListener</code></a>.
                Эти обработчики будут автоматически добавлены и удалены для событий карты вместе с операциями добавления
                и удаления слоя.</td>
        </tr>
        <tr id="layer-beforeadd">
            <td><code><b>beforeAdd</b>(
                <nobr>&lt;<a href="/doc/maps/ru/manual/map#dgmap">Map</a>&gt; <i>map</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Опциональный метод, который вызывается из <a href="/doc/maps/ru/manual/map#map-addlayer"><code>map.addLayer(layer)</code></a>,
                перед тем как слой будет добавлен к карте и инициализированы соответствующие обработчики событий.
                Объект карты может быть не до конца подготовлен к использованию (не загружены необходимые данные и т.п.)
                в момент вызова. Поэтому метод можно использовать только для базовой инициализации структур данных слоя.</td>
        </tr>
    </tbody>
</table>

События, унаследованные от <a href="#dgevented">Evented</a> <!-- TODO: include events -->

### DG.Control

Базовый класс, от которого наследуют все элементы управления. Обеспечивает позиционирование элементов управления.

#### Опции

<table>
    <thead>
        <tr>
            <th>Опция</th>
            <th>Тип</th>
            <th>Значение<br>по умолчанию</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr id="control-position">
            <td><code><b>position</b></code></td>
            <td><code>String</code></code></td>
            <td><code>&#x27;topright&#x27;</code></td>
            <td>Местоположение элемента управления (один из углов карты). Возможные значения: <code>&#39;topleft&#39;</code>,
                <code>&#39;topright&#39;</code>, <code>&#39;bottomleft&#39;</code> или <code>&#39;bottomright&#39;</code></td>
        </tr>
    </tbody>
</table>

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
        <tr id="control-getposition">
            <td><code><b>getPosition</b>()</code></td>

            <td><code>string</code></td>
            <td>Возвращает позицию элемента управления.</td>
        </tr>
        <tr id="control-setposition">
            <td><code><b>setPosition</b>(
                <nobr>&lt;string&gt; <i>position</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Задает позицию элемента управления.</td>
        </tr>
        <tr id="control-getcontainer">
            <td><code><b>getContainer</b>()</code></td>

            <td><code>HTMLElement</code></td>
            <td>Возвращает объект HTMLElement, который содержит элемент управления.</td>
        </tr>
        <tr id="control-addto">
            <td><code><b>addTo</b>(
                <nobr>&lt;<a href="/doc/maps/ru/manual/map#dgmap">Map</a>&gt; <i>map</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Добавляет элемент управления на карту.</td>
        </tr>
        <tr id="control-remove">
            <td><code><b>remove</b>()</code></td>

            <td><code>this</code></td>
            <td>Удаляет элемент управления с карты, на которой он сейчас активен.</td>
        </tr>
    </tbody>
</table>

### DG.Handler

Базовый класс для обработчиков взаимодействия с картой.

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
        <tr id="handler-enable">
            <td><code><b>enable</b>()</code></td>

            <td><code></code></td>
            <td>Включает обработчик</td>
        </tr>
        <tr id="handler-disable">
            <td><code><b>disable</b>()</code></td>

            <td><code></code></td>
            <td>Отключает обработчик</td>
        </tr>
        <tr id="handler-enabled">
            <td><code><b>enabled</b>()</code></td>

            <td><code>Boolean</code></td>
            <td>Возвращает <code>true</code>, если обработчик активен</td>
        </tr>
    </tbody>
</table>

#### Методы расширения функционала

Классы, наследующие от <a href="#dghandler"><code>Handler</code></a>, должны реализовывать следующие методы:

<table>
    <thead>
        <tr>
            <th>Метод</th>
            <th>Возвращает</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr id="handler-addhooks">
            <td><code><b>addHooks</b>()</code></td>

            <td><code></code></td>
            <td>Вызывается при включении обработчика, должен добавлять обработчики событий.</td>
        </tr>
        <tr id="handler-removehooks">
            <td><code><b>removeHooks</b>()</code></td>

            <td><code></code></td>
            <td>Вызывается при отключении обработчика, должен удалять обработчики событий.</td>
        </tr>
    </tbody>
</table>

### DG.Projection

Объект для работы с <a href="http://en.wikipedia.org/wiki/Map_projection">картографической проекцией</a>.
Содержит методы для перевода географических координат в координаты на плоскости и обратно.

API карт использует сферическую проекцию Меркатора (EPSG:3857).

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
        <tr id="projection-project">
            <td><code><b>project</b>(
                <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latlng</i> )</nobr>
            </code></td>

            <td><code><a href="/doc/maps/ru/manual/basic-types#dgpoint">Point</a></code></td>
            <td>Осуществляет проекцию географических координат на двухмерную координатную плоскость.</td>
        </tr>
        <tr id="projection-unproject">
            <td><code><b>unproject</b>(
                <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dgpoint">Point</a>&gt; <i>point</i> )</nobr>
            </code></td>

            <td><code><a href="/doc/maps/ru/manual/basic-types#dglatlng">LatLng</a></code></td>
            <td>Обратная операция от <code>project</code>. Осуществляет проекцию двухмерных координат в плоскости
                на географические координаты.</td>
        </tr>
    </tbody>
</table>

#### Свойства

<table>
    <thead>
        <tr>
            <th>Свойство</th>
            <th>Тип</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr id="projection-bounds">
            <td><code><b>bounds</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/basic-types#latlngbounds">LatLngBounds</a></code></td>
            <td>Географические границы области, в пределах которой возможно осуществление преобразований.</td>
        </tr>
    </tbody>
</table>

### DG.Renderer

Базовый класс, использующийся для реализации движков отображения векторных объектов (<code>DG.SVG</code>,
<code>DG.Canvas</code>). В общем случае, используется для отображения геометрических объектов.

Обслуживает операции, связанные с DOM-контейнером, его размерами и анимацией процесса
масштабирования. <a href="#dgrenderer"><code>Renderer</code></a> выступает в качестве неявной группы слоев для
всех элементов, которые наследуются от <a href="/doc/maps/ru/manual/vector-layers#dgpath"><code>DG.Path</code></a>.
Все векторные элементы используют движок отображения, который может быть задан неявно (и тогда API карт примет решение
о том, какой тип движка использовать для отображения) или явно (с помощью опции векторного слоя
<a href="/doc/maps/ru/manual/vector-layers#path-renderer"><code>renderer</code></a>). Не используйте этот класс
напрямую. Используйте классы, которые наследуются от него, такие как <code>DG.SVG</code> или <code>DG.Canvas</code>.

#### Опции

<table>
    <thead>
        <tr>
            <th>Опция</th>
            <th>Тип</th>
            <th>Значение<br>Значение по умолчанию</th>
            <th>Описание</th>
        </tr>
        </thead><tbody>
        <tr id="renderer-padding">
            <td><code><b>padding</b></code></td>
            <td><code>Number </code></td>
            <td><code>0.1</code></td>
            <td>Насколько расширять границы отсечения выводимых объектов относительно границ окна, в котором отображается карта.
                Измеряется в относительных единицах, где 0.1 соответствует 10% размера окна в каждом из направлений.</td>
        </tr>
    </tbody>
</table>

Опции, унаследованные от <a href="#dglayer">Layer</a> <!-- TODO: include options -->

#### Events

События, унаследованные от <a href="#dglayer">Layer</a> <!-- TODO: include events -->

#### Methods

Методы, унаследованные от <a href="#dglayer">Layer</a> <!-- TODO: include methods -->

Методы, унаследованные от <a href="#dgevented">Evented</a> <!-- TODO: include methods -->

### Объекты событий

Когда класс, унаследованный от <a href="#dgevented"><code>Evented</code></a>, инициирует событие,
вызывается функция-обработчик с аргументом, представляющим собой объект с данными о событии, например:

    map.on('click', function(ev) {
        alert(ev.latlng); // ev объект с данными о событии (MouseEvent, в данном случае)
    });

Информация, которая попадает в функцию обработчик, зависит от типа события:

#### Event

Базовый объект события и другие объекты событий содержат следующие свойства:

<table>
    <thead>
        <tr>
            <th>Свойство</th>
            <th>Тип</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr id="event-type">
            <td><code><b>type</b></code></td>
            <td><code>String</code></td>
            <td>Тип события (например, <code>&#39;click&#39;</code>).</td>
        </tr>
        <tr id="event-target">
            <td><code><b>target</b></code></td>
            <td><code>Object</code></td>
            <td>Объект, который инициировал событие.</td>
        </tr>
    </tbody>
</table>

#### MouseEvent

<table>
    <thead>
        <tr>
            <th>Свойство</th>
            <th>Тип</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr id="mouseevent-latlng">
            <td><code><b>latlng</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/basic-types#latlng">LatLng</a></code></td>
            <td>Географические координаты точки, в которой было инициировано событие мыши.</td>
        </tr>
        <tr id="mouseevent-layerpoint">
            <td><code><b>layerPoint</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/basic-types#dgpoint">Point</a></code></td>
            <td>Пиксельные координаты, в которых было инициировано событие мыши, относительно слоя карты.</td>
        </tr>
        <tr id="mouseevent-containerpoint">
            <td><code><b>containerPoint</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/basic-types#dgpoint">Point</a></code></td>
            <td>Пиксельные координаты, в которых было инициировано событие мыши, относительно объекта-контейнера карты.</td>
        </tr>
        <tr id="mouseevent-originalevent">
            <td><code><b>originalEvent</b></code></td>
            <td><code>DOMMouseEvent</code></td>
            <td>Данные оригинального события мыши, инициированного браузером.</td>
        </tr>
    </tbody>
</table>

Свойства, унаследованные от <a href="#event">Event</a> <!-- TODO: include properties -->

#### LocationEvent

<table>
    <thead>
        <tr>
            <th>Свойство</th>
            <th>Тип</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr id="locationevent-latlng">
            <td><code><b>latlng</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/basic-types#latlng">LatLng</a></code></td>
            <td>Географическое положение пользователя</td>
        </tr>
        <tr id="locationevent-bounds">
            <td><code><b>bounds</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/basic-types#latlngbounds">LatLngBounds</a></code></td>
            <td>Географические границы, в которых находится пользователь (с учетом точности определения местоположения).</td>
        </tr>
        <tr id="locationevent-accuracy">
            <td><code><b>accuracy</b></code></td>
            <td><code>Number</code></td>
            <td>Точность определения местоположения в метрах.</td>
        </tr>
        <tr id="locationevent-altitude">
            <td><code><b>altitude</b></code></td>
            <td><code>Number</code></td>
            <td>Высота над поверхностью земли в метрах, согласно координатной системе WGS84.</td>
        </tr>
        <tr id="locationevent-altitudeaccuracy">
            <td><code><b>altitudeAccuracy</b></code></td>
            <td><code>Number</code></td>
            <td>Точность определения высоты в метрах.</td>
        </tr>
        <tr id="locationevent-heading">
            <td><code><b>heading</b></code></td>
            <td><code>Number</code></td>
            <td>Направление движения в градусах, считается с севера, в направлении по часовой стрелке.</td>
        </tr>
        <tr id="locationevent-speed">
            <td><code><b>speed</b></code></td>
            <td><code>Number</code></td>
            <td>Скорость в метрах в секунду.</td>
        </tr>
        <tr id="locationevent-timestamp">
            <td><code><b>timestamp</b></code></td>
            <td><code>Number</code></td>
            <td>Момент времени измерения местоположения.</td>
        </tr>
    </tbody>
</table>

Свойства, унаследованные от <a href="#event">Event</a> <!-- TODO: include properties -->

#### ErrorEvent

<table>
    <thead>
        <tr>
            <th>Свойство</th>
            <th>Тип</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr id="errorevent-message">
            <td><code><b>message</b></code></td>
            <td><code>String</code></td>
            <td>Сообщение об ошибке.</td>
        </tr>
        <tr id="errorevent-code">
            <td><code><b>code</b></code></td>
            <td><code>Number</code></td>
            <td>Код ошибки (если имеется).</td>
        </tr>
    </tbody>
</table>

Свойства, унаследованные от <a href="#event">Event</a> <!-- TODO: include properties -->

#### LayerEvent

<table>
    <thead>
        <tr>
            <th>Свойство</th>
            <th>Тип</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr id="layerevent-layer">
            <td><code><b>layer</b></code></td>
            <td><code><a href="#dglayer">Layer</a></code></td>
            <td>Слой, который был добавлен или удален.</td>
        </tr>
    </tbody>
</table>

Свойства, унаследованные от <a href="#event">Event</a> <!-- TODO: include properties -->

#### LayersControlEvent

<table>
    <thead>
        <tr>
            <th>Свойство</th>
            <th>Тип</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr id="layerscontrolevent-layer">
            <td><code><b>layer</b></code></td>
            <td><code><a href="#dglayer">Layer</a></code></td>
            <td>Слой, который был добавлен или удален.</td>
        </tr>
        <tr id="layerscontrolevent-name">
            <td><code><b>name</b></code></td>
            <td><code>String</code></td>
            <td>Наименовани слоя, который был добавлен или удален.</td>
        </tr>
    </tbody>
</table>

Свойства, унаследованные от <a href="#event">Event</a> <!-- TODO: include properties -->

#### TileEvent

<table>
    <thead>
        <tr>
            <th>Свойство</th>
            <th>Тип</th>
            <th>Описание</th>
        </tr>
	</thead>
	<tbody>
        <tr id="tileevent-tile">
            <td><code><b>tile</b></code></td>
            <td><code>HTMLElement</code></td>
            <td>Элемент тайла (изображение).</td>
        </tr>
    </tbody>
</table>

Свойства, унаследованные от <a href="#event">Event</a> <!-- TODO: include properties -->

#### TileErrorEvent

<table>
    <thead>
        <tr>
            <th>Свойство</th>
            <th>Тип</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr id="tileerrorevent-tile">
            <td><code><b>tile</b></code></td>
            <td><code>HTMLElement</code></td>
            <td>Элемент тайла (изображение).</td>
        </tr>
    </tbody>
</table>

Свойства, унаследованные от <a href="#event">Event</a> <!-- TODO: include properties -->

#### ResizeEvent

<table>
    <thead>
        <tr>
            <th>Свойство</th>
            <th>Тип</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr id="resizeevent-oldsize">
            <td><code><b>oldSize</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/basic-types#dgpoint">Point</a></code></td>
            <td>Старый размер, до изменения размера.</td>
        </tr>
        <tr id="resizeevent-newsize">
            <td><code><b>newSize</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/basic-types#dgpoint">Point</a></code></td>
            <td>Новый размер, после изменения размера.</td>
        </tr>
    </tbody>
</table>

Свойства, унаследованные от <a href="#event">Event</a> <!-- TODO: include properties -->

#### GeoJSON event

<table>
    <thead>
        <tr>
            <th>Свойство</th>
            <th>Тип</th>
            <th>Описание</th>
        </tr>
        </thead><tbody>
        <tr id="geojson-event-layer">
            <td><code><b>layer</b></code></td>
            <td><code><a href="#dglayer">Layer</a></code></td>
            <td>Слой GeoJSON объекта, добавленного на карту.</td>
        </tr>
        <tr id="geojson-event-properties">
            <td><code><b>properties</b></code></td>
            <td><code>Object</code></td>
            <td>Опции GeoJSON объекта.</td>
        </tr>
        <tr id="geojson-event-geometrytype">
            <td><code><b>geometryType</b></code></td>
            <td><code>String</code></td>
            <td>Тип геометрии GeoJSON объекта.</td>
        </tr>
        <tr id="geojson-event-id">
            <td><code><b>id</b></code></td>
            <td><code>String</code></td>
            <td>GeoJSON ID объекта (если задан).</td>
        </tr>
    </tbody>
</table>

Свойства, унаследованные от <a href="#event">Event</a> <!-- TODO: include properties -->

#### Popup event

<table>
    <thead>
        <tr>
            <th>Свойство</th>
            <th>Тип</th>
            <th>Описание</th>
        </tr>
        </thead><tbody>
        <tr id="popup-event-popup">
            <td><code><b>popup</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/popup#dgpopup">Popup</a></code></td>
            <td>Попап, который был открыт или закрыт.</td>
        </tr>
    </tbody>
</table>

Свойства, унаследованные от <a href="#event">Event</a> <!-- TODO: include properties -->

#### DragEndEvent

<table>
    <thead>
        <tr>
            <th>Свойство</th>
            <th>Тип</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr id="dragendevent-distance">
            <td><code><b>distance</b></code></td>
            <td><code>Number</code></td>
            <td>Расстояние в пикселях на которое был сдвинут элемент.</td>
        </tr>
    </tbody>
</table>

#### MetaEvent

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
            <td><code><b>latlng</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/basic-types#dglatlng">LatLng</a></code></td>
            <td>Географические координаты точки объекта допслоя.</td>
        </tr>
        <tr>
            <td><code><b>meta</b></code></td>
            <td><code>Object</code></td>
            <td>Метаданные объекта допслоя.</td>
        </tr>
    </tbody>
</table>

#### LangEvent

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
            <td><code><b>lang</b></code></td>
            <td><code>String</code></td>
            <td>Текущий язык карты.</td>
        </tr>
    </tbody>
</table>
