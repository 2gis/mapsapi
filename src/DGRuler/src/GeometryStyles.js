DG.Ruler.mergeOptions({
    pathStyles: {
        back: {
            color: '#fff',
            opacity: 1,
            weight: 12,
            pointerEvents: 'none',
            noClip: true
        },
        middle: {
            color: '#0da5d5',
            opacity: 1,
            weight: 4,
            pointerEvents: 'none',
            noClip: true
        },
        mouse: {
            color: '#fff',
            opacity: DG.Path.VML ? 0.1 : 0,
            weight: DG.Browser.touch ? 30 : 20,
            pointerEvents: 'painted',
            noClip: true,
            renderer: DG.svg({pane: 'rulerEventPane'})
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
                radius: 13
            },
            middle: {
                color: '#0da5d5',
                opacity: 1,
                fillColor: '#0da5d5',
                fillOpacity: 1,
                weight: 1,
                radius: 9
            },
            front: {
                color: '#fff',
                opacity: 1,
                fillColor: '#0da5d5',
                fillOpacity: 1,
                weight: 4,
                radius: 5
            }
        },
        small: {
            back: {
                color: '#fff',
                opacity: 1,
                fillColor: '#fff',
                fillOpacity: 1,
                weight: 1,
                radius: 9
            },
            middle: {
                color: '#0da5d5',
                opacity: 1,
                fillColor: '#0da5d5',
                fillOpacity: 1,
                weight: 1,
                radius: 5
            },
            front: {
                color: '#fff',
                opacity: 1,
                fillColor: '#0da5d5',
                fillOpacity: 1,
                weight: 4,
                radius: 2
            }
        }
    }
});