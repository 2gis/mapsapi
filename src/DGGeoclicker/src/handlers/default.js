/**
 *
 *
 */
L.DG.Geoclicker.Handlers = {
    default: function (res, popup, map) {
        popup.setContent('Not found');
        return true;
    }
};

L.DG.Geoclicker.Handlers.district = function (res, popup, map) {
    console.log('district', res)
    popup.setContent('district<br>' + res.id);
    return true;
}

L.DG.Geoclicker.Handlers.house = function (res, popup, map) {

    console.log('house', res)

    popup.setContent('house<br>' + res.id);
    return true;
}
/*
 station_platform
 city
 street
 district
 project
 house
 sight
 place
 station
 crossbroad
 metro
 */