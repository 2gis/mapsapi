## Класс DG.Wkt

{toc}

### Описание

Используется для получения геометрий API карт на основе их описания в <a target="_blank" href="http://en.wikipedia.org/wiki/Well-known_text">WKT-формате</a>.

### Пример использования 

Считывает описание многоугольника в WKT-формате и отображает его на карте:

    var wkt = DG.wkt();
    var polygonComponents = wkt.read('POLYGON((82.91699 55.042136, 82.917522 55.040187, 82.918063 55.040235, 82.917540 55.042184,82.91699 55.042136))');
    wkt.toObject(polygonComponents).addTo(map);

### Конструктор

<table>
    <thead>
        <tr>
            <th>Конструктор</th>
            <th>Использование</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>DG.wkt</b>(
                <nobr> &lt;<a href="#опции">Wkt options</a>&gt; <i>options?</i> )</nobr>
            </code></td>
            <td>
                <code>DG.wkt(&hellip;)</code>
            </td>
            <td>Создает объект, отвечающий за обработку данных в WKT-формате.</td>
        </tr>
    </tbody>
</table>

### Опции

<table>
    <thead>
        <tr>
            <th>Опция</th>
            <th>Тип</th>
            <th>По умолчанию</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>initializer</b></code></td>
            <td><code>&lt;String&gt;</code></td>
            <td>null</td>
            <td>Данные в WKT-формате (опционально).</td>
        </tr>
    </tbody>
</table>

### Методы

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
            <td><code><b>read</b>(
                <nobr>&lt;String&gt; <i>wkt</i>)</nobr>
            </code></td>
            <td><code>Array</code></td>
            <td>Считывает строку в WKT-формате и проверяет ее корректность. Возвращает массив компонентов геометрии (ее внутреннее представление).</td>
        </tr>
        <tr>
            <td><code><b>toObject</b>(
                <nobr>&lt;Object&gt; <i>config</i> )</nobr></code></td>
            <td><code>Object</code></td>
            <td>Формирует геометрию API карт на основе данных, считанных методом read. Этот метод поддерживает все параметры конструктора класса <a href="/doc/2.0/maps/manual/geometries#класс-dgpath">Path</a>. Например, можно передать параметр <code>toObject({clickable:false})</code>, чтобы сделать геометрию некликабельной.</td>
        </tr>
        <tr>
            <td><code><b>write</b>(
                <nobr>&lt;Array&gt; <i>components</i> )</nobr>
            </code></td>
            <td><code>String</code></td>
            <td>Возвращает WKT-описание на основе компонентов геометрии (ее внутреннего представления).</td>
        </tr>
    </tbody>
</table>