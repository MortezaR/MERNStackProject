import React from 'react';
import './testform.scss';

class LobbyChatMessage extends React.Component {
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <div className="chat-message" key={this.props.index}>
                <p>{this.props.message.username}</p>
                <p>{this.props.message.currentMessage}</p>
            </div>
        )
    }
}

export default LobbyChatMessage;