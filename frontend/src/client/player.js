import raikouSprites from '../assets/images/raikou_sprites.png'

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
        this.image = new Image();
        this.image.src = 'https://i.imgur.com/8kVKWdE.png'
        // YOU NOW HAVE ACCESS TO THIS.MOVEDIR
        //Move dir: 21 S, 31 N, 12 E, 13 W, 22 SE, 23 SW, 32 NE, 33 NW
        switch(this.moveDir) {
            //South
            case 31:
                context.drawImage(this.image, 0, 0, 25, 33, (this.x - this.width / 2) - xView, (this.y - this.height / 2) - yView, 25, 33);
             //North East
            case 32:
                context.drawImage(this.image, 0, 0, 25, 33, (this.x - this.width / 2) - xView, (this.y - this.height / 2) - yView, 25, 33);
                break;
            case 12:
                context.drawImage(this.image, 0, 0, 25, 33, (this.x - this.width / 2) - xView, (this.y - this.height / 2) - yView, 25, 33);
                break;
            case 22:
                context.drawImage(this.image, 0, 0, 25, 33, (this.x - this.width / 2) - xView, (this.y - this.height / 2) - yView, 25, 33);
                break;
            case 21:
                context.drawImage(this.image, 0, 0, 25, 33, (this.x - this.width / 2) - xView, (this.y - this.height / 2) - yView, 25, 33);
                break;
            case 23:
                context.drawImage(this.image, (this.x - this.width / 2) - xView, (this.y - this.height / 2) - yView, 25, 33);
                break;
            case 13:
                context.drawImage(this.image, (this.x - this.width / 2) - xView, (this.y - this.height / 2) - yView, 25, 33);
                break;
            case 33:
                context.drawImage(this.image, (this.x - this.width / 2) - xView, (this.y - this.height / 2) - yView, 25, 33);
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
