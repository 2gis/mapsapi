## Работа с DOM

{toc}

### DG.DomEvent

Класс для работы с <a href="https://developer.mozilla.org/docs/Web/API/Event">событиями DOM</a>.

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
        <tr id="domevent-on">
            <td><code><b>on</b>(
                <nobr>&lt;HTMLElement&gt; <i>el</i>,</nobr>
                <nobr>&lt;String&gt; <i>types</i>,</nobr>
                <nobr>&lt;Function&gt; <i>fn</i>,</nobr>
                <nobr>&lt;Object&gt; <i>context?</i> )</nobr>
            </code></td>

		    <td><code>this</code></td>
            <td>Добавляет метод <code>fn</code> к цепочкам обработчиков событий DOM, привязанных
                к элементу <code>el</code>. Вы также можете указать (изменить) контекст вызова
                обработчика (объект, на который ссылается ключевое слово <code>this</code> внутри
                обработчика). Также, можно указать несколько типов событий, разделив их пробелами
                (например: <code>&#39;click dblclick&#39;</code>).</td>
        </tr>
        <tr>
            <td><code><b>on</b>(
                <nobr>&lt;HTMLElement&gt; <i>el</i>,</nobr>
                <nobr>&lt;Object&gt; <i>eventMap</i>,</nobr>
                <nobr>&lt;Object&gt; <i>context?</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Добавляет набор пар &#39;тип/обработчик&#39; в качестве обработчиков событий DOM
                (например:  <code>{click: onClick, mousemove: onMouseMove}</code>).</td>
        </tr>
        <tr id="domevent-off">
            <td><code><b>off</b>(
                <nobr>&lt;HTMLElement&gt; <i>el</i>,</nobr>
                <nobr>&lt;String&gt; <i>types</i>,</nobr>
                <nobr>&lt;Function&gt; <i>fn</i>,</nobr>
                <nobr>&lt;Object&gt; <i>context?</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Удаляет метод <code>fn</code> из цепочек обработчиков событий DOM, привязанных
                к элементу <code>el</code>. Если метод не указан, то удаляются все методы,
                привязанные на текущий момент. Замечание: если методу <code>on</code> передавался
                контекстный объект, этот же объект должен быть передан и методу <code>off</code>.</td>
        </tr>
        <tr>
            <td><code><b>off</b>(
                <nobr>&lt;HTMLElement&gt; <i>el</i>,</nobr>
                <nobr>&lt;Object&gt; <i>eventMap</i>,</nobr>
                <nobr>&lt;Object&gt; <i>context?</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Удаляет набор пар &#39;тип/обработчик&#39; из цепочек обработчиков событий DOM.</td>
        </tr>
        <tr id="domevent-stoppropagation">
            <td><code><b>stopPropagation</b>(
                <nobr>&lt;DOMEvent&gt; <i>ev</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Останавливает всплытие события к родительским элементам. Используется внутри
                функции-обработчика. Пример:
                <pre><code>DG.DomEvent.on(div, 'click', function (ev) {
    DG.DomEvent.stopPropagation(ev);
});</code></pre></td>
        </tr>
        <tr id="domevent-disablescrollpropagation">
            <td><code><b>disableScrollPropagation</b>(
                <nobr>&lt;HTMLElement&gt; <i>el</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Добавляет <code>stopPropagation</code> к событиям элемента <code>&#39;mousewheel&#39;</code>.</td>
        </tr>
        <tr id="domevent-disableclickpropagation">
            <td><code><b>disableClickPropagation</b>(
                <nobr>&lt;HTMLElement&gt; <i>el</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Добавляет <code>stopPropagation</code> к событиям элемента <code>&#39;click&#39;</code>,
                <code>&#39;doubleclick&#39;</code>, <code>&#39;mousedown&#39;</code> and
                <code>&#39;touchstart&#39;</code>.</td>
        </tr>
        <tr id="domevent-preventdefault">
            <td><code><b>preventDefault</b>(
                <nobr>&lt;DOMEvent&gt; <i>ev</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Предотвращает поведение DOM элемента по умолчанию (например, переход по ссылке указанной
                в свойстве <code>href</code> элемента <code>a</code>). Используется внутри функции-обработчика.</td>
        </tr>
        <tr id="domevent-stop">
            <td><code><b>stop</b>(
                <nobr>&lt;DOMEvent&gt; <i>ev</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Вызывает одновременно <code>stopPropagation</code> и <code>preventDefault</code>.
                Используется внутри функции-обработчика.</td>
        </tr>
        <tr id="domevent-getmouseposition">
            <td><code><b>getMousePosition</b>(
                <nobr>&lt;DOMEvent&gt; <i>ev</i>,</nobr>
                <nobr>&lt;HTMLElement&gt; <i>container?</i> )</nobr>
            </code></td>

            <td><code><a href="/doc/maps/ru/manual/basic-types#dgpoint">Point</a></code></td>
            <td>Возвращает нормализованную позицию мыши из события DOM относительно контейнера или
                относительно всей страницы, если контейнер не указан.</td>
        </tr>
        <tr id="domevent-getwheeldelta">
            <td><code><b>getWheelDelta</b>(
                <nobr>&lt;DOMEvent&gt; <i>ev</i> )</nobr>
            </code></td>

            <td><code>Number</code></td>
            <td>Возвращает нормализованную дельту колесика мыши, в виде вертикального смещения
                в пикселях (отрицательного, при прокрутке вниз), из события DOM <code>mousewheel</code>.
                События от устройств, которые не поддерживают точную прокрутку, отображаются на пиксельные
                координаты так, чтобы дельта прокрутки попадала в диапазон 50-60 пикселей.</td>
        </tr>
        <tr id="domevent-addlistener">
            <td><code><b>addListener</b>(
                <nobr><i>…</i> )</nobr>
            </code></td>

		    <td><code>this</code></td>
            <td>Псевдоним для <a href="#domevent-on"><code>DG.DomEvent.on</code></a></td>
        </tr>
        <tr id="domevent-removelistener">
            <td><code><b>removeListener</b>(
                <nobr><i>…</i> )</nobr>
            </code></td>

		    <td><code>this</code></td>
            <td>Псевдоним для <a href="#domevent-off"><code>DG.DomEvent.off</code></a></td>
        </tr>
    </tbody>
</table>

### DG.DomUtil

Класс для работы с <a href="https://developer.mozilla.org/ru/docs/DOM/DOM_Reference">DOM деревом</a>.

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
        <tr id="domutil-get">
    		<td><code><b>get</b>(
    		    <nobr>&lt;String|HTMLElement&gt; <i>id</i> )</nobr>
    		</code></td>

		    <td><code>HTMLElement</code></td>
            <td>Возвращает элемент по его id, если параметром была передана строка, либо возвращает
                элемент непосредственно, если он был передан в качестве параметра.</td>
	    </tr>
        <tr id="domutil-getstyle">
    		<td><code><b>getStyle</b>(
		        <nobr>&lt;HTMLElement&gt; <i>el</i>,</nobr>
		        <nobr>&lt;String&gt; <i>styleAttrib</i> )</nobr>
		    </code></td>

		    <td><code>String</code></td>
            <td>Возвращает значение стилей элемента, установленных через атрибут sytle,
                включая вычисленные значения или значения, указанные с помощью CSS.</td>
    	</tr>
        <tr id="domutil-create">
		    <td><code><b>create</b>(
		        <nobr>&lt;String&gt; <i>tagName</i>,</nobr>
		        <nobr>&lt;String&gt; <i>className?</i>,</nobr>
		        <nobr>&lt;HTMLElement&gt; <i>container?</i> )</nobr>
		    </code></td>

		    <td><code>HTMLElement</code></td>
            <td>Создает HTML элемент <code>tagName</code>, устанавливает ему значение класса
                <code>className</code> и опционально добавляет его в элемент <code>container</code>.</td>
    	</tr>
        <tr id="domutil-remove">
		    <td><code><b>remove</b>(
		        <nobr>&lt;HTMLElement&gt; <i>el</i> )</nobr>
		    </code></td>

		    <td><code></code></td>
		    <td>Удаляет элемент <code>el</code> из элемента контейнера.</td>
	    </tr>
        <tr id="domutil-empty">
		    <td><code><b>empty</b>(
		        <nobr>&lt;HTMLElement&gt; <i>el</i> )</nobr>
		    </code></td>

    		<td><code></code></td>
		    <td>Удаляет все дочерние элементы из контейнера <code>el</code>.</td>
    	</tr>
        <tr id="domutil-tofront">
		    <td><code><b>toFront</b>(
		        <nobr>&lt;HTMLElement&gt; <i>el</i> )</nobr>
		    </code></td>

    		<td><code></code></td>
    		<td>Перемещает элемент <code>el</code> в конец списка дочерних элементов, чтобы он
    		    отображался поверх остальных дочерних элементов контейнера.</td>
    	</tr>
        <tr id="domutil-toback">
		    <td><code><b>toBack</b>(
		        <nobr>&lt;HTMLElement&gt; <i>el</i> )</nobr>
		    </code></td>

		    <td><code></code></td>
		    <td>Перемещает элемент <code>el</code> в начало списка дочерних элементов, чтобы он
		        отображался перед остальными дочерними элементами контейнера.</td>
	    </tr>
        <tr id="domutil-hasclass">
		    <td><code><b>hasClass</b>(
		        <nobr>&lt;HTMLElement&gt; <i>el</i>,</nobr>
		        <nobr>&lt;String&gt; <i>name</i> )</nobr>
		    </code></td>

		    <td><code>Boolean</code></td>
            <td>Возвращает <code>true</code>, если элемент содержит класс <code>name</code>.</td>
	    </tr>
        <tr id="domutil-addclass">
    		<td><code><b>addClass</b>(
    		    <nobr>&lt;HTMLElement&gt; <i>el</i>,</nobr>
    		    <nobr>&lt;String&gt; <i>name</i> )</nobr>
    		</code></td>

    		<td><code></code></td>
            <td>Добавляет класс <code>name</code> к элементу.</td>
    	</tr>
        <tr id="domutil-removeclass">
		    <td><code><b>removeClass</b>(
		        <nobr>&lt;HTMLElement&gt; <i>el</i>,</nobr>
		        <nobr>&lt;String&gt; <i>name</i> )</nobr>
		    </code></td>

		    <td><code></code></td>
            <td>Удаляет класс <code>name</code> из элемента.</td>
	    </tr>
        <tr id="domutil-setclass">
		    <td><code><b>setClass</b>(
		        <nobr>&lt;HTMLElement&gt; <i>el</i>,</nobr>
		        <nobr>&lt;String&gt; <i>name</i> )</nobr>
		    </code></td>

		    <td><code></code></td>
		    <td>Устанавливает класс у элемента.</td>
	    </tr>
        <tr id="domutil-getclass">
    		<td><code><b>getClass</b>(
    		    <nobr>&lt;HTMLElement&gt; <i>el</i> )</nobr>
    		</code></td>

    		<td><code>String</code></td>
    		<td>Возвращает значение класса элемента.</td>
    	</tr>
        <tr id="domutil-setopacity">
    		<td><code><b>setOpacity</b>(
    		    <nobr>&lt;HTMLElement&gt; <i>el</i>,</nobr>
    		    <nobr>&lt;Number&gt; <i>opacity</i> )</nobr>
    		</code></td>

    		<td><code></code></td>
    		<td>Устанавливает прозрачность элемента. Значение <code>opacity</code> должно быть
    		    в диапазоне от <code>0.0</code> до <code>1.0</code>.</td>
    	</tr>
        <tr id="domutil-testprop">
		    <td><code><b>testProp</b>(
		        <nobr>&lt;String[]&gt; <i>props</i> )</nobr>
		    </code></td>

		    <td><code>String|false</code></td>
		    <td>Перебирает массив наименований стилей элемента и возвращает первое корректное наименование.
		        Используется с префиксами производителей браузеров и стилями, вроде <code>transform</code>.</td>
	    </tr>
        <tr id="domutil-settransform">
		    <td><code><b>setTransform</b>(
		        <nobr>&lt;HTMLElement&gt; <i>el</i>,</nobr>
		        <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dgpoint">Point</a>&gt; <i>offset</i>,</nobr>
		        <nobr>&lt;Number&gt; <i>scale?</i> )</nobr>
		    </code></td>

    		<td><code></code></td>
    		<td>Устанавливает стиль 3D CSS transform элемента <code>el</code> так, чтобы он был
    		    смещен на <code>offset</code> пикселей и увеличен/уменьшен в <code>scale</code> раз.
    		    Метод не работает, если браузер не поддерживает 3D CSS transforms.</td>
	    </tr>
        <tr id="domutil-setposition">
    		<td><code><b>setPosition</b>(
    		    <nobr>&lt;HTMLElement&gt; <i>el</i>,</nobr>
    		    <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dgpoint">Point</a>&gt; <i>position</i> )</nobr>
    		</code></td>

    		<td><code></code></td>
    		<td>Изменяет позиционирование элемента <code>el</code>, используя CSS translate или свойства
    		    top/left в зависимости от поддержки браузером.</td>
	    </tr>
        <tr id="domutil-getposition">
		    <td><code><b>getPosition</b>(
		        <nobr>&lt;HTMLElement&gt; <i>el</i> )</nobr>
		    </code></td>

    		<td><code><a href="/doc/maps/ru/manual/#dgpoint">Point</a></code></td>
		    <td>Возвращает координаты элемента, ранее установленные методом <code>setPosition</code>.</td>
	    </tr>
        <tr id="domutil-disabletextselection">
    		<td><code><b>disableTextSelection</b>()</code></td>

    		<td><code></code></td>
    		<td>Отключает возможность возникновения <code>selectstart</code> событий DOM, обычно сопутствующих
    		    выделению текстового фрагмента на странице. Влияет на поведение всего документа.</td>
	    </tr>
        <tr id="domutil-enabletextselection">
		    <td><code><b>enableTextSelection</b>()</code></td>

		    <td><code></code></td>
		    <td>Включает возможность возникновения событий DOM <code>selectstart</code>, ранее отключенных
		        <a href="#domutil-disabletextselection"><code>DG.DomUtil.disableTextSelection</code></a>.</td>
	    </tr>
        <tr id="domutil-disableimagedrag">
		    <td><code><b>disableImageDrag</b>()</code></td>

    		<td><code></code></td>
    		<td>Отключает возможность возникновения <code>dragstart</code> событий DOM, обычно сопутствующих
    		    перемещению изображения по странице.</td>
	    </tr>
	    <tr id="domutil-enableimagedrag">
    		<td><code><b>enableImageDrag</b>()</code></td>

    		<td><code></code></td>
    		<td>Включает возможность возникновения событий DOM <code>dragstart</code>, ранее отключенных
    		    <a href="#domutil-disableimagedrag"><code>DG.DomUtil.disableImageDrag</code></a>.</td>
    	</tr>
        <tr id="domutil-preventoutline">
		    <td><code><b>preventOutline</b>(
		        <nobr>&lt;HTMLElement&gt; <i>el</i> )</nobr>
		    </code></td>

    		<td><code></code></td>
    		<td>Делает <a href="https://developer.mozilla.org/ru/docs/Web/CSS/outline">outline</a>
    		    элемента <code>el</code> невидимой.</td>
    	</tr>
    	<tr id="domutil-restoreoutline">
	    	<td><code><b>restoreOutline</b>()</code></td>

    		<td><code></code></td>
    		<td>Отменяет эффект <a href="#domutil-preventoutline"><code>DG.DomUtil.preventOutline</code></a>.</td>
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
        <tr>
            <td><code><b>TRANSFORM</b></code></td>
            <td><code>String</code></td>
            <td>Название CSS свойства transform с учетом префикса производителя браузера
                (например, <code>&#39;webkitTransform&#39;</code> для WebKit).</td>
        </tr>
        <tr>
            <td><code><b>TRANSITION</b></code></td>
            <td><code>String</code></td>
            <td>Название CSS свойства transition с учетом префикса производителя браузера</td>
        </tr>
    </tbody>
</table>

### DG.PosAnimation

Используется внутри библиотеки для анимаций перемещения, используя CSS3 transitions для современных
браузеров и таймер для IE6-9.

    var fx = new DG.PosAnimation();
    fx.run(el, [300, 500], 0.5);

#### События

<table>
    <thead>
        <tr>
            <th>Событие</th>
            <th>Данные</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr id="posanimation-start">
            <td><code><b>start</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/events#event">Event</a></code></td>
            <td>Вызывается во время старта анимации.</td>
        </tr>
        <tr id="posanimation-step">
            <td><code><b>step</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/events#event">Event</a></code></td>
            <td>Вызывается (периодически) в процессе анимации.</td>
        </tr>
        <tr id="posanimation-end">
            <td><code><b>end</b></code></td>
            <td><code><a href="/doc/maps/ru/ru/manual/events#event">Event</a></code></td>
            <td>Вызывается во время окончания анимации.</td>
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
        <tr id="posanimation-run">
		    <td><code><b>run</b>(
		        <nobr>&lt;HTMLElement&gt; <i>el</i>,</nobr>
		        <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dgpoint">Point</a>&gt; <i>newPos</i>,</nobr>
		        <nobr>&lt;Number&gt; <i>duration?</i>,</nobr>
		        <nobr>&lt;Number&gt; <i>easeLinearity?</i>)</nobr>
		    </code></td>

		    <td><code></code></td>
            <td>Запускает анимацию перемещения элемента, полученного через аргумент метода.
                Дополнительно можно задать продолжительность анимации в секундах
                (по умолчанию <code>0.25</code>) и функцию затухания
                (третий аргумент <a target="_blank" href="http://cubic-bezier.com/#0,0,.5,1">кубической кривой Безье</a>,
                по умолчанию <code>0.5</code>).</td>
	    </tr>
	    <tr id="posanimation-stop">
		    <td><code><b>stop</b>()</code></td>
		    <td><code></code></td>
		    <td>Останавливает ранее запущенную анимацию.</td>
	    </tr>
    </tbody>
</table>

Методы, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dgevented">Evented</a> <!-- TODO: include methods -->

### DG.Draggable

Класс, с помощью которого можно сделать DOM элемент перетаскиваемым (включая поддержку тач-устройств).
Работает только в том случае, если элемент был позиционирован с помошью <a href="#domutil-setposition">DG.DomUtil.setPosition</a>.

    var draggable = new DG.Draggable(elementToDrag);
    draggable.enable();

#### Свойства

<table>
    <thead>
        <tr>
            <th>Свойство</th>
            <th>Тип</th>
            <th>Значение<br>по умолчанию</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr id="draggable-clicktolerance">
		    <td><code><b>clickTolerance</b></code></td>
		    <td><code>Number</code></td>
		    <td><code>3</code></td>
		    <td>Максимальное количество пикселей, на которое может сдвинуться мышь при нажатой кнопке,
		        чтобы идентифицировать это событике как нажатие (а не начало перетаскивания).</td>
    	</tr>
    </tbody>
</table>

#### События

<table>
    <thead>
        <tr>
            <th>Событие</th>
            <th>Данные</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
    	<tr id="draggable-down">
    		<td><code><b>down</b></code></td>
    		<td><code><a href="/doc/maps/ru/manual/events#event">Event</a></code></td>
            <td>Вызывается перед началом перетаскивания.</td>
    	</tr>
    	<tr id="draggable-dragstart">
    		<td><code><b>dragstart</b></code></td>
    		<td><code><a href="/doc/maps/ru/manual/events#event">Event</a></code></td>
            <td>Вызывается в момент начала перетаскивания.</td>
    	</tr>
    	<tr id="draggable-predrag">
    		<td><code><b>predrag</b></code></td>
    		<td><code><a href="/doc/maps/ru/manual/events#event">Event</a></code></td>
            <td>Вызывается в процессе перетаскивания <i>перед</i> каждым обновлением позиции элемента.</td>
	    </tr>
	    <tr id="draggable-dragend">
    		<td><code><b>dragend</b></code></td>
    		<td><code><a href="/doc/maps/ru/manual/events#event">Event</a></code></td>
            <td>Вызывается в момент окончания перетаскивания.</td>
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
        <tr id="draggable-enable">
            <td><code><b>enable</b>()</code></td>
            <td><code></code></td>
            <td>Включает возможность перетаскивания.</td>
        </tr>
        <tr id="draggable-disable">
            <td><code><b>disable</b>()</code></td>
            <td><code></code></td>
            <td>Отключает возможность перетаскивания.</td>
        </td>
    </tbody>
</table>

Методы, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dgevented">Evented</a> <!-- TODO: include methods -->
