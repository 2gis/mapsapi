DG.Path.ANIMATION_AVAILABLE =
    DG.Browser.svg &&
    !DG.Browser.mobileWebkit &&
    navigator.userAgent.toLowerCase().indexOf('presto') === -1 &&
    Object.prototype.toString.call(
        DG.SVG.create('animate').beginElement) === '[object Function]';


DG.Path.include(!DG.Path.ANIMATION_AVAILABLE ? {} : {

    runAnimation: function () {
        var animationEl = this._animationEl = this._addAnimation();

        if (animationEl) {
            animationEl.beginElement();
            this._removeAnimation(animationEl);
        }

        return this;
    },

    stopAnimation: function (name) { // (String) -> DG.Path
        if (this.animations[name]) {
            this.animations[name].endElement();
        }
        return this;
    },

    _addAnimation: function () { // () -> SVGAnimateElement|null
        var animOptions = this.options.animation,
            points = this._rings[0],
            animationEl = null;

        if (animOptions && points.length > 0) {
            animationEl = DG.SVG.create('animate');

            // calculate values if attributeName: 'd' was used to animate
            if (animOptions.getValues) {
                animOptions.values = animOptions.getValues(points);
            }

            Object.keys(animOptions)
                .filter(function (name) {
                    return {}.toString.call(animOptions[name]) !== '[object Function]';
                })
                .forEach(function (name) {
                    animationEl.setAttribute(name, animOptions[name]);
                });

            this._path.appendChild(animationEl);
        }

        return animationEl;
    },

    _removeAnimation: function (animationEl) {
        this._map.once('zoomstart', function () {
            if (animationEl) {
                try {
                    this._path.removeChild(animationEl);
                } catch(e) {}
            }
            this._animationEl = null;
        }, this);
    }
});
