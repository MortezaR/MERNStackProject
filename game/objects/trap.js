
const GObject = require('./object.js')

class Trap extends GObject {

    constructor(game, x, y, id) {
        super(game, x, y, id);
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