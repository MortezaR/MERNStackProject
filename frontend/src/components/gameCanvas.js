import React from 'react';
import Game from '../client/game'
import Sound from 'react-sound';
import worldMusic from '../assets/sound/gflop.mp3';
import { playSound } from '../util/sound_util';

class GameCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.game = null;
    this.canvas = null;
    this.socket = this.props.socket;
    this.state = {
      sound: 'Sound.status.PAUSED'
    }
  }

  // componentDidMount(){
    // this.canvas = document.getElementById("canvas");
    // this.canvas = document.querySelector("#canvas");
    // console.log(this.canvas)
  // }

  playGame() {
    console.log("setting up new game")
    this.game = new Game(this.props.myId);
    this.socket.on('newWolf', (playerData) => this.game.addNewPlayer(playerData, true))
    this.socket.on('newPiglet', (playerData) => this.game.addNewPlayer(playerData, false))
    this.socket.on('currentPlayers', (playersData) => this.game.addCurrentPlayers(playersData))
    this.socket.on('endGame', (gameWinner) => {
      this.game.gameOver = true;
      setTimeout(() => {
        this.props.backToLobby();
      }, 5000)
    })
    this.socket.on('disconnectUser', (id) => this.game.disconnectPlayer(id))
    this.socket.on('disconnectHost', () => this.disconnectHost())
    this.socket.on('updateGame', (playerData, gameData, gameInfo) => this.game.gameLoop(playerData, gameData, gameInfo))
    setTimeout(() => {
      console.log("players are all ready timeout")
      console.log(this.props);
      let data = {roomName: this.props.roomName, roomId: this.props.roomId, map: this.props.map}
      if (this.props.host) this.socket.emit('playersAllReady', data)
    }, 1000);
  }

  disconnectHost(){
    this.game.gameOver = true;
    this.props.backToLobby();
  }

  handleClick(e) {
    console.log("iminside move data")
    if(this.game.canvas && !this.game.gameOver){
      
      const rect = this.game.canvas.getBoundingClientRect()
      const canvasX = e.clientX - rect.left
      const canvasY = e.clientY - rect.top
      let clickPos = [canvasX + this.game.camera.xView, canvasY + this.game.camera.yView]
      let moveData = { clickPos, type: "move", gameId: this.props.roomId }
      this.socket.emit('newClickMove', moveData)
      console.log(moveData)
    }
  }

  handleRightClick(e) {
    e.preventDefault();
    if (this.game.canvas && !this.game.gameOver) {
      let clickPos = [e.clientX + this.game.camera.xView, e.clientY + this.game.camera.yView];
      this.game.player.attacking = true;
      let moveData = { clickPos, type: "attack", gameId: this.props.roomId  }
      this.socket.emit('newClickMove', moveData);
      // playSound('rClick');
    }
  }

  handleKeyPress(e) {
    if (this.game.canvas && !this.game.gameOver) {
      e.preventDefault();
      let clickPos = [e.clientX + this.game.camera.xView, e.clientY + this.game.camera.yView]
      let moveData = { clickPos, type: "trap", gameId: this.props.roomId  }
      this.socket.emit('newClickMove', moveData)
    }
  }

  componentDidMount() {
    this.playGame();
    window.addEventListener('keypress', this.handleKeyPress);
    this.setState({
      sound: 'Sound.status.PLAYING'
    })

  }



  render() {
    console.log(this.handleClick)
    return (
      <div>
        <canvas 
          id="canvas" 
          className="game-canvas"
          onClick={this.handleClick} 
          onContextMenu={this.handleRightClick} 
          width={window.innerWidth} 
          height={window.innerHeight - 55}>
        </canvas>
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
