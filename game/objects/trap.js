
const GObject = require('./object.js')

class Trap extends GObject {

    constructor(game, id, x, y) {
        super(game, id, x, y);
        this.hitBox = [100 , 300];
        this.phasable = true;
        this.sprung = false;
        this.delete = false;
    }
    trigger(wolf){
        if(!this.sprung){
            wolf.kill();
            this.sprung = true;
            setTimeout( ()=> {
                this.delete = true;
            }, 2000)
        }
    }
    toObj(){
        return {
            id: this.id,
            x: this.x, y: this.y,
            width: this.hitBox[0],
            height: this.hitBox[1],
            params: { sprung: this.sprung, delete: this.delete}
        }
    }
}

module.exports = Trap;