## DG.Entrance

Allows to display an entrance to the building. The class supports simple animation and multiple inputs display.
Objects of entrances themselves represent arrows which change their scale together with zooming, but not lower
than the level 16, after which the arrows disappear from the map (until reaching an acceptable level of zooming).

{toc}

### DG.Entrance

#### Example of usage

Create and display the entrances to the building:

    var options = {vectors: [
        "LINESTRING(82.897079 54.980906,82.897191 54.980844)",
        "LINESTRING(82.897933 54.980649,82.898045 54.980587)",
        "LINESTRING(82.897071 54.980122,82.897226 54.98013)",
        "LINESTRING(82.897354 54.979515,82.89741 54.979599)",
        "LINESTRING(82.898498 54.979826,82.898386 54.979889)"
    ]}
    DG.entrance(options).addTo(map).show(true);

#### Creation

<table>
    <thead>
        <tr>
            <th>Factory</th>
            <th>Usage</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>DG.Entrance</b>(
                <nobr>&lt;<a href="#entrance-options">Entrance options</a>&gt; <i>options</i> )</nobr>
            </code></td>
            <td><code>DG.entrance(&hellip;)</code></td>
            <td>Creates an entrance object based on the provided options.</td>
        </tr>
    </tbody>
</table>

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
        <tr>
            <td><code><b>vectors</b></code></td>
            <td><code>Array</td>
            <td><code>[]</code></td>
            <td><b>(a required parameter)</b>An array of vectors describing the entrances to the building.
                You can send several values in the array, if there is more than one entrance to the building.
                Each element should represent a string in WKT format: LINESTRING(lng0 lat0,lng1 lat1[,... lngN latN]),
                where the last coordinate pair should be a direct entrance point to the building, and the previous
                coordinates - be the route to this point. Throughout the route there should not be mutual intersections.</td>
        </tr>
        <tr>
            <td><code><b>fillColor</b></code></td>
            <td><code>String</td>
            <td><code>#0085a0</code></td>
            <td>The fill color of the arrows.</td>
        </tr>
        <tr>
            <td><code><b>strokeColor</b></code></td>
            <td><code>String</td>
            <td><code>#ffffff</code></td>
            <td>The outline color of the arrows.</td>
        </tr>
        <tr>
            <td><code><b>enableAnimation</b></code></td>
            <td><code>Boolean</td>
            <td><code>true</code></td>
            <td>Whether to animate the display of arrows when you change the zoom levels of the map and during the initial display.</td>
        </tr>
        <tr>
            <td><code><b>interactive</b></code></td>
            <td><code>Boolean</td>
            <td><code>false</code></td>
            <td>If the value is false, then the handler of the mouse actions is not called.</td>
        </tr>
        <tr>
            <td><code><b>autoClose</b></code></td>
            <td><code>Boolean</td>
            <td><code>true</code></td>
            <td>Whether to remove objects of entrances after adding new layers to the map.</td>
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
        <tr>
            <td><code><b>addTo</b>(
                <nobr>&lt;<a href="#map">Map</a>&gt; <i>map</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Adds the object of entrances to the map.</td>
        </tr>
        <tr>
            <td><code><b>removeFrom</b>(
                <nobr>&lt;<a href="#map">Map</a>&gt; <i>map</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Removes the object of entrances from the map.</td>
        </tr>
        <tr>
            <td><code><b>show</b>(
                <nobr>&lt;fitBounds&gt; <i>boolean</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Displays entrances on the map. If <code>fitBounds</code> is set to <code>true</code>,
                then the map boundaries (and zoom level) are adjusted so that the user could see all
                the entrances on one screen.</td>
        </tr>
        <tr>
            <td><code><b>hide</b>()</code></td>

            <td><code>this</code></td>
            <td>Hides entrances. The objects themselves are not deleted from the map and the entrances
                can be re-displayed by calling the <code>show()</code> method.</td>
        </tr>
        <tr>
            <td><code><b>isShown</b>()</code></td>
            <td><code>Boolean</code></td>
            <td>Returns <code>true</code> if the entrances are currently displayed on the map.</td>
        </tr>
        <tr>
            <td><code><b>setFillColor</b>()</code></td>
            <td><code>String</code></td>
            <td>Changes the fill color of the arrows.</td>
        </tr>
        <tr>
            <td><code><b>setStrokeColor</b>()</code></td>
            <td><code>String</code></td>
            <td>Changes the outline color of the arrows.</td>
        </tr>
    </tbody>
</table>
