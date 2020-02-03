const Food = require( './objects/food.js')
const Wall = require('./objects/wall')
const HTerminal = require('./objects/hterminal')
const Teleporter = require('./objects/teleporter.js')
const Trap = require('./objects/trap.js')
const utils = require('./util.js')
const hitBoxTouch = utils.hitBoxTouch;

class Map {
    constructor(height, width, spawnLocation, game){
        this.height = height;
        this.width = width;
        this.spawnLocation = spawnLocation;
        this.game = game;
        this.gameObjects = {};
        this.playerObjects = {};
        this.getObjects = this.getObjects.bind(this);
        this.objCounts ={
            wall: 10000,
            food: 20000,
            hTerminal: 30000,
            teleporter:40000,
            trap: 100000
        }
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
                this.objCounts.food += 1;
                objParams.push(this.objCounts.food);
                obj = new Food(...objParams)
                break;
            case 'wall':
                this.objCounts.wall += 1;
                objParams.push(this.objCounts.wall);
                obj = new Wall(...objParams)
                break;
            case 'hTerminal':
                this.objCounts.hTerminal += 1;
                objParams.push(this.objCounts.hTerminal);
                obj = new HTerminal(...objParams)
                break;
            case 'teleporter':
                this.objCounts.teleporter += 1;
                objParams.push(this.objCounts.teleporter);
                obj = new HTerminal(...objParams)
                obj = new Teleporter(...objParams)
                break;
            case 'trap':
                this.objCounts.trap += 1;
                objParams.push(this.objCounts.trap);
                obj = new Trap(...objParams)
                break;
            default:
                return null;

        }
        if(obj) {
            this.gameObjects[obj.id] = obj;
        }
    }
    addPlayerObject(obj){
        this.playerObjects[obj.id] = obj;
    }
    setSpawnLocation(x, y){
        this.spawnLocation = [x,y];
    }

    generateDefaultMap(){
        this.addObject('wall', this.game, 10001, 2100, 2000);
        this.addObject('wall', this.game, 10002, 2100, 2100);
        this.addObject('wall', this.game, 10003, 2000, 2100);
        this.addObject('wall', this.game, 10004, 1900, 2100);

        
        this.addObject('food', this.game, 20001, 2000, 2000);


        this.addObject('hTerminal', this.game, 30001, 2700, 2700);


        this.addObject('teleporter', this.game, 2000, 40001, 2500, 2500, 3000);


    }
}

module.exports = Map;