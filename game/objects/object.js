

class GObject {
    constructor(game,x,y,id){
        this.game = game;
        this.x = x;
        this.y = y;
        this.id = id;
        this.phasable = false;
        this.hitBox = [5,5]
    }
    getHitBox(){
        let x = this.hitBox[0];
        let y = this.hitBox[1];
        return [[(-x/2 + this.x), (-y/2 + this.y)], [(x/2 + this.x), (-y/2 + this.y)],
            [(x/2 + this.x), (y/2 + this.y)], [(-x/2 + this.x), (y/2 + this.y)]]
    }
    toObj() {
        return {
            id: this.id,
            x: this.x, y: this.y,
            width: this.hitBox[0],
            height: this.hitBox[1],
            params: {}
        }
    }
}
module.exports = GObject;