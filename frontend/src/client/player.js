import Object from './object'

export default class Player extends Object{
    constructor(props) {
        super(props)
    }

    draw(context, xView, yView){
        context.save();
        context.fillStyle = "red";
        context.fillRect((this.x - this.width / 2) - xView, (this.y - this.height / 2) - yView, this.width, this.height);
        context.restore();
    }
}
