/**
 * 2GIS Geoclicker Plugin
 * The set of handlers
 * @todo add Description here
 */
L.DG = L.DG || {};

L.DG.GeoclickerHandlers = {
    _default: function () {
        console.log("DEFAULT");
        return 'default';
    }
};

L.DG.GeoclickerHandlers.district = function (res) {
    console.log('district', res)
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