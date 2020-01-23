
const movableObject = require( './movableObject.js')

class Piglet extends movableObject{
    constructor(map, x, y, id) {
        super(map, x, y, id);
        this.speed = 2;
        this.hitBoxSize = [6, 3];
        this.actionCooldown = 1;
    }

    performAction(type, dX, dY) {
        const [dirX, dirY] = getDir(this.x, this.y, dX, dY);
        switch (type) {
            case 'farm':
                break;
            default:
                break;
        }
    }
}

module.exports = Piglet;