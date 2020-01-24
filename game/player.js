const BigBadWolf = require( './objects/bigbadwolf.js')
const Piglet = require( './objects/piglet.js')
class Player {
    constructor(id, playerType, map, x, y) {
        this.id = id;
        this.object;
        switch (playerType) {
            case 'bbw':
                this.object = new BigBadWolf(map, x, y, id);
                map.addPlayerObject(this.object);
                break;
            case 'piglet':
                this.object = new Piglet(map, x, y, id);
                map.addPlayerObject(this.object);
                break;
            default:
                break;
        }
    }
    getId(){
        return this.id;
    }
    getObject(){
        return this.object;
    }
    toObj(){
        return {id: this.id, x: this.getObject().x,
             y: this.getObject().y, width: this.object.hitBox[0], height: this.object.hitBox[1] }
    }
}

module.exports = Player;