// import raikouSprites from '../assets/images/raikou_sprites.png'
import Sprite from './sprite.js'
// import foodIcon from './../assets/images/food_icon.png'
import rockIcon from './../assets/images/rock_icon.png'
export default class GObject {
    constructor(id, x, y, width, height, params) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.params = params;
        this.sprites = {
            food0: new Sprite('https://i.imgur.com/R8JxMrQ.png', 80, 80, 1, [0,0], this),
            food1: new Sprite('https://i.imgur.com/R8JxMrQ.png', 80, 80, 1, [80, 0], this),
            food2: new Sprite('https://i.imgur.com/R8JxMrQ.png', 80, 80, 1, [160, 0], this),
            food3: new Sprite('https://i.imgur.com/R8JxMrQ.png', 80, 80, 1, [240, 0], this),
            food4: new Sprite('https://i.imgur.com/R8JxMrQ.png', 80, 80, 1, [320, 0], this),
            food5: new Sprite('https://i.imgur.com/R8JxMrQ.png', 80, 80, 1, [400, 0], this),
            wall: new Sprite(rockIcon, 135, 135, 1, [0, 0], this),
            hTerminal: new Sprite('https://i.imgur.com/MNkGnTs.png', 80, 80, 16, [0, 0], this, 10),
            teleporter: new Sprite('https://i.imgur.com/PODFsc5.png', 100, 100, 5, [0, 0], this),
            trap: new Sprite('https://i.imgur.com/AAjfnGl.png', 50,150, 5, [0,0], this),
            deposit: new Sprite('https://i.imgur.com/4JWVKGU.png', 100,50, 10, [0,0], this),
        };
        this.attacking = false;
    }

    update(x, y, params) {
        this.x = x;
        this.y = y;
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
                this.sprites.hTerminal.step(context, this, xView, yView, 1, 1);
                break;
            case 4:
                this.sprites.teleporter.step(context, this, xView, yView, 2, 2);
                break;
            case 5:
                this.sprites.deposit.step(context, this, xView, yView, 1, 1);
                break;
            case 10:
                this.sprites.trap.step(context, this, xView, yView, 1, 1);
                break;
            default:
                break;
        }
    }
}
