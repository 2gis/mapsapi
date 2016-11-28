## External modules

Besides the possibility to connect one of the <a href="/doc/maps/en/manual/dg-loading#loading-pkg">packages</a>
of 2GIS modules, you can load other developers' modules from third-party servers. The maps API is compatible
with most of <a target="_blank" href="http://leafletjs.com/plugins.html">library modules</a> Leaflet.
You can also develop and connect <a href="https://github.com/2gis/maps-api-2.0/blob/master/CONTRIBUTING.md#%D0%9A%D0%B0%D0%BA-%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0%D1%82%D1%8C-%D1%81%D0%BE%D0%B1%D1%81%D1%82%D0%B2%D0%B5%D0%BD%D0%BD%D1%8B%D0%B9-%D0%BC%D0%BE%D0%B4%D1%83%D0%BB%D1%8C" target="_blank">your own module</a>.

{toc}

### Connection

To include external modules, use the <code>DG.plugin</code> function. Below we take a look at several examples of its use.

The usage of the <code>DG.plugin</code> function in the case where the module should be loaded before the map initialization:

    // loading of maps API code
    DG.then(function() {
        // module code loading
        return DG.plugin('https://raw.github.com/mlevans/leaflet-hash/master/leaflet-hash.js');
    })
    .then(function() {
        // map initialization
        var map = DG.map('map', {
            'center': [54.98, 82.89],
            'zoom': 13
        });
        // module initialization
        L.hash(map);
    });

If the module is not needed at the initial stage of work with the map, then you can use its deferred
loading and initialization (for example, when you click on the button):

    // loading of maps API code
    DG.then(function() {
        // map initialization
        map = DG.map('map', {
            'center': [54.98, 82.89],
            'zoom': 13
        });
    });

    // the code can be called on demand
    DG.then(function() {
        // module code loading
        return DG.plugin('https://raw.github.com/mlevans/leaflet-hash/master/leaflet-hash.js');
    }).then(function () {
        // module initialization
        L.hash(map);
    });

### DG.plugin

Is responsible for the loading of external modules. Function parameters:

<table>
    <thead>
        <tr>
            <th>Method</th>
            <th>Returns</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>DG.plugin</b>(
                <nobr>&lt;String&gt; <i>url</i>&nbsp;|&nbsp;</nobr>
                <nobr>&lt;Array&gt; <i>[&lt;String&gt; url, &lt;String&gt; url, ...]</i></nobr>&nbsp;)
            </code></td>
            <td><code>Promise</code></td>
            <td>Loads the modules. The direct links to js and css files must be specified as parameters.</td>
        </tr>
    </tbody>
</table>
