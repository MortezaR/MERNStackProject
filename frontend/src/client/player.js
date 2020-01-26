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
            south: new Sprite('https://i.imgur.com/f0z68qE.png'),
            southWest: new Sprite('https://i.imgur.com/lhoTJgR.png'),
            southEast: new Sprite('https://i.imgur.com/xS8gjpo.png'),
            west: new Sprite('https://i.imgur.com/Ezs7gZN.png'),
            east: new Sprite('https://i.imgur.com/YrRWLp0.png'),
            north: new Sprite('https://i.imgur.com/YnQohoW.png'),
            northWest: new Sprite('https://i.imgur.com/hmMZtGz.png'),
            northEast: new Sprite('https://i.imgur.com/HNeHTjo.png')
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
                this.sprites.south.step(context, this, xView, yView);
                break;
            case 32:
                this.sprites.southWest.step(context, this, xView, yView);
                break;
            case 12:
                this.sprites.west.step(context, this, xView, yView);
                break;
            case 22:
                this.sprites.northWest.step(context, this, xView, yView);
                break;
            case 21:
                this.sprites.north.step(context, this, xView, yView);
                break;
            case 23:
                this.sprites.northEast.step(context, this, xView, yView);
                break;
            case 13:
                this.sprites.east.step(context, this, xView, yView);
                break;
            case 33:
                this.sprites.southEast.step(context, this, xView, yView);
                break;
            case 310:
                this.sprites.south.drawFFrame(context, this, xView, yView);
                break;
            case 320:
                this.sprites.southWest.drawFFrame(context, this, xView, yView);
                break;
            case 120:
                this.sprites.west.drawFFrame(context, this, xView, yView);
                break;
            case 220:
                this.sprites.northWest.drawFFrame(context, this, xView, yView);
                break;
            case 210:
                this.sprites.north.drawFFrame(context, this, xView, yView);
                break;
            case 230:
                this.sprites.northEast.drawFFrame(context, this, xView, yView);
                break;
            case 130:
                this.sprites.east.drawFFrame(context, this, xView, yView);
                break;
            case 330:
                this.sprites.southEast.drawFFrame(context, this, xView, yView);
                break;
            default: return null;
             
        }
        // var shift = 0;
        // var frameWidth = 77;
        // var frameHeight = 33;
        // var totalFrames = 24;
        // var currentFrame = 0;

        // function animate() {
        //     context.clearRect(120, 25, 300, 300);
           
        //     //draw each frame + place them in the middle
        //     context.drawImage(this.image, shift, 0, frameWidth, frameHeight,
        //                       120, 25, frameWidth, frameHeight);
           
        //     shift += frameWidth + 1;
           
        //     /*
        //       Start at the beginning once you've reached the
        //       end of your sprite!
        //     */
        //     if (currentFrame == totalFrames) {
        //       shift = 0;
        //       currentFrame = 0;
        //     }
           
        //     currentFrame++;
           
        //     requestAnimationFrame(animate);
        //   }
        
        // ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    }
}
