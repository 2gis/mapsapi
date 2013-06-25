## L.DG.Wicket

Wicket легковесная библиотека для получения Leaflet геометрий из WKT данных ([Well-Known Text](http://en.wikipedia.org/wiki/Well-known_text)).

### Конструктор

<table>
    <tr>
        <th>Конструктор</th>
        <th>Использование</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>L.DG.wkt</b>(
            <nobr> <i>options?</i> )</nobr>
        </code></td>

        <td>
            <code>L.DG.wkt(&hellip;)</code>
        </td>

        <td>Создает объект, который читает WKT строки и возвращает объекты геометрий.</td>
    </tr>
</table>

### Опции

<table>
    <tr>
        <th>Опция</th>
        <th>Тип</th>
        <th>По умолчанию</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>initializer</b></code></td>
        <td><code>String</code></td>
        <td>null</td>
        <td>Опциональный параметр, WKT строка.</td>
    </tr>
</table>

### Методы

<table>
    <tr>
        <th>Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>fromObject</b>(
            <nobr>&lt;Object&gt; <i>obj</i> )</nobr>
        </code></td>

        <td><code>Object</code></td>
        <td>Преобразовует Leaflet геометрию в геометрию внутреннего формата библиотеки.</td>
    </tr>
    <tr>
        <td><code><b>isCollection</b>()
        </code></td>

        <td><code>Boolean</code></td>
        <td>Возвращает true, если внутренняя геометрия содержит коллекцию геометрий.</td>
    </tr>
    <tr>
        <td><code><b>read</b>(
            <nobr>&lt;String&gt; <i>wkt</i>)</nobr>
        </code></td>

        <td><code>Array</code></td>
        <td>Принимает WKT строку, валидирует и обрабатывает ее.</td>
    </tr>
    <tr>
        <td><code><b>sameCoords</b>(
            <nobr>&lt;Object&gt; <i>a</i></nobr>,
            <nobr>&lt;Object&gt; <i>b</i> )</nobr>
        </code></td>

        <td><code>Boolean</code></td>

        <td>Возвращает <code>true</code>, если у точек одинаковые координаты.</td>
    </tr>
    <tr>
        <td><code><b>toObject</b>(
            <nobr>&lt;Object&gt; <i>config</i></nobr> )
        </code></td>

        <td><code>Object</code></td>

        <td>Создает Leaflet геометрию из внутреннего формата.</td>
    </tr>
    <tr>
        <td><code><b>write</b>(
            <nobr>&lt;Array&gt; <i>components</i></nobr> )
        </code></td>

        <td><code>String</code></td>

        <td>Возвращает данные об объектах в формате WKT строки.</td>
    </tr>
</table>
