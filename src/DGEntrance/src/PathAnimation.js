L.Path.ANIMATION_AVAILABLE =
    L.Browser.svg &&
    navigator.userAgent.toLowerCase().indexOf('presto') === -1 &&
    Object.prototype.toString.call(
        document.createElementNS(L.Path.SVG_NS, 'animate').beginElement) === '[object Function]';

if (L.Path.ANIMATION_AVAILABLE) {

    //Fix animation for safari, it needs svg element in DOM on page load
    L.Map.addInitHook(function () {
        this._initPathRoot();
    });
    L.Path.include({

        runAnimation: function () {
            var res, delay, 
                self = this,
                animationEl = this._addAnimation();

            if (animationEl) {
                animationEl.beginElement();
                delay = (animationEl.getAttribute('dur')).replace('s', '') * 1000;
                window.setTimeout(function() {
                    self._path.removeChild(animationEl);
                }, delay);
            }

            return this;
        },

        stopAnimation: function (name) { // (String) -> L.Path
            if (this.animations[name]) {
                this.animations[name].endElement();
            }
            return this;
        },

        _addAnimation: function () { // () -> SVGAnimateElement|null
            var animOptions = this.options.animation,
                points = this._originalPoints,
                animationEl = null;

            if (animOptions && points.length > 0) {
                animationEl = this._createElement('animate');

                //calculate values if attributeName: 'd' was used to animate
                if (animOptions.getValues) {
                    animOptions.values = animOptions.getValues(points);
                }

                for (var key in animOptions) {
                    if (animOptions.hasOwnProperty(key) && {}.toString.call(animOptions[key]) !== '[object Function]') {
                        animationEl.setAttribute(key, animOptions[key]);
                    }
                }

                this._path.appendChild(animationEl);
            }

            return animationEl;
        }
    });
}
