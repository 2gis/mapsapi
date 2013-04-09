var packages = {

    base: {
        name: 'Базовый',
        modules: ['Core', 'TileLayer', 'DGControlZoom', 'DGLayer'],
        desc: 'Представляет собой самый базовый функционал: карта и элементы управления'
    },
    
    standard: {
        name: 'Стандарт',
        modules: ['Core', 'TileLayer', 'DGControlZoom', 'DGLayer', 'Marker', 'DivIcon', 'Popup'],
        desc: 'Представляет собой стандартный функционал: карта, маркеры, балуны, геометрии'
    },

    full: {
        name: 'Полный',
        modules: [],
        desc: 'Полный, максимальный пакет. Включает в себя весь функционал АПИ карт'
    },

    online: {
        name: 'Онлайн',
        modules: [],
        desc: 'Полный, максимальный пакет. Включает в себя весь функционал АПИ карт'
    }

};

if (typeof exports !== 'undefined') {
    exports.packages = packages;
}
