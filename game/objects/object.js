

class GObject {
    constructor(map,x,y,id){
        this.map = map;
        this.x = x;
        this.y = y;
        this.id = id;
        this.phasable = false;
        this.hitBox = [5,5]
    }
    getHitBox(){
        let x = this.hitBox[0];
        let y = this.hitBox[1];
        return [[(-x + this.x), (-y + this.y)], [(x + this.x), (-y + this.y)],
            [(x + this.x), (y + this.y)], [(-x + this.x), (y + this.y)]]
    }
}
module.exports = GObject;