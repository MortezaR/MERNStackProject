import Map from './map'
import Camera from './camera'
import Player from './player'
import Wolf from './wolf'
import Piglet from './piglet'
import GObject from './gobject';
import resBar from './resBar'

export default class Game{
  constructor(){
    this.otherPlayers = {};
    this.objects = {};
    this.player = null;
    this.camera = null;
    this.resBar = null;
    this.myId = null;
    this.room = null;
    this.canvas = document.getElementById("canvas")
    this.vWidth = this.canvas.width;
    this.vHeight = this.canvas.height;
    this.context = this.canvas.getContext("2d");
    this.gameLoop = this.gameLoop.bind(this)
  }

  addNewPlayer(playerData, wolf){
    this.room = {
      width: 5000,
      height: 5000,
      map: new Map(5000, 5000)
    };
    this.room.map.generate();
    if (this.myId === null && wolf) {
      console.log("new player created")
      let { id, x, y, width, height } = playerData;
      this.myId = playerData.id;
      this.player = new Wolf (id, x, y, width, height);
      this.camera = new Camera(0, 0, this.vWidth, this.vHeight, this.room.width, this.room.height);
      this.resBar = new resBar();
      let follow = this.camera.follow.bind(this);
      this.camera.follow(this.player, this.vWidth / 2, this.vHeight / 2)  
    } else if (this.myId === null) {
      let { id, x, y, width, height } = playerData;
      this.myId = playerData.id;
      this.player = new Piglet(id, x, y, width, height);
      this.camera = new Camera(0, 0, this.vWidth, this.vHeight, this.room.width, this.room.height);
      this.resBar = new resBar();
      let follow = this.camera.follow.bind(this);
      this.camera.follow(this.player, this.vWidth / 2, this.vHeight / 2)  
    } 
  }

  addCurrentPlayers(playersData){
    console.log("im adding current players")
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
        this.resBar.update(data.resource);
        this.camera.update();
      } else if (this.otherPlayers[data.id]) {
        // this.otherPlayers[data.id].update(data.x, data.y, data.moveDir, data.resource);
      }
    })
  }
  updateObjects(objectsData){
    Object.values(objectsData).forEach((data) => {
      if (data.id in this.objects){
        this.objects[data.id].update(data.x, data.y, data.params);
      }else{
        this.objects[data.id] = new GObject(data.id, data.x, data.y,
           data.width, data.height, data.params, this.player instanceof Wolf);
      }}
      )
  }
  gameLoop(playerData, gameData){
    // console.log(gameData);
    this.updatePlayers(playerData);
    this.updateObjects(gameData);
    if (this.player){
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.room.map.draw(this.context, this.camera.xView, this.camera.yView);
      Object.keys(this.objects).forEach(key => {
        this.objects[key].draw(this.context, this.camera.xView, this.camera.yView)
      })
      Object.keys(this.otherPlayers).forEach(key => {
        this.otherPlayers[key].draw(this.context, this.camera.xView, this.camera.yView)
      })
      this.player.draw(this.context, this.camera.xView, this.camera.yView)
      this.resBar.draw(this.context);
    }
    
  }

  disconnectPlayer(id){
    console.log("player disconnected");
    delete this.otherPlayers[id];
  }
}





