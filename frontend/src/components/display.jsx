import React from 'react';

class Display extends React.Component {
    constructor(props) {
        super(props);
        this.messages = this.props.messages;
    }

    render() {
        console.log(this.messages)
        const messages = this.messages.map((message, i) => {
            return (
                <li>
                    <p key={i}>{message.username}</p>
                    <p key={i}>{message.messageContent}</p>
                </li>
               
            );
        });

        return (
            <div className="display">
                <div className="messages">
                    <ul>
                        {messages}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Display;