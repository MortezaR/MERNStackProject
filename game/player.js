const BigBadWolf = require('./objects/bigbadwolf.js')
const Piglet = require('./objects/piglet.js')
class Player {
    constructor(id, playerType, game, x, y) {
        this.id = id;
        this.object;
        switch (playerType) {
            case 'bbw':
                this.object = new BigBadWolf(game, x, y, id);
                game.map.addPlayerObject(this.object);
                break;
            case 'piglet':
                this.object = new Piglet(game, x, y, id);
                game.map.addPlayerObject(this.object);
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
        let res = 0;
        if(this.object instanceof Piglet){
            res = this.object.resource;
        }
        return {id: this.id, x: this.getObject().x,
             y: this.getObject().y, width: this.object.hitBox[0],
            height: this.object.hitBox[1] , moveDir: this.object.moveDir,
            resource: res}
    }
}

module.exports = Player;