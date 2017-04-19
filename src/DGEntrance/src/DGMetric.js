/*
 * Utility functions
 */

DG.Metric = function() {};

/*
 * DG.Metric.Segments class can calculate total pushed segments length and used to shortcut
 * 'get Something by provided Length' calculations (segment's Index, segment's Length, etc...)
 */
DG.Metric.Segments = function() {
    this.length = 0;
};

DG.Metric.Segments.prototype = {
    push: function(len) {
        this[this.length] = this.length > 0 ? this[this.length - 1] + len : len;
        this.length += 1;

        return this;
    },

    getLength: function() {
        return this[this.length - 1];
    },

    getReverse: function() {
        var segments = new DG.Metric.Segments();
        var i = this.length - 1;

        if (i < 0) { return segments; }

        while (i--) {
            segments.push(this[i + 1] - this[i]);
        }

        return segments.push(this[0]);
    },

    getIndex: function(len) {
        var i = this.length - 1;

        if (i < 0) { return i; }

        while (i--) {
            if (this[i] <= len) { break; }
        }

        return i + 1;
    },

    getSegRatio: function(len) {
        var i = this.getIndex(len);
        var sub = i > 0 ? this[i - 1] : 0;

        return (len - sub) / (this[i] - sub);
    },

    getSegLength: function(len) {
        var i = this.getIndex(len);
        var sub = i > 0 ? this[i - 1] : 0;

        return len - sub;
    }
};
