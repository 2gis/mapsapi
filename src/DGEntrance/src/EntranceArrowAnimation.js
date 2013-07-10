L.DG.Entrance.Arrow.include({

    getFadeOutAnimation: function() {
        return  {
                    id: 'hideArrow',
                    attributeName: 'stroke-opacity',
                    values: "1;0",
                    fill: 'freeze',
                    dur: '0.2s',
                    begin: 'indefinite'
                };
    },

    getFadeInAnimation: function() {
        return  {
                    id: 'showArrow',
                    attributeName: 'stroke-opacity',
                    values: "0;1",
                    fill: 'freeze',
                    dur: '0.2s',
                    begin: 'indefinite'
                };
    },

    getArrowAnimation: function (verticesCount) { // (Number) -> Object
        var animateArrow = {
            id: 'animateArrowPathGeom',
            attributeName: 'd',
            fill: 'freeze',
            begin: 'indefinite'
        };

        animateArrow._getValues = this._getAnimationValues(verticesCount);
        animateArrow.keyTimes = this._getAnimateTiming(verticesCount);
        animateArrow.dur = this._getAnimationTime(verticesCount);

        return animateArrow;
    },

    _getAnimationValues: function(verticesCount) {
        return (verticesCount === 2) ? this._getShakeAnimationValues : this._getSlideAnimationValues;
    },

    _getSlideAnimationValues: function(points) {
        var d = '',
            prevPoint = '',
            curPoint = '',
            M = 'M ' + points[0].x + ' ' + points[0].y,
            l = 'l -1 0';

            d = M + ' ' + l + '; ';
            for (var i = 1; i < points.length; i++) {
                curPoint += (points[i].x - points[i-1].x) + ' ' + (points[i].y - points[i-1].y);

                if (i === points.length - 1) {
                    curPoint = (points[i].x - points[i-1].x) + ' ' + (points[i].y - points[i-1].y);
                    d += M + ' l ' + prevPoint  + curPoint + ';';
                    break;
                }

                d += M + ' l ' + curPoint + '; ';
                d += M + ' l ' + curPoint + ' ' + l +'; ';
                curPoint += ' l ';
                prevPoint += (points[i].x - points[i-1].x) + ' ' + (points[i].y - points[i-1].y) + ' l ';
            }

            return d;
    },

    _getShakeAnimationValues: function(points) {
            var d = '';
            var t = [0, 0.33, 0.495, 0.66, 0.77, 0.88, 0.935, 1];

            var dx = points[1].x - points[0].x;
            var dy = points[1].y - points[0].y;
            var l = ' l ' + dx + ' ' + dy;
            d = 'M ' + points[0].x + ' ' + points[0].y + l + '; ';

            function _bounceOut(t) {
                if (t < 1/2.75) {
                    return (7.5625*t*t);
                } else if (t < 2/2.75) {
                    return (7.5625*(t-=1.5/2.75)*t+0.75);
                } else if (t < 2.5/2.75) {
                    return (7.5625*(t-=2.25/2.75)*t+0.9375);
                } else {
                    return (7.5625*(t-=2.625/2.75)*t +0.984375);
                }
            }
             for (var i = 1; i < t.length; i++) {
                var n = _bounceOut(t[i]);
                d += ' M ' + Math.round(points[0].x*n) + ' ' + Math.round(points[0].y*n) + l + ';';
            }

            return d;//'M 100 200 l 0 -50;   M 100 150 l 0 -50; M 100 180 l 0 -50; M 100 150 l 0 -50; M 100 158 l 0 -50; M 100 150 l 0 -50; M 100 153 l 0 -50; M 100 150 l 0 -50;';
    },

    _easeOutBounce: function(e, f, a, h, g) {
        if ((f /= g) < (1 / 2.75)) {
            return h * (7.5625 * f * f) + a;
        } else {
            if (f < (2 / 2.75)) {
                return h * (7.5625 * (f -= (1.5 / 2.75)) * f + 0.75) + a;
            } else {
                if (f < (2.5 / 2.75)) {
                    return h * (7.5625 * (f -= (2.25 / 2.75)) * f + 0.9375) + a;
                } else {
                    return h * (7.5625 * (f -= (2.625 / 2.75)) * f + 0.984375) + a;
                }
            }
        }
    },

    _bounceOut: function(t) {
        if (t < 1/2.75) {
            return (7.5625*t*t);
        } else if (t < 2/2.75) {
            return (7.5625*(t-=1.5/2.75)*t+0.75);
        } else if (t < 2.5/2.75) {
            return (7.5625*(t-=2.25/2.75)*t+0.9375);
        } else {
            return (7.5625*(t-=2.625/2.75)*t +0.984375);
        }
    },

    _getAnimateTiming: function (verticesCount) {
        if(verticesCount === 2) return "0; 0.33; 0.495; 0.66; 0.77; 0.88; 0.935; 1";
        if(verticesCount === 3) return "0; 0.33; 0.34; 1";
        else return "0; 0.25; 0.26; 0.5; 0.51; 1";
    },

    _getAnimationTime: function (verticesCount) {
        if(verticesCount === 2) return '0.7s';
        else return "0.5s";
    }
});
