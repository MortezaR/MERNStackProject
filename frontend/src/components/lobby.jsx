import React from 'react';
import io from "socket.io-client";
import Display from './display';

class Lobby extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            messages: [],
            currentMessage: '',
            chatters: [],
            username: "some guy"
        }
        this.socket = io.connect("http://localhost:7000");
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillMount() {
        this.socket.on('currentChatters', (users) => {
            console.log('Chat component is connected');
            this.setState({chatters: users})
        })
    }

    componentDidMount(){
        this.socket.emit('newChatter', this.state.username)
        this.socket.on('newMessage', (message) => {
            let allMessages = this.state.messages
            allMessages.push(message)
            this.setState({
                messages: allMessages
            })
        })
    }

    update() {
        return e => this.setState({
            currentMessage: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state.currentMessage)
        if (this.state.currentMessage !== '') {
            this.socket.emit('chatMessage', {
                messageContent: this.state.currentMessage,
                username: this.state.username
            });
            this.setState({
                currentMessage: ''
            })
        }
    }


    render(){
        return (
             <div>
                <Display 
                    messages={this.state.messages} />

                <div >
                    <form onSubmit={this.handleSubmit} >
                        <input type="text"
                            onChange={this.update()}
                            value={this.state.currentMessage}
                        />

                        <button type="submit" style={{ display: 'none' }} />
                    </form>
                </div>
             </div>
        )
    }
}

export default Lobby