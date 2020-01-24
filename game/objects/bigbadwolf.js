const movableObject = require( './movableObject.js')
const utils = require('../util.js')
const getDir = utils.getDir;
const calcHitBox = utils.calcHitBox;
// const hitBoxTouch = utils.hitBoxTouch;

class BigBadWolf extends movableObject {

    constructor(map, x, y, id) {
        super(map, x, y, id);
        this.speed = 2;
        this.hitBoxSize = [50,25];
        this.hitBox = [112, 112];
        this.actionCooldown = 1;
    }
    performAction(type, dX, dY) {
        switch (type) {
            case 'attack':
                const hB = calcHitBox(getDir(this.x, this.y, dX, dY), this.hitBoxSize,
                this.x, this.y);
                let hitObjects = this.map.getObjects(hB);
                delete hitObjects[this.id];
                break;
            case 'move':
                this.move(dX, dY);
                break;
            default:
                break;
        }
    }
}

module.exports = BigBadWolf;