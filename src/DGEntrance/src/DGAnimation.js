/*
 * DG.Animation provides tick (step) logic returning progression values
 * calculated over provided or custom Bézier curves
 * Original input can be array object btw...
 */

DG.Animation = DG.Evented.extend({
    options: {
        // animation: {    //  Or array of objects
        //     function: DG.Animation.EASE,
        //     duration: 2000,
        //     frames: null
        // }

        //offset: 0
        //repeat: 0
    },

    initialize: function(options) {
        DG.setOptions(this, options);

        this._animID = -1;
        this._startTime = 0;
        this._running = false;
        this._animation = null;
        this._durations = null;
    },

    start: function() {
        this.stop();
        this._prepare();

        this._running = true;

        this.fire('start');

        //  Date.now(), but... IE9+
        this._startTime = new Date().getTime();

        this._animate();
    },

    stop: function() {
        if (this._running) {
            this._run(this._durations.getLength());
        }
    },

    _prepare: function() {
        this._animation = DG.Util.isArray(this.options.animation) ? this.options.animation : [this.options.animation];

        this._durations = new DG.Metric.Segments();
        this._animation.forEach(function(animation) {
            this.push(animation.duration);
        }, this._durations);
    },

    _animate: function() {
        this._animID = DG.Util.requestAnimFrame(this._animate, this);
        this._run();
    },

    _run: function(elapsed) {
        var el, index, progress;
        //  Possible skip zero delta time but who cares?!
        elapsed = elapsed ? elapsed : new Date().getTime() - this._startTime;

        if (elapsed < this._durations.getLength()) {
            index = this._durations.getIndex(elapsed);
            el = this._durations.getSegRatio(elapsed);
            progress = this._animation[index]['function'].getYbyX(el);
            this._step(this._getFrameValues(index, progress));
        } else {
            index = this._durations.length - 1;
            this._step(this._getFrameValues(index, 1));
            this._complete();
        }
    },

    _step: function(obj) {
        this.fire('step', obj);
    },

    _complete: function() {
        DG.Util.cancelAnimFrame(this._animID);

        this._durations = null;
        this._animation = null;
        this._running = false;
        this.fire('end');
    },

    _getFrameValues: function(index, progress) {
        var frames = this._animation[index].frames;
        var obj = {progress: progress};
        var fr, to;

        if (frames) {
            for (var key in frames) {
                if (frames[key].progress) {
                    obj[key] = frames[key].progress(progress);
                } else {
                    fr = frames[key].from;
                    to = frames[key].to;
                    obj[key] = fr + (to - fr) * progress;
                }
            }
        }
        return obj;
    }
});

DG.animation = function(options) {
    return new DG.Animation(options);
};

DG.Animation.LINEAR         = new DG.TimeBezier(DG.point(0.00, 0.0), DG.point(1.00, 1.0));
DG.Animation.EASE           = new DG.TimeBezier(DG.point(0.25, 0.1), DG.point(0.25, 1.0));
DG.Animation.EASE_IN        = new DG.TimeBezier(DG.point(0.42, 0.0), DG.point(1.00, 1.0));
DG.Animation.EASE_IN_OUT    = new DG.TimeBezier(DG.point(0.42, 0.0), DG.point(0.58, 1.0));
DG.Animation.EASE_OUT       = new DG.TimeBezier(DG.point(0.00, 0.0), DG.point(0.58, 1.0));
