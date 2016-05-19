## Базовые классы

{toc}

### Описание

Служебный функционал, необходимый для работы API карт и разработки <a href="https://github.com/2gis/maps-api-2.0/blob/master/CONTRIBUTING.md#%D0%9A%D0%B0%D0%BA-%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0%D1%82%D1%8C-%D1%81%D0%BE%D0%B1%D1%81%D1%82%D0%B2%D0%B5%D0%BD%D0%BD%D1%8B%D0%B9-%D0%BC%D0%BE%D0%B4%D1%83%D0%BB%D1%8C" target="_blank">собственных модулей</a>.

### DG.Class

`DG.Class` предоставляет возможность использовать ООП подход в разработке функционала API карт, и используется
для реализации большинства классов, приведенных в этой документации.

Кроме реализации простой классической модели наследования имеются несколько свойств для удобной организации кода,
такие как `options`, `includes` и `statics`.

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

Объекты в API карт можно создавать без использования ключевого слова `new`. Это достигается путем дополнения
описания каждого класса статическим методом, имеющим наименование класса, только в нижнем регистре.

    new DG.Map('map');
    DG.map('map'); // эквивалентный вызов

Подобные методы реализованы достаточно просто. Поэтому вы можете повторить поведение для своих классов.

    DG.map = function (id, options) {
        return new DG.Map(id, options);
    };

#### Наследование

Для определения новых классов используется конструкция `DG.Class.extend`, также метод `extend` можно использовать
в любом другом классе, который наследуется от `DG.Class`:

    var MyChildClass = MyClass.extend({
        // ... новые свойства и методы
    });

Данный код создаст класс, который унаследует все методы и свойства родительского класса (через цепочку прототипов),
при необходимости, добавляя или переопределяя родительские методы и свойства. Кроме того, корректно обрабатывается
оператор `instanceof`:

    var a = new MyChildClass();
    a instanceof MyChildClass; // true
    a instanceof MyClass; // true

Вы можете вызывать родительские методы (включая конструктор) из дочерних классов (так, как вы бы делали это с помощью
вызова `super` в других языках программирования) с помощью JavaScript функций `call` или `apply`:

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

`options` &mdash; специальное свойство, которое в отличии от других объектов передаваемых через `extend` будет
объединено с аналогичным свойством родителя, вместо полного переопределени. Это позволяет управлять конфигурацией
объектов и значениями по умолчанию:

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

Также имеется метод `DG.Util.setOptions`, который позволяет объединять опции, переданные в конструктор, с опциями,
заданными по умолчанию:

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

`includes` &mdash; специальное свойство, которое подмешивает объекты в класс (такие объекты называются mixin-ами).

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

`statics` &mdash; свойство, в котором описываются статические элементы класса.
Бывает удобно использовать для определения констант:

    var MyClass = DG.Class.extend({
        statics: {
            FOO: 'bar',
            BLA: 5
        }
    });

    MyClass.FOO; // 'bar'

#### Хуки конструктора

Если вы разрабатываете модуль к API, тогда велика вероятность того, что вам понадобится выполнить дополнительные
действия при инициализации объектов существующих классов (например, при инициализации объекта `DG.Polyline`).
Для подобного рода задач имеется метод `addInitHook`:

    MyClass.addInitHook(function () {
        // ... выполнить дополнительные действия при вызове конструктора
        // например, добавить обработчики событий, установить значения свойств и т.п.
    });

Альтернативный вариант вызова, если необходимо использовать лишь один метод при инициализации:

    MyClass.addInitHook('methodName', arg1, arg2, …);

