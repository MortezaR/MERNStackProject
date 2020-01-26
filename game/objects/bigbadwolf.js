const movableObject = require( './movableObject.js')
const utils = require('../util.js')
const getDir = utils.getDir;
const calcHitBox = utils.calcHitBox;
const Piglet = require('./piglet')
// const hitBoxTouch = utils.hitBoxTouch;

class BigBadWolf extends movableObject {

    constructor(game, x, y, id) {
        super(game, x, y, id);
        this.speed = 2;
        this.hitBoxSize = [50,25];
        this.hitBox = [35, 35];
        this.actionCooldown = 1;
        this.increaseSpeed = this.increaseSpeed.bind(this);
        this.speedInterval = setInterval(this.increaseSpeed, 10000);
    }
    performAction(type, dX, dY) {
        switch (type) {
            case 'attack':
                const hB = calcHitBox(getDir(this.x, this.y, dX, dY), this.hitBoxSize,
                this.x, this.y);
                let hitObjects = this.game.map.getObjects(hB);
                Object.keys(hitObjects).forEach(objId => {
                    if (hitObjects[objId] instanceof Piglet){
                        this.game.map.playerObjects[objId].kill();
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
    increaseSpeed(){
        this.speed += 1;
        console.log(this.speed);
        if(this.speed > 100){
            clearInterval(this.speedInterval);
        }
    }
}

module.exports = BigBadWolf;