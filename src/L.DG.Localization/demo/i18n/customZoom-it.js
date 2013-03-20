L.Control.CustomZoom.Dictionary = L.Control.CustomZoom.Dictionary || {};

L.Control.CustomZoom.Dictionary.it = {
    pluralRules: function (n) {
        if (n === 1) { // 1
            return 0;
        }
        if (n >= 2) { // 2, 3, 4 ..
            return 1;
        }
    },

    "Zoom in": "Zoom avanti",
    "Zoom out": "Zoom indietro",
    "Current Zoom": "Zoom corrente",
    "elevation": [" {n} piano"," {n} piani"],
    "hours": ["{n} ora", "{n} ore"]
};