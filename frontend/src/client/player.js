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
            default:
                context.drawImage(this.image, (this.x - this.width / 2) - xView, (this.y - this.height / 2) - yView, 25, 33);
        }
        context.drawImage(this.image, 0, 0, 25, 33, (this.x - this.width / 2) - xView, (this.y - this.height / 2) - yView, 25, 33);
    }
}
