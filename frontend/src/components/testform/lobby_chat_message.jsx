import React from 'react';
import './testform.scss';

class LobbyChatMessage extends React.Component {
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <div className="chat-message" key={i}>
                <p>{message.username}</p>
                <p>{message.currentMessage}</p>
            </div>
        )
    }
}

export default LobbyChatMessage;