const Food = require( './objects/food.js')
const Wall = require('./objects/wall')
const HTerminal = require('./objects/hterminal')
const Teleporter = require('./objects/teleporter.js')
const Trap = require('./objects/trap.js')
const Deposit = require('./objects/deposit')
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
        this.hTerminals = 0;
        this.getObjects = this.getObjects.bind(this);
        this.objCounts ={
            wall: 10000,
            food: 20000,
            hTerminal: 30000,
            teleporter: 40000,
            deposit: 50000,
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
                obj = new Food(this.game, this.objCounts.food, ...objParams);
                break;
            case 'wall':
                this.objCounts.wall += 1;
                obj = new Wall(this.game, this.objCounts.wall, ...objParams);
                break;
            case 'hTerminal':
                console.log(this.game.terminalsLeft);
                this.objCounts.hTerminal += 1;
                obj = new HTerminal(this.game, this.objCounts.hTerminal, ...objParams);
                this.hTerminals += 1;
                this.game.terminalsLeft += 1;
                console.log(this.game.terminalsLeft);
                break;
            case 'teleporter':
                this.objCounts.teleporter += 1;
                obj = new Teleporter(this.game, this.objCounts.teleporter, ...objParams);
                break;
            case 'deposit':
                console.log(this.game.resourcesLeft);
                this.objCounts.deposit += 1;
                obj = new Deposit(this.game, this.objCounts.deposit, ...objParams);
                this.game.resourcesLeft = obj.hp;
                console.log(this.game.resourcesLeft);
                break;
            case 'trap':
                this.objCounts.trap += 1;
                obj = new Trap(this.game, this.objCounts.trap, ...objParams);
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
        // this.addObject('wall', 2100, 2000);
        // this.addObject('wall', 2100, 2100);
        // this.addObject('wall', 2000, 2100);
        // this.addObject('wall', 1900, 2100);

        
        this.addObject('food', 2000, 2000);


        this.addObject('hTerminal', 2700, 2700);

        this.addObject('teleporter', 2000, 2500, 2500, 3000);
        this.addObject('trap', 3000, 2500);
        this.addObject('deposit', 2600, 2800);

        // this.addObject('deposit', 2700, 2700);


    }
}

module.exports = Map;