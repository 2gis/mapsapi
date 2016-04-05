/*
 * DG.ArrowXXXTransform classes is a core of arrow's body and tip calculations
 *
 * General ideas are:
 *      We construct arrow body with stroke points making arcs on outer path turns
 *      Processing is done segment by segment around {0, 0} virtual point
 *          and resulting 'path' finally rotated to it's original angle
 *      Subset of this vertices lately used in .subPath() calculations
 *      Ending points of .subPath() calculated separately and used to bound
 *          ArrowTip to the path, see .subShape()
 *
 *  Final translation (see DG.Entrance.Arrow) moves arrow objects to their original positions
 */

DG.ArrowTipTransform = function (path, shape) {
    this.drawings = shape.drawings; //  static mapping
    this._vertices = shape.vertices;

    this._setShape(path, shape);
};

DG.ArrowTipTransform.prototype = DG.Util.create(DG.VertexTransform.prototype);
DG.extend(DG.ArrowTipTransform.prototype, {
    _setShape: function (path, shape) {
        var sp = shape.vertices[0];
        var width = Math.abs(sp.y);
        var pl = path.vertices[1].x;    //  negative value
        var length = sp.x;              //  negative value
        var offset = pl - length + width + width;

        path.width = width;
        path.offset = length + (offset > 0 ? offset : 0);
        if (path.vertices.length < 3 && length > -10) {
            path.offset += 2.5;
        }

        this._vertices = this.load().unTranslate(sp).vertices;
    },

    subShape: function (transform) {
        this.load().unRotate(transform.angle).translate(transform.displ);
        return this;
    }
});
