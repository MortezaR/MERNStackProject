import Sprite from './sprite.js'
import Player from './player.js'
import { playSound } from '../util/sound_util';


export default class Piglet extends Player {
    constructor(id, x, y, width, height, moveDir) {
        super(id, x, y, width, height, moveDir)
        this.sprites = {
            // all movement images -> https://imgur.com/a/jYhF28e
            //https://imgur.com/a/nCJchlO attack animations
            south: new Sprite('https://i.imgur.com/f0z68qE.png', 32, 32, 4, [0,0], this),
            southWest: new Sprite('https://i.imgur.com/lhoTJgR.png', 32, 32, 4, [0,0], this),
            southEast: new Sprite('https://i.imgur.com/xS8gjpo.png', 32, 32, 4, [0,0], this),
            west: new Sprite('https://i.imgur.com/Ezs7gZN.png', 32, 32, 4, [0,0], this),
            east: new Sprite('https://i.imgur.com/YrRWLp0.png', 32, 32, 4, [0,0], this),
            north: new Sprite('https://i.imgur.com/YnQohoW.png', 32, 32, 4, [0,0], this),
            northWest: new Sprite('https://i.imgur.com/hmMZtGz.png', 32, 32, 4, [0,0], this),
            northEast: new Sprite('https://i.imgur.com/HNeHTjo.png', 32, 32, 4, [0,0], this),
            attacksouth: new Sprite('https://i.imgur.com/XGxMUpw.png', 32, 32, 4, [0, 0], this),
            attackwest: new Sprite('https://i.imgur.com/WD55HOr.png', 32, 32, 4, [0, 0], this),
            attackeast: new Sprite('https://i.imgur.com/qg7mA7W.png', 32, 32, 4, [0, 0], this),
            attacknorth: new Sprite('https://i.imgur.com/cZH8BDX.png', 32, 32, 4, [0, 0], this),
            ko: new Sprite('https://i.imgur.com/n7Vj74U.png', 32, 32, 4, [0, 0], this, 20),
        };
    }

    draw(context, xView, yView) {
        if (this.attacking) {
            playSound('pigletPunch');
            switch (this.moveDir) {
                case 31:
                    this.sprites.attacksouth.step(context, this, xView, yView, 2, 2);
                    break;
                case 32:
                    this.sprites.weaponwest.step(context, this, xView, yView, 2, 2);
                    break;
                case 12:
                    this.sprites.attackwest.step(context, this, xView, yView, 2, 2);
                    break;
                case 22:
                    this.sprites.attackwest.step(context, this, xView, yView, 2, 2);
                    break;
                case 21:
                    this.sprites.attacknorth.step(context, this, xView, yView, 2, 2);
                    break;
                case 23:
                    this.sprites.attackeast.step(context, this, xView, yView, 2, 2);
                    break;
                case 13:
                    this.sprites.attackeast.step(context, this, xView, yView, 2, 2);
                    break;
                case 33:
                    this.sprites.attackeast.step(context, this, xView, yView, 2, 2);
                    break;
                case 310:
                    this.sprites.attacksouth.step(context, this, xView, yView, 2, 2);
                    break;
                case 320:
                    this.sprites.attackwest.step(context, this, xView, yView, 2, 2);
                    break;
                case 120:
                    this.sprites.attackwest.step(context, this, xView, yView, 2, 2);
                    break;
                case 220:
                    this.sprites.attackwest.step(context, this, xView, yView, 2, 2);
                    break;
                case 210:
                    this.sprites.attacknorth.step(context, this, xView, yView, 2, 2);
                    break;
                case 230:
                    this.sprites.attackeast.step(context, this, xView, yView, 2, 2);
                    break;
                case 130:
                    this.sprites.attackeast.step(context, this, xView, yView, 2, 2);
                    break;
                case 330:
                    this.sprites.attackeast.step(context, this, xView, yView, 2, 2);
                    break;
                default:
                    this.sprites.south.drawFrame(context, this, xView, yView, 2, 2);
                    break;
            }
        } else {
            if (this.moveDir === 0) {
                this.trapped = true;
                this.sprites.ko.step(context, this, xView, yView, 2, 2, this.trapped);
            } else {
                this.trapped = false;
                switch (this.moveDir) {
                    case 0:
                        this.sprites.ko.step(context, this, xView, yView, 2, 2);
                        break;
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

       
