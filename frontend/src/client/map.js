export default class Map{
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.image = null;
    }
    generate(){
        let ctx = document.createElement("canvas").getContext("2d");
        ctx.canvas.width = this.width;
        ctx.canvas.height = this.height;
        this.image = new Image();
        this.image.src = 'https://i.imgur.com/KuaWfh7.png'
        ctx = null;
    }

    draw(context, xView, yView){
        let sx, sy, dx, dy;
        let sWidth, sHeight, dWidth, dHeight;
        sx = xView;
        sy = yView;     
        sWidth = context.canvas.width;
        sHeight = context.canvas.height;
        if (this.image.width - sx < sWidth) {
            sWidth = this.image.width - sx;
        }
        if (this.image.height - sy < sHeight) {
            sHeight = this.image.height - sy;
        }

        dx = 0;
        dy = 0;
        dWidth = sWidth;
        dHeight = sHeight;

        context.drawImage(this.image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    }
}