// import Game from './game'

export default class Player{
    constructor(id, x, y, width, height) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    update(x, y){
        this.x = x;
        this.y = y;
    }

    draw(context, xView, yView){
        context.save();
        context.fillStyle = "black";
        context.fillRect((this.x - this.width / 2) - xView, (this.y - this.height / 2) - yView, this.width, this.height);
        context.restore();
    }
}
