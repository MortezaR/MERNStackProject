

export default class Player{
    constructor(id, x, y, width, height, moveDir) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.moveDir = moveDir;
    }

    update(x, y, moveDir) {
        this.x = x;
        this.y = y;
        this.moveDir = moveDir;
    }

    draw(context, xView, yView){
        // context.save();
        // context.fillStyle = "black";
        // context.fillRect((this.x - this.width / 2) - xView, (this.y - this.height / 2) - yView, this.width, this.height);
        // context.restore();

        // YOU NOW HAVE ACCESS TO THIS.MOVEDIR

        this.image = new Image();
        this.image.src = 'https://i.imgur.com/nAyT1fQ.png'
        // debugger;
        context.drawImage(this.image, (this.x - this.width / 2) - xView, (this.y - this.height / 2) - yView, 50, 50);
        // ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    }
}
