
const GObject = require( './object.js')
const utils = require('../util.js')
const getDir = utils.getDir;
const hitBoxTouch = utils.hitBoxTouch;
//S - 21 , SW - 22, W - 12, NW - 32, N - 31, NE - 33, E - 13, SE - 23
//

class moveableObject extends GObject{

    constructor(map, x, y, id){
        super(map, x, y, id);
        this.speed = 1;
        this.hitBoxSize = [4,2];
        this.actionCooldown = 1;
        this.moving = null;
        this.getOut = false;
        this.moveDir = 21;
    }
    move(dX, dY){
        if (dX === this.x && this.y === dY){
            return null;
        }
        let [unitX, unitY] = getDir(this.x,this.y,dX,dY);
        unitX = unitX * this.speed;
        unitY = unitY * this.speed;
        this.setMoveDir(unitX,unitY);
        this.getOut = false;
        const moveHelper = () => {
            this.x += unitX;
            this.y += unitY;
            this.getOut = false;
            let allObj = this.map.getAllObjects();
            Object.keys(allObj).forEach((key) =>{
                let obj = allObj[key]
                if (obj.id !== this.id && obj.phasable === false){
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
    setMoveDir(x,y){
        let NS = 10;
        let EW = 1;
        if (x > 1/2) {
            EW = 3;
        }else if( x < -1/2){
            EW = 2;
        }
        if (y > 1/2) {
            NS = 30;
        }else if( y < -1/2){
            NS = 20;
        }
        this.moveDir = NS + EW;
    }

}

module.exports = moveableObject;