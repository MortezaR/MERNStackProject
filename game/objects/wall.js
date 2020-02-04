
const GObject = require('./object.js')

class Wall extends GObject {

    constructor(game, id, x, y) {
        super(game, id, x, y);
        this.hitBox = [100, 100];
    }
}

module.exports = Wall;