import React from 'react';
import Game from '../client/game'
import io from "socket.io-client";

class gameCanvas extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleRightClick = this.handleRightClick.bind(this)
    this.game = null;
    this.socket = io.connect("http://localhost:8000");
  }

  playGame() {
    this.game = new Game();
    this.socket.on('newPlayer', (playerData) => this.game.addNewPlayer(playerData))
    this.socket.on('currentPlayers', (playersData) => this.game.addCurrentPlayers(playersData))
    this.socket.on('disconnect', (id) => this.game.disconnectPlayer(id))
    this.socket.on('updatePlayer', (playerData) => this.game.gameLoop(playerData))

  }

  handleClick(e) {
    let clickPos = [e.clientX + this.game.camera.xView, e.clientY + this.game.camera.yView]
    let moveData = { clickPos, type: "move" }
    this.socket.emit('newClickMove', moveData)
  }

  handleRightClick(e) {
    e.preventDefault();
    let clickPos = [e.clientX + this.game.camera.xView, e.clientY + this.game.camera.yView]
    let moveData = { clickPos, type: "attack" }
    this.socket.emit('newClickMove', moveData)
  }

  componentDidMount() {
    this.playGame();
  }

  render() {
    return (
      <div>
        <div>Hello</div>
        <canvas id="canvas" onClick={this.handleClick} onContextMenu={this.handleRightClick} width={500} height={500}></canvas>
      </div>
    )
  }
}

export default gameCanvas
