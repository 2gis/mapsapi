var rulerRenderer = DG.svg({pane: 'rulerPane'});
var hoverRenderer = DG.svg({pane: 'rulerPane'});

DG.Ruler.mergeOptions({
    pathStyles: {
        back: {
            color: '#fff',
            opacity: 1,
            weight: 12,
            pointerEvents: 'none',
            noClip: true,
            renderer: rulerRenderer,
            smoothFactor: 0
        },
        middle: {
            color: '#0da5d5',
            opacity: 1,
            weight: 4,
            pointerEvents: 'none',
            noClip: true,
            renderer: rulerRenderer,
            smoothFactor: 0
        },
        mouse: {
            color: '#fff',
            opacity: DG.Browser.vml ? 0.1 : 0,
            weight: DG.Browser.touch ? 40 : 20,
            pointerEvents: 'painted',
            noClip: true,
            renderer: hoverRenderer,
            smoothFactor: 0
        }
    },
    iconStyles: {
        large: {
            back: {
                color: '#fff',
                opacity: 1,
                fillColor: '#fff',
                fillOpacity: 1,
                weight: 1,
                radius: 13,
                renderer: rulerRenderer
            },
            middle: {
                color: '#0da5d5',
                opacity: 1,
                fillColor: '#0da5d5',
                fillOpacity: 1,
                weight: 1,
                radius: 9,
                renderer: rulerRenderer
            },
            front: {
                color: '#fff',
                opacity: 1,
                fillColor: '#0da5d5',
                fillOpacity: 1,
                weight: 4,
                radius: 5,
                renderer: rulerRenderer
            }
        },
        small: {
            back: {
                color: '#fff',
                opacity: 1,
                fillColor: '#fff',
                fillOpacity: 1,
                weight: 1,
                radius: 9,
                renderer: rulerRenderer
            },
            middle: {
                color: '#0da5d5',
                opacity: 1,
                fillColor: '#0da5d5',
                fillOpacity: 1,
                weight: 1,
                radius: 5,
                renderer: rulerRenderer
            },
            front: {
                color: '#fff',
                opacity: 1,
                fillColor: '#0da5d5',
                fillOpacity: 1,
                weight: 4,
                radius: 2,
                renderer: rulerRenderer
            }
        }
    }
});
