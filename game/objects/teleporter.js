
const GObject = require('./object.js')

class Teleporter extends GObject {

    constructor(game, id, x, y, newX, newY) {
        super(game, id, x, y);
        this.hitBox = [100, 100];
        this.newX = newX;
        this.newY = newY;
        this.phasable = true;
    }
}

module.exports = Teleporter;