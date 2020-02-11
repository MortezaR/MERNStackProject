// import raikouSprites from '../assets/images/raikou_sprites.png'
import Sprite from './sprite.js';
// import foodIcon from './../assets/images/food_icon.png'
import rockIcon from './../assets/images/rock_icon.png';
import { playSound } from '../util/sound_util';

export default class GObject {
    constructor(id, x, y, width, height, params, isWolf) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.params = params;
        this.lastParams = params;
        this.isWolf = isWolf;
        this.sprites = {
            food0: new Sprite('https://i.imgur.com/R8JxMrQ.png', 80, 80, 1, [0,0], this),
            food1: new Sprite('https://i.imgur.com/R8JxMrQ.png', 80, 80, 1, [80, 0], this),
            food2: new Sprite('https://i.imgur.com/R8JxMrQ.png', 80, 80, 1, [160, 0], this),
            food3: new Sprite('https://i.imgur.com/R8JxMrQ.png', 80, 80, 1, [240, 0], this),
            food4: new Sprite('https://i.imgur.com/R8JxMrQ.png', 80, 80, 1, [320, 0], this),
            food5: new Sprite('https://i.imgur.com/R8JxMrQ.png', 80, 80, 1, [400, 0], this),
            wall: new Sprite(rockIcon, 135, 135, 1, [0, 0], this),
            hTerminal: new Sprite('https://i.imgur.com/MNkGnTs.png', 80, 80, 16, [0, 0], this, 10),
            teleporter: new Sprite('https://i.imgur.com/AZfCfiC.png', 100, 100, 4, [0, 0], this),
            trap: new Sprite('https://i.imgur.com/AAjfnGl.png', 50,150, 5, [0,0], this),
            deposit: new Sprite('https://i.imgur.com/4JWVKGU.png', 100,50, 10, [0,0], this),
            piglet: new Sprite('https://i.imgur.com/f0z68qE.png', 32, 32, 4, [0, 0], this)
        };
        this.active = false;

    }

    update(x, y, params) {
        this.x = x;
        this.y = y;
        this.lastParams = this.params;
        this.params = params;
        
    }

    draw(context, xView, yView) {
        switch (Math.floor(this.id/10000)) {
            case 1:
                this.sprites.wall.step(context, this, xView, yView, 1, 1);
                break;
            case 2:
                switch (this.params.resource) {
                    case 0:
                        this.sprites.food0.drawFirstFrame(context, this, xView, yView, 2,2);
                        break;
                    case 1:
                        this.sprites.food1.drawFirstFrame(context, this, xView, yView, 2,2);
                        break;
                    case 2:
                        this.sprites.food2.drawFirstFrame(context, this, xView, yView, 2,2);
                        break;
                    case 3:
                        this.sprites.food3.drawFirstFrame(context, this, xView, yView, 2,2);
                        break;
                    case 4:
                        this.sprites.food4.drawFirstFrame(context, this, xView, yView, 2,2);
                        break;
                    case 5:
                        this.sprites.food5.drawFirstFrame(context, this, xView, yView, 2,2);
                        break;
                    default:
                        break;
                }
                break;
            case 3:
                if (this.params.hp < this.lastParams.hp){
                    this.active = true;
                    setTimeout(() => {
                        if (this.params.hp === this.lastParams.hp) {
                        this.active = false
                        }
                    }, 1000)
                } 
                if (this.active){
                    // playSound('depositBeep');
                    this.sprites.hTerminal.step(context, this, xView, yView, 2, 2);
                } else {
                    this.sprites.hTerminal.drawFirstFrame(context, this, xView, yView, 2, 2);
                }
                break;
            case 4:
                this.sprites.teleporter.step(context, this, xView, yView, 2, 2);
                break;
            case 5:
                if (this.params.hp < this.lastParams.hp) {
                    this.active = true;
                    setTimeout(() => {
                        if (this.params.hp === this.lastParams.hp) {
                            this.active = false
                        }
                    }, 1000)
                }
                if (this.active) {
                    playSound('depositBeep');
                    this.sprites.deposit.step(context, this, xView, yView, 2, 2);
                } else {
                    this.sprites.deposit.drawFirstFrame(context, this, xView, yView, 2, 2);
                }
                break;
            case 10:
                if (this.params.sprung && !this.params.delete){
                    this.sprites.trap.step(context, this, xView, yView, 1, 1);
                } else if (this.params.delete){
                    return null;
                }else if(this.isWolf){
                    this.sprites.piglet.drawFirstFrame(context, this, xView, yView, 2, 2);
                } else {
                    if (!this.isWolf){
                        this.sprites.trap.drawFirstFrame(context, this, xView, yView, 1, 1);
                    }
                }
                break;
            default:
                break;
        }
    }
}
