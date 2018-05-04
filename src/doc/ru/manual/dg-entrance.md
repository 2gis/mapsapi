## DG.Entrance

Позволяет отобразить вход в здание. Класс поддерживает простейшую анимацию и отображение сразу нескольких входов. Сами
объекты входов представляют собой стрелки, которые изменяют свой масштаб вместе с изменением масштаба карты, но не ниже
16 уровня, после которого стрелки исчезают с карты (до возвращения приемлемого значения уровня масштабирования).

{toc}

### DG.Entrance

#### Пример использования

Создание и отображение входов в здание:

    var options = {vectors: [
        "LINESTRING(82.897079 54.980906,82.897191 54.980844)",
        "LINESTRING(82.897933 54.980649,82.898045 54.980587)",
        "LINESTRING(82.897071 54.980122,82.897226 54.98013)",
        "LINESTRING(82.897354 54.979515,82.89741 54.979599)",
        "LINESTRING(82.898498 54.979826,82.898386 54.979889)"
    ]}
    DG.entrance(options).addTo(map).show(true);

#### Создание

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
            <td><code><b>DG.Entrance</b>(
                <nobr>&lt;<a href="#entrance-options">Entrance options</a>&gt; <i>options</i> )</nobr>
            </code></td>
            <td><code>DG.entrance(&hellip;)</code></td>
            <td>Создает объект входа на основе переданных опций.</td>
        </tr>
    </tbody>
</table>

#### Опции

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
            <td><code><b>vectors</b></code></td>
            <td><code>Array</td>
            <td><code>[]</code></td>
            <td><b>(обязательный параметр)</b>Массив векторов, описывающих входы в здание. В массиве можно передать
                несколько значений, если существует более одного входа в здание. Каждый элемент должен представлять
                собой строку в WKT-формате: LINESTRING(lng0 lat0,lng1 lat1[,... lngN latN]), где последняя пара координат
                должна представлять собой непосредственно точку входа в здание, а предыдущие координаты - маршрут до этой точки.
                На всем протяжении маршрута не должно быть взаимных пересечений.</td>
        </tr>
        <tr>
            <td><code><b>fillColor</b></code></td>
            <td><code>String</td>
            <td><code>#0085a0</code></td>
            <td>Цвет заполнения стрелок.</td>
        </tr>
        <tr>
            <td><code><b>strokeColor</b></code></td>
            <td><code>String</td>
            <td><code>#ffffff</code></td>
            <td>Цвет обводки стрелок.</td>
        </tr>
        <tr>
            <td><code><b>enableAnimation</b></code></td>
            <td><code>Boolean</td>
            <td><code>true</code></td>
            <td>Анимировать ли отображение стрелок при изменении уровней масштаба карты и начальном показе.</td>
        </tr>
        <tr>
            <td><code><b>interactive</b></code></td>
            <td><code>Boolean</td>
            <td><code>false</code></td>
            <td>Если значение false, тогда обработчик действий мыши не вызывается.</td>
        </tr>
        <tr>
            <td><code><b>autoClose</b></code></td>
            <td><code>Boolean</td>
            <td><code>true</code></td>
            <td>Если значение true, то входы пропадут с карты после добавления новых слоев.</td>
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
        <tr>
            <td><code><b>addTo</b>(
                <nobr>&lt;<a href="#map">Map</a>&gt; <i>map</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Добавляет объект входов на карту.</td>
        </tr>
        <tr>
            <td><code><b>removeFrom</b>(
                <nobr>&lt;<a href="#map">Map</a>&gt; <i>map</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Удаляет объект входов с карты.</td>
        </tr>
        <tr>
            <td><code><b>show</b>(
                <nobr>&lt;fitBounds&gt; <i>boolean</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Отображает входы на карте. Если <code>fitBounds</code> установлен в <code>true</code>, тогда границы карты
                (и уровень масштаба) подстраиваются таким образом, чтобы пользователь увидел все входы на одном экране.</td>
        </tr>
        <tr>
            <td><code><b>hide</b>()</code></td>

            <td><code>this</code></td>
            <td>Скрывает входы. Сами объекты не удаляются с карты и входы могут быть повторно отображены путем вызова метода
                <code>show()</code>.</td>
        </tr>
        <tr>
            <td><code><b>isShown</b>()</code></td>
            <td><code>Boolean</code></td>
            <td>Возвращает <code>true</code>, если входы в данный момент отображаются на карте.</td>
        </tr>
        <tr>
            <td><code><b>setFillColor</b>()</code></td>
            <td><code>String</code></td>
            <td>Изменяет цвет заполнения стрелок.</td>
        </tr>
        <tr>
            <td><code><b>setStrokeColor</b>()</code></td>
            <td><code>String</code></td>
            <td>Изменяет цвет обводки стрелок.</td>
        </tr>
    </tbody>
</table>
