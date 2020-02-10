import React from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import './lobby.scss';

class LobbyRoomMember extends React.Component {
    constructor(props) {
        super(props)

    }

    render () {

        const icon = this.props.chatters[this.props.id].ready ? <i className="fas fa-check-circle fa-lg green"></i> : <i className="far fa-times-circle red"></i>
        return (
        <div className="lobby-room-members-item">
            <span>{this.props.user}</span>
            {icon}
        </div>
        )
    }
}

export default enhanceWithClickOutside(LobbyRoomMember);