import React from 'react';
import './testform.scss';

class LobbyChatMessage extends React.Component {
    constructor(props) {
        super(props)
    }
    render () {
        //Determine name to display. Is it from the same user as before? Is it from the current user or another user?
        let displayedUser;
        if (this.props.messageFromSameuser) {
            displayedUser = ''
        }
        else if (this.props.currentUser.username === this.props.message.username) {
            displayedUser = 'Me'
        }
        else {
            displayedUser = this.props.message.username
        }
        //HTML for message from currrent user
        let messageFromUser
        messageFromUser = (<div className="lobby-room-body-message-container-self" key={this.props.index}>
                                <div className="lobby-room-body-message-user-container-self">
                                    <p className="lobby-room-body-user-self">{displayedUser}</p>
                                </div>
                                <p className="lobby-room-body-message-self">{this.props.message.currentMessage}</p>
                            </div>)
        //HTML for message from other users
        let messageFromOthers
        messageFromOthers = (<div className="lobby-room-body-message-container" key={this.props.index}>
                                <div className="lobby-room-body-message-user-container">
                                    <p className="lobby-room-body-user">{displayedUser}</p>
                                </div>
                                <p className="lobby-room-body-message">{this.props.message.currentMessage}</p>
                            </div>)
        //Display HTML element based on whether the message is from the current user
        let displayedHTML;
        displayedHTML = (this.props.currentUser.username === this.props.message.username) ?  messageFromUser : messageFromOthers
        return (
            <div>
                {
                    displayedHTML
                }
            </div>
        )
    }
}

export default LobbyChatMessage;