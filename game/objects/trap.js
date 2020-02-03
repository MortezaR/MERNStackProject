
const GObject = require('./object.js')

class Trap extends GObject {

    constructor(game, id, x, y) {
        super(game, id, x, y);
        this.hitBox = [100, 100];
        this.phasable = true;
        this.sprung = false;
    }
    trigger(){
        this.sprung = true;
    }
    toObj(){
        return {
            id: this.id,
            x: this.x, y: this.y,
            width: this.hitBox[0],
            height: this.hitBox[1],
            params: { resource: this.resource }
        }
    }
}

module.exports = Trap;