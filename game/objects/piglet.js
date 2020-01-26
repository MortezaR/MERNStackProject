
const movableObject = require( './movableObject.js')
const utils = require('../util.js')
const getDir = utils.getDir;
const calcHitBox = utils.calcHitBox;
const Food = require('./food.js')

class Piglet extends movableObject{
    constructor(game, x, y, id) {
        super(game, x, y, id);
        this.speed = 2;
        this.hitBoxSize = [50, 25];
        this.hitBox = [30, 30];
        this.actionCooldown = 1;
        this.resource = 0;
    }

    performAction(type, dX, dY) {
        if( this.dead){
            return 'you are dead mate';
        }
        switch (type) {
            case 'attack':
                let dir = getDir(this.x, this.y, dX, dY)
                this.setMoveDir(dir[0], dir[1]);
                if (this.moveDir / 100 < 1) {
                    this.moveDir *= 10;
                }
                const hB = calcHitBox(dir, this.hitBoxSize,
                    this.x, this.y);
                let hitObjects = this.game.map.getObjects(hB);
                Object.keys(hitObjects).forEach(objId => {
                    if (hitObjects[objId] instanceof Food
                        && hitObjects[objId].resource > 0) {
                        hitObjects[objId].mine(1);
                        this.resource += 1;
                    }
                })
                break;
            case 'move':
                this.move(dX, dY);
                break;
            default:
                break;
        }
    }
    kill(){
        console.log('piglet down')
        this.dead = true;
    }
}

module.exports = Piglet;