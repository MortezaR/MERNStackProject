import React from 'react';
import './lobby.scss';

class Display extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const messages = this.props.messages.map((message, i) => {
            return (
                <li className="chat-message">
                    <p key={i}>{message.username}</p>
                    <p key={i}>{message.currentMessage}</p>
                </li>
               
            );
        });

        return (
            <div className="message-list">
                this is the message list
                <ul>
                    {messages}
                </ul>
            </div>
        )
    }
}

export default Display;