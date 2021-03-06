// import raikouSprites from '../assets/images/raikou_sprites.png'
import Sprite from './sprite.js';
import { playSound } from '../util/sound_util';


export default class Player {
    constructor(id, x, y, width, height, moveDir=310) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.moveDir = moveDir;
        this.attacking = false;
        this.visible = true;
    }

    update(x, y, moveDir, resource, visible = true) {
        console.log(arguments);
        this.x = x;
        this.y = y;
        this.moveDir = moveDir;
        this.resource = resource;
        this.visible = visible;
    }

    draw(context, xView, yView) {
        if (this.attacking) {
            console.log(this.moveDir);
            playSound('rClick');
            switch (this.moveDir) {
                case 31:
                    this.sprites.attacksouth.step(context, this, xView, yView, 2, 2);
                    break;
                case 32:
                    this.sprites.attacksouthWest.step(context, this, xView, yView, 2, 2);
                    break;
                case 12:
                    this.sprites.attackwest.step(context, this, xView, yView, 2, 2);
                    break;
                case 22:
                    this.sprites.attacknorthWest.step(context, this, xView, yView, 2, 2);
                    break;
                case 21:
                    this.sprites.attacknorth.step(context, this, xView, yView, 2, 2);
                    break;
                case 23:
                    this.sprites.attacknorthEast.step(context, this, xView, yView, 2, 2);
                    break;
                case 13:
                    this.sprites.attackeast.step(context, this, xView, yView, 2, 2);
                    break;
                case 33:
                    this.sprites.attacksouthEast.step(context, this, xView, yView, 2, 2);
                    break;
                case 310:
                    this.sprites.attacksouth.step(context, this, xView, yView, 2, 2);
                    break;
                case 320:
                    this.sprites.attacksouthWest.step(context, this, xView, yView, 2, 2);
                    break;
                case 120:
                    this.sprites.attackwest.step(context, this, xView, yView, 2, 2);
                    break;
                case 220:
                    this.sprites.attacknorthWest.step(context, this, xView, yView, 2, 2);
                    break;
                case 210:
                    this.sprites.attacknorth.step(context, this, xView, yView, 2, 2);
                    break;
                case 230:
                    this.sprites.attacknorthEast.step(context, this, xView, yView, 2, 2);
                    break;
                case 130:
                    this.sprites.attackeast.step(context, this, xView, yView, 2, 2);
                    break;
                case 330:
                    this.sprites.attacksouthEast.step(context, this, xView, yView, 2, 2);
                    break;
                default:
                    this.sprites.south.drawFrame(context, this, xView, yView, 2, 2);
                    break;
            }
        } else {
            if (this.moveDir === 0){
                playSound('trapped');
                this.trapped = true;
                this.sprites.ko.step(context, this, xView, yView, 2, 2, this.trapped);
            } else if (this.moveDir === 1){
                this.trapped = true;
                this.sprites.death.step(context, this, xView, yView, 2, 2, this.trapped);
            } else {
                this.trapped = false;
                switch (this.moveDir) {
                    case 31:
                        this.sprites.south.step(context, this, xView, yView, 2, 2);
                        break;
                    case 32:
                        this.sprites.southWest.step(context, this, xView, yView, 2, 2);
                        break;
                    case 12:
                        this.sprites.west.step(context, this, xView, yView, 2, 2);
                        break;
                    case 22:
                        this.sprites.northWest.step(context, this, xView, yView, 2, 2);
                        break;
                    case 21:
                        this.sprites.north.step(context, this, xView, yView, 2, 2);
                        break;
                    case 23:
                        this.sprites.northEast.step(context, this, xView, yView, 2, 2);
                        break;
                    case 13:
                        this.sprites.east.step(context, this, xView, yView, 2, 2);
                        break;
                    case 33:
                        this.sprites.southEast.step(context, this, xView, yView, 2, 2);
                        break;
                    case 310:
                        this.sprites.south.drawFrame(context, this, xView, yView, 2, 2);
                        break;
                    case 320:
                        this.sprites.southWest.drawFrame(context, this, xView, yView, 2, 2);
                        break;
                    case 120:
                        this.sprites.west.drawFrame(context, this, xView, yView, 2, 2);
                        break;
                    case 220:
                        this.sprites.northWest.drawFrame(context, this, xView, yView, 2, 2);
                        break;
                    case 210:
                        this.sprites.north.drawFrame(context, this, xView, yView, 2, 2);
                        break;
                    case 230:
                        this.sprites.northEast.drawFrame(context, this, xView, yView, 2, 2);
                        break;
                    case 130:
                        this.sprites.east.drawFrame(context, this, xView, yView, 2, 2);
                        break;
                    case 330:
                        this.sprites.southEast.drawFrame(context, this, xView, yView, 2, 2);
                        break;
                    default:
                        this.sprites.south.drawFrame(context, this, xView, yView, 2, 2);
                        break;
                }
            }
        }
        // YOU NOW HAVE ACCESS TO THIS.MOVEDIR
        
    }
}
