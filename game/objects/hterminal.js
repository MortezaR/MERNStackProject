


// const Piglet = require('./piglet.js')
const GObject = require('./object.js')
// const BigBadWolf = require('./bigbadwolf.js')

class HTerminal extends GObject {

    constructor(game, id, x, y) {
        super(game, id, x, y);
        this.hitBox = [200, 200];
        this.phasable = true;
        this.hp = 10000;
    }
    hack(){
        this.hp -= 1;
    }
    toObj() {
        return {
            id: this.id,
            x: this.x, y: this.y,
            width: this.hitBox[0],
            height: this.hitBox[1],
            params: { hp: this.hp }
        }
    }
}

module.exports = HTerminal;