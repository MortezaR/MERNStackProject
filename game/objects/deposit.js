
const GObject = require('./object.js')

class Deposit extends GObject {

    constructor(game, id, x, y) {
        super(game, id, x, y);
        this.hitBox = [200, 200];
        this.phasable = true;
        this.hp = 20;
    }
    damage(num) {
        this.hp -= num;
        if(this.hp <= 0){
            this.game.win('deposit');
        }
        console.log('deposit hp -> ',this.hp);
        return this.hp <= 0 ? true : false;
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

module.exports = Deposit;