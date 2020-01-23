const Tree = require( './objects/tree.js')
const BigBadWolf = require( './objects/bigbadwolf.js')
const Piglet = require( './objects/piglet.js')
// const {isBetween} from 'util.js'
class Map {
    constructor(height, width){
        this.height = height;
        this.width = width;
        this.gameObjects = [];
        this.playerObjects = [];
        this.getObjects = this.getObjects.bind(this);
    }
    getDim(){
        return [this.width,this.height];
    }
    getObject(objectIndex){
        return this.gameObjects[objectIndex];
    }
    getObjects(sX, sY, eX, eY){
        //function is wrong and needs to be edit
        return this.gameObjects.map(obj => {
            // return isBetween(obj.x,sX, eX) && isBetween(obj.y, sY, eY) ? obj : null
        });
    }
    getAllObjects(){
        return this.gameObjects.concat(this.playerObjects);
    }
    addObject(objType, ...objParams){
        let obj;
        switch (objType) {
            case 'tree':
                obj = new Tree(objParams)
                break
        }
        if(obj) {
            this.gameObjects.push(obj);
        }
    }
    addPlayerObject(obj){
        this.playerObjects.push(obj);
    }
}

module.exports = Map;