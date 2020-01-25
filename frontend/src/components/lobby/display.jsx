import React from 'react';
import './lobby.scss';

class Display extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log("display receiving msg")
        console.log(this.props.messages)
        const messages = this.props.messages.map((message, i) => {
            return (
                <li className="chat-message" key={i}>
                    <p>{message.username}</p>
                    <p>{message.currentMessage}</p>
                </li>
               
            );
        });

        return (
            <div className="message-list">
                {this.props.roomName === '' ? "Join or create a room" : this.props.roomName}
                <ul>
                    {messages}
                </ul>
            </div>
        )
    }
}

export default Display;