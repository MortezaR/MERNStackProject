import React from 'react';
import './lobby.scss';
import ChannelIndexItem from './channel_index_item';
import LobbyChatMessage from './lobby_chat_message';
import ChannelCreationDropdown from './channel_creation_dropdown';
import LobbyRoomMemberDropdown from './lobby_room_member_dropdown';

import io from "socket.io-client";
import GameCanvas from '../gameCanvas';
import axios from 'axios';

class Lobby extends React.Component {
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
            inGame: false,
            maps: null,
            pickedMap: null,
            channelsDropdownOpen: false,
            usersDropdownOpen: false,
            mapsDropdownOpen: false
        }
        //Variables
        this.container = React.createRef();
        //Socket
        this.socket = process.env.NODE_ENV === 'production' ? io() : io("http://localhost:5000")
        //Functions
        this.handleSubmit = this.handleSubmit.bind(this)
        this.readyPlayer = this.readyPlayer.bind(this)
        this.startGame = this.startGame.bind(this)
        this.backToLobby = this.backToLobby.bind(this)
        this.pickMap = this.pickMap.bind(this);
        this.update = this.update.bind(this)
        this.joinRoom = this.joinRoom.bind(this)
        this.toggleChannelsDropdown = this.toggleChannelsDropdown.bind(this)
        this.toggleUsersDropdown = this.toggleUsersDropdown.bind(this)
        this.handleClickOutside = this.handleClickOutside.bind(this)
        this.requestRoom = this.requestRoom.bind(this)
        this.toggleMapsDropdown = this.toggleMapsDropdown.bind(this)
        this.scrollToBottom = this.scrollToBottom.bind(this)
    }

    scrollToBottom (){
        let bottomOfChat = document.getElementById('bottom-of-chat')
        let chatMessage = document.getElementsByClassName('lobby-room-body-chat-messages')
        if (bottomOfChat && bottomOfChat.lastChild) {
            bottomOfChat.lastChild.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
        }
    }

    toggleMapsDropdown() {
        this.setState({
            mapsDropdownOpen: !this.state.mapsDropdownOpen
        })
    }

    toggleChannelsDropdown(){
        this.setState({
            channelsDropdownOpen: !this.state.channelsDropdownOpen
        })
    }

    toggleUsersDropdown(){
        this.setState({
            usersDropdownOpen: !this.state.usersDropdownOpen
        })
    }

    handleClickOutside(e){
        if (this.container.current && !this.container.current.contains(e.target)) {
          this.setState({
            channelsDropdownOpen: false,
            usersDropdownOpen: false
          });
        }
    }

    pickMap(map) {
        this.toggleMapsDropdown();
        this.setState({
            pickedMap: map
        })
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    componentWillUnmount(){
        document.removeEventListener("mousedown", this.handleClickOutside);
        console.log("component is unmounting")
        this.socket.emit('disconnect', this.state.myId)
        this.socket.disconnect();
    }

    componentDidMount(){
        

        document.addEventListener("mousedown", this.handleClickOutside);
        this.socket.on('setupNewChatter', (data) => {
            console.log("im receiving my own info")
            this.setState({
                myId: data.id,
                rooms: data.rooms
            })
        })

        //add game wins here
        this.socket.on('endGame', (endGameData) => {
            if (endGameData.wolfId[0] === this.state.myId){
                if (endGameData.winner === "wolf"){
                    axios.patch(`/api/users/win/${this.props.currentUser.id}`)
                } else {
                    axios.patch(`/api/users/lose/${this.props.currentUser.id}`)
                }
            } else {
                endGameData.pigletIds.forEach(pigletId => {
                    if (pigletId === this.state.myId){
                        if (endGameData.winner === "wolf"){
                            axios.patch(`/api/users/lose/${this.props.currentUser.id}`)
                        } else {
                            axios.patch(`/api/users/win/${this.props.currentUser.id}`)
                        }
                    }
                })
            }
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
            console.log("im receiving msg")
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

        //Get maps
        console.log('hi')
        axios.get('/api/maps/')
        .then(maps => 
            
        {
            console.log(maps.data)
            this.setState({
                maps: maps.data,
                pickedMap: maps.data[0] 
            })
        }
        )
    }

    backToLobby(){
        this.setState({
            rooms: {},
            messages: [],
            currentMessage: '',
            username: this.props.currentUser.username,
            myRoomId: '',
            myChatters: {},
            myRoomName: '',
            myId: this.state.myId,
            requestedRoomName: '',
            inLobby: false,
            inGame: false,
            pickedMap: null,
            channelsDropdownOpen: false,
            usersDropdownOpen: false,
            mapsDropdownOpen: false
        })
    }

    readyPlayer(id){
        // if (this.state.myId === id){
            let {myChatters} = this.state
            myChatters[this.state.myId].ready = !myChatters[this.state.myId].ready 
            let data = { ready: myChatters[this.state.myId].ready,
                roomName: this.state.myRoomName,
                roomId: this.state.myRoomId,
                id: this.state.myId
            }
            this.socket.emit('playerReady', data)
        // }
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
            this.toggleChannelsDropdown();
        }
    }

    joinRoom(roomId){
        return e => {
            console.log('IM IN A ROOM')
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
        
        if (this.state.currentMessage !== '') {
            let data = {
                currentMessage: this.state.currentMessage,
                username: this.state.username,
                roomName: this.state.myRoomName
            }
            console.log(data)
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
    render () {
        if (this.state.myId === '') return null
        if (this.state.inGame){
            return (
                <div className="game-canvas-div">
                    <GameCanvas 
                        socket={this.socket} 
                        roomName={this.state.myRoomName} 
                        roomId={this.state.myRoomId} 
                        host={this.state.myRoomId===this.state.myId}
                        backToLobby={this.backToLobby}
                        map={this.state.pickedMap}
                        myId={this.state.myId}
                    />
                </div>
            )
        }
        else {
            //Display channel name if you're in a channel
            const channelName = this.state.myRoomName ? this.state.myRoomName : 'Channel Name'
            //Change button to "play" if everyone is ready, otherwise, just show ready/not ready
            let allPlayersReady = false;

            //test change here
            if((this.state.myRoomId!=='') && Object.values(this.state.myChatters).length === 4){
                allPlayersReady = Object.values(this.state.myChatters).every((user) => {
                    return user.ready
                })
            }
            //Determine what icon to generate next to player's name on bottom right
            let readyIcon;
            if (allPlayersReady && this.state.myRoomId === this.state.myId) {
                //Play button if the user is the host and four players are ready
                readyIcon = (<div onClick={this.startGame} className="lobby-channel-index-profile-icon">
                            <a style={{color: '#04afc3'}}><i class="fas fa-play-circle fa-lg"></i></a>
                            <span>PLAY!</span>
                            </div>)
            }
            else {
                if (Object.keys(this.state.myChatters).length != 0) {
                    this.state.myChatters[this.state.myId].ready ?
                    //Ready button if they clicked ready
                    readyIcon = (<div onClick={() => this.readyPlayer(this.props.currentUser.id)}  className="lobby-channel-index-profile-icon">
                                <a style={{color: '#03ff95'}}><i className="far fa-check-circle fa-lg"></i></a>
                                <span>Ready!</span>
                                </div>)
                    :
                    //Pending button if they have not said they're ready
                    readyIcon = (<div onClick={() => this.readyPlayer(this.props.currentUser.id)}  className="lobby-channel-index-profile-icon">
                                <a style={{color: '#ecb708'}}><i className="far fa-question-circle fa-lg"></i></a>
                                <span>Pending</span>
                                </div>)
                }
            }

            //Set scrollbar to bottom of chat
            let messageBody = document.getElementsByClassName('lobby-room-body');
            messageBody.scrollTop = messageBody.scrollHeight;
            return (
                <div className="lobby-background" ref={this.container}>
                    <div className="lobby">
                        <section className="lobby-channel">
                            <header className="lobby-channel-header">
                                <div className="lobby-channel-header-wrapper">
                                    <div onClick={this.toggleChannelsDropdown}>
                                        <a href="JavaScript:void(0)"><i className="fas fa-plus-circle"></i></a> <span>Channel</span>
                                    </div>
                                    {
                                        this.state.channelsDropdownOpen && (
                                            <ChannelCreationDropdown 
                                                requestRoom={this.requestRoom} 
                                                update={this.update} 
                                                requestedRoomName={this.state.requestedRoomName}
                                                toggleChannelsDropdown={this.toggleChannelsDropdown}
                                            />
                                        )
                                    }
                                </div>
                            </header>
                            <nav className="lobby-channel-index">
                            {
                                Object.keys(this.state.rooms).map(id => 
                                    <ChannelIndexItem
                                        key={id}
                                        joinRoom={this.joinRoom}
                                        id={id} 
                                        roomName={this.state.rooms[id].roomName} 
                                        numPlayers={Object.values(this.state.rooms[id].chatters).length}
                                    />
                                )
                            }
                            </nav>
                            <div className="lobby-channel-index-profile">
                                <div className="lobby-channel-index-profile-username">
                                    <span className="lobby-user-username">{this.props.currentUser.username}</span>
                                    <span className="lobby-user-id">{`#${this.props.currentUser.id.slice(0,4)}`}</span>
                                </div>
                                {
                                    readyIcon
                                }
                            </div>
                        </section>
                        <section className="lobby-room">
                            <header className="lobby-room-header">
                                    <div className="lobby-room-header-wrapper">
                                        <div className="lobby-room-header-wrapper-content">
                                            <span>{channelName}</span>
                                            <div className="lobby-room-options">
                                                <a onClick={this.toggleUsersDropdown}><i className="fas fa-users fa-lg"></i></a>
                                                <a onClick={this.toggleMapsDropdown}><i className="fas fa-map-marked-alt"></i></a>
                                            </div>
                                        </div>
                                    </div>
                            </header>
                            <div id="bottom-of-chat" className="lobby-room-body">
                                {
                                    this.state.messages.map((message, i) => {
                                        console.log(message)
                                        console.log('message above')
                                        let messageFromSameuser = false;
                                        if ((i !== 0) && (this.state.messages[i].username === this.state.messages[i-1].username)) {
                                            messageFromSameuser = true;
                                        }
                                        return (
                                            <LobbyChatMessage 
                                                messageFromSameuser={messageFromSameuser} 
                                                currentUser={this.props.currentUser} 
                                                message={message} 
                                                index={i} 
                                                roomName={this.state.myRoomName} 
                                            />
                                        )
                                    })
                                }
                            <div style={{ float:"left", clear: "both" }}  />
                            </div>
                            <div className="lobby-room-input">
                                <form onSubmit={this.handleSubmit}>
                                    <input  
                                        id="styled"
                                        placeholder="Type a message" 
                                        size="4"
                                        onChange={this.update("currentMessage")}
                                        value={this.state.currentMessage}
                                    />
                                    <button type="submit"><svg  className="send-icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/><path d="M0 0h24v24H0z" fill="none"/></svg></button>
                                </form>

                            </div>
                            {
                                this.state.usersDropdownOpen && (
                                    <LobbyRoomMemberDropdown 
                                        chatters={this.state.myChatters}
                                        toggleUsersDropdown={this.toggleUsersDropdown}
                                    />
                                )
                            }

                        </section>
                {
                        this.state.mapsDropdownOpen && (
                            <div className="map-index">
                                <header className="map-index-header">
                                        <div className="map-index-header-wrapper">
                                            <div className="map-index-header-wrapper-content">
                                                <span>Maps</span>
                                                <a onClick={this.toggleMapsDropdown}><i class="fas fa-times fa-lg"></i></a>
                                            </div>
                                        </div>
                                </header>
                                <section className="map-index-container">
                                    {
                                        this.state.maps.map((map, i) => {
                                            let selectedMap;
                                            if (this.state.pickedMap) {
                                                selectedMap = (this.state.pickedMap._id === map._id) ? 'selectedMap' : ''
                                            }
                                        return (<div onClick={()=>this.pickMap(map)} key={i} className={`map-index-map-item ${selectedMap}`}>
                                                    <span>{map.title}</span>
                                                </div>)
                                        })
                                    }
                                </section>
                            </div>
                        )
                    }
                    </div>
                </div>
                )
        }

    }

}
export default Lobby;