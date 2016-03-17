DG.Animation = DG.Evented.extend({
    options: {
        animation: {    //  Or array of objects
            function: DG.Animation.EASE,
            duration: 2 * 1000
        }

        //offset: 0
        //repeat: 0
    },

    initialize: function (options) {
        DG.setOptions(this, options);

        this._animID = -1;
        this._startTime = 0;
        this._running = false;
        this._animation = null;
        this._durations = null;
    },

    start: function () {
        this.stop();

        this._running = true;
        this._prepare();

        this.fire('start');

        //  Date.now(), but... IE9+
        this._startTime = new Date().valueOf();

        this._animate();
    },

    stop: function () {
        if (this._running) {
            this._step(true);
            this._complete();
        }
    },

    _prepare: function () {
        this._durations = new DG.Metric.Segments();

        if (DG.Util.isArray(this.options.animation)) {
            this._animation = this.options.animation;
            this._animation.forEach(function (animation) {
                this.push(animation.duration);
            }, this._durations);
        } else {
            this._animation = [this.options.animation];
            this._durations.push(this._animation.duration);
        }
    },

    _animate: function () {
        this._animID = DG.Util.requestAnimFrame(this._animate, this);
        this._step();
    },

    _step: function (last) {
        var elapsed = new Date().valueOf() - this._startTime,
            duration = this._duration * 1000;

        if (elapsed < duration) {
            this._runFrame(this._easeOut(elapsed / duration), round);
        } else {
            this._runFrame(1);
            this._complete();
        }
    },

    _runFrame: function (progress, round) {

        this.fire('step');
    },

    _complete: function () {
        DG.Util.cancelAnimFrame(this._animID);

        this._durations = null;
        this._animation = null;
        this._running = false;
        this.fire('end');
    }
});

DG.Animation.LINEAR = new DG.TimeBezier(DG.point(0.0, 0.0), DG.point(1.0, 1.0));
DG.Animation.EASE = new DG.TimeBezier(DG.point(0.25, 0.1), DG.point(0.25, 1.0));
DG.Animation.EASE_IN = new DG.TimeBezier(DG.point(0.42, 0.0), DG.point(1.0, 1.0));
DG.Animation.EASE_IN_OUT = new DG.TimeBezier(DG.point(0.42, 0.0), DG.point(0.58, 1.0));
DG.Animation.EASE_OUT = new DG.TimeBezier(DG.point(0.0, 0.0), DG.point(0.58, 1.0));
