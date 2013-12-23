L.DG.Ruler.Styles = {
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
            opacity: L.Path.VML ? 0.01 : 0,
            weight: 20,
            pointerEvents: 'all',
            noClip: true
        }
    },
    iconStyles: {
        large: {
            layers: {
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
            }
        },
        small: {
            layers: {
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
    }
};