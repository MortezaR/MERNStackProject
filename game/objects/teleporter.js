
const GObject = require('./object.js')

class Teleporter extends GObject {

    constructor(game, x, y, id, newX, newY) {
        super(game, x, y, id);
        this.hitBox = [100, 100];
        this.newX = newX;
        this.newY = newY;
        this.phasable = true;
    }
}

module.exports = Teleporter;