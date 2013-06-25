## L.DG.Wkt

Используется для получения объектов геометрий из их описаний в [WKT-формате](http://en.wikipedia.org/wiki/Well-known_text).

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

        <td>Создает объект для обработки данных в WKT-формате.</td>
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
        <td>Данные в WKT-формате (опционально).</td>
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
        <td>Формирует объект с компонентами геометрической фигуры (внутреннее представление геометрии) на основе полученной геометрии API карт.</td>
    </tr>
    <tr>
        <td><code><b>isCollection</b>()
        </code></td>

        <td><code>Boolean</code></td>
        <td>Возвращает true, если внутреннее представление геометрической фигуры является коллекцией.</td>
    </tr>
    <tr>
        <td><code><b>read</b>(
            <nobr>&lt;String&gt; <i>wkt</i>)</nobr>
        </code></td>

        <td><code>Array</code></td>
        <td>Возвращает объект с компонентами геометрической фигуры (внутреннее представление) на основе данных в WKT-формате.</td>
    </tr>
    <tr>
        <td><code><b>sameCoords</b>(
            <nobr>&lt;Object&gt; <i>a</i></nobr>,
            <nobr>&lt;Object&gt; <i>b</i> )</nobr>
        </code></td>

        <td><code>Boolean</code></td>

        <td>Возвращает <code>true</code>, если координаты точек совпадают.</td>
    </tr>
    <tr>
        <td><code><b>toObject</b>(
            <nobr>&lt;Object&gt; <i>config</i></nobr> )
        </code></td>

        <td><code>Object</code></td>

        <td>Формирует геометрию API карт на основе объекта с компонентами геометрической фигуры (внутреннего представления).</td>
    </tr>
    <tr>
        <td><code><b>write</b>(
            <nobr>&lt;Array&gt; <i>components</i></nobr> )
        </code></td>

        <td><code>String</code></td>

        <td>Возвращает WKT-описание на основе объекта с компонентами геометрической фигуры (внутреннего представления).</td>
    </tr>
</table>