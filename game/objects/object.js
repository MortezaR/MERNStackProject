

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
}
module.exports = GObject;