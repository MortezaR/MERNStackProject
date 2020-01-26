// import raikouSprites from '../assets/images/raikou_sprites.png'
import Sprite from './sprite.js'

export default class GObject {
    constructor(id, x, y, width, height) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprites = {
            south: new Sprite('https://i.imgur.com/f0z68qE.png')
        };
    }

    update(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(context, xView, yView) {
        // this.sprites.south.step(context, xView, yView);
        // console.log(xView, yView);
        this.image = new Image();
        this.image.src = 'https://i.imgur.com/f0z68qE.png';
        context.drawImage(
            this.image, 0, 0, 32, 32,
            this.x - this.width/2 - xView,
            this.y - this.height/2 -yView,
            this.width, this.height);
    }
}
