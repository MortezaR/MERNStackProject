
const GObject = require( './object.js')

class Food extends GObject{

    constructor(game, x, y, id){
        super(game, x, y, id);
        this.resource = 10;
        this.hitBox = [200,200];
        this.phasable = true;
    }
    mine(num){
        this.resource -= num;
        if(this.resource <= 0){
        }
    }
}

module.exports = Food;