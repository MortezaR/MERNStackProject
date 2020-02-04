
const GObject = require( './object.js')

class Food extends GObject{

    constructor(game, id, x, y){
        super(game, id, x, y);
        this.resource = 5;
        this.hitBox = [135,135];
        this.phasable = true;
        this.resetResource = null;
        this.resetRes = this.resetRes.bind(this);
    }
    mine(num){
        this.resource -= num;
        if(this.resource <= 0){
            this.resetResource = setInterval(this.resetRes, 10000)
        }
    }
    resetRes(){
        this.resource = 5;
        clearInterval(this.resetResource);
    }
    toObj() {
        return {
            id: this.id,
            x: this.x, y: this.y,
            width: this.hitBox[0],
            height: this.hitBox[1],
            params: {resource: this.resource}
        }
    }
}

module.exports = Food;