export default class Example{
    constructor(){
        this.canvas = document.getElementById("canvas")
        this.context = this.canvas.getContext("2d");
    }

    draw() {
        this.context.save();
        this.context.fillStyle = "black";
        this.context.fillRect((20 - 10 / 2) - 0, (20 - 10 / 2) - 0, 25, 25);
        this.context.restore();
    }
}