## Вспомогательные классы

{toc}

### DG.Browser

Объект со статическими свойствами, описывающими браузер пользователя, например:

    if (DG.Browser.ie6) {
        alert('Вам срочно нужно обновить свой браузер!');
    }

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
        <tr id="browser-ie">
            <td><code><b>ie</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> для всех версий Internet Explorer (не Edge).</td>
        </tr>
        <tr id="browser-ielt9">
            <td><code><b>ielt9</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> для всех версий Internet Explorer ниже версии 9.</td>
        </tr>
        <tr id="browser-edge">
            <td><code><b>edge</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> для браузера Edge.</td>
        </tr>
        <tr id="browser-webkit">
            <td><code><b>webkit</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> для браузеров на основе WebKit, таких как Chrome и Safari (включая мобильные версии).</td>
        </tr>
        <tr id="browser-gecko">
            <td><code><b>gecko</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> для браузеров на основе gecko, таких как Firefox.</td>
        </tr>
        <tr id="browser-android">
            <td><code><b>android</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> для мобильных браузеров работающих на базе платформы Android.</td>
        </tr>
        <tr id="browser-android23">
            <td><code><b>android23</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> для мобильных браузеров на старых версиях Android устройств (2 и 3).</td>
        </tr>
        <tr id="browser-chrome">
            <td><code><b>chrome</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> для браузера Chrome.</td>
        </tr>
        <tr id="browser-safari">
            <td><code><b>safari</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> для браузера Safari.</td>
        </tr>
        <tr id="browser-ie3d">
            <td><code><b>ie3d</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> для всех версий Internet Explorer, поддерживающих CSS transform.</td>
        </tr>
        <tr id="browser-webkit3d">
            <td><code><b>webkit3d</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> для всех браузеров на основе WebKit, поддерживающих CSS transform.</td>
        </tr>
        <tr id="browser-gecko3d">
            <td><code><b>gecko3d</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> для всех браузеров на основе gecko, поддерживающих CSS transform.</td>
        </tr>
        <tr id="browser-opera12">
            <td><code><b>opera12</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> для всех версий Opera, поддерживающих CSS transform (версия 12+).</td>
        </tr>
        <tr id="browser-any3d">
            <td><code><b>any3d</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> для всех браузеров, поддерживающих CSS transform.</td>
        </tr>
        <tr id="browser-mobile">
            <td><code><b>mobile</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> для браузеров, работающих на современных мобильных устройствах.</td>
        </tr>
        <tr id="browser-mobilewebkit">
            <td><code><b>mobileWebkit</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> для мобильных браузеров на основе WebKit.</td>
        </tr>
        <tr id="browser-mobilewebkit3d">
            <td><code><b>mobileWebkit3d</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> для мобильных браузеров на основе WebKit, поддерживающих CSS transform.</td>
        </tr>
        <tr id="browser-mobileopera">
            <td><code><b>mobileOpera</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> для мобильной версии Opera.</td>
        </tr>
        <tr id="browser-mobilegecko">
            <td><code><b>mobileGecko</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> для мобильных браузеров на основе gecko.</td>
        </tr>
        <tr id="browser-touch">
            <td><code><b>touch</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> для всех браузеров, поддерживающих <a href="https://developer.mozilla.org/docs/Web/API/Touch_events">touch events</a>.</td>
        </tr>
        <tr id="browser-mspointer">
            <td><code><b>msPointer</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> для браузеров, поддерживающих touch events модель от Microsoft (например, IE10).</td>
        </tr>
        <tr id="browser-pointer">
            <td><code><b>pointer</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> для всех браузеров, поддерживающих <a href="https://msdn.microsoft.com/en-us/library/dn433244%28v=vs.85%29.aspx">pointer events</a>.</td>
        </tr>
        <tr id="browser-retina">
            <td><code><b>retina</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> для браузеров, работающих на устройствах с Retina экраном.</td>
        </tr>
        <tr id="browser-canvas">
            <td><code><b>canvas</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> для браузеров, поддерживающих <a href="https://developer.mozilla.org/docs/Web/API/Canvas_API"><code>&lt;canvas&gt;</code></a>.</td>
        </tr>
        <tr id="browser-vml">
            <td><code><b>vml</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> для браузеров, поддерживающих <a href="https://ru.wikipedia.org/wiki/VML">VML</a>.</td>
        </tr>
        <tr id="browser-svg">
            <td><code><b>svg</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> для браузеров, поддерживающих <a href="https://developer.mozilla.org/docs/Web/SVG">SVG</a>.</td>
        </tr>
    </tbody>
</table>

### DG.Util

Общие служебные методы и свойства.

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
        <tr id="util-extend">
            <td><code><b>extend</b>(
                <nobr>&lt;Object&gt; <i>dest</i>,</nobr>
                <nobr>&lt;Object&gt; <i>src?</i> )</nobr>
            </code></td>

            <td><code>Object</code></td>
            <td>Объединяет свойства объекта <code>src</code> (или нескольких объектов) и свойства объекта
                <code>dest</code> и возвращает последний. Также доступен под псевдонимом <code>DG.extend</code>.</td>
        </tr>
        <tr id="util-create">
            <td><code><b>create</b>(
                <nobr>&lt;Object&gt; <i>proto</i>,</nobr>
                <nobr>&lt;Object&gt; <i>properties?</i> )</nobr>
            </code></td>

            <td><code>Object</code></td>
            <td>Полифил для <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/create">Object.create</a></td>
        </tr>
        <tr id="util-bind">
            <td><code><b>bind</b>(
                <nobr>&lt;Function&gt; <i>fn</i>, <i>…</i> )</nobr>
            </code></td>

            <td><code>Function</code></td>
            <td>Возвращает функцию, которая выполняет функцию <code>fn</code> с определенным объектом контекста
                <code>obj</code> (так, чтобы ключевое слово <code>this</code> внутри функции указывало на
                <code>obj</code>). Также доступно под псевдонимом <code>DG.bind</code>.</td>
        </tr>
        <tr id="util-stamp">
            <td><code><b>stamp</b>(
                <nobr>&lt;Object&gt; <i>obj</i> )</nobr>
            </code></td>

            <td><code>Number</code></td>
            <td>Возвращает уникальный ID объекта, создавая его при необходимости. Полезно для получения быстрого
                доступа к объекту, находящемуся в группе.</td>
        </tr>
        <tr id="util-throttle">
            <td><code><b>throttle</b>(
                <nobr>&lt;Function&gt; <i>fn</i>,</nobr>
                <nobr>&lt;Number&gt; <i>time</i>,</nobr>
                <nobr>&lt;Object&gt; <i>context</i> )</nobr>
            </code></td>

            <td><code>Function</code></td>
            <td>Возвращает обертку над функцией <code>fn</code>, которая гарантирует, что функция не будет
                вызвана более чем один раз в заданный интервал времени <code>time</code>
                (например, используется при запросах к тайлам во время перетаскивания карты), опционально
                можно передать контекст (<code>context</code>), с которым будет вызываться функция.</td>
        </tr>
        <tr id="util-wrapnum">
            <td><code><b>wrapNum</b>(
                <nobr>&lt;Number&gt; <i>num</i>,</nobr>
                <nobr>&lt;Number[]&gt; <i>range</i>,</nobr>
                <nobr>&lt;Boolean&gt; <i>includeMax?</i> )</nobr>
            </code></td>

            <td><code>Number</code></td>
            <td>Возвращает число <code>num</code> приведенное к диапазону <code>range</code> (modulo).
                Получившееся значение будет всегда меньше <code>range[1]</code>, если только опция
                <code>includeMax</code> не выставлена в <code>true</code>.</td>
        </tr>
        <tr id="util-falsefn">
            <td><code><b>falseFn</b>()</code></td>

            <td><code>Function</code></td>
            <td>Возвращает функцию, вызов которой всегда будет давать результат <code>false</code>.</td>
        </tr>
        <tr id="util-formatnum">
            <td><code><b>formatNum</b>(
                <nobr>&lt;Number&gt; <i>num</i>,</nobr>
                <nobr>&lt;Number&gt; <i>digits?</i> )</nobr>
            </code></td>

            <td><code>Number</code></td>
            <td>Возвращает число <code>num</code>, округленное до <code>digits</code> десятичных знаков
                (5 знаков по умолчанию).</td>
        </tr>
        <tr id="util-trim">
            <td><code><b>trim</b>(
                <nobr>&lt;String&gt; <i>str</i> )</nobr>
            </code></td>

            <td><code>String</code></td>
            <td>Полифил для <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/Trim">String.prototype.trim</a></td>
        </tr>
        <tr id="util-splitwords">
            <td><code><b>splitWords</b>(
                <nobr>&lt;String&gt; <i>str</i> )</nobr>
            </code></td>

            <td><code>String[]</code></td>
            <td>Обрезает и разделяет строку на части, используя в качестве разделителя пробел, возвращает массив с этими частями.</code></td>
        </tr>
        <tr id="util-setoptions">
            <td><code><b>setOptions</b>(
                <nobr>&lt;Object: options: Object&gt; <i>obj</i> )</nobr>
            </code></td>

            <td><code>Object</code></td>
            <td>Объединяет свойства <code>options</code> со свойствами объекта <code>obj</code>, возвращая
                получившийся объект. См. <code>Class options</code>. Также доступен под псевдонимом <code>DG.setOptions</code>.</td>
        </tr>
        <tr id="util-getparamstring">
            <td><code><b>getParamString</b>(
                <nobr>&lt;Object&gt; <i>obj</i>,</nobr>
                <nobr>&lt;String&gt; <i>existingUrl?</i>,</nobr>
                <nobr>&lt;Boolean&gt; <i>uppercase?</i> )</nobr>
            </code></td>

            <td><code>String</code></td>
            <td>Преобразует объект в URL-строку, например, <nobr><code>{a: &quot;foo&quot;, b: &quot;bar&quot;}</code></nobr>
                будет преобразован в <code>&#39;?a=foo&amp;b=bar&#39;</code>. Если задан параметр <code>existingUrl</code>
                результирующая строка будет подготовлена для добавления в конец переданного URL. Также возможно приведение названий
                свойств к верхнему регистру (параметр <code>uppercase</code>). Простейший шаблонизатор также воспринимает
                строки в формате <code>&#39;Hello {a}, {b}&#39;</code> и объект вида <code>{a: &#39;foo&#39;, b: &#39;bar&#39;}</code>.
                При таком вызове метод возвращает строку <code>(&#39;Hello foo, bar&#39;)</code>.</td>
        </tr>
        <tr id="util-isarray">
            <td><code><b>isArray</b>(<i>obj</i>)</code></td>

            <td><code>Boolean</code></td>
            <td>Полифил для <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray">Array.isArray</a></td>
        </tr>
        <tr id="util-indexof">
            <td><code><b>indexOf</b>()</code></td>

            <td><code>Number</code></td>
            <td>Полифил для <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf">Array.prototype.indexOf</a></td>
        </tr>
        <tr id="util-requestanimframe">
            <td><code><b>requestAnimFrame</b>(
                <nobr>&lt;Function&gt; <i>fn</i>,</nobr>
                <nobr>&lt;Object&gt; <i>context?</i>,</nobr>
                <nobr>&lt;Boolean&gt; <i>immediate?</i> )</nobr>
            </code></td>

            <td><code>requestId: Number</code></td>
            <td>Использует планировщик для вызова функции <code>fn</code> при событии обновлении окна браузера (repaint).
                Функция <code>fn</code> вызывается с контекстом <code>context</code>, если он задан. Когда задан параметр
                <code>immediate</code>, <code>fn</code> функция вызывается сразу же, если браузер не поддерживает нативно
                <a href="https://developer.mozilla.org/docs/Web/API/window/requestAnimationFrame"><code>window.requestAnimationFrame</code></a>,
                в противном случае вызов откладывается, до возникновения события перерисовки. Возвращает id, который может
                быть использован для отмены задания планировщика.</td>
        </tr>
        <tr id="util-cancelanimframe">
            <td><code><b>cancelAnimFrame</b>(
                <nobr>&lt;Number&gt; <i>id</i> )</nobr>
            </code></td>
            <td><code></code></td>
            <td>Отменяет предыдущий <code>requestAnimFrame</code>. См. также <a href="https://developer.mozilla.org/docs/Web/API/window/cancelAnimationFrame">window.cancelAnimationFrame</a>.</td>
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
        <tr id="util-lastid">
            <td><code><b>lastId</b></code></td>
            <td><code>Number</code></td>
            <td>Последний уникальный ID, используемый <a href="#util-stamp"><code>stamp()</code></a></td>
        </tr>
        <tr id="util-emptyimageurl">
            <td><code><b>emptyImageUrl</b></code></td>
            <td><code>String</code></td>
            <td>URI, содержащий пустое GIF изображение, закодированное в base64. Используется для освобождения памяти
                неиспользуемых картинок в мобильных WebKit браузерах (память освобождается установкой свойства
                <code>src</code> в данное значение).</td>
        </tr>
    </tbody>
</table>

### DG.LineUtil

Набор методов для обработки ломаных.

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
        <tr id="lineutil-simplify">
            <td><code><b>simplify</b>(
                <nobr>&lt;Point[]&gt; <i>points</i>,</nobr>
                <nobr>&lt;Number&gt; <i>tolerance</i> )</nobr>
            </code></td>

            <td><code>Point[]</code></td>
            <td>Уменьшает количество точек в ломаной и возвращает новую упрощенную ломаную. Позволяет увеличить
                производительность обработки/отображения ломаных на карте. Параметр <code>tolerance</code> влияет
                на величину упрощения (чем меньше значение, тем лучше качество геометрии и ниже производительность).</td>
        </tr>
        <tr id="lineutil-pointtosegmentdistance">
            <td><code><b>pointToSegmentDistance</b>(
                <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dgpoint">Point</a>&gt; <i>p</i></nobr>,
                <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dgpoint">Point</a>&gt; <i>p1</i></nobr>,
                <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dgpoint">Point</a>&gt; <i>p2</i> )</nobr>
            </code></td>

            <td><code>Number</code></td>
            <td>Возвращает расстояние между точкой <code>p</code> и сегментом между точками <code>p1</code> и <code>p2</code>.</td>
        </tr>
        <tr id="lineutil-closestpointonsegment">
            <td><code><b>closestPointOnSegment</b>(
                <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dgpoint">Point</a>&gt; <i>p</i></nobr>,
                <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dgpoint">Point</a>&gt; <i>p1</i></nobr>,
                <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dgpoint">Point</a>&gt; <i>p2</i> )</nobr>
            </code></td>

            <td><code>Number</code></td>
            <td>Возвращает ближайшую точку на сегменте <code>p1</code> <code>p2</code> до точки <code>p</code>.</td>
        </tr>
    </tbody>
</table>

### DG.PolyUtil

Набор служебных функций для работы с многоугольниками.

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
        <tr id="polyutil-clippolygon">
		    <td><code><b>clipPolygon</b>(
		        <nobr>&lt;Point[]&gt; <i>points</i>,</nobr>
		        <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dgbounds">Bounds</a>&gt; <i>bounds</i>,</nobr>
		        <nobr>&lt;Boolean&gt; <i>round?</i> )</nobr>
		    </code></td>

    		<td><code>Point[]</code></td>
    		<td>Обрезает многоугольник, заданный координатами <code>points</code> по заданным границам
    		    (используя алгоритм <a href="https://en.wikipedia.org/wiki/Sutherland%E2%80%93Hodgman_algorithm">Sutherland-Hodgeman</a>а).</td>
    	</tr>
    </tbody>
</table>
