## Utility

{toc}

### DG.Browser

A namespace with static properties for browser/feature detection.

    if (DG.Browser.ie6) {
        alert('Upgrade your browser, dude!');
    }

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
        <tr id="browser-ie">
            <td><code><b>ie</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> for all Internet Explorer versions (not Edge).</td>
        </tr>
        <tr id="browser-ielt9">
            <td><code><b>ielt9</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> for Internet Explorer versions less than 9.</td>
        </tr>
        <tr id="browser-edge">
            <td><code><b>edge</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> for the Edge web browser.</td>
        </tr>
        <tr id="browser-webkit">
            <td><code><b>webkit</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> for webkit-based browsers like Chrome and Safari (including mobile versions).</td>
        </tr>
        <tr id="browser-gecko">
            <td><code><b>gecko</b></code></td>
            <td><code>Boolean</code></td>
		    <td><code>true</code> for gecko-based browsers like Firefox.</td>
        </tr>
        <tr id="browser-android">
            <td><code><b>android</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> for any browser running on an Android platform.</td>
        </tr>
        <tr id="browser-android23">
            <td><code><b>android23</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> for browsers running on Android 2 or Android 3.</td>
        </tr>
        <tr id="browser-chrome">
            <td><code><b>chrome</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> for the Chrome browser.</td>
        </tr>
        <tr id="browser-safari">
            <td><code><b>safari</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> for the Safari browser.</td>
        </tr>
        <tr id="browser-ie3d">
            <td><code><b>ie3d</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> for all Internet Explorer versions supporting CSS transforms.</td>
        </tr>
        <tr id="browser-webkit3d">
            <td><code><b>webkit3d</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> for webkit-based browsers supporting CSS transforms.</td>
        </tr>
        <tr id="browser-gecko3d">
            <td><code><b>gecko3d</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> for gecko-based browsers supporting CSS transforms.</td>
        </tr>
        <tr id="browser-opera12">
            <td><code><b>opera12</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> for the Opera browser supporting CSS transforms (version 12 or later).</td>
        </tr>
        <tr id="browser-any3d">
            <td><code><b>any3d</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> for all browsers supporting CSS transforms.</td>
        </tr>
        <tr id="browser-mobile">
            <td><code><b>mobile</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> for all browsers running in a mobile device.</td>
        </tr>
        <tr id="browser-mobilewebkit">
            <td><code><b>mobileWebkit</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> for all webkit-based browsers in a mobile device.</td>
        </tr>
        <tr id="browser-mobilewebkit3d">
            <td><code><b>mobileWebkit3d</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> for all webkit-based browsers in a mobile device supporting CSS transforms.</td>
        </tr>
        <tr id="browser-mobileopera">
            <td><code><b>mobileOpera</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> for the Opera browser in a mobile device.</td>
        </tr>
        <tr id="browser-mobilegecko">
            <td><code><b>mobileGecko</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> for gecko-based browsers running in a mobile device.</td>
        </tr>
        <tr id="browser-touch">
            <td><code><b>touch</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> for all browsers supporting <a href="https://developer.mozilla.org/docs/Web/API/Touch_events">touch events</a>.</td>
        </tr>
        <tr id="browser-mspointer">
            <td><code><b>msPointer</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> for browsers implementing the Microsoft touch events model (notably IE10).</td>
        </tr>
        <tr id="browser-pointer">
            <td><code><b>pointer</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> for all browsers supporting <a href="https://msdn.microsoft.com/en-us/library/dn433244%28v=vs.85%29.aspx">pointer events</a>.</td>
        </tr>
        <tr id="browser-retina">
            <td><code><b>retina</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> for browsers on a high-resolution &quot;retina&quot; screen.</td>
        </tr>
        <tr id="browser-canvas">
            <td><code><b>canvas</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> when the browser supports <a href="https://developer.mozilla.org/docs/Web/API/Canvas_API"><code>&lt;canvas&gt;</code></a>.</td>
        </tr>
        <tr id="browser-vml">
            <td><code><b>vml</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> if the browser supports <a href="https://en.wikipedia.org/wiki/Vector_Markup_Language">VML</a>.</td>
        </tr>
        <tr id="browser-svg">
            <td><code><b>svg</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code> when the browser supports <a href="https://developer.mozilla.org/docs/Web/SVG">SVG</a>.</td>
        </tr>
    </tbody>
</table>

### DG.Util

Various utility functions.

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
        <tr id="util-extend">
            <td><code><b>extend</b>(
                <nobr>&lt;Object&gt; <i>dest</i>,</nobr>
                <nobr>&lt;Object&gt; <i>src?</i> )</nobr>
            </code></td>

            <td><code>Object</code></td>
            <td>Merges the properties of the <code>src</code> object (or multiple objects) into <code>dest</code>
                object and returns the latter. Has an <code>DG.extend</code> shortcut.</td>
        </tr>
        <tr id="util-create">
            <td><code><b>create</b>(
                <nobr>&lt;Object&gt; <i>proto</i>,</nobr>
                <nobr>&lt;Object&gt; <i>properties?</i> )</nobr>
            </code></td>

            <td><code>Object</code></td>
            <td>Compatibility polyfill for
                <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/create">Object.create</a></td>
        </tr>
        <tr id="util-bind">
            <td><code><b>bind</b>(
                <nobr>&lt;Function&gt; <i>fn</i>, <i>…</i> )</nobr>
            </code></td>

            <td><code>Function</code></td>
            <td>Returns a new function bound to the arguments passed, like
                <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function/bind">Function.prototype.bind</a>.
                Has a <code>DG.bind()</code> shortcut.</td>
        </tr>
        <tr id="util-stamp">
            <td><code><b>stamp</b>(
                <nobr>&lt;Object&gt; <i>obj</i> )</nobr>
            </code></td>

            <td><code>Number</code></td>
            <td>Returns the unique ID of an object, assiging it one if it doesn&#39;t have it.</td>
        </tr>
        <tr id="util-throttle">
            <td><code><b>throttle</b>(
                <nobr>&lt;Function&gt; <i>fn</i>,</nobr>
                <nobr>&lt;Number&gt; <i>time</i>,</nobr>
                <nobr>&lt;Object&gt; <i>context</i> )</nobr>
            </code></td>

            <td><code>Function</code></td>
            <td>Returns a function which executes function <code>fn</code> with the given scope <code>context</code>
                (so that the <code>this</code> keyword refers to <code>context</code> inside <code>fn</code>&#39;s code).
                The arguments received by the bound function will be any arguments passed when binding the function,
                followed by any arguments passed when invoking the bound function. Has an <code>DG.bind</code> shortcut.</td>
        </tr>
        <tr id="util-wrapnum">
            <td><code><b>wrapNum</b>(
                <nobr>&lt;Number&gt; <i>num</i>,</nobr>
                <nobr>&lt;Number[]&gt; <i>range</i>,</nobr>
                <nobr>&lt;Boolean&gt; <i>includeMax?</i> )</nobr>
            </code></td>

            <td><code>Number</code></td>
            <td>Returns the number <code>num</code> modulo <code>range</code> in such a way so it lies within
                <code>range[0]</code> and <code>range[1]</code>. The returned value will be always smaller than
                <code>range[1]</code> unless <code>includeMax</code> is set to <code>true</code>.</td>
        </tr>
        <tr id="util-falsefn">
            <td><code><b>falseFn</b>()</code></td>

            <td><code>Function</code></td>
            <td>Returns a function which always returns <code>false</code>.</td>
        </tr>
        <tr id="util-formatnum">
            <td><code><b>formatNum</b>(
                <nobr>&lt;Number&gt; <i>num</i>,</nobr>
                <nobr>&lt;Number&gt; <i>digits?</i> )</nobr>
            </code></td>

            <td><code>Number</code></td>
            <td>Returns the number <code>num</code> rounded to <code>digits</code> decimals, or to 5 decimals by default.</td>
        </tr>
        <tr id="util-trim">
            <td><code><b>trim</b>(
                <nobr>&lt;String&gt; <i>str</i> )</nobr>
            </code></td>

            <td><code>String</code></td>
            <td>Compatibility polyfill for
                <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/Trim">String.prototype.trim</a></td>
        </tr>
        <tr id="util-splitwords">
            <td><code><b>splitWords</b>(
                <nobr>&lt;String&gt; <i>str</i> )</nobr>
            </code></td>

            <td><code>String[]</code></td>
            <td>Trims and splits the string on whitespace and returns the array of parts.</td>
        </tr>
        <tr id="util-setoptions">
            <td><code><b>setOptions</b>(
                <nobr>&lt;Object: options: Object&gt; <i>obj</i> )</nobr>
            </code></td>

            <td><code>Object</code></td>
            <td>Merges the given properties to the <code>options</code> of the <code>obj</code> object, returning
                the resulting options. See <code>Class options</code>. Has an <code>DG.setOptions</code> shortcut.</td>
        </tr>
        <tr id="util-getparamstring">
            <td><code><b>getParamString</b>(
                <nobr>&lt;Object&gt; <i>obj</i>,</nobr>
                <nobr>&lt;String&gt; <i>existingUrl?</i>,</nobr>
                <nobr>&lt;Boolean&gt; <i>uppercase?</i> )</nobr>
            </code></td>

            <td><code>String</code></td>
            <td>Converts an object into a parameter URL string, e.g. <code>{a: &quot;foo&quot;, b: &quot;bar&quot;}</code>
                translates to <code>&#39;?a=foo&amp;b=bar&#39;</code>. If <code>existingUrl</code> is set, the parameters will
                be appended at the end. If <code>uppercase</code> is <code>true</code>, the parameter names will
                be uppercased (e.g. <code>&#39;?A=foo&amp;B=bar&#39;</code>)
                Simple templating facility, accepts a template string of the form <code>&#39;Hello {a}, {b}&#39;</code>
                and a data object like <code>{a: &#39;foo&#39;, b: &#39;bar&#39;}</code>, returns evaluated string
                <code>(&#39;Hello foo, bar&#39;)</code>. You can also specify functions instead of strings for
                data values — they will be evaluated passing <code>data</code> as an argument.</td>
        </tr>
        <tr id="util-isarray">
            <td><code><b>isArray</b>(<i>obj</i>)</code></td>

            <td><code>Boolean</code></td>
            <td>Compatibility polyfill for
                <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray">Array.isArray</a></td>
        </tr>
        <tr id="util-indexof">
            <td><code><b>indexOf</b>()</code></td>

            <td><code>Number</code></td>
            <td>Compatibility polyfill for
                <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf">Array.prototype.indexOf</a></td>
        </tr>
        <tr id="util-requestanimframe">
            <td><code><b>requestAnimFrame</b>(
                <nobr>&lt;Function&gt; <i>fn</i>,</nobr>
                <nobr>&lt;Object&gt; <i>context?</i>,</nobr>
                <nobr>&lt;Boolean&gt; <i>immediate?</i> )</nobr>
            </code></td>

            <td><code>requestId: Number</code></td>
            <td>Schedules <code>fn</code> to be executed when the browser repaints. <code>fn</code> is bound to
                <code>context</code> if given. When <code>immediate</code> is set, <code>fn</code> is called immediately if
                the browser doesn&#39;t have native support for
                <a href="https://developer.mozilla.org/docs/Web/API/window/requestAnimationFrame"><code>window.requestAnimationFrame</code></a>,
                otherwise it&#39;s delayed. Returns an id that can be used to cancel the request.</td>
        </tr>
        <tr id="util-cancelanimframe">
            <td><code><b>cancelAnimFrame</b>(
                <nobr>&lt;Number&gt; <i>id</i> )</nobr>
            </code></td>
            <td><code></code></td>
            <td>Cancels a previous <code>requestAnimFrame</code>. See also
                <a href="https://developer.mozilla.org/docs/Web/API/window/cancelAnimationFrame">window.cancelAnimationFrame</a>.</td>
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
        <tr id="util-lastid">
            <td><code><b>lastId</b></code></td>
            <td><code>Number</code></td>
            <td>Last unique ID used by <a href="#util-stamp"><code>stamp()</code></a></td>
        </tr>
        <tr id="util-emptyimageurl">
            <td><code><b>emptyImageUrl</b></code></td>
            <td><code>String</code></td>
            <td>Data URI string containing a base64-encoded empty GIF image.
                Used as a hack to free memory from unused images on WebKit-powered
                mobile devices (by setting image <code>src</code> to this string).</td>
        </tr>
    </tbody>
</table>

### DG.LineUtil

Various utility functions for polyine points processing, used by Leaflet internally to make polylines lightning-fast.

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
        <tr id="lineutil-simplify">
            <td><code><b>simplify</b>(
                <nobr>&lt;Point[]&gt; <i>points</i>,</nobr>
                <nobr>&lt;Number&gt; <i>tolerance</i> )</nobr>
            </code></td>

            <td><code>Point[]</code></td>
            <td>Dramatically reduces the number of points in a polyline while retaining
                its shape and returns a new array of simplified points, using the
                <a href="http://en.wikipedia.org/wiki/Douglas-Peucker_algorithm">Douglas-Peucker algorithm</a>.
                Used for a huge performance boost when processing/displaying Leaflet polylines for
                each zoom level and also reducing visual noise. tolerance affects the amount of
                simplification (lesser value means higher quality but slower and with more points).
                Also released as a separated micro-library <a href="http://mourner.github.com/simplify-js/">Simplify.js</a>.</td>
        </tr>
        <tr id="lineutil-pointtosegmentdistance">
            <td><code><b>pointToSegmentDistance</b>(
                <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dgpoint">Point</a>&gt; <i>p</i></nobr>,
                <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dgpoint">Point</a>&gt; <i>p1</i></nobr>,
                <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dgpoint">Point</a>&gt; <i>p2</i> )</nobr>
            </code></td>

            <td><code>Number</code></td>
            <td>Returns the distance between point <code>p</code> and segment <code>p1</code> to <code>p2</code>.</td>
        </tr>
        <tr id="lineutil-closestpointonsegment">
            <td><code><b>closestPointOnSegment</b>(
                <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dgpoint">Point</a>&gt; <i>p</i></nobr>,
                <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dgpoint">Point</a>&gt; <i>p1</i></nobr>,
                <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dgpoint">Point</a>&gt; <i>p2</i> )</nobr>
            </code></td>

            <td><code>Number</code></td>
            <td>Returns the closest point from a point <code>p</code> on a segment <code>p1</code> to <code>p2</code>.</td>
        </tr>
    </tbody>
</table>

### DG.PolyUtil

Various utility functions for polygon geometries.

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
        <tr id="polyutil-clippolygon">
		    <td><code><b>clipPolygon</b>(
		        <nobr>&lt;Point[]&gt; <i>points</i>,</nobr>
		        <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dgbounds">Bounds</a>&gt; <i>bounds</i>,</nobr>
		        <nobr>&lt;Boolean&gt; <i>round?</i> )</nobr>
		    </code></td>

    		<td><code>Point[]</code></td>
    		<td>Clips the polygon geometry defined by the given <code>points</code> by the given bounds
    		    (using the <a href="https://en.wikipedia.org/wiki/Sutherland%E2%80%93Hodgman_algorithm">Sutherland-Hodgeman algorithm</a>).
                Used by Leaflet to only show polygon points that are on the screen or near, increasing
                performance. Note that polygon points needs different algorithm for clipping
                than polyline, so there&#39;s a seperate method for it.</td>
    	</tr>
    </tbody>
</table>
