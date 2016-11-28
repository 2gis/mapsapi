## Слои с мета-информацией

Позволяет создавать дополнительные слои с мета-информацией и добавлять их на карту.

{toc}

### DG.Meta.layer

Наследует от <a href="/doc/maps/ru/manual/base-classes#dglayer"><code>DG.Layer</code></a>.

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
            <td><code><b>DG.Meta.layer</b>(
                <nobr>&lt;String&gt; <i>source</i>,</nobr>
                <nobr>&lt;<a href="#опции">DG.Meta.layer options</a>&gt; <i>options?</i> )</nobr>
            </code></td>
            <td><code>DG.Meta.layer(&hellip;)</code></td>
            <td>Создает дополнительный слой с метаинформацией. Принимает в качестве параметра source URL,
                по которому доступны тайлы допслоя.</td>
        </tr>
    </tbody>
</table>

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
        <tr>
            <td><code><b>tileSize</b></code></td>
            <td><code>Number</code></td>
            <td><code>256</code></td>
            <td>Размер тайла (ширина и высота в пикселях, предполагается что тайл квадратный).</td>
        </tr>
        <tr>
            <td><code><b>minZoom</b></code></td>
            <td><code>Number</code></td>
            <td><code>0</code></td>
            <td>Минимальный уровень зума.</td>
        </tr>
        <tr>
            <td><code><b>maxZoom</b></code></td>
            <td><code>Number</code></td>
            <td><code>18</code></td>
            <td>Максимальный уровень зума.</td>
        </tr>
        <tr>
            <td><code><b>zoomOffset</b></code></td>
            <td><code>Number</code></td>
            <td><code>0</code></td>
            <td>Значение, на которое будет смещен уровень масштабирования в адресе тайла.</td>
        </tr>
        <tr>
            <td><code><b>eventBubbling</b></code></td>
            <td><code>String</code></td>
            <td><code><span class="string">'transparent'</span>||<span class="string">'layer'</span></td>
            <td>Способ, которым мета-слой обрабатывает события. Принимает значения <b>layer</b>
                или <b>transparent</b> (по-умолчанию):<ul><li>transparent &mdash; мета-слой принимает
                все события и прокидывает их на карту</li><li>layer &mdash; мета-слой принимает
                события и останавливает их после обработки</li></ul></td>
        </tr>
    </tbody>
</table>

#### События

Вы можете подписаться на следующие события, используя
<a href="/doc/maps/ru/manual/base-classes#dgevented">эти методы</a>.

<table>
    <thead>
        <tr>
            <th>Событие</th>
            <th>Данные</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>mouseover</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#metaevent">MetaEvent</a></code>
            <td>Вызывается при наведении курсором мыши на объект допслоя.</td>
        </tr>
        <tr>
            <td><code><b>mouseout</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#metaevent">MetaEvent</a></code>
            <td>Вызывается при когда курсор мыши покидает границы объекта допслоя.</td>
        </tr>
        <tr>
          <td><code><b>mousemove</b></code></td>
          <td><code><a href="/doc/maps/ru/manual/base-classes#metaevent">MetaEvent</a></code></td>
          <td>Вызывается при движении курсора мыши над объектом допслоя.</td>
        </tr>
        <tr>
          <td><code><b>click</b></code></td>
          <td><code><a href="/doc/maps/ru/manual/base-classes#metaevent">MetaEvent</a></code></td>
          <td>Вызывается при клике мыши в допслой.</td>
        </tr>
        <tr>
          <td><code><b>dblclick</b></code></td>
          <td><code><a href="/doc/maps/ru/manual/base-classes#metaevent">MetaEvent</a></code></td>
          <td>Вызывается при двойном клике мыши в допслой.</td>
        </tr>
        <tr>
          <td><code><b>mousedown</b></code></td>
          <td><code><a href="/doc/maps/ru/manual/base-classes#metaevent">MetaEvent</a></code></td>
          <td>Вызывается при нажатии мыши, когда курсор находится над допслоем.</td>
        </tr>
        <tr>
          <td><code><b>contextmenu</b></code></td>
          <td><code><a href="/doc/maps/ru/manual/base-classes#metaevent">MetaEvent</a></code></td>
          <td>Вызывается при клике правой кнопкой мыши в допслой.</td>
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
            <td><code><b>getOrigin</b>()</code></td>
            <td><code>Object</code></td>
            <td>Возвращает origin-инстанс допслоя.</td>
        </tr>
    </tbody>
</table>

### DG.Meta.origin

Работает с метаданными слоя, наследует от <a href="/doc/maps/ru/manual/base-classes#dgclass"><code>DG.Class</code></a>.

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
            <td><code><b>DG.Meta.origin</b>(
                <nobr>&lt;String&gt; <i>source</i>,</nobr>
                <nobr>&lt;DG.Meta.layer options&gt; <i>options?</i> )</nobr>
            </code></td>
            <td><code>DG.Meta.origin(&hellip;)</code></td>
            <td>Создает инстанс для работы с данными метаслоя. Принимает в качестве параметра source URL,
                по которому доступны тайлы допслоя.</td>
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
            <td><code><b>subdomains</b></code></td>
            <td><code>String</code> или <code>String[]</code></td>
            <td><code>'0123'</code></td>
            <td>Поддомены тайлового сервиса. Могут передаваться одной строкой (где каждая буква &mdash;
                имя поддомена) или массивом строк.</td>
        </tr>
        <tr>
            <td><code><b>dataFilter</b></code></td>
            <td><code>Function</code></td>
            <td><code>null</code></td>
            <td>Опциональный параметр, который принимает функцию для фильтрации или преобразования метаданных,
                полученных от сервера.</td>
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
            <td><code><b>getTileData</b>(
                <nobr>&lt;Object&gt; <i>coord</i>)</nobr>
            </code>
            <td><code>Object</code></td>
            <td>Возвращает метаданные метаслоя по заданному тайлу.</td>
        </tr>
        <tr>
            <td><code><b>setTileData</b>(
                <nobr>&lt;String&gt;/&lt;Object&gt; <i>coord</i>,</nobr>
                <nobr>&lt;Object&gt; <i>data</i>)</nobr>
            </code>
            <td><code>this</code></td>
            <td>Присваевает данные data для тайла с ключем coord.</td>
        </tr>
        <tr>
            <td><code><b>flush</b>()</code></td>
            <td><code>this</code></td>
            <td>Полностью очищает закешированные данные по всем тайлам.</td>
        </tr>
        <tr>
            <td><code><b>setURL</b>(
                <nobr>&lt;String&gt; <i>url</i>,</nobr>
                <nobr>&lt;Boolean&gt; <i>flush?</i>)</nobr>
            </code>
            <td><code>this</code></td>
            <td>Устанавливает url, по которому забираются метаданные. Если передан парметр flush=true,
                закешированные данные будут очищены.</td>
        </tr>
        <tr>
            <td><code><b>getTileKey</b>(
                <nobr>&lt;Object&gt; <i>coord</i>)</nobr>
            </code>
            <td><code>String</code></td>
            <td>Возвращает ключ тайла в виде строки.</td>
        </tr>
    </tbody>
</table>
