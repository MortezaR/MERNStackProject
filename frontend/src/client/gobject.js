// import raikouSprites from '../assets/images/raikou_sprites.png'
import Sprite from './sprite.js'
import foodIcon from './../assets/images/food_icon.png'
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
            food: new Sprite(foodIcon, 135, 135, 1),
            food2: new Sprite(rockIcon, 135, 135, 1),
            wall: new Sprite(rockIcon, 135, 135, 1),
            hTerminal: new Sprite(rockIcon, 135, 135, 1),
            teleporter: new Sprite(foodIcon, 135, 135, 1),
            trap: new Sprite('https://i.imgur.com/f0z68qE.png', 135, 135, 1),
        };
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
                if(this.params.resource > 0){
                    this.sprites.food.step(context, this, xView, yView, 1, 1);
                }else{
                    this.sprites.food2.step(context, this, xView, yView, 1, 1);
                }
                break;
            case 3:
                this.sprites.hTerminal.step(context, this, xView, yView, 1, 1);
                console.log(this.params.hp);
                break;
            case 4:
                this.sprites.teleporter.step(context, this, xView, yView, 1, 1);
            case 10:
                this.sprites.trap.step(context, this, xView, yView, 1, 1);
            default:
                break;
        }
    }
}
