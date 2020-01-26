
const GObject = require( './object.js')
const utils = require('../util.js')
const getDir = utils.getDir;
const hitBoxTouch = utils.hitBoxTouch;
//S - 21 , SW - 22, W - 12, NW - 32, N - 31, NE - 33, E - 13, SE - 23
//

class moveableObject extends GObject{

    constructor(game, x, y, id){
        super(game, x, y, id);
        this.speed = 1;
        this.hitBoxSize = [4,2];
        this.actionCooldown = 1;
        this.moving = null;
        this.moveDir = 310;
        this.dead = false;
        this.cI = this.cI.bind(this);
    }
    move(dX, dY){
        if (dX === this.x && this.y === dY){
            return null;
        }
        let [unitX, unitY] = getDir(this.x,this.y,dX,dY);
        unitX = unitX * this.speed;
        unitY = unitY * this.speed;
        this.setMoveDir(unitX,unitY);
        const moveHelper = () => {
            this.x += unitX;
            this.y += unitY;
            let allObj = this.game.map.getAllObjects();
            Object.keys(allObj).forEach((key) =>{
                let obj = allObj[key]
                if (obj.id !== this.id && obj.phasable === false){
                    if(hitBoxTouch(obj.getHitBox(), this.getHitBox())){
                        this.x -= unitX;
                        if (hitBoxTouch(obj.getHitBox(), this.getHitBox())) {
                            this.y -= unitY;
                            this.x += unitX;
                            dY = this.y;
                            if (hitBoxTouch(obj.getHitBox(), this.getHitBox())) {
                                this.x -= unitX;
                                this.cI();
                            }
                        }else{
                            dX = this.x;
                        }

                    }
                }
            })
            if (((this.x >= dX && unitX >= 0) || (this.x <= dX && unitX <= 0)) && 
                ((this.y >= dY && unitY >= 0) || (this.y <= dY && unitY <= 0))){
                this.cI();
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
    cI(){
        clearInterval(this.moving);
        this.moving = null;
        if(this.moveDir / 100 < 1){ 
            this.moveDir *= 10;
        }
    }
    kill(){

    }

}

module.exports = moveableObject;
