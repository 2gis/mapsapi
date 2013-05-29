/**
 *
 */
L.DG.Geoclicker.Handlers.house = function (results, type, popup, map) {
    console.log(results.house)

    if (!results.house) {
        return false;
    }
    var
        house = results.house,
        attrs = house.attributes,
        data = {
            address: '',
            purpose: '',
            elevation: '',
            link: ''
        },
        html;

    if (attrs.index) {
        data.address += attrs.index + ' '
    }
    data.address += house.name;


    if (attrs.purpose) {
        data.purpose = attrs.purpose
    }

    if (attrs.elevation) {
        data.elevation = 'Этажей: ' + attrs.elevation; //@todo i18n
    }
    if (attrs.firmcount) {
        console.log('f', attrs.firmcount)
        data.link = '<a href="javascript:void(0)">Показать все организации в здании (' + attrs.firmcount + ')</a>';
    }

    html = L.DG.Geoclicker.Handlers.house.view(data)
    console.log(data, html)//--
    popup.setContent(html);
    return true;
};


L.DG.Geoclicker.Handlers.house.view = function (params) {

    var tmpl = '<h3>{address}</h3><br/>' +
        '<div>{purpose}</div>' +
        '<div>{elevation}</div>' +
        '<div>{link}</div>';

    return L.Util.template(tmpl, params);
}
