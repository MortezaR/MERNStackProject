import Map from './map'
import Camera from './camera'
import Player from './player'

export default class Game{
  constructor(){
    this.otherPlayers = {};
    this.objects = {};
    this.player = null;
    this.camera = null;
    this.myId = null;
    this.room = null;
    this.canvas = document.getElementById("canvas")
    this.vWidth = this.canvas.width;
    this.vHeight = this.canvas.height;
    this.context = this.canvas.getContext("2d");
    this.gameLoop = this.gameLoop.bind(this)
  }

  addNewPlayer(playerData){
    this.room = {
      width: 5000,
      height: 5000,
      map: new Map(5000, 5000)
    };
    this.room.map.generate();
    if (this.myId === null) {
      console.log("new player created")
      let { id, x, y, width, height } = playerData;
      this.myId = playerData.id;
      this.player = new Player(id, x, y, width, height);
      this.camera = new Camera(0, 0, this.vWidth, this.vHeight, this.room.width, this.room.height);
      this.camera.follow(this.player, this.vWidth / 2, this.vHeight / 2)
    } else {
      // console.log("other player created")
      // debugger
      // let { id, x, y, width, height } = playerData;
      // let player = new Player(id, x, y, width, height);
      // this.otherPlayers[player.id] = player;
    } 
  }

  addCurrentPlayers(playersData){
    console.log("im adding current players")
    debugger
    Object.values(playersData).forEach(playerData => {
      let { id, x, y, width, height } = playerData
      let player = new Player(id, x, y, width, height)
      this.otherPlayers[player.id] = player;
    })
  }

  updatePlayers(playersData){
    Object.values(playersData).forEach((data) => {
      if (data.id === this.myId) {
        this.player.update(data.x, data.y, data.moveDir);
        this.camera.update();
      } else if (this.otherPlayers[data.id]) {
        this.otherPlayers[data.id].update(data.x, data.y, data.moveDir);
        console.log(this.otherPlayers)
      }
    })
    }

  // draw(){
  //   this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  //   this.room.map.draw(this.context, this.camera.xView, this.camera.yView);
  //   this.player.draw(this.context, this.camera.xView, this.camera.yView)
  //   Object.keys(this.otherPlayers).forEach(key => {
  //     this.otherPlayers[key].draw(this.context, this.camera.xView, this.camera.yView)
  //   })
  // }

  gameLoop(gameData){
    this.updatePlayers(gameData);
    if (this.player){
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.room.map.draw(this.context, this.camera.xView, this.camera.yView);
      this.player.draw(this.context, this.camera.xView, this.camera.yView)
      Object.keys(this.otherPlayers).forEach(key => {
        this.otherPlayers[key].draw(this.context, this.camera.xView, this.camera.yView)
      })
    }
    
  }

  disconnectPlayer(id){
    console.log("player disconnected");
    delete this.otherPlayers[id];
  }
}





