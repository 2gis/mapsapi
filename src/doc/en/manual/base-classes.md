## Base Classes

{toc}

### DG.Class

<code>DG.Class</code> powers the OOP facilities of maps API and is used to create almost all of the classes documented here.

In addition to implementing a simple classical inheritance model, it introduces several special properties for
convenient code organization — <code>options</code>, <code>includes</code> and <code>statics</code>.

    var MyClass = DG.Class.extend({
        initialize: function (greeter) {
            this.greeter = greeter;
            // class constructor
        },

        greet: function (name) {
            alert(this.greeter + ', ' + name)
        }
    });

    // create instance of MyClass, passing "Hello" to the constructor
    var a = new MyClass("Hello");

    // call greet method, alerting "Hello, World"
    a.greet("World");

#### Class Factories

You may have noticed that maps API objects are created without using the <code>new</code> keyword. This is
achieved by complementing each class with a lowercase factory method:

    new DG.Map('map');  // becomes:
    DG.map('map');

The factories are implemented very easily, and you can do this for your own classes:

    DG.map = function (id, options) {
        return new DG.Map(id, options);
    };

#### Inheritance

You use DG.Class.extend to define new classes, but you can use the same method on any class to inherit from it:

    var MyChildClass = MyClass.extend({
        // ... new properties and methods
    });

This will create a class that inherits all methods and properties of the parent class (through a proper
prototype chain), adding or overriding the ones you pass to extend. It will also properly react to <code>instanceof</code>:

    var a = new MyChildClass();
    a instanceof MyChildClass; // true
    a instanceof MyClass; // true

You can call parent methods (including constructor) from corresponding child ones (as you do with super
calls in other languages) by accessing parent class prototype and using JavaScript's <code>call</code> or <code>apply</code>:

    var MyChildClass = MyClass.extend({
        initialize: function () {
            MyClass.prototype.initialize.call("Yo");
        },

        greet: function (name) {
            MyClass.prototype.greet.call(this, 'bro ' + name + '!');
        }
    });

    var a = new MyChildClass();
    a.greet('Jason'); // alerts "Yo, bro Jason!"

#### Options

<code>options</code> is a special property that unlike other objects that you pass to <code>extend</code>
will be merged with the parent one instead of overriding it completely, which makes managing configuration
of objects and default values convenient:

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

There&#39;s also <a href="/doc/maps/en/manual/utils#util-setoptions"><code>DG.Util.setOptions</code></a>,
a method for conveniently merging options passed to constructor with the defaults defines in the class:

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

#### Includes

<code>includes</code> is a special class property that merges all specified objects into the class
(such objects are called mixins).

     var MyMixin = {
        foo: function () { ... },
        bar: 5
    };

    var MyClass = DG.Class.extend({
        includes: MyMixin
    });

    var a = new MyClass();
    a.foo();

You can also do such includes in runtime with the <code>include</code> method:

    MyClass.include(MyMixin);

#### Statics

<code>statics</code> is just a convenience property that injects specified object properties as the static
properties of the class, useful for defining constants:

    var MyClass = DG.Class.extend({
        statics: {
            FOO: 'bar',
            BLA: 5
        }
    });

    MyClass.FOO; // 'bar'

#### Constructor hooks

If you&#39;re a plugin developer, you often need to add additional initialization code to existing
classes (e.g. editing hooks for <a href="/doc/maps/en/manual/geometries#polyline"><code>DG.Polyline</code></a>).
Maps API comes with a way to do it easily using the <code>addInitHook</code> method:

    MyClass.addInitHook(function () {
        // ... do something in constructor additionally
        // e.g. add event listeners, set custom properties etc.
    });

You can also use the following shortcut when you just need to make one additional method call:

    MyClass.addInitHook('methodName', arg1, arg2, …);

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
        <tr id="class-extend">
            <td><code><b>extend</b>(
                <nobr>&lt;Object&gt; <i>props</i> )</nobr>
            </code></td>

            <td><code>Function</code></td>
            <td><a href="#inheritance">Extends the current class</a> given the properties to be included.
                Returns a Javascript function that is a class constructor (to be called with <code>new</code>).</td>
        </tr>
        <tr id="class-include">
            <td><code><b>include</b>(
                <nobr>&lt;Object&gt; <i>properties</i> )</nobr>
            </code></td>

            <td><code></code></td>
            <td><a href="#includes">Includes a mixin</a> into the current class.</td>
        </tr>
        <tr id="class-mergeoptions">
            <td><code><b>mergeOptions</b>(
                <nobr>&lt;Object&gt; <i>options</i> )</nobr>
            </code></td>

            <td><code></code></td>
            <td><a href="#options">Merges <code>options</code></a> into the defaults of the class.</td>
        </tr>
        <tr id="class-addinithook">
            <td><code><b>addInitHook</b>(
                <nobr>&lt;Function&gt; <i>fn</i> )</nobr>
            </code></td>

            <td><code></code></td>
            <td>Adds a <a href="#constructor-hooks">constructor hook</a> to the class.</td>
        </tr>
    </tbody>
</table>

### DG.Evented

A set of methods shared between event-powered classes (like <a href="/doc/maps/en/manual/map#dgmap"><code>Map</code></a>
and <a href="/doc/maps/en/manual/markers#dgmarker"><code>Marker</code></a>). Generally, events allow you
to execute some function when something happens with an object (e.g. the user clicks on the map, causing
the map to fire <code>&#39;click&#39;</code> event).

    map.on('click', function(e) {
        alert(e.latlng);
    } );

Maps API deals with event listeners by reference, so if you want to add a listener and then remove it,
define it as a function:

    function onClick(e) { ... }
    map.on('click', onClick);
    map.off('click', onClick);

#### Methods

<table id="dgevented-methods">
    <thead>
        <tr>
            <th>Method</th>
            <th>Returns</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr id="evented-on">
            <td><code><b>on</b>(
                <nobr>&lt;String&gt; <i>type</i>,
                <nobr>&lt;Function&gt; <i>fn</i>,
                <nobr>&lt;Object&gt; <i>context?</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Adds a listener function (<code>fn</code>) to a particular event type of the object.
                You can optionally specify the context of the listener (object the this keyword will point to).
                You can also pass several space-separated types (e.g. <code>&#39;click dblclick&#39;</code>).</td>
        </tr>
        <tr>
            <td><code><b>on</b>(
                <nobr>&lt;Object&gt; <i>eventMap</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Adds a set of type/listener pairs, e.g. <code>{click: onClick, mousemove: onMouseMove}</code></td>
        </tr>
        <tr id="evented-off">
            <td><code><b>off</b>(
                <nobr>&lt;String&gt; <i>type</i>,
                <nobr>&lt;Function&gt; <i>fn?</i>,
                <nobr>&lt;Object&gt; <i>context?</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Removes a previously added listener function. If no function is specified, it will remove all
                the listeners of that particular event from the object. Note that if you passed a custom context
                to <code>on</code>, you must pass the same context to <code>off</code> in order to remove
                the listener.</td>
        </tr>
        <tr>
            <td><code><b>off</b>(
                <nobr>&lt;Object&gt; <i>eventMap</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Removes a set of type/listener pairs.</td>
        </tr>
        <tr>
            <td><code><b>off</b>()</code></td>

            <td><code>this</code></td>
            <td>Removes all listeners to all events on the object.</td>
        </tr>
        <tr id="evented-fire">
            <td><code><b>fire</b>(
                <nobr>&lt;String&gt; <i>type</i>,
                <nobr>&lt;Object&gt; <i>data?</i>,
                <nobr>&lt;Boolean&gt; <i>propagate?</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Fires an event of the specified type. You can optionally provide an data object — the first
                argument of the listener function will contain its properties. The event might can optionally
                be propagated to event parents.</td>
        </tr>
        <tr id="evented-listens">
            <td><code><b>listens</b>(
                <nobr>&lt;String&gt; <i>type</i> )</nobr>
            </code></td>

            <td><code>Boolean</code></td>
            <td>Returns <code>true</code> if a particular event type has any listeners attached to it.</td>
        </tr>
        <tr id="evented-once">
            <td><code><b>once</b>(<i>…</i>)</code></td>

            <td><code>this</code></td>
            <td>Behaves as <a href="#evented-on"><code>on(…)</code></a>, except the listener will only get
                fired once and then removed.</td>
        </tr>
        <tr id="evented-addeventparent">
            <td><code><b>addEventParent</b>(
                <nobr>&lt;<a href="#dgevented">Evented</a>&gt; <i>obj</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Adds an event parent - an <a href="#dgevented"><code>Evented</code></a> that will receive
                propagated events</td>
        </tr>
        <tr id="evented-removeeventparent">
            <td><code><b>removeEventParent</b>(
                <nobr>&lt;<a href="#dgevented">Evented</a>&gt; <i>obj</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Removes an event parent, so it will stop receiving propagated events</td>
        </tr>
        <tr id="evented-addeventlistener">
            <td><code><b>addEventListener</b>(<i>…</i>)</code></td>

            <td><code>this</code></td>
            <td>Alias to <a href="#evented-on"><code>on(…)</code></a></td>
        </tr>
        <tr id="evented-removeeventlistener">
            <td><code><b>removeEventListener</b>(<i>…</i>)</code></td>

            <td><code>this</code></td>
            <td>Alias to <a href="#evented-off"><code>off(…)</code></a></td>
        </tr>
        <tr id="evented-clearalleventlisteners">
            <td><code><b>clearAllEventListeners</b>(<i>…</i>)</code></td>

            <td><code>this</code></td>
            <td>Alias to <a href="#evented-off"><code>off()</code></a></td>
        </tr>
        <tr id="evented-addonetimeeventlistener">
            <td><code><b>addOneTimeEventListener</b>(<i>…</i>)</code></td>

            <td><code>this</code></td>
            <td>Alias to <a href="#evented-once"><code>once(…)</code></a></td>
        </tr>
        <tr id="evented-fireevent">
            <td><code><b>fireEvent</b>(<i>…</i>)</code></td>

            <td><code>this</code></td>
            <td>Alias to <a href="#evented-fire"><code>fire(…)</code></a></td>
        </tr>
        <tr id="evented-haseventlisteners">
            <td><code><b>hasEventListeners</b>(<i>…</i>)</code></td>

            <td><code>Boolean</code></td>
            <td>Alias to <a href="#evented-listens"><code>listens(…)</code></a></td>
        </tr>
    </tbody>
</table>

### DG.Layer

A set of methods from the Layer base class that all maps API layers use. Inherits all methods,
options and events from <a href="#dgevented"><code>DG.Evented</code></a>.

    var layer = DG.Marker(latlng).addTo(map);
    layer.addTo(map);
    layer.remove();

#### Options

<table id="dglayer-options">
    <thead>
        <tr>
            <th>Option</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr id="layer-pane">
            <td><code><b>pane</b></code></td>
            <td><code>String</code></td>
            <td><code>&#x27;overlayPane&#x27;</code></td>
            <td>By default the layer will be added to the map&#39;s <a href="/doc/maps/en/manual/map#map-overlaypane">overlay pane</a>.
                Overriding this option will cause the layer to be placed on another pane by default.</td>
        </tr>
    </tbody>
</table>

#### Events

<table id="dglayer-events">
    <thead>
        <tr>
            <th>Event</th>
            <th>Data</th>
            <th>Description</th>
        </tr>
	</thead>
    <tbody>
        <tr id="layer-add">
            <td><code><b>add</b></code></td>
            <td><code><a href="#event-objects">Event</a></code></td>
            <td>Fired after the layer is added to a map</td>
        </tr>
        <tr id="layer-remove">
            <td><code><b>remove</b></code></td>
            <td><code><a href="#event-objects">Event</a></code></td>
            <td>Fired after the layer is removed from a map</td>
        </tr>
    </tbody>
</table>

##### Popup events

<table id="dglayer-popup-events">
    <thead>
        <tr>
            <th>Event</th>
            <th>Data</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr id="layer-popupopen">
            <td><code><b>popupopen</b></code></td>
            <td><code>PopupEvent</code></td>
            <td>Fired when a popup bound to this layer is opened</td>
        </tr>
        <tr id="layer-popupclose">
            <td><code><b>popupclose</b></code></td>
            <td><code>PopupEvent</code></td>
            <td>Fired when a popup bound to this layer is closed</td>
        </tr>
    </tbody>
</table>

#### Methods

Classes extending <a href="#dglayer"><code>DG.Layer</code></a> will inherit the following methods:

<table id="dglayer-methods">
    <thead>
        <tr>
            <th>Method</th>
            <th>Returns</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr id="layer-addto">
            <td><code><b>addTo</b>(
                <nobr>&lt;<a href="/doc/maps/en/manual/map#dgmap">Map</a>&gt; <i>map</i>)</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Adds the layer to the given map</td>
        </tr>
        <tr id="layer-remove">
            <td><code><b>remove</b>()</code></td>

            <td><code>this</code></td>
            <td>Removes the layer from the map it is currently active on.</td>
        </tr>
        <tr id="layer-removefrom">
            <td><code><b>removeFrom</b>(
                <nobr>&lt;<a href="/doc/maps/en/manual/map#dgmap">Map</a>&gt; <i>map</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Removes the layer from the given map</td>
        </tr>
        <tr id="layer-getpane">
            <td><code><b>getPane</b>(
                <nobr>&lt;String&gt; <i>name?</i> )</nobr>
            </code></td>

            <td><code>HTMLElement</code></td>
            <td>Returns the <code>HTMLElement</code> representing the named pane on the map.
                If <code>name</code> is omitted, returns the pane for this layer.</td>
        </tr>
    </tbody>
</table>

##### Popup methods

All layers share a set of methods convenient for binding popups to it.

    var layer = DG.Polygon(latlngs).bindPopup('Hi There!').addTo(map);
    layer.openPopup();
    layer.closePopup();

Popups will also be automatically opened when the layer is clicked on and closed when the layer
is removed from the map or another popup is opened.

<table id="dglayer-popup-methods">
    <thead>
        <tr>
            <th>Method</th>
            <th>Returns</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr id="layer-bindpopup">
            <td><code><b>bindPopup</b>(
                <nobr>&lt;String|HTMLElement|Function|Popup&gt; <i>content</i>,</nobr>
                <nobr>&lt;<a href="/doc/maps/en/manual/popup#popup-option">Popup options</a>&gt; <i>options?</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Binds a popup to the layer with the passed <code>content</code> and sets up the
                neccessary event listeners. If a <code>Function</code> is passed it will receive
                the layer as the first argument and should return a <code>String</code> or <code>HTMLElement</code>.</td>
        </tr>
        <tr id="layer-unbindpopup">
            <td><code><b>unbindPopup</b>()</code></td>

            <td><code>this</code></td>
            <td>Removes the popup previously bound with <code>bindPopup</code>.</td>
        </tr>
        <tr id="layer-openpopup">
            <td><code><b>openPopup</b>(
                <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latlng?</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Opens the bound popup at the specificed <a href="/doc/maps/en/manual/basic-types#dglatlng"><code>latlng</code></a>
                or at the default popup anchor if no <code>latlng</code> is passed.</td>
        </tr>
        <tr id="layer-closepopup">
            <td><code><b>closePopup</b>()</code></td>

            <td><code>this</code></td>
            <td>Closes the popup bound to this layer if it is open.
                Opens or closes the popup bound to this layer depending on its current state.
                Returns <code>true</code> if the popup bound to this layer is currently open.</td>
        </tr>
        <tr id="layer-setpopupcontent">
            <td><code><b>setPopupContent</b>(
            <nobr>&lt;String|HTMLElement|Popup&gt; <i>content</i>,</nobr>
                <nobr>&lt;<a href="/doc/maps/en/manual/popup#popup-option">Popup options</a>&gt; <i>options?</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Sets the content of the popup bound to this layer.</td>
        </tr>
        <tr id="layer-getpopup">
            <td><code><b>getPopup</b>()</code></td>

            <td><code><a href="/doc/maps/en/manual/popup#dgpopup">Popup</a></code></td>
            <td>Returns the popup bound to this layer.</td>
        </tr>
    </tbody>
</table>

##### Extension methods

Every layer should extend from <a href="#dglayer"><code>DG.Layer</code></a> and (re-)implement the following methods.

<table>
    <thead>
        <tr>
            <th>Method</th>
            <th>Returns</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr id="layer-onadd">
            <td><code><b>onAdd</b>(
                <nobr>&lt;<a href="/doc/maps/en/manual/map#dgmap">Map</a>&gt; <i>map</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Should contain code that creates DOM elements for the layer, adds them to <code>map panes</code>
                where they should belong and puts listeners on relevant map events. Called on
                <a href="/doc/maps/en/manual/map#map-addlayer"><code>map.addLayer(layer)</code></a>.</td>
        </tr>
        <tr id="layer-onremove">
            <td><code><b>onRemove</b>(
                <nobr>&lt;<a href="/doc/maps/en/manual/map#dgmap">Map</a>&gt; <i>map</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Should contain all clean up code that removes the layer&#39;s elements from the DOM and removes
                listeners previously added in <a href="#layer-onadd"><code>onAdd</code></a>.
                Called on <a href="/doc/maps/en/manual/map#map-removelayer"><code>map.removeLayer(layer)</code></a>.</td>
        </tr>
        <tr id="layer-getevents">
            <td><code><b>getEvents</b>()</code></td>

            <td><code>Object</code></td>
            <td>This optional method should return an object like <code>{ viewreset: this._reset }</code>
                for <a href="#evented-addeventlistener"><code>addEventListener</code></a>.
                These events will be automatically added and removed from the map with your layer.</td>
        </tr>
        <tr id="layer-beforeadd">
            <td><code><b>beforeAdd</b>(
                <nobr>&lt;<a href="/doc/maps/en/manual/map#dgmap">Map</a>&gt; <i>map</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Optional method. Called on <a href="/doc/maps/en/manual/map#map-addlayer"><code>map.addLayer(layer)</code></a>,
                before the layer is added to the map, before events are initialized, without waiting until
                the map is in a usable state. Use for early initialization only.</td>
        </tr>
    </tbody>
</table>

Events inherited from <a href="#dgevented">Evented</a> <!-- TODO: include events -->

### DG.Control

DG.Control is a base class for implementing map controls. Handles positioning. All other controls extend from this class.

#### Options

<table>
    <thead>
        <tr>
            <th>Option</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr id="control-position">
            <td><code><b>position</b></code></td>
            <td><code>String</code></code></td>
            <td><code>&#x27;topright&#x27;</code></td>
            <td>The position of the control (one of the map corners). Possible values are <code>&#39;topleft&#39;</code>,
                <code>&#39;topright&#39;</code>, <code>&#39;bottomleft&#39;</code> or <code>&#39;bottomright&#39;</code></td>
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
        <tr id="control-getposition">
            <td><code><b>getPosition</b>()</code></td>

            <td><code>string</code></td>
            <td>Returns the position of the control.</td>
        </tr>
        <tr id="control-setposition">
            <td><code><b>setPosition</b>(
                <nobr>&lt;string&gt; <i>position</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Sets the position of the control.</td>
        </tr>
        <tr id="control-getcontainer">
            <td><code><b>getContainer</b>()</code></td>

            <td><code>HTMLElement</code></td>
            <td>Returns the HTMLElement that contains the control.</td>
        </tr>
        <tr id="control-addto">
            <td><code><b>addTo</b>(
                <nobr>&lt;<a href="/doc/maps/en/manual/map#dgmap">Map</a>&gt; <i>map</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Adds the control to the given map.</td>
        </tr>
        <tr id="control-remove">
            <td><code><b>remove</b>()</code></td>

            <td><code>this</code></td>
            <td>Removes the control from the map it is currently active on.</td>
        </tr>
    </tbody>
</table>

### DG.Handler

Abstract class for map interaction handlers.

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
        <tr id="handler-enable">
            <td><code><b>enable</b>()</code></td>

            <td><code></code></td>
            <td>Enables the handler</td>
        </tr>
        <tr id="handler-disable">
            <td><code><b>disable</b>()</code></td>

            <td><code></code></td>
            <td>Disables the handler</td>
        </tr>
        <tr id="handler-enabled">
            <td><code><b>enabled</b>()</code></td>

            <td><code>Boolean</code></td>
            <td>Returns <code>true</code> if the handler is enabled</td>
        </tr>
    </tbody>
</table>

#### Extension methods

Classes inheriting from <a href="#dghandler"><code>Handler</code></a> must implement the two following methods:

<table>
    <thead>
        <tr>
            <th>Method</th>
            <th>Returns</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr id="handler-addhooks">
            <td><code><b>addHooks</b>()</code></td>

            <td><code></code></td>
            <td>Called when the handler is enabled, should add event hooks.</td>
        </tr>
        <tr id="handler-removehooks">
            <td><code><b>removeHooks</b>()</code></td>

            <td><code></code></td>
            <td>Called when the handler is disabled, should remove the event hooks added previously.</td>
        </tr>
    </tbody>
</table>

### DG.Projection

An object with methods for projecting geographical coordinates of the world onto a flat surface (and back).
See <a href="http://en.wikipedia.org/wiki/Map_projection">Map projection</a>.

Maps API uses a Spherical Mercator projection. Assumes that Earth is a sphere.

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
        <tr id="projection-project">
            <td><code><b>project</b>(
                <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latlng</i> )</nobr>
            </code></td>

            <td><code><a href="/doc/maps/en/manual/basic-types#dgpoint">Point</a></code></td>
            <td>Projects geographical coordinates into a 2D point.</td>
        </tr>
        <tr id="projection-unproject">
            <td><code><b>unproject</b>(
                <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dgpoint">Point</a>&gt; <i>point</i> )</nobr>
            </code></td>

            <td><code><a href="/doc/maps/en/manual/basic-types#dglatlng">LatLng</a></code></td>
            <td>The inverse of <code>project</code>. Projects a 2D point into a geographical location.</td>
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
        <tr id="projection-bounds">
            <td><code><b>bounds</b></code></td>
            <td><code><a href="/doc/maps/en/manual/basic-types#latlngbounds">LatLngBounds</a></code></td>
            <td>The bounds where the projection is valid</td>
        </tr>
    </tbody>
</table>

### DG.Renderer

Base class for vector renderer implementations (<code>DG.SVG</code>, <code>DG.Canvas</code>). Handles the
DOM container of the renderer, its bounds, and its zoom animation. A <a href="#dgrenderer"><code>Renderer</code></a>
works as an implicit layer group for all <a href="/doc/maps/en/manual/vector-layers#dgpath"><code>DG.Path</code></a>s
- the renderer itself can be added or removed to the map. All paths use a renderer, which can
be implicit (the map will decide the type of renderer and use it automatically) or explicit
(using the <a href="/doc/maps/en/manual/vector-layers#path-renderer"><code>renderer</code></a> option of the path).
Do not use this class directly, use <code>DG.SVG</code> and <code>DG.Canvas</code> instead.

##### Options

<table id="dgrenderer-options">
    <thead>
        <tr>
            <th>Option</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
        </thead><tbody>
        <tr id="renderer-padding">
            <td><code><b>padding</b></code></td>
            <td><code>Number </code></td>
            <td><code>0.1</code></td>
            <td>How much to extend the clip area around the map view (relative to its size)
                e.g. 0.1 would be 10% of map view in each direction</td>
        </tr>
    </tbody>
</table>

Options inherited from <a href="#dglayer">Layer</a> <!-- TODO: include options -->

#### Events

Events inherited from <a href="#dglayer">Layer</a> <!-- TODO: include events -->

#### Methods

Methods inherited from <a href="#dglayer">Layer</a> <!-- TODO: include methods -->

Methods inherited from <a href="#dgevented">Evented</a> <!-- TODO: include methods -->

### Event objects

Whenever a class inheriting from <a href="#dgevented"><code>Evented</code></a> fires an event, a listener function
will be called with an event argument, which is a plain object containing information about the event. For example:

    map.on('click', function(ev) {
        alert(ev.latlng); // ev is an event object (MouseEvent in this case)
    });

The information available depends on the event type:

#### Event

The base event object. All other event objects contain these properties too.

<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr id="event-type">
            <td><code><b>type</b></code></td>
            <td><code>String</code></td>
            <td>The event type (e.g. <code>&#39;click&#39;</code>).</td>
        </tr>
        <tr id="event-target">
            <td><code><b>target</b></code></td>
            <td><code>Object</code></td>
            <td>The object that fired the event.</td>
        </tr>
    </tbody>
</table>

#### MouseEvent

<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr id="mouseevent-latlng">
            <td><code><b>latlng</b></code></td>
            <td><code><a href="/doc/maps/en/manual/basic-types#latlng">LatLng</a></code></td>
            <td>The geographical point where the mouse event occured.</td>
        </tr>
        <tr id="mouseevent-layerpoint">
            <td><code><b>layerPoint</b></code></td>
            <td><code><a href="/doc/maps/en/manual/basic-types#dgpoint">Point</a></code></td>
            <td>Pixel coordinates of the point where the mouse event occured relative to the map layer.</td>
        </tr>
        <tr id="mouseevent-containerpoint">
            <td><code><b>containerPoint</b></code></td>
            <td><code><a href="/doc/maps/en/manual/basic-types#dgpoint">Point</a></code></td>
            <td>Pixel coordinates of the point where the mouse event occured relative to the map сontainer.</td>
        </tr>
        <tr id="mouseevent-originalevent">
            <td><code><b>originalEvent</b></code></td>
            <td><code>DOMMouseEvent</code></td>
            <td>The original DOM mouse event fired by the browser.</td>
        </tr>
    </tbody>
</table>

Properties inherited from <a href="#event">Event</a> <!-- TODO: include properties -->

#### LocationEvent

<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr id="locationevent-latlng">
            <td><code><b>latlng</b></code></td>
            <td><code><a href="/doc/maps/en/manual/basic-types#latlng">LatLng</a></code></td>
            <td>Detected geographical location of the user.</td>
        </tr>
        <tr id="locationevent-bounds">
            <td><code><b>bounds</b></code></td>
            <td><code><a href="/doc/maps/en/manual/basic-types#latlngbounds">LatLngBounds</a></code></td>
            <td>Geographical bounds of the area user is located in (with respect to the accuracy of location).</td>
        </tr>
        <tr id="locationevent-accuracy">
            <td><code><b>accuracy</b></code></td>
            <td><code>Number</code></td>
            <td>Accuracy of location in meters.</td>
        </tr>
        <tr id="locationevent-altitude">
            <td><code><b>altitude</b></code></td>
            <td><code>Number</code></td>
            <td>Height of the position above the WGS84 ellipsoid in meters.</td>
        </tr>
        <tr id="locationevent-altitudeaccuracy">
            <td><code><b>altitudeAccuracy</b></code></td>
            <td><code>Number</code></td>
            <td>Accuracy of altitude in meters.</td>
        </tr>
        <tr id="locationevent-heading">
            <td><code><b>heading</b></code></td>
            <td><code>Number</code></td>
            <td>The direction of travel in degrees counting clockwise from true North.</td>
        </tr>
        <tr id="locationevent-speed">
            <td><code><b>speed</b></code></td>
            <td><code>Number</code></td>
            <td>Current velocity in meters per second.</td>
        </tr>
        <tr id="locationevent-timestamp">
            <td><code><b>timestamp</b></code></td>
            <td><code>Number</code></td>
            <td>The time when the position was acquired.</td>
        </tr>
    </tbody>
</table>

Properties inherited from <a href="#event">Event</a> <!-- TODO: include properties -->

#### ErrorEvent

<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr id="errorevent-message">
            <td><code><b>message</b></code></td>
            <td><code>String</code></td>
            <td>Error message.</td>
        </tr>
        <tr id="errorevent-code">
            <td><code><b>code</b></code></td>
            <td><code>Number</code></td>
            <td>Error code (if applicable).</td>
        </tr>
    </tbody>
</table>

Properties inherited from <a href="#event">Event</a> <!-- TODO: include properties -->

#### LayerEvent

<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr id="layerevent-layer">
            <td><code><b>layer</b></code></td>
            <td><code><a href="#dglayer">ILayer</a></code></td>
            <td>The layer that was added or removed.</td>
        </tr>
    </tbody>
</table>

Properties inherited from <a href="#event">Event</a> <!-- TODO: include properties -->

#### LayersControlEvent

<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr id="layerscontrolevent-layer">
            <td><code><b>layer</b></code></td>
            <td><code><a href="#dglayer">ILayer</a></code></td>
            <td>The layer that was added or removed.</td>
        </tr>
        <tr id="layerscontrolevent-name">
            <td><code><b>name</b></code></td>
            <td><code>String</code></td>
            <td>The name of the layer that was added or removed.</td>
        </tr>
    </tbody>
</table>

Properties inherited from <a href="#event">Event</a> <!-- TODO: include properties -->

#### TileEvent

<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
	</thead>
	<tbody>
        <tr id="tileevent-tile">
            <td><code><b>tile</b></code></td>
            <td><code>HTMLElement</code></td>
            <td>The tile element (image).</td>
        </tr>
    </tbody>
</table>

Properties inherited from <a href="#event">Event</a> <!-- TODO: include properties -->

#### TileErrorEvent

<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr id="tileerrorevent-tile">
            <td><code><b>tile</b></code></td>
            <td><code>HTMLElement</code></td>
            <td>The tile element (image).</td>
        </tr>
    </tbody>
</table>

Properties inherited from <a href="#event">Event</a> <!-- TODO: include properties -->

#### ResizeEvent

<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr id="resizeevent-oldsize">
            <td><code><b>oldSize</b></code></td>
            <td><code><a href="/doc/maps/en/manual/basic-types#dgpoint">Point</a></code></td>
            <td>The old size before resize event.</td>
        </tr>
        <tr id="resizeevent-newsize">
            <td><code><b>newSize</b></code></td>
            <td><code><a href="/doc/maps/en/manual/basic-types#dgpoint">Point</a></code></td>
            <td>The new size after the resize event.</td>
        </tr>
    </tbody>
</table>

Properties inherited from <a href="#event">Event</a> <!-- TODO: include properties -->

#### GeoJSON event

<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
        </thead><tbody>
        <tr id="geojson-event-layer">
            <td><code><b>layer</b></code></td>
            <td><code><a href="#dglayer">ILayer</a></code></td>
            <td>The layer for the GeoJSON feature that is being added to the map.</td>
        </tr>
        <tr id="geojson-event-properties">
            <td><code><b>properties</b></code></td>
            <td><code>Object</code></td>
            <td>GeoJSON properties of the feature.</td>
        </tr>
        <tr id="geojson-event-geometrytype">
            <td><code><b>geometryType</b></code></td>
            <td><code>String</code></td>
            <td>GeoJSON geometry type of the feature.</td>
        </tr>
        <tr id="geojson-event-id">
            <td><code><b>id</b></code></td>
            <td><code>String</code></td>
            <td>GeoJSON ID of the feature (if present).</td>
        </tr>
    </tbody>
</table>

Properties inherited from <a href="#event">Event</a> <!-- TODO: include properties -->

#### Popup event

<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
        </thead><tbody>
        <tr id="popup-event-popup">
            <td><code><b>popup</b></code></td>
            <td><code><a href="/doc/maps/en/manual/popup#dgpopup">Popup</a></code></td>
            <td>The popup that was opened or closed.</td>
        </tr>
    </tbody>
</table>

Properties inherited from <a href="#event">Event</a> <!-- TODO: include properties -->

#### DragEndEvent

<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr id="dragendevent-distance">
            <td><code><b>distance</b></code></td>
            <td><code>Number</code></td>
            <td>The distance in pixels the draggable element was moved by.</td>
        </tr>
    </tbody>
</table>

#### MetaEvent

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
            <td><code><b>latlng</b></code></td>
            <td><code><a href="/doc/maps/en/manual/basic-types#dglatlng">LatLng</a></code></td>
            <td>The geographical coordinates of the metalayer's point.</td>
        </tr>
        <tr>
            <td><code><b>meta</b></code></td>
            <td><code>Object</code></td>
            <td>Metalayer's data.</td>
        </tr>
    </tbody>
</table>

#### LangEvent

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
            <td><code><b>lang</b></code></td>
            <td><code>String</code></td>
            <td>The current map's language.</td>
        </tr>
    </tbody>
</table>
