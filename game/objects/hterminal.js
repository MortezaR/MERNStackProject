


// const Piglet = require('./piglet.js')
const GObject = require('./object.js')
// const BigBadWolf = require('./bigbadwolf.js')

class HTerminal extends GObject {

    constructor(game, x, y, id) {
        super(game, x, y, id);
        this.hitBox = [200, 200];
        this.phasable = true;
        this.hp = 10000;
    }
    hack(obj){
        // if(obj instanceof Piglet){
            this.hp -= 1;
        // }
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