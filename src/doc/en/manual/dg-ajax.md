## Asynchronous requests (AJAX)

{toc}

### DG.ajax

The DG.ajax function allows to send cross-domain AJAX requests.

    var promise = DG.ajax('http://www.geonames.org/postalCodeLookupJSON', {
        type: 'get',
        data: {
            postalcode: 10504,
            country: 'US'
        },
        success: function(data) {
            console.log('success', data);
        },
        error: function(error) {
            console.log('error', error);
        }
    });

    // to cancel the request:
    // promise.abort();

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
            <td><code><b>DG.ajax</b>(
                <nobr>&lt;String&gt; <i>url</i>,</nobr>
                <nobr>&lt;<a href="#options">Ajax options</a>&gt; <i>options?</i> )</nobr>
            </code></td>
            <td><code>Promise</code></td>
            <td>Sends a request to the server and returns a Promise object with the abort method,
                with the help of which you can abort the sending of the request. Takes a URL as
                input parameters, where we will send you a request and an optional object of options.</td>
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
            <td><code><b>data</b></code></td>
            <td><code>Object</code></td>
            <td><code>null</code></td>
            <td>The data that will be sent to the server.</td>
        </tr>
        <tr>
            <td><code><b>type</b></code></td>
            <td><code>String</code></td>
            <td><code>get</code></td>
            <td>Type of request ('get', 'post' or 'jsonp').</td>
        </tr>
        <tr>
            <td><code><b>success</b></code></td>
            <td><code>Function</code></td>
            <td><code>null</code></td>
            <td>A function which is triggered in case of successful server response.
                Takes the received data as a parameter.</td>
        </tr>
        <tr>
            <td><code><b>error</b></code></td>
            <td><code>Function</code></td>
            <td><code>null</code></td>
            <td>A function that is triggered when an error occurs.
                Takes the error information as a parameter.</td>
        </tr>
        <tr>
            <td><code><b>url</b></code></td>
            <td><code>String</code></td>
            <td><code>null</code></td>
            <td>The URL to which the request will be sent.</td>
        </tr>
        <tr>
            <td><code><b>timeout</b></code></td>
            <td><code>Number</code></td>
            <td><code>null</code></td>
            <td>Query timeout (in milliseconds).</td>
        </tr>
    </tbody>
</table>
