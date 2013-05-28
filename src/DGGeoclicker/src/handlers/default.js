/**
 *
 *
 */
L.DG.Geoclicker.Handlers = {
    default: function (popup, map) {
        popup.setContent('Not found');
        return true;
    }
};

L.DG.Geoclicker.Handlers.handlerExample = function (res, popup, map, type) {
    popup.setContent(type + '<br>' + res.id);
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