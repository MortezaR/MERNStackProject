// import raikouSprites from '../assets/images/raikou_sprites.png'
import Sprite from './sprite.js'
import pigAvatar from '../assets/images/pigavatar2.png'
import clockIcon from '../assets/images/clockicon.png'
import bunshin from '../assets/images/bunshin.png'
import bunshinCooldown from '../assets/images/bunshindown.png'

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
        this.avatar = new Image();
        this.avatar.src = pigAvatar;
        this.clockIcon = new Image();
        this.clockIcon.src = clockIcon;
        this.bunshin = new Image();
        this.bunshin.src = bunshin;
        this.bunshinCooldown = new Image();
        this.bunshinCooldown.src = bunshinCooldown;
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
        //Wolf stuff
        if (this.isWolf){
            context.font = "30px Arial";
            context.fillText("Resources Left: " + this.resourcesLeft, 10, 50);
            context.fillText("Terminals Left: " + this.terminalsLeft, 10, 100);
            context.fillText("TimeLeft: " + this.timeLeft, 10, 150);
        } 
        //Pig stuff
        else {
        //     //Draw pig resources
        //     let cw = context.canvas.clientWidth;
        //     let ch = context.canvas.clientHeight;
        //     let bars = 45;
        //     let radius = 30;
        //    //Use this for the collected resources color; 18 comes from (360/max resources). At this time, max resources = 20. If max resources updated, change this
        //    context.save();
        //    context.translate(cw-150, 200);
        //    for (var i = 0; i < (this.resourcesCollected*18); i += (360 / bars)) {
        //        // Find the rectangle's position on circle edge
        //        let colorBarWidth = 2 * Math.PI * radius / bars;
        //        let colorBarHeight = 15;
        //        // Fill with gradient
        //        context.fillStyle = '#fccc2d';          
        //        // Draw the rectangle
        //        context.save();
        //        context.rotate((i+270) * Math.PI / 180);
        //        context.fillRect(radius, -colorBarWidth / 2, colorBarHeight, colorBarWidth);
        //        context.restore();

        //         //Use translate to move the resource around the map
        //         context.save();
        //         context.translate(500, 500)
        //         context.restore();
        //    }
        //    //Use this for the uncollected resources color (grey bar)
        //    for (var i = 0; i < (360-(this.resourcesCollected*18)); i += (360 / bars)) {

        //        // Find the rectangle's position on circle edge
        //        let barWidth = 2 * Math.PI * radius / bars;
        //        let barHeight = 30;
        //        // Fill with gradient
        //        context.fillStyle = '#cdd1d1';          
        //        // Draw the rectangle
        //        context.save();
        //        context.rotate((i+(270+(this.resourcesCollected*18))) * Math.PI / 180);
        //        context.fillRect(radius, -barWidth / 2, barHeight, barWidth);
        //        context.restore();
        //         //Use translate to move the resource around the map
        //    }
        //    context.restore();
        //    context.save();
        //    context.textBaseline = 'middle';
        //    context.textAlign = 'center';
        //    context.fillText(this.resourcesCollected, cw-150, 200);
        //    context.restore();
        //    context.drawImage(this.avatar, 0, 0, 190, 190, cw*0.05, ch*0.9, 190, 190);

        //Pig resources dial
        var w = context.canvas.clientWidth;
        var h = context.canvas.clientHeight;
        
        var r1 = Math.min(274, 274) * 0.4;    // outer radius
        var r0 = r1 - 40;                 // inner radius
        
        var n = 10;                       // number of blocks
        
        var theta = 2 * Math.PI / n;
        var phi = theta * 0.48;           // relative half-block width
        
        context.save();
        context.fillStyle = 'hsla(175, 0%, 55%,0.5)';
        context.translate(w*0.07, h*0.78);      // move to center of circle
        for(let i= 0; i< n-2; i++){
            context.rotate(theta);
        }
        for (var i = 0; i < n; ++i) {
            context.beginPath();
            context.arc(0, 0, r0, -phi, phi);
            context.arc(0, 0, r1, phi, -phi, true);
            context.fill();
            context.strokeStyle='#656565'
            context.lineWidth = 2;
            context.stroke();
            context.rotate(theta);            // rotate the coordinates by one block
        }
        for (var i = 0; (i < this.resourcesCollected); ++i) {
            context.beginPath();
            context.arc(0, 0, r0, -phi, phi);
            context.arc(0, 0, r1, phi, -phi, true);
            context.fillStyle = '#FF283F';
            context.fill();
            context.strokeStyle='#d31d30'
            context.lineWidth = 2;
            context.stroke();
            context.rotate(theta);            // rotate the coordinates by one block
        }
        context.restore();
        //Pig avatar
        context.drawImage(this.avatar, 0, 0, 137, 137, (w*0.07)-68.5, (h*0.78)-68.5, 137, 137);
        //Terminals Remaining
        context.beginPath();
        context.rect(20, h-70, 250, 25);
        context.fillStyle ='black';
        context.fill();
        context.closePath();

        context.beginPath();
        context.rect(105, h-66, 160, 17);
        context.fillStyle ='#5afdc5';
        context.fill();
        context.closePath();


        //Deposits Remaining
        context.beginPath();
        context.rect(20, h*0.95, 400, 25);
        context.fillStyle ='black';
        context.fill();
        context.closePath();

        context.beginPath();
        context.rect(105, h*0.95+4, 310, 17);
        context.fillStyle ='#fdca20';
        context.fill();
        context.closePath();
        //Time Remaining
        context.font = "bold 40px Oswald"
        context.textBaseline = 'middle';
        context.textAlign = 'center';
        context.fillStyle= 'white';
        context.fillText((Math.floor(this.timeLeft*10)/10), w-35, 30);
        context.drawImage(this.clockIcon, 0, 0, 35, 35, w-100, 9, 35, 35);

        //Bunshin
        if (this.resourcesCollected >= 5) {
            context.drawImage(this.bunshin, 0, 0, 91, 91, w-100, h-100, 91, 91);
        }
        else {
            context.drawImage(this.bunshinCooldown, 0, 0, 91, 91, w-100, h-100, 91, 91);
        }
        }

    }
}
