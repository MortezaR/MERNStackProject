import Map from './map'
import Camera from './camera'
import Player from './player'

export default class Game{
  constructor(){
    this.FPS = 30;
    this.otherPlayers = {};
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
      let follow = this.camera.follow.bind(this);
      setTimeout(() => {
        follow(this.player, this.vWidth / 2, this.vHeight / 2)
      }, 1000);
    } else {
      let { id, x, y, width, height } = playerData;
      let player = new Player(id, x, y, width, height);
      this.otherPlayers[player.id] = player;
    } 
  }

  addCurrentPlayers(playersData){
    Object.values(playersData).forEach(playerData => {
      let { id, x, y, width, height } = playerData
      let player = new Player(id, x, y, width, height)
      this.otherPlayers[player.id] = player;
    })
  }

  update(playerData){
    Object.values(playerData).forEach((data) => {
      if (data.id === this.myId) {
        this.player.update(data.x, data.y);
        this.camera.update();
      } else if (this.otherPlayers[data.id]) {
        this.otherPlayers[data.id].update(data.x, data.y);
      }
    })
  }

  draw(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.room.map.draw(this.context, this.camera.xView, this.camera.yView);
    this.player.draw(this.context, this.camera.xView, this.camera.yView)
    Object.keys(this.otherPlayers).forEach(key => {
      this.otherPlayers[key].draw(this.context, this.camera.xView, this.camera.yView)
    })
  }

  gameLoop(playerData){
    this.update(playerData);
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
    console.log("player disconnected")
    delete this.otherPlayers[id];
  }
}





