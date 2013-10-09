L.DG = L.DG || {};
L.DG.configTheme = {
    name: 'light',

    balloonOptions: {
        offset: {
            x: 0,
            y: -47
        }
    },

    markersData: {
        iconSize: [16, 24],
        popupAnchor: [0, 3],
        html: '<div class="dg-marker dg-marker_default dg-marker_animated"></div>',
        className: 'leaflet-div-icon',
        iconAnchor: [7, 23],
        animation: true
    },

    controls: {
        zoom: {
            position: 'topleft'
        },
        fullScreen: {
            position: 'topright'
        },
        whereami: {
            position: 'topright'
        }
    }
};
