
const GObject = require( './object.js')

class Food extends GObject{

    constructor(game, x, y, id){
        super(game, x, y, id);
        this.resource = 10;
        this.hitBox = [200,200];
    }
    mine(num){
        this.resource -= num;
        if(this.resource <= 0){
            this.phasable = true;
        }
    }
}

module.exports = Food;