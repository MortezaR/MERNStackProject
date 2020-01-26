import React from 'react';
import Game from '../client/game'
import io from "socket.io-client";
import Sound from 'react-sound';
import worldMusic from '../assets/sound/gflop.mp3';


class gameCanvas extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleRightClick = this.handleRightClick.bind(this)
    this.game = null;
    this.socket = io.connect("http://localhost:8000");
    this.state = {
      sound: 'Sound.status.MUTED'
    }
  }

  playGame() {
    this.game = new Game();
    this.socket.on('newPlayer', (playerData) => this.game.addNewPlayer(playerData))
    this.socket.on('currentPlayers', (playersData) => this.game.addCurrentPlayers(playersData))
    this.socket.on('disconnect', (id) => this.game.disconnectPlayer(id))
    this.socket.on('updateGame', (playerData, gameData) => this.game.gameLoop(playerData, gameData))
    // this.socket.on('updateGame', (gameData) => this.game.gameLoop(playerData))

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

    this.setState({
      sound: 'Sound.status.PLAYING'
    })

  }



  render() {
    return (
      <div>
        <canvas id="canvas" onClick={this.handleClick} onContextMenu={this.handleRightClick} width={1000} height={1000}></canvas>
        <Sound
          url={worldMusic}
          onClick={this.handleSoundClick}
          playStatus={`${this.state.sound}`}
          playFromPosition={30 /* in milliseconds */}
          loop="true"
          volume="50"
        />
      </div>
    )
  }
}

export default gameCanvas
