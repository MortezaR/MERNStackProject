const Player = require('./player.js') 
const Map = require('./map.js')

class Game {
    constructor(){
        this.map = new Map();
        this.players = {};
    }
    addPlayer(id, playerType, x, y){
        this.players[id] = (new Player(id, playerType, this.map, x, y));
        console.log('added_player')
    }
    getPlayers(){
        let retVal = {};
        Object.keys(this.players).forEach(player => {
            retVal[player] = this.players[player].toObj();
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
    deletePlayer(playerId){
        this.map.playerObjects
        //delete player from the map
        delete this.players[playerId];
    }
}

module.exports = Game;