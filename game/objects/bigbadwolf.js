const movableObject = require( './movableObject.js')
const utils = require('../util.js')
const getDir = utils.getDir;
const calcHitBox = utils.calcHitBox;
const Piglet = require('./piglet')
// const hitBoxTouch = utils.hitBoxTouch;

class BigBadWolf extends movableObject {

    constructor(game, id, x, y) {
        super(game, id, x, y);
        this.speed = 4;
        this.hitBoxSize = [100,50];
        this.hitBox = [70, 70];
        this.actionCooldown = 1;
        this.increaseSpeed = this.increaseSpeed.bind(this);
        this.speedInterval = setInterval(this.increaseSpeed, 10000);

        //uncomment for actual game
        this.kill(15000);
    }
    performAction(type, dX, dY) {
        if (this.dead) {

            return 'you are dead mate';
        }
        switch (type) {
            case 'attack':
                let dir = getDir(this.x, this.y, dX, dY)
                this.setMoveDir(dir[0], dir[1]);
                if (this.moveDir / 100 < 1) {
                    this.moveDir *= 10;
                }
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
    teleport(obj){
        this.x = obj.newX;
        this.y = obj.newY;
        if (this.moving) {
            clearInterval(this.moving);
            if (this.moveDir / 100 < 1) {
                this.moveDir *= 10;
            }
        }
    }
    stun(obj){
        this.moveDir = 0;
        obj.trigger(this);
    }
    increaseSpeed(){
        this.speed += 0.5;
        if(this.speed > 50){
            clearInterval(this.speedInterval);
        }
    }
    kill(time = 5000){
        setTimeout(() => this.dead = false, time);
        this.dead = true;
    }
}

module.exports = BigBadWolf;