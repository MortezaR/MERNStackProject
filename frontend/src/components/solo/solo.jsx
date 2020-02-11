import React from 'react';
import Game from '../../client/game'
import Sound from 'react-sound';
import worldMusic from '../../assets/sound/gflop.mp3';

class SoloGameCanvas extends React.Component {
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

    playGame() {
        this.game = new Game(this.props.myId);
        this.game.solo = true;
        this.socket.on('newWolf', (playerData) => {
            console.log('new wolf incoming')
            this.game.addNewPlayer(playerData, true);
        })
        this.socket.on('newPiglet', (playerData) => this.game.addNewPlayer(playerData, false))
        this.socket.on('endGame', () => {
            this.game.gameOver = true;
            setTimeout(() => {
                this.props.backToInstructions();
            }, 5000)
        })
        this.socket.on('disconnectHost', () => this.disconnectHost())
        this.socket.on('updateGame', (playerData, gameData, gameInfo) => this.game.gameLoop(playerData, gameData, gameInfo))
        setTimeout(() => {
            let data = { roomName: this.props.roomName, roomId: this.props.roomId, map: this.props.map }
            if (this.props.host) this.socket.emit('soloPlayerReady', data)
        }, 1000);
    }

    disconnectHost() {
        this.game.gameOver = true;
        this.props.backToLobby();
    }

    handleClick(e) {
        if (this.game.canvas && !this.game.gameOver) {
            const rect = this.game.canvas.getBoundingClientRect()
            const canvasX = e.clientX - rect.left
            const canvasY = e.clientY - rect.top
            let clickPos = [canvasX + this.game.camera.xView, canvasY + this.game.camera.yView]
            let moveData = { clickPos, type: "move", gameId: this.props.myId }
            this.socket.emit('newClickMove', moveData)
        }
    }

    handleRightClick(e) {
        e.preventDefault();
        if (this.game.canvas && !this.game.gameOver) {
            let clickPos = [e.clientX + this.game.camera.xView, e.clientY + this.game.camera.yView];
            this.game.player.attacking = true;
            let moveData = { clickPos, type: "attack", gameId: this.props.myId }
            this.socket.emit('newClickMove', moveData);
        }
    }

    handleKeyPress(e) {
        if (this.game.canvas && !this.game.gameOver) {
            e.preventDefault();
            let clickPos = [e.clientX + this.game.camera.xView, e.clientY + this.game.camera.yView]
            let moveData = { clickPos, type: "trap", gameId: this.props.myId }
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
        let width = window.innerWidth > 1600 ? 1600 : window.innerWidth
        let height = window.innerHeight > 800 ? 800 : window.innerHeight
        return (
            <div>
                <canvas
                    id="canvas"
                    className="game-canvas"
                    onClick={this.handleClick}
                    onContextMenu={this.handleRightClick}
                    width={width}
                    height={height - 55}>
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

export default SoloGameCanvas
