import Sprite from './sprite.js'
import Player from './player.js'

export default class Wolf extends Player{
    constructor(id, x, y, width, height, moveDir){
        super(id, x, y, width, height, moveDir)
        this.sprites = {
            south: new Sprite('https://i.imgur.com/0IYjwwA.png', 64, 64, 24, [0, 256], this, 1),
            southWest: new Sprite('https://i.imgur.com/0IYjwwA.png', 64, 64, 24, [0, 384], this, 1),
            southEast: new Sprite('https://i.imgur.com/0IYjwwA.png', 64, 64, 24, [0, 320], this, 1),
            west: new Sprite('https://i.imgur.com/0IYjwwA.png', 64, 64, 24, [0, 458], this, 1),
            east: new Sprite('https://i.imgur.com/0IYjwwA.png', 64, 64, 24, [0, 0], this, 1),
            north: new Sprite('https://i.imgur.com/0IYjwwA.png', 64, 64, 24, [0, 64], this, 1),
            northWest: new Sprite('https://i.imgur.com/0IYjwwA.png', 64, 64, 24, [0, 192], this, 1),
            northEast: new Sprite('https://i.imgur.com/0IYjwwA.png', 64, 64, 24, [0, 128], this, 1),
            attacksouth: new Sprite('https://i.imgur.com/alBEL87.png', 64, 64, 24, [0, 256], this, 1),
            attacksouthWest: new Sprite('https://i.imgur.com/alBEL87.png', 64, 64, 24, [0, 384], this, 1),
            attacksouthEast: new Sprite('https://i.imgur.com/alBEL87.png', 64, 64, 24, [0, 320], this, 1),
            attackwest: new Sprite('https://i.imgur.com/alBEL87.png', 64, 64, 24, [0, 458], this, 1),
            attackeast: new Sprite('https://i.imgur.com/alBEL87.png', 64, 64, 24, [0, 0], this, 1),
            attacknorth: new Sprite('https://i.imgur.com/alBEL87.png', 64, 64, 24, [0, 64], this, 1),
            attacknorthWest: new Sprite('https://i.imgur.com/alBEL87.png', 64, 64, 24, [0, 192], this, 1),
            attacknorthEast: new Sprite('https://i.imgur.com/alBEL87.png', 64, 64, 24, [0, 128], this, 1),
            ko: new Sprite('https://i.imgur.com/6PS0N2Y.png', 64, 64, 24, [0, 0], this, 5),
            death: new Sprite('https://i.imgur.com/SJ2JaE7.png', 64, 64, 24, [0, 64], this, 5),
        };
    }
}