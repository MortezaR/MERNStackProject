// import raikouSprites from '../assets/images/raikou_sprites.png'
import Sprite from './sprite.js'
import pigAvatar from '../assets/images/pigAvatar.png'
import wolfAvatar from '../assets/images/wolfavatar.png'
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
        this.killCount = 0;
        this.pigAvatar = new Image();
        this.pigAvatar.src = pigAvatar;
        this.wolfAvatar = new Image ();
        this.wolfAvatar.src = wolfAvatar;
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
        this.killCount = data.killCount;
        console.log(this.killCount)
    }

    draw(context) {
        //Wolf stuff
        if (this.isWolf){
            //Pig resources dial
            var w = context.canvas.clientWidth;
            var h = context.canvas.clientHeight;
            
            var r1 = Math.min(274, 274) * 0.4;    // outer radius
            var r0 = r1 - 40;                 // inner radius
            
            var n = 3;                       // number of blocks
            
            var theta = 2 * Math.PI / n;
            var phi = theta * 0.5;           // relative half-block width
            
            context.save();
            context.fillStyle = 'hsla(175, 0%, 55%,0.5)';
            context.translate(w*0.07, h*0.78);      // move to center of circle
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
            //Purple blocks
            for (var i = 0; (i < this.killCount); ++i) {
                context.beginPath();
                context.arc(0, 0, r0, -phi, phi);
                context.arc(0, 0, r1, phi, -phi, true);
                context.fillStyle = 'hsla(263, 39%, 43%, 0.6)';
                context.fill();
                context.strokeStyle='#3f1775'
                context.lineWidth = 2;
                context.stroke();
                context.rotate(theta);            // rotate the coordinates by one block
            }
            context.restore();
            //Pig avatar
            context.drawImage(this.wolfAvatar, 0, 0, 137, 137, (w*0.07)-68.5, (h*0.78)-68.5, 137, 137);
            //Terminals Remaining
            context.beginPath();
            context.rect(20, h-70, 250, 25);
            context.fillStyle ='black';
            context.fill();
            context.closePath();
            if (this.terminalsLeft >= 1) {
                context.beginPath();
                context.rect(105, h-66, 50, 17);
                context.fillStyle ='#5afdc5';
                context.fill();
                context.closePath();
            }
            if (this.terminalsLeft >= 2) {
                context.beginPath();
                context.rect(160, h-66, 50, 17);
                context.fillStyle ='#5afdc5';
                context.fill();
                context.closePath();
            }
            if (this.terminalsLeft >= 3) {
                context.beginPath();
                context.rect(215, h-66, 50, 17);
                context.fillStyle ='#5afdc5';
                context.fill();
                context.closePath();
            }
            //Terminal label
            context.font = "18px Bebas Neue"
            context.textBaseline = 'middle';
            context.textAlign = 'center';
            context.fillStyle= '#5afdc5';
            context.fillText('TERMINALS', 60, h-56);


            //Deposits Remaining
            context.beginPath();
            context.rect(20, h*0.95, 400, 25);
            context.fillStyle ='black';
            context.fill();
            context.closePath();

            context.beginPath();
            context.rect(105, h*0.95+4, 310*(this.resourcesLeft/20), 17);
            context.fillStyle ='#fdca20';
            context.fill();
            context.closePath();

            //Deposits label
            context.font = "18px Bebas Neue"
            context.textBaseline = 'middle';
            context.textAlign = 'center';
            context.fillStyle= '#fdca20';
            context.fillText('DEPOSITS', 60, h*0.95+14);
            //Time Remaining
            context.font = "bold 40px Oswald"
            context.textBaseline = 'middle';
            context.textAlign = 'center';
            context.fillStyle= 'white';
            context.fillText((Math.floor(this.timeLeft*10)/10), w-35, 30);
            //Clock Icon
            context.drawImage(this.clockIcon, 0, 0, 35, 35, w-100, 9, 35, 35);

        } 
        //Pig stuff
        else {
            //Pig resources dial
            var w = context.canvas.clientWidth;
            var h = context.canvas.clientHeight;
            
            var r1 = Math.min(272, 272) * 0.4;    // outer radius
            var r0 = r1 - 40;                 // inner radius
            
            var n = 10;                       // number of blocks
            
            var theta = 2 * Math.PI / n;
            var phi = theta * 0.5;           // relative half-block width
            
            context.save();
            context.fillStyle = 'hsla(175, 0%, 55%,0.5)';
            context.translate(w*0.07, h*0.78);      // move to center of circle
            //Rotate so that resource count starts from the north instead of side
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
            //Red blocks for pig
            for (var i = 0; (i < this.resourcesCollected); ++i) {
                context.beginPath();
                context.arc(0, 0, r0, -phi, phi);
                context.arc(0, 0, r1, phi, -phi, true);
                context.fillStyle = 'hsla(354, 39%, 43%, 0.8)';
                context.fill();
                context.strokeStyle='#d31d30'
                context.lineWidth = 2;
                context.stroke();
                context.rotate(theta);            // rotate the coordinates by one block
            }
            context.restore();
            //Pig avatar
            context.drawImage(this.pigAvatar, 0, 0, 137, 137, (w*0.07)-68.5, (h*0.78)-68.5, 137, 137);
            //Terminals Remaining
            context.beginPath();
            context.rect(20, h-70, 250, 25);
            context.fillStyle ='black';
            context.fill();
            context.closePath();
            if (this.terminalsLeft >= 1) {
                context.beginPath();
                context.rect(105, h-66, 50, 17);
                context.fillStyle ='#5afdc5';
                context.fill();
                context.closePath();
            }
            if (this.terminalsLeft >= 2) {
                context.beginPath();
                context.rect(160, h-66, 50, 17);
                context.fillStyle ='#5afdc5';
                context.fill();
                context.closePath();
            }
            if (this.terminalsLeft >= 3) {
                context.beginPath();
                context.rect(215, h-66, 50, 17);
                context.fillStyle ='#5afdc5';
                context.fill();
                context.closePath();
            }
            //Terminal label
            context.font = "18px Bebas Neue"
            context.textBaseline = 'middle';
            context.textAlign = 'center';
            context.fillStyle= '#5afdc5';
            context.fillText('TERMINALS', 60, h-56);


            //Deposits Remaining
            context.beginPath();
            context.rect(20, h*0.95, 400, 25);
            context.fillStyle ='black';
            context.fill();
            context.closePath();

            context.beginPath();
            context.rect(105, h*0.95+4, 310*(this.resourcesLeft/20), 17);
            context.fillStyle ='#fdca20';
            context.fill();
            context.closePath();

            //Deposits label
            context.font = "18px Bebas Neue"
            context.textBaseline = 'middle';
            context.textAlign = 'center';
            context.fillStyle= '#fdca20';
            context.fillText('DEPOSITS', 60, h*0.95+14);
            //Time Remaining
            context.font = "bold 40px Oswald"
            context.textBaseline = 'middle';
            context.textAlign = 'center';
            context.fillStyle= 'white';
            context.fillText((Math.floor(this.timeLeft*10)/10), w-35, 30);
            //Clock Icon
            context.drawImage(this.clockIcon, 0, 0, 35, 35, w-100, 9, 35, 35);

            //Bunshin
            if (this.resourcesCollected >= 5) {
                context.drawImage(this.bunshin, 0, 0, 91, 91, w-100, h-110, 91, 91);
            }
            else {
                context.drawImage(this.bunshinCooldown, 0, 0, 91, 91, w-100, h-110, 91, 91);
            }
        }

    }
}
