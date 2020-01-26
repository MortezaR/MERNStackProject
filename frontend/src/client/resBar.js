// import raikouSprites from '../assets/images/raikou_sprites.png'
import Sprite from './sprite.js'

export default class resBar {
    constructor(id, x, y, width, height) {
        // this.id = id;
        // this.x = x;
        // this.y = y;
        // this.width = width;
        // this.height = height;
        this.resource = 0;
    }

    update(resource) {
        this.resource = resource;
    }

    draw(context) {
        context.font = "30px Arial";
        context.fillText("Food: " + this.resource, 10, 50);
    }
}
