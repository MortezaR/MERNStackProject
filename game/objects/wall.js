
const GObject = require('./object.js')

class Wall extends GObject {

    constructor(game, x, y, id) {
        super(game, x, y, id);
        this.hitBox = [100, 100];
    }
}

module.exports = Wall;