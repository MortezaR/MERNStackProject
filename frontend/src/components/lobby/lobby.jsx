import React from 'react';
import io from "socket.io-client";
import Display from './display';
import './lobby.scss';
import GameCanvas from '../gameCanvas'

class Lobby extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            rooms: {},
            messages: [],
            currentMessage: '',
            username: this.props.currentUser.username,
            myRoomId: '',
            myChatters: {},
            myRoomName: '',
            myId: '',
            requestedRoomName: '',
            inLobby: false,
            inGame: false
        }
        this.socket = io.connect("http://localhost:7000");
        this.handleSubmit = this.handleSubmit.bind(this)
        this.readyPlayer = this.readyPlayer.bind(this)
        this.startGame = this.startGame.bind(this)
        this.backToLobby = this.backToLobby.bind(this)
    }

    componentWillUnmount(){
        this.socket.emit('disconnect')
    }

    componentDidMount(){
        this.socket.on('setupNewChatter', (data) => {
            console.log("im receiving my own info")
            this.setState({
                myId: data.id,
                rooms: data.rooms
            })
        })

        this.socket.on('joinRoomInfo', (data) => {
            console.log("im receiving room info")
            this.setState({
                myChatters: data.chatters,
                myRoomName: data.roomName,
                myRoomId: data.roomId,
                inLobby: true
            })
        })

        this.socket.on('updateRoomsInfo', (data) => {
            console.log("im updating rooms info")
            this.setState({
                rooms: data
            })
        })

        this.socket.on('updateChattersInfo', (data) => {
            console.log("im updating chatters info")
            this.setState({
                myChatters: data
            })
        })

        this.socket.on('clearMsg', () => {
            console.log("im clearing msg")
            this.setState({
                messages: []
            })
        })

        this.socket.on('disconnectUser', (id) => {
            console.log("a user disconnected")
            let myChatters = this.state.myChatters
            if (Object.keys(this.state.myChatters).includes(id)){
                delete this.state.myChatters[id]
            }
            this.setState({
                myChatters
            })
        })

        this.socket.on('newMessage', (data) => {
            console.log(data)
            let {messages} = this.state
            let message = {
                currentMessage: data.currentMessage, 
                username: data.username
            }
            messages.push(message)
            this.setState({
                messages: messages
            })
        })

        this.socket.on('playerIsReady', (data) => {
            console.log('im ready')
            let myChatters = this.state.myChatters
            myChatters[data.id].ready = data.ready;
            this.setState({
                myChatters
            })
        })

        this.socket.on('deleteRoom', () => {
            console.log('deleting room')
            this.setState({
                messages: [],
                currentMessage: '',
                username: this.props.currentUser.username,
                myRoomId: '',
                myChatters: {},
                myRoomName: '',
                requestedRoomName: '',
                inLobby: false
            })
        })

        this.socket.on('goToGame', () => {
            this.setState({inGame: true})
        })
    }

    backToLobby(){
        this.setState({
            messages: [],
            currentMessage: '',
            username: this.props.currentUser.username,
            myRoomId: '',
            myChatters: {},
            myRoomName: '',
            requestedRoomName: '',
            inLobby: false,
            inGame: false
        })
    }

    readyPlayer(id){
        if (this.state.myId === id){
            let {myChatters} = this.state
            myChatters[id].ready = !myChatters[id].ready 
            let data = { ready: myChatters[id].ready,
                roomName: this.state.myRoomName,
                roomId: this.state.myRoomId,
                id
            }
            this.socket.emit('playerReady', data)
        }
    }

    requestRoom(){
        return e => {
            console.log("im requesting room")
            e.preventDefault();
            let data = {
                roomName: this.state.requestedRoomName, 
                username: this.state.username,
                myId: this.state.myId,
                oldRoomId: this.state.myRoomId,
                oldRoomName: this.state.myRoomName
            }
            this.socket.emit('requestRoom', data)
            this.setState({
                requestedRoomName: ''
            })
        }
    }

    joinRoom(roomId){
        return e => {
            e.preventDefault();
            if (roomId === this.state.myRoomId) return null
            if (Object.values(this.state.rooms[roomId].chatters).length === 4) {
                let messages = this.state.messages
                let message = {
                    currentMessage: "That room is too full",
                    username: "ErrorBot"
                }
                messages.push(message)
                this.setState({
                    messages
                })
            } else {
                console.log(roomId)
                console.log(this.state.myRoomId)
                let { myRoomId, username, myId, myRoomName } = this.state
                let data = {
                    roomId,
                    oldRoomId: myRoomId,
                    username: username,
                    myId: myId,
                    oldRoomName: myRoomName
                }
                console.log(data)
                this.socket.emit('joinRoom', data)
            }
        }

    }

    update(key) {
        return e => this.setState({
            [key]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state.currentMessage)
        if (this.state.currentMessage !== '') {
            let data = {
                currentMessage: this.state.currentMessage,
                username: this.state.username,
                roomName: this.state.myRoomName
            }
            this.socket.emit('chatMessage', data);
            this.setState({
                currentMessage: ''
            })
        }
    }

    startGame(){
        if (this.state.myRoomId === this.state.myId){
            this.socket.emit('allLobbyPlayersReady', this.state.myRoomName)
        }
    }

    render(){
        if (this.state.myId === '') return null
        if (this.state.inGame){
            return (
                <div>
                    <GameCanvas 
                        socket={this.socket} 
                        roomName={this.state.myRoomName} 
                        roomId={this.state.myRoomId} 
                        host={this.state.myRoomId===this.state.myId}
                        backToLobby={this.backToLobby}
                    />
                </div>
            )
        } else {
            let allPlayersReady = false;
            let startButton =( <button 
                onClick={this.dontStartGame} 
                className="not-ready">Def not time</button>)
            let currentPlayers = (<div></div>)

            if(this.state.myRoomId!==''){
                allPlayersReady = Object.values(this.state.myChatters).every((user) => {
                    return user.ready
                })
                
                // startButton = (allPlayersReady && Object.values(this.state.myChatters).length === 4) ?
                startButton = (true) ?
                    (<button 
                        onClick={this.startGame} 
                        className="ready">It's TIME</button>) :
                    (<button 
                        onClick={this.dontStartGame} 
                        className="not-ready">Def not time</button>)
                
                currentPlayers = (this.state.inLobby) ?
                (Object.keys(this.state.myChatters).map((id) => {
                        return (
                            <div className="chat-member" key={id}>
                                <p>{this.state.myChatters[id].username}</p>
                                {this.state.myChatters[id].ready ?
                                    (<button onClick={() => this.readyPlayer(id)} 
                                        className="ready">Ready</button>) :
                                    (<button onClick={() => this.readyPlayer(id)} 
                                        className="not-ready">Not Ready</button>)}
                            </div>)
                        })
                        ) : (<div>No current members</div>)
            }
                return (
                    <div className="lobby-main">
                        <div className="chat-rooms">
                            Available Chatrooms
                            <form onSubmit={this.requestRoom()} className="room-input-form">
                                <input
                                    placeholder="Create a Room"
                                    onChange={this.update("requestedRoomName")}
                                    value={this.state.requestedRoomName}
                                    className="text-area"
                                />
                                <button type="submit" style={{ display: 'none' }} />
                            </form>
                        <ul>
                            {Object.keys(this.state.rooms).map((id) => {
                                return (
                                    <div className="chat-room-button" onClick={this.joinRoom(id)}>
                                        <p>{this.state.rooms[id].roomName}</p>
                                        <p>{Object.values(this.state.rooms[id].chatters).length} of 4 Players</p>
                                    </div>
                            )})}
                        </ul>
                        </div>
                        <div className="chat-messages">
                            <Display messages={this.state.messages} roomName={this.state.myRoomName}/>
                            <div className="chat-input" >
                                <form onSubmit={this.handleSubmit} className="chat-input-form">
                                    <input
                                        onChange={this.update("currentMessage")}
                                        value={this.state.currentMessage}
                                        className="text-area"
                                    />
                                    <button type="submit" style={{ display: 'none' }} />
                                </form>
                            </div>
                        </div>
                        <div className="chat-members">
                            <ul>
                                Current Players
                                {currentPlayers}
                            </ul>
                            {startButton}
                        </div>

                    </div>
                )
            }
    }
}

export default Lobby