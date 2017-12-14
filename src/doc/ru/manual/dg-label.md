## Подсказки

{toc}

### DG.Label

Класс <code>DG.Label</code> реализует небольшую подсказку, которая может появляться над определенным объектом на карте
(над маркером или векторным слоем, например). Также, подсказки могут отображаться не только, при наведении курсора мыши
на объект, а постоянно, такие подсказки называются статическими.

#### Пример использования

Включить отображение подсказки при наведении курсора мыши на маркер довольно просто:

    DG.marker([54.9502, 82.8380], {
        label : 'Я подсказка!'
    }).addTo(map);

Для векторных слоев, подсказку можно указать таким образом, например:

    DG.polyline([
        [55.02, 83.02],
        [54.97, 83.03],
        [54.95, 83.01],
        [54.98, 82.97]
    ], {
        label: 'Я подсказка!'
    }).addTo(map);

Для добавления подсказки к уже созданному объекту, следует вызвать метод <code>bindLabel</code>:

    var marker = DG.marker([54.9502, 82.8980]).addTo(map);
    marker.bindLabel('Я статическая подсказка!', { static: true });

<!--
TODO: JSAPI-3564
Отображение автономной статической подсказки на карте:

    DG.label('Я автономная подсказка!')
        .setLatLng([54.9502, 82.8980]);
        .addTo(map);

#### Создание
...
-->

#### Опции

При вызове метода <code>bindLabel</code>, вы можете задать следующие опции для всплывающей подсказки:

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
            <td><b><code>offset</code></b></td>
            <td><code><a href="/doc/maps/ru/manual/basic-types#dgpoint">Point</a></code></td>
            <td><nobr><code>Point(12, 15)</code></nobr></td>
            <td>Смещение контейнера всплывающей подсказки относительно позиции курсора (позиции маркера в случае
                использования с маркером).</td>
        </tr>
        <tr>
            <td><b><code>className</code></b></td>
            <td><code>String</code></td>
            <td><code>'dg-label'</code></td>
            <td>CSS класс который будет присвоен DOM элементу всплывающей подсказки.</td>
        </tr>
        <tr id="label-static">
            <td><b><code>static</code></b></td>
            <td><code>Boolean</code></td>
            <td><code>false</code></td>
            <td>Если задано значение <code>true</code>, тогда всплывающая подсказка будет отображаться постоянно
                (эта опция доступна только для подсказки у маркера).</td>
        </tr>
        <tr id="label-textdirection">
            <td><code><b>textDirection</b></code></td>
            <td><code>string</code></td>
            <td><code>'auto'</code></td>
            <td>Направление текста подсказки. Может принимать одно из следующих значений: <code>'auto'</code>,
                <code>'rtl'</code>, <code>'ltr'</code>.</td>
        </tr>
    </tbody>
</table>

<!--
TODO: JSAPI-3564
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
            <td><code><b>setContent</b>(&lt;String&gt; content)</code></td>
            <td><code>this</code></td>
            <td>Устанавливает содержимое всплывающей подсказки.</td>
        </tr>
        <tr>
            <td><code><b>setLatLng</b>(&lt;<a href="/doc/maps/ru/manual/basic-types#dglatlng">LatLng</a>&gt; latlng)</code></td>
            <td><code>this</code></td>
            <td>Устанавливает географические координаты подсказки.</td>
        </tr>
        <tr>
            <td><code><b>getLatLng</b>(
                <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latlng</i> )</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Возвращает географические координаты подсказки.</td>
        </tr>
    </tbody>
</table>
-->
