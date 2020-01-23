

class Object {
    constructor(map,x,y,id){
        this.map = map;
        this.x = x;
        this.y = y;
        this.id = id;
        this.phasable = false;
        this.hitBox = 5
    }
    getHitBox(){
        let s = this.hitBox;
        return [[(-s + this.x), (-s + this.y)], [(s + this.x), (-s + this.y)],
            [(s + this.x), (s + this.y)], [(-s + this.x), (s + this.y)]]
    }
}
module.exports = Object;