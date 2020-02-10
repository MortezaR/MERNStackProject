const GObject = require('./object.js')
const utils = require('../util.js')
const hitBoxTouch = utils.hitBoxTouch;

class HTerminal extends GObject {

    constructor(game, id, x, y) {
        super(game, id, x, y);
        this.hitBox = [200, 200];
        this.phasable = true;
        this.hp = 1;
        this.triggered = false;
        this.hackInterval = null;
    }
    hack(piglet){
        this.hackInterval = setInterval(() => this.handleHack(piglet), 100)
    }
    handleHack(piglet){
        this.hp -= 1;
        if(this.hp <= 0 && !this.triggered){
            // this.game.map.hTerminals
            this.game.map.hTerminals -= 1;
            this.game.terminalsLeft -= 1;
            if( this.game.map.hTerminals <= 0){
                this.game.win('hTerminal')
            }
            this.triggered = true;
        }
        if(!hitBoxTouch(piglet.getHitBox(), this.getHitBox())){
            clearInterval(this.hackInterval);
            this.hackInterval = null;
        }
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