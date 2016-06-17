## Working with DOM

{toc}

### DG.DomEvent

Utility functions to work with the <a href="https://developer.mozilla.org/docs/Web/API/Event">DOM events</a>.

#### Functions

<table>
    <thead>
        <tr>
            <th>Function</th>
            <th>Returns</th>
            <th>Description</th>
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
            <td>Adds a listener function (<code>fn</code>) to a particular DOM event type of the
                element <code>el</code>. You can optionally specify the context of the listener
                (object the <code>this</code> keyword will point to). You can also pass several
                space-separated types (e.g. <code>&#39;click dblclick&#39;</code>).</td>
        </tr>
        <tr>
            <td><code><b>on</b>(
                <nobr>&lt;HTMLElement&gt; <i>el</i>,</nobr>
                <nobr>&lt;Object&gt; <i>eventMap</i>,</nobr>
                <nobr>&lt;Object&gt; <i>context?</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Adds a set of type/listener pairs, e.g. <code>{click: onClick, mousemove: onMouseMove}</code></td>
        </tr>
        <tr id="domevent-off">
            <td><code><b>off</b>(
                <nobr>&lt;HTMLElement&gt; <i>el</i>,</nobr>
                <nobr>&lt;String&gt; <i>types</i>,</nobr>
                <nobr>&lt;Function&gt; <i>fn</i>,</nobr>
                <nobr>&lt;Object&gt; <i>context?</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Removes a previously added listener function. If no function is specified,
                it will remove all the listeners of that particular DOM event from the element.
                Note that if you passed a custom context to on, you must pass the same
                context to <code>off</code> in order to remove the listener.</td>
        </tr>
        <tr>
            <td><code><b>off</b>(
                <nobr>&lt;HTMLElement&gt; <i>el</i>,</nobr>
                <nobr>&lt;Object&gt; <i>eventMap</i>,</nobr>
                <nobr>&lt;Object&gt; <i>context?</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Removes a set of type/listener pairs.</td>
        </tr>
        <tr id="domevent-stoppropagation">
            <td><code><b>stopPropagation</b>(
                <nobr>&lt;DOMEvent&gt; <i>ev</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Stop the given event from propagation to parent elements. Used inside the listener functions:
                <pre><code>DG.DomEvent.on(div, &#39;click&#39;, function (ev) {
    DG.DomEvent.stopPropagation(ev);
});</code></pre></td>
        </tr>
        <tr id="domevent-disablescrollpropagation">
            <td><code><b>disableScrollPropagation</b>(
                <nobr>&lt;HTMLElement&gt; <i>el</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Adds <code>stopPropagation</code> to the element&#39;s <code>&#39;mousewheel&#39;</code> events (plus browser variants).</td>
        </tr>
        <tr id="domevent-disableclickpropagation">
            <td><code><b>disableClickPropagation</b>(
                <nobr>&lt;HTMLElement&gt; <i>el</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Adds <code>stopPropagation</code> to the element&#39;s <code>&#39;click&#39;</code>, <code>&#39;doubleclick&#39;</code>,
                <code>&#39;mousedown&#39;</code> and <code>&#39;touchstart&#39;</code> events (plus browser variants).</td>
        </tr>
        <tr id="domevent-preventdefault">
            <td><code><b>preventDefault</b>(
                <nobr>&lt;DOMEvent&gt; <i>ev</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Prevents the default action of the DOM Event <code>ev</code> from happening (such as
                following a link in the href of the a element, or doing a POST request
                with page reload when a <code>&lt;form&gt;</code> is submitted).
                Use it inside listener functions.</td>
        </tr>
        <tr id="domevent-stop">
            <td><code><b>stop</b>(
                <nobr>&lt;DOMEvent&gt; <i>ev</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Does <code>stopPropagation</code> and <code>preventDefault</code> at the same time.</td>
        </tr>
        <tr id="domevent-getmouseposition">
            <td><code><b>getMousePosition</b>(
                <nobr>&lt;DOMEvent&gt; <i>ev</i>,</nobr>
                <nobr>&lt;HTMLElement&gt; <i>container?</i> )</nobr>
            </code></td>

            <td><code><a href="/doc/maps/en/manual/basic-types#dgpoint">Point</a></code></td>
            <td>Gets normalized mouse position from a DOM event relative to the
                <code>container</code> or to the whole page if not specified.</td>
        </tr>
        <tr id="domevent-getwheeldelta">
            <td><code><b>getWheelDelta</b>(
                <nobr>&lt;DOMEvent&gt; <i>ev</i> )</nobr>
            </code></td>

            <td><code>Number</code></td>
            <td>Gets normalized wheel delta from a mousewheel DOM event, in vertical
                pixels scrolled (negative if scrolling down).
                Events from pointing devices without precise scrolling are mapped to
                a best guess of between 50-60 pixels.</td>
        </tr>
        <tr id="domevent-addlistener">
            <td><code><b>addListener</b>(
                <nobr><i>…</i> )</nobr>
            </code></td>

		    <td><code>this</code></td>
            <td>Alias to <a href="#domevent-on"><code>DG.DomEvent.on</code></a></td>
        </tr>
        <tr id="domevent-removelistener">
            <td><code><b>removeListener</b>(
                <nobr><i>…</i> )</nobr>
            </code></td>

		    <td><code>this</code></td>
            <td>Alias to <a href="#domevent-off"><code>DG.DomEvent.off</code></a></td>
        </tr>
    </tbody>
</table>

### DG.DomUtil

Utility functions to work with the <a href="https://developer.mozilla.org/docs/Web/API/Document_Object_Model">DOM</a> tree.

#### Functions

<table>
    <thead>
        <tr>
            <th>Function</th>
            <th>Returns</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr id="domutil-get">
    		<td><code><b>get</b>(
    		    <nobr>&lt;String|HTMLElement&gt; <i>id</i> )</nobr>
    		</code></td>

		    <td><code>HTMLElement</code></td>
            <td>Returns an element given its DOM id, or returns the element itself
                if it was passed directly.</td>
	    </tr>
        <tr id="domutil-getstyle">
    		<td><code><b>getStyle</b>(
		        <nobr>&lt;HTMLElement&gt; <i>el</i>,</nobr>
		        <nobr>&lt;String&gt; <i>styleAttrib</i> )</nobr>
		    </code></td>

		    <td><code>String</code></td>
		    <td>Returns the value for a certain style attribute on an element,
                including computed values or values set through CSS.</td>
    	</tr>
        <tr id="domutil-create">
		    <td><code><b>create</b>(
		        <nobr>&lt;String&gt; <i>tagName</i>,</nobr>
		        <nobr>&lt;String&gt; <i>className?</i>,</nobr>
		        <nobr>&lt;HTMLElement&gt; <i>container?</i> )</nobr>
		    </code></td>

		    <td><code>HTMLElement</code></td>
            <td>Creates an HTML element with <code>tagName</code>, sets its class to <code>className</code>,
                and optionally appends it to <code>container</code> element.</td>
    	</tr>
        <tr id="domutil-remove">
		    <td><code><b>remove</b>(
		        <nobr>&lt;HTMLElement&gt; <i>el</i> )</nobr>
		    </code></td>

		    <td><code></code></td>
		    <td>Removes <code>el</code> from its parent element</td>
	    </tr>
        <tr id="domutil-empty">
		    <td><code><b>empty</b>(
		        <nobr>&lt;HTMLElement&gt; <i>el</i> )</nobr>
		    </code></td>

    		<td><code></code></td>
		    <td>Removes all of <code>el</code>&#39;s children elements from <code>el</code></td>
    	</tr>
        <tr id="domutil-tofront">
		    <td><code><b>toFront</b>(
		        <nobr>&lt;HTMLElement&gt; <i>el</i> )</nobr>
		    </code></td>

    		<td><code></code></td>
    		<td>Makes <code>el</code> the last children of its parent, so it renders in front of the other children.</td>
    	</tr>
        <tr id="domutil-toback">
		    <td><code><b>toBack</b>(
		        <nobr>&lt;HTMLElement&gt; <i>el</i> )</nobr>
		    </code></td>

		    <td><code></code></td>
		    <td>Makes <code>el</code> the first children of its parent, so it renders back from the other children.</td>
	    </tr>
        <tr id="domutil-hasclass">
		    <td><code><b>hasClass</b>(
		        <nobr>&lt;HTMLElement&gt; <i>el</i>,</nobr>
		        <nobr>&lt;String&gt; <i>name</i> )</nobr>
		    </code></td>

		    <td><code>Boolean</code></td>
            <td>Returns <code>true</code> if the element&#39;s class attribute contains <code>name</code>.</td>
	    </tr>
        <tr id="domutil-addclass">
    		<td><code><b>addClass</b>(
    		    <nobr>&lt;HTMLElement&gt; <i>el</i>,</nobr>
    		    <nobr>&lt;String&gt; <i>name</i> )</nobr>
    		</code></td>

    		<td><code></code></td>
            <td>Adds <code>name</code> to the element&#39;s class attribute.</td>
    	</tr>
        <tr id="domutil-removeclass">
		    <td><code><b>removeClass</b>(
		        <nobr>&lt;HTMLElement&gt; <i>el</i>,</nobr>
		        <nobr>&lt;String&gt; <i>name</i> )</nobr>
		    </code></td>

		    <td><code></code></td>
            <td>Removes <code>name</code> from the element&#39;s class attribute.</td>
	    </tr>
        <tr id="domutil-setclass">
		    <td><code><b>setClass</b>(
		        <nobr>&lt;HTMLElement&gt; <i>el</i>,</nobr>
		        <nobr>&lt;String&gt; <i>name</i> )</nobr>
		    </code></td>

		    <td><code></code></td>
		    <td>Sets the element&#39;s class.</td>
	    </tr>
        <tr id="domutil-getclass">
    		<td><code><b>getClass</b>(
    		    <nobr>&lt;HTMLElement&gt; <i>el</i> )</nobr>
    		</code></td>

    		<td><code>String</code></td>
    		<td>Returns the element&#39;s class.</td>
    	</tr>
        <tr id="domutil-setopacity">
    		<td><code><b>setOpacity</b>(
    		    <nobr>&lt;HTMLElement&gt; <i>el</i>,</nobr>
    		    <nobr>&lt;Number&gt; <i>opacity</i> )</nobr>
    		</code></td>

    		<td><code></code></td>
    		<td>Set the opacity of an element. <code>opacity</code> must be a number from <code>0</code> to <code>1</code>.</td>
    	</tr>
        <tr id="domutil-testprop">
		    <td><code><b>testProp</b>(
		        <nobr>&lt;String[]&gt; <i>props</i> )</nobr>
		    </code></td>

		    <td><code>String|false</code></td>
		    <td>Goes through the array of style names and returns the first name
                that is a valid style name for an element. If no such name is found,
                it returns false. Useful for vendor-prefixed styles like <code>transform</code>.</td>
	    </tr>
        <tr id="domutil-settransform">
		    <td><code><b>setTransform</b>(
		        <nobr>&lt;HTMLElement&gt; <i>el</i>,</nobr>
		        <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dgpoint">Point</a>&gt; <i>offset</i>,</nobr>
		        <nobr>&lt;Number&gt; <i>scale?</i> )</nobr>
		    </code></td>

    		<td><code></code></td>
    		<td>Resets the 3D CSS transform of <code>el</code> so it is translated by <code>offset</code> pixels
                and optionally scaled by <code>scale</code>. Does not have an effect if the
                browser doesn&#39;t support 3D CSS transforms.</td>
	    </tr>
        <tr id="domutil-setposition">
    		<td><code><b>setPosition</b>(
    		    <nobr>&lt;HTMLElement&gt; <i>el</i>,</nobr>
    		    <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dgpoint">Point</a>&gt; <i>position</i> )</nobr>
    		</code></td>

    		<td><code></code></td>
    		<td>Sets the position of <code>el</code> to coordinates specified by <code>position</code>,
                using CSS translate or top/left positioning depending on the browser
                (used by Leaflet internally to position its layers).</td>
	    </tr>
        <tr id="domutil-getposition">
		    <td><code><b>getPosition</b>(
		        <nobr>&lt;HTMLElement&gt; <i>el</i> )</nobr>
		    </code></td>

    		<td><code><a href="/doc/maps/en/manual/basic-types#dgpoint">Point</a></code></td>
		    <td>Returns the coordinates of an element previously positioned with setPosition.</td>
	    </tr>
        <tr id="domutil-disabletextselection">
    		<td><code><b>disableTextSelection</b>()</code></td>

    		<td><code></code></td>
    		<td>Prevents the user from generating <code>selectstart</code> DOM events, usually generated
                when the user drags the mouse through a page with text. Used internally
                by Leaflet to override the behaviour of any click-and-drag interaction on
                the map. Affects drag interactions on the whole document.</td>
	    </tr>
        <tr id="domutil-enabletextselection">
		    <td><code><b>enableTextSelection</b>()</code></td>

		    <td><code></code></td>
		    <td>Cancels the effects of a previous <a href="#domutil-disabletextselection"><code>DG.DomUtil.disableTextSelection</code></a>.</td>
	    </tr>
        <tr id="domutil-disableimagedrag">
		    <td><code><b>disableImageDrag</b>()</code></td>

    		<td><code></code></td>
    		<td>As <a href="#domutil-disabletextselection"><code>DG.DomUtil.disableTextSelection</code></a>, but
                for <code>dragstart</code> DOM events, usually generated when the user drags an image.</td>
	    </tr>
	    <tr id="domutil-enableimagedrag">
    		<td><code><b>enableImageDrag</b>()</code></td>

    		<td><code></code></td>
    		<td>Cancels the effects of a previous <a href="#domutil-disabletextselection"><code>DG.DomUtil.disableImageDrag</code></a>.</td>
    	</tr>
        <tr id="domutil-preventoutline">
		    <td><code><b>preventOutline</b>(
		        <nobr>&lt;HTMLElement&gt; <i>el</i> )</nobr>
		    </code></td>

    		<td><code></code></td>
    		<td>Makes the <a href="https://developer.mozilla.org/docs/Web/CSS/outline">outline</a>
                of the element <code>el</code> invisible. Used internally by Leaflet to prevent
                focusable elements from displaying an outline when the user performs a
                drag interaction on them.</td>
    	</tr>
    	<tr id="domutil-restoreoutline">
	    	<td><code><b>restoreOutline</b>()</code></td>

    		<td><code></code></td>
    		<td>Cancels the effects of a previous <a href="#domutil-preventoutline"><code>DG.DomUtil.preventOutline</code></a>.</td>
    	</tr>
    </tbody>
</table>

#### Properties

<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>TRANSFORM</b></code></td>
            <td><code>String</code></td>
            <td>Vendor-prefixed fransform style name (e.g. <code>&#39;webkitTransform&#39;</code> for WebKit).</td>
        </tr>
        <tr>
            <td><code><b>TRANSITION</b></code></td>
            <td><code>String</code></td>
            <td>Vendor-prefixed transition style name.</td>
        </tr>
    </tbody>
</table>

### DG.PosAnimation

Used internally for panning animations, utilizing CSS3 Transitions for modern browsers and a timer fallback for IE6-9.

    var fx = new DG.PosAnimation();
    fx.run(el, [300, 500], 0.5);

#### Events

<table>
    <thead>
        <tr>
            <th>Event</th>
            <th>Data</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr id="posanimation-start">
            <td><code><b>start</b></code></td>
            <td><code><a href="/doc/maps/en/manual/events#event">Event</a></code></td>
            <td>Fired when the animation starts.</td>
        </tr>
        <tr id="posanimation-step">
            <td><code><b>step</b></code></td>
            <td><code><a href="/doc/maps/en/manual/events#event">Event</a></code></td>
            <td>Fired continuously during the animation.</td>
        </tr>
        <tr id="posanimation-end">
            <td><code><b>end</b></code></td>
            <td><code><a href="/doc/maps/en/manual/events#event">Event</a></code></td>
            <td>Fired when the animation ends.</td>
        </tr>
    </tbody>
</table>

#### Methods

<table>
    <thead>
        <tr>
            <th>Method</th>
            <th>Returns</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr id="posanimation-run">
		    <td><code><b>run</b>(
		        <nobr>&lt;HTMLElement&gt; <i>el</i>,</nobr>
		        <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dgpoint">Point</a>&gt; <i>newPos</i>,</nobr>
		        <nobr>&lt;Number&gt; <i>duration?</i>,</nobr>
		        <nobr>&lt;Number&gt; <i>easeLinearity?</i>)</nobr>
		    </code></td>

		    <td><code></code></td>
            <td>Run an animation of a given element to a new position, optionally setting
                duration in seconds (<code>0.25</code> by default) and easing linearity factor (3rd
                argument of the <a href="http://cubic-bezier.com/#0,0,.5,1">cubic bezier curve</a>,
                <code>0.5</code> by default).</td>
	    </tr>
	    <tr id="posanimation-stop">
		    <td><code><b>stop</b>()</code></td>
		    <td><code></code></td>
		    <td>Stops the animation (if currently running).</td>
	    </tr>
    </tbody>
</table>

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dgevented">Evented</a> <!-- TODO: include methods -->

### DG.Draggable

A class for making DOM elements draggable (including touch support).
Used internally for map and marker dragging. Only works for elements
that were positioned with [DG.DomUtil.setPosition](#domutil-setposition)

    var draggable = new DG.Draggable(elementToDrag);
    draggable.enable();

#### Properties

<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr id="draggable-clicktolerance">
		    <td><code><b>clickTolerance</b></code></td>
		    <td><code>Number</code></td>
		    <td><code>3</code></td>
		    <td>The max number of pixels a user can shift the mouse pointer during a click
                for it to be considered a valid click (as opposed to a mouse drag).</td>
    	</tr>
    </tbody>
</table>

#### Events

<table>
    <thead>
        <tr>
            <th>Event</th>
            <th>Data</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
    	<tr id="draggable-down">
    		<td><code><b>down</b></code></td>
    		<td><code><a href="/doc/maps/en/manual/events#event">Event</a></code></td>
            <td>Fired when a drag is about to start.</td>
    	</tr>
    	<tr id="draggable-dragstart">
    		<td><code><b>dragstart</b></code></td>
    		<td><code><a href="/doc/maps/en/manual/events#event">Event</a></code></td>
            <td>Fired when a drag starts</td>
    	</tr>
    	<tr id="draggable-predrag">
    		<td><code><b>predrag</b></code></td>
    		<td><code><a href="/doc/maps/en/manual/events#event">Event</a></code></td>
            <td>Fired continuously during dragging <em>before</em> each corresponding
                update of the element&#39;s position.
                Fired continuously during dragging.</td>
	    </tr>
	    <tr id="draggable-dragend">
    		<td><code><b>dragend</b></code></td>
    		<td><code><a href="/doc/maps/en/manual/events#event">Event</a></code></td>
            <td>Fired when the drag ends.</td>
	    </tr>
    </tbody>
</table>

#### Methods

<table>
    <thead>
        <tr>
            <th>Method</th>
            <th>Returns</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr id="draggable-enable">
            <td><code><b>enable</b>()</code></td>
            <td><code></code></td>
            <td>Enables the dragging ability.</td>
        </tr>
        <tr id="draggable-disable">
            <td><code><b>disable</b>()</code></td>
            <td><code></code></td>
            <td>Disables the dragging ability.</td>
        </td>
    </tbody>
</table>

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dgevented">Evented</a> <!-- TODO: include methods -->
