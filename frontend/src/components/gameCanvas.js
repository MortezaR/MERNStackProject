import React from 'react';
import Game from '../client/game'
import Sound from 'react-sound';
import worldMusic from '../assets/sound/gflop.mp3';


class GameCanvas extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleRightClick = this.handleRightClick.bind(this)
    this.game = null;
    this.socket = this.props.socket;
    this.state = {
      sound: 'Sound.status.PAUSED'
    }
  }

  playGame() {
    console.log("setting up new game")
    this.game = new Game();
    this.socket.on('newPlayer', (playerData) => this.game.addNewPlayer(playerData))
    this.socket.on('currentPlayers', (playersData) => this.game.addCurrentPlayers(playersData))
    this.socket.on('disconnectUser', (id) => this.game.disconnectPlayer(id))
    this.socket.on('disconnectHost', () => this.disconnectHost())
    this.socket.on('updatePlayer', (playerData) => this.game.gameLoop(playerData))
    console.log(this.game)
    setTimeout(() => {
      console.log("players are all ready timeout")
      let data = {roomName: this.props.roomName, roomId: this.props.roomId}
      if (this.props.host) this.socket.emit('playersAllReady', data)
    }, 1000);
  }

  disconnectHost(){
    this.props.backToLobby();
  }

  handleClick(e) {
    let clickPos = [e.clientX + this.game.camera.xView, e.clientY + this.game.camera.yView]
    let moveData = { clickPos, type: "move", gameId: this.props.roomId}
    this.socket.emit('newClickMove', moveData)
    console.log(moveData)
    console.log("movedata")
  }

  handleRightClick(e) {
    e.preventDefault();
    let clickPos = [e.clientX + this.game.camera.xView, e.clientY + this.game.camera.yView]
    let moveData = { clickPos, type: "attack", gameId: this.props.roomId }
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
          playStatus={`PLAYING`}
          playFromPosition={30 /* in milliseconds */}
          loop={true}
          volume={1}
        />
      </div>
    )
  }
}

export default GameCanvas
