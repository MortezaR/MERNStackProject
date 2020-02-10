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

    }

    update(resource) {
        this.resourcesCollected = resource;
    }

    updateGameInfo(data) {
        this.resourcesLeft = data.resourcesLeft;
        this.terminalsLeft = data.terminalsLeft;
        this.timeLeft = data.timeLeft;
    }

    draw(context) {
        //Wolf stuff
        if (this.isWolf){
            context.font = "30px Arial";
            context.fillText("Resources Left: " + this.resourcesLeft, 10, 50);
            context.fillText("Terminals Left: " + this.terminalsLeft, 10, 100);
            context.fillText("TimeLeft: " + this.timeLeft, 10, 150);
        } 
        //Pig stuff
        else {
            //Draw pig resources
            let cw = context.canvas.clientWidth;
            let ch = context.canvas.clientHeight;
            let bars = 180;
            let radius = 75;
           //Use this for the collected resources color; 18 comes from (360/max resources). At this time, max resources = 20. If max resources updated, change this
           context.save();
           context.translate(cw-150, 200);
           for (var i = 0; i < (this.resourcesCollected*18); i += (360 / bars)) {
               // Find the rectangle's position on circle edge
               let colorBarWidth = 2 * Math.PI * radius / bars;
               let colorBarHeight = 30;
               // Fill with gradient
               context.fillStyle = '#fccc2d';          
               // Draw the rectangle
               context.save();
               context.rotate((i+270) * Math.PI / 180);
               context.fillRect(radius, -colorBarWidth / 2, colorBarHeight, colorBarWidth);
               context.restore();

                //Use translate to move the resource around the map
                context.save();
                context.translate(500, 500)
                context.restore();
           }
           //Use this for the uncollected resources color (grey bar)
           for (var i = 0; i < (360-(this.resourcesCollected*18)); i += (360 / bars)) {

               // Find the rectangle's position on circle edge
               let barWidth = 2 * Math.PI * radius / bars;
               let barHeight = 30;
               // Fill with gradient
               context.fillStyle = '#cdd1d1';          
               // Draw the rectangle
               context.save();
               context.rotate((i+(270+(this.resourcesCollected*18))) * Math.PI / 180);
               context.fillRect(radius, -barWidth / 2, barHeight, barWidth);
               context.restore();
                //Use translate to move the resource around the map
           }
           context.restore();
           context.save();
           context.textBaseline = 'middle';
           context.textAlign = 'center';
           context.fillText(this.resourcesCollected, cw-150, 200);
           context.restore();
            //Old code
            console.log('old code')
            context.font = "30px Arial";
            context.fillText("Food: " + this.resourcesCollected, 10, 150);
            context.fillText("Resources Left: " + this.resourcesLeft, 10, 50);
            context.fillText("Terminals Left: " + this.terminalsLeft, 10, 100);
            context.fillText("TimeLeft: " + this.timeLeft, 10, 200);
        }

    }
}
