// import raikouSprites from '../assets/images/raikou_sprites.png'
import Sprite from './sprite.js'

export default class Player{
    constructor(id, x, y, width, height, moveDir) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.moveDir = moveDir;
        this.sprites = {
            south: new Sprite('https://i.imgur.com/f0z68qE.png', 32 , 32, 4),
            southWest: new Sprite('https://i.imgur.com/lhoTJgR.png', 32, 32, 4),
            southEast: new Sprite('https://i.imgur.com/xS8gjpo.png', 32, 32, 4),
            west: new Sprite('https://i.imgur.com/Ezs7gZN.png', 32, 32, 4),
            east: new Sprite('https://i.imgur.com/YrRWLp0.png', 32, 32, 4),
            north: new Sprite('https://i.imgur.com/YnQohoW.png', 32, 32, 4),
            northWest: new Sprite('https://i.imgur.com/hmMZtGz.png', 32, 32, 4),
            northEast: new Sprite('https://i.imgur.com/HNeHTjo.png', 32, 32, 4)
        };
    }

    update(x, y, moveDir) {
        this.x = x;
        this.y = y;
        this.moveDir = moveDir;
    }

    draw(context, xView, yView){
        // all movement images -> https://imgur.com/a/jYhF28e
        
        // YOU NOW HAVE ACCESS TO THIS.MOVEDIR
        switch(this.moveDir) {
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
                this.sprites.south.drawFFrame(context, this, xView, yView, 2, 2);
                break;
            case 320:
                this.sprites.southWest.drawFFrame(context, this, xView, yView, 2, 2);
                break;
            case 120:
                this.sprites.west.drawFFrame(context, this, xView, yView, 2, 2);
                break;
            case 220:
                this.sprites.northWest.drawFFrame(context, this, xView, yView, 2, 2);
                break;
            case 210:
                this.sprites.north.drawFFrame(context, this, xView, yView, 2, 2);
                break;
            case 230:
                this.sprites.northEast.drawFFrame(context, this, xView, yView, 2, 2);
                break;
            case 130:
                this.sprites.east.drawFFrame(context, this, xView, yView, 2, 2);
                break;
            case 330:
                this.sprites.southEast.drawFFrame(context, this, xView, yView, 2, 2);
                break;
            default:
                // context.drawImage(this.image, (this.x - this.width / 2) - xView, (this.y - this.height / 2) - yView, 25, 33);
        }
        // context.drawImage(this.image, 0, 0, 25, 33, (this.x - this.width / 2) - xView, (this.y - this.height / 2) - yView, 25, 33);
    }
}
