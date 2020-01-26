const movableObject = require( './movableObject.js')
const utils = require('../util.js')
const getDir = utils.getDir;
const calcHitBox = utils.calcHitBox;
const Piglet = require('./piglet')
// const hitBoxTouch = utils.hitBoxTouch;

class BigBadWolf extends movableObject {

    constructor(game, x, y, id) {
        super(game, x, y, id);
        this.speed = 5;
        this.hitBoxSize = [50,25];
<<<<<<< HEAD
        this.hitBox = [35, 35];
=======
        this.hitBox = [30, 30];
>>>>>>> 14a8ddef8baeb461893a0018101d846fb56b75ae
        this.actionCooldown = 1;
        this.increaseSpeed = this.increaseSpeed.bind(this);
        setInterval(this.increaseSpeed, 10000);
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
        console.log(this.speed);
        this.speed += 1;
    }
}

module.exports = BigBadWolf;