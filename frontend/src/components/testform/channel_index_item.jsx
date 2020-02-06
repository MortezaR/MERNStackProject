import React from 'react';
import './testform.scss';

class ChannelIndexItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render () {
        let box1 = this.props.numPlayers >= 1 ? 'lightUpBlue' : ''
        let box2 = this.props.numPlayers >= 2 ? 'lightUpBlue' : ''
        let box3 = this.props.numPlayers >= 3 ? 'lightUpBlue' : ''
        let box4 = this.props.numPlayers >= 4 ? 'lightUpBlue' : ''
        return (
            <div className="lobby-channel-index-item" onClick={this.props.joinRoom(this.props.id)}>
                <div className="lobby-channel-title">
                    {this.props.roomName}
                </div>
                <div className="lobby-channel-players-container">
                    <div className="lobby-channel-players-icon1">
                        <i className={`fas fa-square fa-xs ${box1}`}></i> <i className={`fas fa-square fa-xs ${box2}`}></i> <i className={`fas fa-square fa-xs ${box3}`}></i> <i className={`fas fa-square fa-xs ${box4}`}></i>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChannelIndexItem;