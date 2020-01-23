
const Object = require( './object.js')
const utils = require('../util.js')
const getDir = utils.getDir;
const hitBoxTouch = utils.hitBoxTouch;

class moveableObject extends Object{

    constructor(map, x, y, id){
        super(map, x, y, id);
        this.speed = 1;
        this.hitBoxSize = [4,2];
        this.actionCooldown = 1;
        this.moving = null;
        this.getOut = false;
    }
    move(dX, dY){
        if (dX === this.x && this.y === dY){
            return null;
        }
        let [unitX, unitY] = getDir(this.x,this.y,dX,dY);
        unitX = unitX * this.speed;
        unitY = unitY * this.speed;
        this.getOut = false;
        const moveHelper = () => {
            this.x += unitX;
            this.y += unitY;
            this.getOut = false;
            this.map.getAllObjects().forEach((obj) =>{
                if (obj.id !== this.id){
                    if(hitBoxTouch(obj.getHitBox(), this.getHitBox())){
                        this.getOut = true;
                    }
                }
            })
            if (this.getOut === true) {
                clearInterval(this.moving);
                this.x -= unitX;
                this.y -= unitY;
                return true;
            }
            
            if (((this.x >= dX && unitX >= 0) || (this.x <= dX && unitX <= 0)) && 
                ((this.y >= dY && unitY >= 0) || (this.y <= dY && unitY <= 0))){
                this.x = dX;
                this.y = dY;
                clearInterval(this.moving);
            }
        }
        if(this.moving){
            clearInterval(this.moving);
        }
        this.moving = setInterval(moveHelper, 1000 / 60);
    }
    // performAction(direction,type){

    // }

}

module.exports = moveableObject;
