import React from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import './testform.scss';

class ChannelCreationDropdown extends React.Component {
    constructor(props) {
        super(props)
    }

    handleClickOutside() {
        this.props.toggleChannelsDropdown();
    }

    render () {
        return (
            <form className="lobby-channel-dropdown" onSubmit={this.props.requestRoom()}>
                <input
                    type="submit"
                    className="lobby-channel-input"
                    type="text" 
                    placeholder="Type channel name"
                    onChange={this.props.update("requestedRoomName")}
                    value={this.props.requestedRoomName}
                    maxLength="17"
                />
                <button type="submit" style={{ display: 'none' }} />
            </form>
        )
    }
}

export default enhanceWithClickOutside(ChannelCreationDropdown);