import React from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import './testform.scss';
import LobbyRoomMember from './lobby_room_member'

class LobbyRoomMemberDropdown extends React.Component {
    constructor(props) {
        super(props)

    }

    handleClickOutside() {
        this.props.toggleUsersDropdown();
    }

    render () {
        return (
            <div className="lobby-room-members">
                {
                    Object.keys(this.props.chatters).map(id => <LobbyRoomMember key={id} toggleUsersDropdown={this.props.toggleUsersDropdown} chatters={this.props.chatters} user={this.props.chatters[id].username} id={id} />)
                }
            </div>
        )
    }
}

export default enhanceWithClickOutside(LobbyRoomMemberDropdown);