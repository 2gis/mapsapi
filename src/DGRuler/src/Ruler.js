DG.Ruler = DG.Layer.extend({

    options: {
        editable: true
    },

    includes: [DG.Locale],

    statics: {
        Dictionary: {}
    },

    initialize: function(latlngs, options) { // (Array, Object)
        DG.Util.setOptions(this, options);

        this._layers = {
            back : null,
            middle : null,
            front : null,
            mouse : null
        };
        this._points = [];

        this._layersContainer = DG.featureGroup();
        Object.keys(this._layers).forEach(function(name) {
            this._layersContainer.addLayer(this._layers[name] = DG.featureGroup());
        }, this);

        this._reset();

        if (DG.Browser.mobile) {
            delete this._lineMouseEvents.mouseover;
            delete this._lineMouseEvents.mouseout;
            delete this._lineMouseEvents.mousemove;
        } else {
            delete this._lineMouseEvents.click;
        }

        if (latlngs && latlngs.length) {
            this.setLatLngs(latlngs);
        }
    },

    onAdd: function(map) { // (Map)
        this._map = map.on('langchange', this._updateDistance, this);

        //  Pane for ruler Markers
        if (!this._map.getPane('rulerMarkerPane')) {
            this._map.createPane('rulerMarkerPane');
        }

        //  Main ruler pane (svg objects and runner)
        if (!this._map.getPane('rulerPane')) {
            this._map.createPane('rulerPane');
        }

        this._layersContainer.addTo(this._map);

        if (this._points.length) {
            this._layers.mouse.fire('layeradd');
            this._updateDistance();
        }

        this._layers.mouse.on(this._lineMouseEvents, this);
    },

    onRemove: function(map) { // (Map)
        map
            .off('langchange', this._updateDistance, this)
            .removeLayer(this._layersContainer);

        this._layers.mouse.off(this._lineMouseEvents, this);
        this._reset();
    },

    getTotalDistance: function() { // () -> Number
        return this._calcDistance();
    },

    spliceLatLngs: function(index) { // (Number, Number, args ...) -> Array
        var oldLength = this._points.length,
            mutationStart = index >= 0 ? Math.min(index, oldLength) : oldLength - index,
            removed = Array.prototype.splice.apply(this._points, arguments).map(function(point) {
                this._layers.mouse.removeLayer(point);
                return point.off().getLatLng();
            }, this),
            length = this._points.length;

        if (length) {
            for (var i = mutationStart; i < length; i++) {
                if (!(this._points[i] instanceof DG.Ruler.LayeredMarker)) {
                    this._points[i] = this._createPoint(this._points[i], this.options.iconStyles.large)
                        .on(this._pointEvents, this)
                        .once('add', this._addCloseHandler, this)
                        .addTo(this._layers.mouse, this._layers);
                }
                if (i && !this._points[i - 1]._legs) {
                    this._addLegs(this._points[i - 1]);
                }
                this._points[i].setPointStyle(this.options.iconStyles[i && i < length - 1 ? 'small' : 'large']);
                this._points[i]._pos = i;
            }
            this._removeLegs(this._points[length - 1]);
            if (oldLength > 0 && oldLength < length) {
                this._points[oldLength - 1].collapse();
            }
            if (this._points[mutationStart]) {
                this._updateLegs(this._points[mutationStart]);
            }
            if (mutationStart > 1) {
                this._points[mutationStart - 1].setPointStyle(this.options.iconStyles.small);
            }
            this._updateDistance();
            this._normalizeRulerPoints();
        }
        if (DG.Browser.touch && this._lineMarkerHelper) {
            this._lineMarkerHelper.collapse();
        }
        this._fireChangeEvent();
        return removed;
    },

    addLatLng: function(latlng) { // (LatLng) -> Ruler
        var lastPoint = this._points[this._points.length - 1] || null;
        latlng = DG.latLng(latlng);

        if (lastPoint) {
            latlng = this._normalizeLatLng(latlng, lastPoint.getLatLng());
        }

        this.spliceLatLngs(this._points.length, 0, latlng);
        return this;
    },

    getLatLngs: function() { // () -> Array
        return this._points.map(function(point) {
            return point.getLatLng();
        });
    },

    setLatLngs: function(latlngs) { // (Array) -> Ruler
        var args = latlngs.slice();
        args.unshift(0, this._points.length);
        this.spliceLatLngs.apply(this, args);
        return this;
    },

    _reset: function() { // ()
        DG.extend(this, {
            _lineMarkerHelper: null,
            _morphingNow: false
        });
    },

    _lineMouseEvents: {
        click: function(event) {
            var target = event.layer;
            if (target instanceof DG.Marker && target._pos !== this._points.length - 1) {
                if (this._lineMarkerHelper) {
                    this._lineMarkerHelper.collapse();
                }
                target.setText(this._getFormatedDistance(target));
                this._lineMarkerHelper = target;
            } else if (target instanceof DG.Path && this.options.editable) {
                var latlng = event.latlng,
                    insertPos = target._point._pos + 1;
                this.spliceLatLngs(insertPos, 0, latlng);
            }
        },
        mouseover: function(event) { // (MouseEvent)
            var target = event.layer;

            target._hovered = true;
            if (this._morphingNow) {
                return;
            }
            if (target instanceof DG.Marker && target._pos !== this._points.length - 1) {
                target.setText(this._getFormatedDistance(target));
            } else if (target instanceof DG.Path && !this._lineMarkerHelper) {
                var point = target._point;

                this._lineMarkerHelper = this._addRunningLabel(
                    this._nearestPoint(point._legs.middle, event.latlng),
                    point
                );
            }
        },
        mouseout: function(event) { // (MouseEvent)
            var target = event.layer,
                originalEv = event.originalEvent;

            target._hovered = false;
            if (this._morphingNow || target._pos === this._points.length - 1) {
                return;
            }
            if (target instanceof DG.Marker) {
                // collapse only when we move out from label container (if browser support relatedTarget)
                if (!originalEv.relatedTarget ||
                    (originalEv.relatedTarget !== target.querySelector('container') &&
                    originalEv.relatedTarget.parentNode !== target.querySelector('container'))) {
                    target.collapse();
                }
            } else {
                this._removeRunningLabel();
            }
        },
        mousemove: function(event) { // (MouseEvent)
            if (this._morphingNow || !this._lineMarkerHelper) {
                return;
            }

            var point = event.layer._point,
                latlng = this._nearestPoint(point._legs.middle, event.latlng);

            this._lineMarkerHelper
                .setLatLng(latlng)
                .setText(this._getFormatedDistance(point, point.getLatLng().distanceTo(latlng)));
        },
        layeradd: function() { // ()
            Object.keys(this._layers).forEach(function(name) {
                this._layers[name].bringToFront();
            }, this);
        }
    },

    _fireChangeEvent: function() {
        this.fire('changed', {latlngs : this.getLatLngs()});
    },

    _addRunningLabel: function(latlng, previousPoint) { // (LatLng, Ruler.LayeredMarker)
        var point = this._createPoint(latlng).addTo(this._layers.mouse, this._layers);
        var pane = this._map.getPane('rulerPane');
        pane.insertBefore(point._icon, pane.lastElementChild);
        return point.setText(this._getFormatedDistance(previousPoint, previousPoint.getLatLng().distanceTo(latlng)));
    },

    _removeRunningLabel: function() { // ()
        if (this._lineMarkerHelper) {
            this._layers.mouse.removeLayer(this._lineMarkerHelper);
            this._lineMarkerHelper = null;
        }
    },

    _insertPointInLine: function(event) { // (MouseEvent)
        var latlng = this._lineMarkerHelper.getLatLng(),
            insertPos = event.target._point._pos + 1,
            point;

        if (L.Browser.ie) {
            var path = event.originalEvent.target || event.originalEvent.srcElement,
                parent = path.parentNode;
            parent.appendChild(path); // IE click event leaking problem solution: we reappend mousedown event target element
        }

        L.DomEvent.stopPropagation(event.originalEvent);

        this.spliceLatLngs(insertPos, 0, latlng);
        point = this._points[insertPos];
        point.setText(this._getFormatedDistance(point));

        setTimeout(function() {
            if (document.createEvent) {
                var e = document.createEvent('MouseEvents');
                e.initMouseEvent('mouseup', false, false, document.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 1, point._icon);
                document.dispatchEvent(e);

                e = document.createEvent('MouseEvents');
                e.initMouseEvent('mousedown', false, false, document.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 1, point._icon);
                point._icon.dispatchEvent(e);
            } else {
                point._icon.fireEvent('onMouseUp', DG.extend(document.createEventObject(), {
                    button: 1,
                    bubbles: false,
                    cancelable: false
                }));
                point._icon.fireEvent('onMouseDown', DG.extend(document.createEventObject(), {
                    button: 1,
                    bubbles: false,
                    cancelable: false
                }));
            }
        }, 0);

        this._removeRunningLabel();

        this._updateLegs(point);
    },

    // Find the point on given polyline which is closest to given latlng
    _nearestPoint: function(polyline, latlng) { // (Polyline, LatLng) -> LatLng
        var self = this;

        // Convert everything to pixel coordinates
        var point = this._project(latlng);
        var linePoints = polyline.getLatLngs().map(function(latlng) {
            return self._project(latlng);
        });

        // First look for closest polyline segment
        var minDistance;
        var closestSegmentIndex;
        for (var i = 0; i < linePoints.length - 1; i++) {
            var distance = DG.LineUtil.pointToSegmentDistance(
                point,
                linePoints[i],
                linePoints[i + 1]
            );

            if (minDistance === undefined || distance < minDistance) {
                minDistance = distance;
                closestSegmentIndex = i;
            }
        }

        // Then look for closest point on that segment
        var closestPoint = DG.LineUtil.closestPointOnSegment(
            point,
            linePoints[closestSegmentIndex],
            linePoints[closestSegmentIndex + 1]
        );

        // Convert back to LatLng
        return this._unproject(closestPoint);
    },

    _addCloseHandler: function(event) { // (Event)
        event.target
            .on('click', this._deletePoint, this)
            .querySelector('remove-link').style.display = 'inline-block';
    },

    _createPoint: function(latlng, style) { // (LatLng, Object) -> Ruler.LayeredMarker
        var pointStyle = style ? style : this.options.iconStyles.large,
            layers = {};
        Object.keys(pointStyle).forEach(function(layer) {
            layers[layer] = DG.circleMarker(latlng, pointStyle[layer]);
        });

        return DG.Ruler.layeredMarker(latlng, {
            layers : layers,
            draggable : this.options.editable,
            textDirection: this._map.getLang() !== 'ar' ? 'auto' : 'rtl'
        });
    },

    // Moves curr LatLng to correct world if necessary so that ruler section
    // between curr and base can be plotted correctly. Returns a new LatLng
    // object.
    _normalizeLatLng: function(curr, base) { // (LatLng, LatLng) -> LatLng
        var diff = (curr.lng < base.lng) ? 360 : -360;

        var newLng = curr.lng;
        while (Math.abs(newLng - base.lng) > 180) {
            newLng += diff;
        }

        return DG.latLng(curr.lat, newLng);
    },

    // Rearranges ruler points between worlds based on point param so that all
    // ruler sections can be plotted correctly.
    _normalizeRulerPoints: function(point) { // (Ruler.LayeredMarker)
        point = point || this._points[0];

        var self = this;
        var position = point._pos;
        var changedPoints = [];
        var i, currPoint, prevPoint, latlng, normalized;

        // Check points to the right
        for (i = position + 1; i < this._points.length; i++) {
            currPoint = this._points[i];
            prevPoint = this._points[i - 1];

            latlng = currPoint.getLatLng();
            normalized = this._normalizeLatLng(latlng, prevPoint.getLatLng());

            if (!normalized.equals(latlng)) {
                currPoint.setLatLng(normalized);
                changedPoints.push(i);
            }
        }

        // Check points to the left
        for (i = position - 1; i >= 0; i--) {
            currPoint = this._points[i];
            prevPoint = this._points[i + 1];

            latlng = currPoint.getLatLng();
            normalized = this._normalizeLatLng(latlng, prevPoint.getLatLng());

            if (!normalized.equals(latlng)) {
                currPoint.setLatLng(normalized);
                changedPoints.push(i);
            }
        }

        // Update legs of all points that changed position
        changedPoints.sort().reduce(function(previous, current) {
            var skipPrevious = previous && previous === current - 1;

            self._updateLegs(self._points[current], skipPrevious);

            return current;
        }, null);
    },

    _pointEvents: {
        drag: function(event) { // (Event)
            var point = event.target;

            this._normalizeRulerPoints(point);

            if (!DG.Browser.touch && point !== this._points[this._points.length - 1]) {
                point.setText(this._getFormatedDistance(point));
            }

            this._updateLegs(point);
            this._updateDistance();
        },
        dragend: function(event) { // (Event)
            var point = event.target;
            this._morphingNow = false;
            if (!point._hovered && point !== this._points[this._points.length - 1]) {
                point.collapse();
            }
            this._fireChangeEvent();
        },
        dragstart: function() { // ()
            if (DG.Browser.touch && this._lineMarkerHelper) {
                this._lineMarkerHelper.collapse();
            }
            this._morphingNow = true;
        }
    },

    _deletePoint: function(event) { // (MouseEvent)
        var originalEvent = event.originalEvent,
            target = originalEvent.target  || originalEvent.srcElement;

        if (target.className !== 'dg-ruler__label-remove-link' &&
            target.className !== 'dg-ruler__remove-link-overlay') {
            return;
        }
        DG.DomEvent.stop(event.originalEvent);
        this.spliceLatLngs(event.target._pos, 1);
    },

    _degToRad: function(deg) {
        return (Math.PI / 180) * deg;
    },

    _radToDeg: function(rad) {
        return (180 / Math.PI) * rad;
    },

    // Map-independent project method
    _project: function(latlng) {
        if (this._map) {
            return this._map.project(latlng);
        }

        return DG.CRS.EPSG3857.latLngToPoint(latlng, 1);
    },

    // Map-independent unproject method
    _unproject: function(point) {
        if (this._map) {
            return this._map.unproject(point);
        }

        return DG.CRS.EPSG3857.pointToLatLng(point, 1);
    },

    // Calculates the size of angle point1-point-point2
    _calcAngle: function(point, point1, point2) { // (LatLng, LatLng, LatLng) -> Number
        point1 = this._normalizeLatLng(point1, point);
        point2 = this._normalizeLatLng(point2, point);

        point = this._project(point);
        point1 = this._project(point1);
        point2 = this._project(point2);

        var x1 = point1.x - point.x;
        var x2 = point2.x - point.x;
        var y1 = point1.y - point.y;
        var y2 = point2.y - point.y;

        var dotProduct = x1 * x2 + y1 * y2;
        var mag1 = Math.sqrt(x1 * x1 + y1 * y1);
        var mag2 = Math.sqrt(x2 * x2 + y2 * y2);

        return Math.acos(dotProduct / (mag1 * mag2));
    },

    // Calculates the midpoint on the great circle between two LatLngs
    _calcMidPoint: function(latlng1, latlng2) { // (LatLng, LatLng) -> LatLng
        var lon1 = this._degToRad(latlng1.lng);
        var lat1 = this._degToRad(latlng1.lat);

        var lon2 = this._degToRad(latlng2.lng);
        var lat2 = this._degToRad(latlng2.lat);

        // Based on formulae from
        // http://williams.best.vwh.net/avform.htm#Intermediate
        var d = Math.acos(Math.sin(lat1) * Math.sin(lat2) +
            Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2));

        // Split the arc in half
        var f = 0.5;

        var A = Math.sin((1 - f) * d) / Math.sin(d);
        var B = Math.sin(f * d) / Math.sin(d);

        var x = A * Math.cos(lat1) * Math.cos(lon1) +
            B * Math.cos(lat2) * Math.cos(lon2);

        var y = A * Math.cos(lat1) * Math.sin(lon1) +
            B * Math.cos(lat2) * Math.sin(lon2);

        var z = A * Math.sin(lat1) + B * Math.sin(lat2);

        var lat = Math.atan2(z, Math.sqrt(x * x + y * y));
        var lon = Math.atan2(y, x);

        return DG.latLng(this._radToDeg(lat), this._radToDeg(lon));
    },

    // Adaptive sampling algorithm based on
    // http://ariel.chronotext.org/dd/defigueiredo93adaptive.pdf
    _adaptiveSample: function(left, right, depth, middle) { // (LatLng, LatLng, Number[, LatLng]) -> LatLng[]
        if (depth > 9) {
            // Max recursion depth reached
            return [];
        }

        middle = middle || this._calcMidPoint(left, right);

        var leftMiddle = this._calcMidPoint(left, middle);
        var rightMiddle = this._calcMidPoint(middle, right);

        var angle1 = this._calcAngle(leftMiddle, middle, left);
        var angle2 = this._calcAngle(middle, left, right);
        var angle3 = this._calcAngle(rightMiddle, middle, right);

        // left --- leftMiddle --- middle --- rightMiddle --- right
        //            angle1       angle2       angle3

        var minAngle = 3.1;
        if (angle1 > minAngle && angle2 > minAngle && angle3 > minAngle) {
            // This section is straight enough, no intermediate points needed.
            return [];
        } else {
            // Angles are too small. Recursively sample halves of this section.
            var result = [];
            result = result.concat(this._adaptiveSample(left, middle, depth + 1, leftMiddle));
            result.push(middle);
            result = result.concat(this._adaptiveSample(middle, right, depth + 1, rightMiddle));

            return result;
        }
    },

    // Calculates the great circle arc between two LatLngs.
    _calcGreatCircle: function(latlng1, latlng2) { // (LatLng, LatLng) -> LatLng[]
        latlng2 = this._normalizeLatLng(latlng2, latlng1);

        // Special case: points are close to each other (within 1 degree)
        if (latlng1.equals(latlng2, 1)) {
            return [latlng1, latlng2];
        }

        // Special case: the great circle crosses a pole
        if (Math.abs(latlng2.lng - latlng1.lng) == 180) {
            // North or south pole?
            var latitude = (latlng1.lat + latlng2.lat > 0) ? 90 : -90;

            return [
                latlng1,
                DG.latLng(latitude, latlng1.lng),
                DG.latLng(latitude, latlng2.lng),
                latlng2
            ];
        }

        var result = [];

        result.push(latlng1);
        result = result.concat(this._adaptiveSample(latlng1, latlng2, 0));
        result.push(latlng2);

        // Make sure the arc doesn't jump between worlds
        for (var i = 1; i < result.length; i++) {
            result[i] = this._normalizeLatLng(result[i], result[i - 1]);
        }

        return result;
    },

    _addLegs: function(point) {
        var pathStyles = this.options.pathStyles;

        var greatCirclePoints = this._calcGreatCircle(
            point.getLatLng(),
            this._points[point._pos + 1].getLatLng()
        );

        point._legs = {};
        Object.keys(pathStyles).forEach(function(layer) {
            point._legs[layer] = DG.polyline(greatCirclePoints, pathStyles[layer]).addTo(this._layers[layer]);
        }, this);

        point._legs.mouse._point = point.once('remove', this._clearRemovingPointLegs, this);

        if (this.options.editable && !DG.Browser.mobile) {
            point._legs.mouse.on('mousedown', this._insertPointInLine, this);
        }

        if (this._map) {
            this._layers.mouse.addLayer(point._legs.mouse);
        }
    },

    _clearRemovingPointLegs: function(event) { // (Event)
        this._removeLegs(event.target);
    },

    _removeLegs: function(point) { // (Ruler.LayeredMarker)
        if (point._legs) {
            Object.keys(point._legs).forEach(function(layer) {
                this._layers[layer].removeLayer(point._legs[layer]);
            }, this);
            point._legs = null;
        }
    },

    _updateLegs: function(point, skipPrevious) { // (Ruler.LayeredMarker, Boolean)
        var latlng = point.getLatLng(),
            previousPoint = this._points[point._pos - 1],
            nextPoint = this._points[point._pos + 1],
            self = this,
            newPoints;

        if (previousPoint && !skipPrevious) {
            newPoints = self._calcGreatCircle(previousPoint.getLatLng(), latlng);

            Object.keys(previousPoint._legs).forEach(function(layer) {
                previousPoint._legs[layer].setLatLngs(newPoints);
            });
        }

        if (nextPoint) {
            newPoints = self._calcGreatCircle(latlng, nextPoint.getLatLng());

            Object.keys(point._legs).forEach(function(layer) {
                point._legs[layer].setLatLngs(newPoints);
            });
        }
    },

    _calcDistance: function(finishPoint, tail) { // (Ruler.LayeredMarker, Number) -> Number
        var distance = tail ? tail : 0,
            calcTo = finishPoint ? finishPoint._pos : this._points.length - 1;

        for (var i = 0; i < calcTo; i++) {
            distance += this._points[i].getLatLng().distanceTo(this._points[i + 1].getLatLng());
        }

        return distance;
    },

    _getFormatedDistance: function() { // () -> String
        var distance = this._calcDistance.apply(this, arguments),
            units = 'm';

        if (distance > 1000) {
            distance /= 1000;
            units = 'km';
            if (distance > 1000) {
                distance = distance.toFixed();
                distance = distance.slice(0, -3) + ' ' + distance.slice(-3);
            } else {
                distance = distance.toFixed(2).split('.').join(this.t('delimiter'));
            }
        } else {
            distance = Math.round(distance);
        }

        return [distance || 0, ' ', this.t(units)].join('');
    },

    _updateDistance: function() { // ()
        if (this._map && this._points.length) {
            this._points[this._points.length - 1].setText(this._getFormatedDistance());
        }
    }
});

DG.ruler = function(latlngs, options) { // (Array, Object)
    return new DG.Ruler(latlngs, options);
};
