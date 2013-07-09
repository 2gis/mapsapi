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
                    id: 'arrowAnimate',
                    attributeName: 'stroke-opacity',
                    values: "0;1",
                    fill: 'freeze',
                    dur: '0.2s',
                    begin: 'indefinite'
                };
    },

    getArrowAnimation: function () {
        var arrow = 'backGeom', //TODO define arrow type automaticaly
            animateArrow = {
                id: 'animateArrowPathGeom',
                attributeName: 'd',
                fill: 'freeze',
                begin: 'indefinite'
            };
        animateArrow._getValues = this._getAnimationValues;
        animateArrow.keyTimes = this._getAnimateTiming(arrow);
        animateArrow.dur = this._getAnimationTime(arrow);

        return animateArrow;
    },

    _getAnimationValues: function(points) {

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

    _getAnimateTiming: function (arrowType) {
        if(arrowType == 'simpleArrow') return "0; 0.33; 0.495; 0.66; 0.77; 0.88; 0.935; 1";
        if(arrowType =='edgeArrow') return "0; 0.33; 0.34; 1";
        else return "0; 0.25; 0.26; 0.5; 0.51; 1";
    },

    _getAnimationTime: function (arrowType) {
        if(arrowType == 'simpleArrow') return '0.7s';
        else return "0.5s";
    }
});
