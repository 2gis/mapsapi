// excluded, because L.DG.TileLayer added to the map by default,
// but leaflet tests think that map without layers and fails
module.exports = [
    'node_modules/leaflet/spec/suites/core/UtilSpec.js',
    'node_modules/leaflet/spec/suites/map/MapSpec.js',
    'node_modules/leaflet/spec/suites/map/handler/Map.DragSpec.js',
    'node_modules/leaflet/spec/suites/layer/tile/GridLayerSpec.js',
    'node_modules/leaflet/spec/suites/layer/PopupSpec.js',
    'node_modules/leaflet/spec/suites/layer/vector/CanvasSpec.js',
    'node_modules/leaflet/spec/suites/layer/marker/Icon.DefaultSpec.js',
    'node_modules/leaflet/spec/suites/layer/TooltipSpec.js',
    'node_modules/leaflet/spec/suites/layer/vector/PathSpec.js'
];
