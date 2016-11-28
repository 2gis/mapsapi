## 2GIS Project Detection Module

Project is agglomeration, which includes a major city and the surrounding areas.
This plugin allows to get information about the project which is being viewed at the current moment of time.

{toc}

### Examples of usage

Subscribe to the projectchange event:

    map.on('projectchange', function (e) {
        console.log(e);
    });

Subscribe to the projectleave event:

    map.on('projectleave', function (e) {
       console.log(e);
    });

### Events

<table>
    <thead>
        <tr>
            <th>Event</th>
            <th>Data</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>projectchange</td>
            <td>ProjectEvent</td>
            <td>Occurs when the user goes from one project to another.</td>
        </tr>
        <tr>
            <td>projectleave</td>
            <td>ProjectEvent</td>
            <td>Occurs when the user is outside of the current project.</td>
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
            <td>getProjectList</td>
            <td>Object</td>
            <td>Returns all available projects.</td>
        </tr>
        <tr>
            <td>getProject</td>
            <td>Object</td>
            <td>Returns the current project.</td>
        </tr>
    </tbody>
</table>
