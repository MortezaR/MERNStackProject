import React from 'react';
import Game from './client/game'
import io from "socket.io-client";

class Canvas extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.game = null;
    this.socket = io.connect("http://localhost:8000");
  }

  playGame() {
    console.log(this.socket)
    this.game = new Game();
    this.socket.on('newPlayer', (playerData) => this.game.addNewPlayer(playerData))
    this.socket.on('currentPlayers', (playersData) => this.game.addCurrentPlayers(playersData))
    this.socket.on('disconnect', (id) => this.game.disconnectPlayer(id))
    this.socket.on('updatePlayer', (playerData) => this.game.gameLoop(playerData))

  }

  handleClick(e) {
    let clickPos = [e.clientX + this.game.camera.xView, e.clientY + this.game.camera.yView]
    let playerPos = [this.game.player.x, this.game.player.y]
    let vector = this.findNormalizedVector(clickPos, playerPos)
    let moveData = { vector, clickPos }
    this.socket.emit('newClickMove', moveData)
  }

  findNormalizedVector(pos1, pos2) {
    let xVector = pos1[0] - pos2[0];
    let yVector = pos1[1] - pos2[1];
    let distance = Math.sqrt(Math.pow(xVector, 2) + Math.pow(yVector, 2))
    let normalVector = [(xVector / distance * 1.0), (yVector / distance * 1.0)]
    return normalVector;
  }

  componentDidMount() {
    this.playGame();
  }

  render() {
    return (
      <div>
        <div>Hello</div>
        <canvas id="canvas" onClick={this.handleClick} width={500} height={500}></canvas>
      </div>
    )
  }
}

export default Canvas
