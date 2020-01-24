import React from 'react';
import io from "socket.io-client";
import Display from './display';
import './lobby.scss';

class Lobby extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            rooms: {},
            messages: [],
            currentMessage: '',
            username: "greg",
            myRoomId: '',
            myChatters: {},
            myRoomName: '',
            myId: '',
            requestedRoomName: ''
        }
        this.socket = io.connect("http://localhost:7000");
        this.handleSubmit = this.handleSubmit.bind(this)
        this.readyPlayer = this.readyPlayer.bind(this)
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
            console.log("im receiving my joined room info")
            console.log(data)
            this.setState({
                myChatters: data.chatters,
                myRoomName: data.roomName,
                myRoomId: data.roomId
            })
        })

        this.socket.on('updateRoomsInfo', (data) => {
            console.log("im updating rooms info")
            this.setState({
                rooms: data
            })
        })

        this.socket.on('addChatterToRoom', (data) => {
            console.log("im adding chatter to room")
            console.log(data)
            this.setState({
                chatters: data
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


        // this.socket.on('addNewChatter', chatter => {
        //     let chatters = this.state.myChatters
        //     chatters[chatter.id] = chatter;
        //     this.setState({
        //         chatters: chatters
        //     })
        // })



        this.socket.on('newMessage', (data) => {
            let allMessages = this.state.messages
            let message = {currentMessage: data.currentMessage, 
                username: data.username
            }
            allMessages.push(message)
            this.setState({
                messages: allMessages
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
            e.preventDefault();
            let data = {
                roomName: this.state.requestedRoomName, 
                username: this.state.username
            }
            this.socket.emit('requestRoom', data)
            this.setState({
                requestedRoomName: ''
            })
        }
    }

    joinRoom(roomId){
        console.log('im joining room')
        return e => {
            e.preventDefault();
            if (roomId === this.state.myRoomId) return null
            let {myRoomId, username,myId} = this.state
            let data = {roomId, oldRoomId: myRoomId, 
                username: username, myId: myId
            }
            this.socket.emit('joinRoom', data)
            this.setState({roomId: roomId})
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

    render(){
        if (this.state.myId==='') return null
        let allPlayersReady = false;
        let startButton =( <button 
            onClick={this.dontStartGame} 
            className="not-ready">Def not time</button>)
        let currentPlayers = (<div></div>)
        if(this.state.myRoomId!==''){
            debugger
            allPlayersReady = Object.values(this.state.myChatters).every((user) => {
                return user.ready
            })
            startButton = (allPlayersReady && Object.values(this.state.myChatters).length === 4) ?
                (<button 
                    onClick={this.startGame} 
                    className="ready">It's TIME</button>) :
                (<button 
                    onClick={this.dontStartGame} 
                    className="not-ready">Def not time</button>)
            
            currentPlayers = (this.state.myRoomId !=='') ?
            (Object.keys(this.state.myChatters).map((id) => {
                    return (
                        <div className="chat-member">
                            <p>{this.state.myChatters[id].username}</p>
                            <p>hello</p>
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
                    we are chat rooms
                    <form onSubmit={this.requestRoom()} className="room-input-form">
                        <input
                            onChange={this.update("requestedRoomName")}
                            value={this.state.requestedRoomName}
                            className="text-area"
                        />
                        <button type="submit" style={{ display: 'none' }} />
                    </form>
                <ul>
                    {Object.keys(this.state.rooms).map((id) => {
                        return (
                            <div className="chat-rooms">
                                <button onClick={this.joinRoom(id)}>Join Room {this.state.rooms[id].roomName}</button>
                            </div>)
                    })}
                </ul>
                 </div>
                 <div className="chat-messages">
                    <Display messages={this.state.messages} />
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

export default Lobby