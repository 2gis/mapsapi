/*
 * DG.ArrowTipTransform class is a core of arrow's tip calculations
 *
 * .subShape() routine 'bound' arrow's tip to the ending points of .subPath()
 * calculated separately in DG.ArrowPathTransform
 *
 *  Final translation (see DG.Entrance.Arrow) moves arrow objects to their original positions
 */

DG.ArrowTipTransform = DG.VertexTransform.extend({
    initialize: function(path, shape) {
        this.drawings = shape.drawings; //  static mapping
        this._vertices = shape.vertices;

        this._setShape(path, shape);
    },

    _setShape: function(path, shape) {
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

    subShape: function(transform) {
        this.load().unRotate(transform.angle).translate(transform.displ);
        return this;
    }
});
