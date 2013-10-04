// Extends L.DG.Entrance.Arrow with SVG-specific animation options
if (L.Browser.svg) {

    L.DG.Entrance.Arrow.include({

        getArrowAnimation: function (vertices) { // (Number) -> Object
            var animateArrow = {
                id: 'animateArrowPathGeom',
                attributeName: 'd',
                fill: 'freeze',
                begin: 'indefinite'
            };

            animateArrow.getValues = this._getAnimationValues(vertices.length);
            animateArrow.keyTimes = this._getAnimateTiming(vertices);
            animateArrow.dur = this._getAnimationTime(vertices.length);

            return animateArrow;
        },

        _getAnimationValues: function (verticesCount) {
            return (verticesCount === 2) ? this._getShakeAnimationValues : this._getSlideAnimationValues;
        },

        _getSlideAnimationValues: function (points) { // (Array) -> String
            var d = '',
                prevPoint = '',
                curPoint = '',
                M = 'M ' + points[0].x + ' ' + points[0].y,
                l = 'l -1 0';

            d = M + ' ' + l + '; ';
            for (var i = 1; i < points.length; i++) {
                curPoint += (points[i].x - points[i - 1].x) + ' ' + (points[i].y - points[i - 1].y);

                if (i === points.length - 1) {
                    curPoint = (points[i].x - points[i - 1].x) + ' ' + (points[i].y - points[i - 1].y);
                    d += M + ' l ' + prevPoint  + curPoint + ';';
                    break;
                }

                d += M + ' l ' + curPoint + '; ';
                d += M + ' l ' + curPoint + ' ' + l + '; ';
                curPoint += ' l ';
                prevPoint += (points[i].x - points[i - 1].x) + ' ' + (points[i].y - points[i - 1].y) + ' l ';
            }

            return d;
        },

        _getShakeAnimationValues: function (points) { // (Array) -> String
            var d = '', px0, py0,
                // config coefficient values for arrow animation
                relDiff = [1, 0.4, 1, 0.84, 1, 0.94, 1],
                dx = points[1].x - points[0].x,
                dy = points[1].y - points[0].y,
                l = ' l ' + dx + ' ' + dy;

            px0 = points[0].x - dx;
            py0 = points[0].y - dy;

            d = 'M ' + px0 + ' ' + py0 + l + '; ';
            for (var i = 0; i < relDiff.length; i++) {
                d += ' M ' + (px0 + dx * relDiff[i]) + ' ' + (py0 + dy * relDiff[i]) + l + ';';
            }

            return d;
        },

        _getPolylineLength: function (latlngs) {
            var len = 0;
            for (var i = 1; i < latlngs.length; i++) {
                len += latlngs[i - 1].distanceTo(latlngs[i]);
            }
            return len;
        },

        _getAnimateTiming: function (latlngs) {
            var resultArr = [0],
                polyLen = this._getPolylineLength(latlngs),
                result,
                segmentRatio,
                segmentLength;

            if (latlngs.length === 2) {
                result = '0; 0.33; 0.495; 0.66; 0.77; 0.88; 0.935; 1';
            }
            else if (latlngs.length === 3) {
                result = '0; 0.33; 0.34; 1';
            }
            else if (latlngs.length === 4) {
                result = '0; 0.25; 0.26; 0.5; 0.51; 1';
            }
            else {
                for (var i = 1; i < latlngs.length; i++) {
                    segmentLength = latlngs[i - 1].distanceTo(latlngs[i]);
                    segmentRatio = segmentLength / polyLen;

                    resultArr.push(resultArr[resultArr.length - 1] + segmentRatio);

                    if (i < latlngs.length - 1) {
                        // 2 points for each vertice (but not for first and last)
                        resultArr.push(resultArr[resultArr.length - 1]);
                    }
                    else {
                        // last point should be 1, but some times it looks like 0.9999...
                        resultArr[resultArr.length - 1] = 1;
                    }

                }
                result = resultArr.join('; ');
            }

            return result;
        },

        _getAnimationTime: function (verticesCount) {
            if (verticesCount === 2) { return '0.7s'; }
            else if (verticesCount === 3 || verticesCount === 4) { return '0.5s'; }
            else { return '0.7s'; }
        }
    });
}
