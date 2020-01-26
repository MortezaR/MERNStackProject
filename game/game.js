const Player = require('./player.js') 
const Map = require('./map.js')

class Game {
    constructor(){
        this.map = new Map(5000, 5000, [2500, 2500], this);
        this.players = {};
    }
    addPlayer(id){
        console.log('added_player')

        let numPlayers = Object.keys(this.players).length;
        switch (numPlayers) {
            case 0:
                this.players[id] = (new Player(id, 'bbw', this,
                    this.map.spawnLocation[0], this.map.spawnLocation[1]));
                break;
            case 1:
                this.players[id] = (new Player(id, 'piglet', this,
                    0 + this.map.spawnLocation[0], 200 + this.map.spawnLocation[1]));
                break;
            case 2:
                this.players[id] = (new Player(id, 'piglet', this,
                    200 + this.map.spawnLocation[0], 200 + this.map.spawnLocation[1]));
                break;
            case 3:
                this.players[id] = (new Player(id, 'piglet', this,
                    200 + this.map.spawnLocation[0], 0 + this.map.spawnLocation[1]));
                break;
        
            default:
                break;
        }
    }
    getPlayers(){
        let retVal = {};
        Object.keys(this.players).forEach(player => {
            retVal[player] = this.players[player].toObj();
        })
        return retVal;
    }
    getObjects(){
        let retVal = {};
        Object.keys(this.map.gameObjects).forEach(objId => {
            retVal[objId] = this.map.gameObjects[objId].toObj();
        })
        return retVal;
    }
    getPlayer(playerId){
        let retVal = null;
        Object.keys(this.players).forEach(player => {
            if (player === playerId){
                retVal = this.players[playerId];
            }
        })
        return retVal;
    }
    getPlayerbyObj(objId){
        let retVal = null;
        Object.keys(this.players).forEach(playerId => {
            let player = this.players[playerId];
            if (player.object.id === objId) {
                retVal = this.players[player.id];
            }
        })
        return retVal;
    }
    deletePlayer(playerId){
        delete this.map.playerObjects[playerId];
        delete this.players[playerId];
    }
}

module.exports = Game;