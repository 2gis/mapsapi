## Loading API

{toc}

### Description

Work with map is possible only after the code of Maps API is loaded to the browser.
There are several ways to download it.

### Easy way

First include the Maps API by adding the following code to the <code>head</code> section of the HTML page:

    <script src="https://maps.api.2gis.ru/2.0/loader.js?pkg=full"></script>

Then use the <code>DG.then</code> function, into which we will place the initialization code of the map:

    DG.then(function() {
        map = DG.map('map', {
            'center': [54.98, 82.89],
            'zoom': 13
        });
    });

Inside this function adds a handler for of the event of the page loading.
This very method was discussed in the [Quick start](/doc/maps/en/quickstart) section.

### npm

The Maps API can be included via npm:

    $ npm i 2gis-maps

After the package is installed, enable it using <code>require</code>:

    var DG = require('2gis-maps');
    var map = DG.map('map', {
        'center': [54.98, 82.89],
        'zoom': 13
    });

Please note that when you use the npm package, there is no need to use <code>DG.then</code>.

### Download on demand

You can load the Maps API at the very moment when you need the map. To do this, you need to add the
<code>lazy=true</code> parameter to the URL used to include API:

    <script src="https://maps.api.2gis.ru/2.0/loader.js?pkg=full&lazy=true"></script>

Then, at the right time (for example, when pressing the button) you must call the <code>DG.then</code> function:

    DG.then(function() {
        map = DG.map('map', {
            'center': [54.98, 82.89],
            'zoom': 13
        });
    });

### Connection options

The following are all options that can take the URL of the Maps API loading:

<table>
    <thead>
        <tr>
            <th>Option</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr id="loading-pkg">
            <td><code>pkg</code></td>
            <td><code>full</code></td>
            <td>Package of loadable modules. Currently, 2 packages are supported: <code>full</code> — all API modules;
                <code>basic</code> — basic functionality (popups, markers, vector objects).</td>
        </tr>
        <tr>
            <td><code>skin</code></td>
            <td><code>dark</code></td>
            <td>The theme of controls (light or dark). Takes the value <code>light</code> or <code>dark</code>.</td>
        </tr>
        <tr>
            <td><code>lazy</code></td>
            <td><code>false</code></td>
            <td>If you specify the <code>true</code> value, then the Maps API will load with delay,
                when you first call <code>DG.then</code>.</td>
        </tr>
    </tbody>
</table>

### DG.then function

As described earlier, the function <code>DG.then</code> is responsible for tracking the moment of loading the Maps API
and adding handlers for this action. Function parameters:

<table>
    <thead>
        <tr>
            <th>Function</th>
            <th>Returns</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>DG.then</b>(
                <nobr>&lt;Function&gt; <i>resolve</i>,</nobr>
                <nobr>&lt;Function&gt; <i>reject</i></nobr>&nbsp;)
            </code></td>
            <td><code>Promise</code></td>
            <td>Registers API loading handlers. Parameters: <code>resolve</code> is a function triggered
                in case of a successful loading of the Maps API, <code>reject</code> is a function triggered
                in case of server errors.</td>
        </tr>
    </tbody>
</table>

The call of the <code>DG.then</code> function at any time after the API loading will be immediately executed by the handler.