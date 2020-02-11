
const GObject = require( './object.js')
const utils = require('../util.js')
const HTerminal = require('./hterminal.js')
const Teleporter = require('./teleporter.js')
const Trap = require('./trap')
const getDir = utils.getDir;
const hitBoxTouch = utils.hitBoxTouch;
//S - 21 , SW - 22, W - 12, NW - 32, N - 31, NE - 33, E - 13, SE - 23

class moveableObject extends GObject{

    constructor(game, id, x, y){
        super(game, id, x, y);
        this.speed = 1;
        this.hitBoxSize = [50,50];
        this.actionCooldown = 1;
        this.moving = null;
        this.moveDir = 310;
        this.dead = false;
        this.cI = this.cI.bind(this);
        this.visible = true;
    }
    move(dX, dY){
        if (dX === this.x && this.y === dY){
            return null;
        }
        let [unitX, unitY] = getDir(this.x,this.y,dX,dY);
        this.setMoveDir(unitX,unitY);
        unitX = unitX * this.speed;
        unitY = unitY * this.speed;
        const moveHelper = () => {
            this.x += unitX;
            this.y += unitY;
            let allObj = this.game.map.getAllObjects();
            Object.keys(allObj).forEach((key) =>{
                let obj = allObj[key];
                let touching = hitBoxTouch(obj.getHitBox(), this.getHitBox());
                if (obj.id !== this.id && obj.phasable === false){
                    if(touching){
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
                if (obj instanceof HTerminal && touching) {
                    this.hack(obj);
                }
                if (obj instanceof Teleporter && touching) {
                    this.teleport(obj);
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
        this.moving = setInterval(moveHelper, 1000 / 100);
    }
    phaseThrough(){
        let tempMoveDir = this.moveDir;
        if (tempMoveDir > 100) {
            tempMoveDir /= 10;
        }
        let ver = Math.floor(tempMoveDir / 10);
        let hor = tempMoveDir % 10;
        let allObj = this.game.map.getAllObjects();
        let canMove = false;
        while(!canMove){
            canMove = true;
            Object.keys(allObj).forEach((key) => {
                let obj = allObj[key];
                if (obj.id !== this.id && obj.phasable === false) {
                    let touching = hitBoxTouch(obj.getHitBox(), this.getHitBox());
                    while (touching) {
                        switch (hor) {
                            case 2:
                                this.x -= 30;
                                break;
                            case 3:
                                this.x += 30;
                                break;
                            default:
                                break;
                        }
                        switch (ver) {
                            case 2:
                                this.y -= 30;
                                break;
                            case 3:
                                this.y += 30;
                                break;
                            default:
                                break;
                        }
                        canMove = false;
                        touching = hitBoxTouch(obj.getHitBox(), this.getHitBox());
                    }
                }
            })
        }
        
    }
    hack(){

    }
    teleport(){

    }
    stun(){

    }
    kill(){

    }
    setMoveDir(x,y){
        let NS = 10;
        let EW = 1;
        if (x > .45) {
            EW = 3;
        }else if( x < -.45){
            EW = 2;
        }
        if (y > .45) {
            NS = 30;
        }else if( y < -.45){
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

}

module.exports = moveableObject;
