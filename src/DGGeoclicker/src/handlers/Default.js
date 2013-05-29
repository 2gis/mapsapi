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

L.DG.Geoclicker.Handlers.handlerExample = function (res, type, popup, map) {
    popup.setContent(type + ':<br/>' + res[type].id);
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