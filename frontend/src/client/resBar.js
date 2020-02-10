// import raikouSprites from '../assets/images/raikou_sprites.png'
import Sprite from './sprite.js'

export default class resBar {
    constructor(isWolf, id, x, y, width, height) {
        // this.id = id;
        // this.x = x;
        // this.y = y;
        // this.width = width;
        // this.height = height;
        this.isWolf = isWolf;
        this.resourcesLeft = 0;
        this.terminalsLeft = 0;
        this.resourcesCollected = 0;
        this.timeLeft = 0;
        this.timeEllapsed = 0;
    }

    update(resource) {
        this.resourcesCollected = resource;
    }

    updateGameInfo(data) {
        if (this.timeLeft === 0) this.timeLeft = data.timeLeft;
        this.resourcesLeft = data.resourcesLeft;
        this.terminalsLeft = data.terminalsLeft;
        this.timeEllapsed += this.timeLeft-data.timeLeft;
        this.timeLeft = data.timeLeft;
    }

    draw(context) {
        if (this.isWolf){
            context.font = "30px Arial";
            context.fillText("Resources Left: " + this.resourcesLeft, 10, 50);
            context.fillText("Terminals Left: " + this.terminalsLeft, 10, 100);
            context.fillText("Gametime Left: " + this.timeLeft, 10, 150);
            if (this.timeEllapsed < 15) {
                context.fillText("Wolf is free in: " + (15-this.timeEllapsed), 10, 200);
            }
        } else {
            context.font = "30px Arial";
            context.fillText("Food: " + this.resourcesCollected, 10, 150);
            context.fillText("Resources Left: " + this.resourcesLeft, 10, 50);
            context.fillText("Terminals Left: " + this.terminalsLeft, 10, 100);
            context.fillText("Gametime Left: " + this.timeLeft, 10, 200);
        }

    }
}
