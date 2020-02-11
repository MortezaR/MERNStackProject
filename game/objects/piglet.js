
const movableObject = require('./movableObject.js')
const utils = require('../util.js')
const getDir = utils.getDir;
const calcHitBox = utils.calcHitBox;
const Food = require('./food.js')
const Deposit = require('./deposit')

class Piglet extends movableObject{
    constructor(game, id, x, y) {
        super(game, id, x, y);
        this.speed = 3;
        this.hitBoxSize = [100, 50];
        this.hitBox = [70, 70];
        this.actionCooldown = 1;
        this.resource = 0;
    }

    performAction(type, dX, dY) {
        if(this.dead){
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
                        && hitObjects[objId].resource > 0
                        && this.resource <= 10) {
                        hitObjects[objId].mine(1);
                        this.resource += 1;
                    }
                    if (hitObjects[objId] instanceof Deposit) {
                        hitObjects[objId].damage(this.resource);
                        this.resource = 0;
                    }
                })
                break;
            case 'trap':
                if(this.resource >= 5) {
                    this.resource -= 5;
                    this.game.map.addObject('trap',
                    this.x, this.y);
                }
                break;
            case 'move':
                this.move(dX, dY);
                break;
            default:
                break;
        }
    }
    hack(obj){
        if(obj.hackInterval === null){
            obj.hack(this);
        }
    }
    kill(){
        this.dead = true;
        this.phasable = true;
        this.moveDir = 0;
        let gameOver = true;
        console.log(this.game.map.playerObjects)
        Object.values(this.game.map.playerObjects).forEach(player =>{
            console.log(player.object)
            if(player instanceof Piglet && !player.dead){
                gameOver=false;
            }
        })
        if (gameOver){
            setTimeout(() => this.game.win('allPigletsDead'), 1000);
        }
    }
}

module.exports = Piglet;