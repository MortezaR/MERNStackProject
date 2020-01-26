const Food = require( './objects/food.js')
const Wall = require('./objects/wall')
const BigBadWolf = require( './objects/bigbadwolf.js')
const Piglet = require( './objects/piglet.js')
const utils = require('./util.js')
const hitBoxTouch = utils.hitBoxTouch;

class Map {
    constructor(height, width, game){
        this.height = height;
        this.width = width;
        this.spawnLocation = [2500,2500];
        this.game = game;
        this.gameObjects = {};
        this.playerObjects = {};
        this.getObjects = this.getObjects.bind(this);
        this.generateDefaultMap();
    }
    getDim(){
        return [this.width,this.height];
    }
    getObjects(coord){
        //function is wrong and needs to be edit
        let retVal = {};
        let allObj = this.getAllObjects();
        Object.keys(allObj).forEach(key => {
            let obj = allObj[key];
            if(hitBoxTouch(coord, obj.getHitBox())){
                retVal[obj.id] = obj;
            }
        });
        return retVal;
    }
    getAllObjects(){
        // return this.gameObjects.concat(this.playerObjects);
        return Object.assign({}, this.gameObjects, this.playerObjects);
    }
    addObject(objType, ...objParams){
        let obj;
        switch (objType) {
            case 'food':
                obj = new Food(...objParams)
                break;
            case 'wall':
                obj = new Wall(...objParams)
                break;
            default:
                return null;

        }
        if(obj) {
            this.gameObjects[obj.id] = obj;
        }
        console.log(this.gameObjects);
    }
    addPlayerObject(obj){
        this.playerObjects[obj.id] = obj;
    }
    setSpawnLocation(x, y){
        this.spawnLocation = [x,y];
    }

    generateDefaultMap(){
        this.addObject('food', this.game, 2000, 2000, 1);
        this.addObject('wall', this.game, 2100, 2000, 2);
        this.addObject('wall', this.game, 2100, 2100, 3);
        this.addObject('wall', this.game, 2000, 2100, 4);
        this.addObject('wall', this.game, 1900, 2100, 5);
    }
}

module.exports = Map;