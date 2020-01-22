import Map from './map'
import Camera from './camera'
import Player from './player'

export default class Game{
  constructor(){
    this.FPS = 30;
    // this.INTERVAL = 1000/this.FPS;
    // this.STEP = INTERVAL / 1000;
    this.player = null;
    this.players = {};
    this.camera = null;
    this.myId = null;
    // this.vWidth = Math.min(this.room.width, this.canvas.width);
    this.vWidth = Math.min(5000, 500);
    this.vHeight = Math.min(5000, 500);
    // this.vHeight = Math.min(this.room.height, this.canvas.height);
    this.canvas = document.getElementById("canvas")
    this.context = this.canvas.getContext("2d");
    this.room = null;
    this.gameLoop = this.gameLoop.bind(this)

  }

  addNewPlayer(playerData){
    console.log("set to receive new player and this is my canvas")
    console.log(this.canvas)
    this.room = {
      width: 5000,
      height: 5000,
      map: new Map(5000, 5000)
    };
    this.room.map.generate();
      if (this.myId === null) {
        console.log("new player created")
        let { id, x, y, width, height } = playerData
        this.myId = playerData.id;
        this.player = new Player(id, x, y, width, height)
        this.camera = new Camera(0, 0, this.vWidth, this.vHeight, this.room.width, this.room.height);
        console.log(this.player)
        console.log(this.camera)
        this.camera.follow(this.player, this.vWidth / 2, this.vHeight / 2)
      } else {
        console.log("new opponent setup")
        
        let { id, x, y, width, height } = playerData
        let opponent = new Player(id, x, y, width, height)
        this.players[opponent.id] = opponent
        console.log(this.players)
      }
      
    }

  addCurrentPlayers(playersData){
      console.log("receiving current players")
      let playersDataArray = Object.values(playersData)
      playersDataArray.forEach(playerData => {
        let { id, x, y, width, height } = playerData
        let opponent = new Player(id, x, y, width, height)
        this.players[opponent.id] = opponent;
      })
      console.log(this.players)
  }

  update(playerData){
    let playerDataValues = Object.values(playerData)
    playerDataValues.forEach((data) => {
      if (data.id === this.myId) {
        this.player.update(data.x, data.y);
        this.camera.update();
      } else if (this.players[data.id]) {
        this.players[data.id].update(data.x, data.y);
      }
    })
  }

  draw(){
    console.log("im drawing")
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.room.map.draw(this.context, this.camera.xView, this.camera.yView);
    this.player.draw(this.context, this.camera.xView, this.camera.yView)
    Object.keys(this.players).forEach(key => {
      this.players[key].draw(this.context, this.camera.xView, this.camera.yView)
    })
  }

  gameLoop(playerData){
    console.log(this.player)
    console.log(this.camera)
    this.update(playerData);
    if (this.player){
      console.log(this.room.map)
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.room.map.draw(this.context, this.camera.xView, this.camera.yView);
      this.player.draw(this.context, this.camera.xView, this.camera.yView)
      Object.keys(this.players).forEach(key => {
        this.players[key].draw(this.context, this.camera.xView, this.camera.yView)
      })
    }
  }


  
  disconnectPlayer(id){
    console.log("player disconnected")
    delete this.players[id]
  }

}





