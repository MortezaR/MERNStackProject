import React from 'react';
import './testform.scss';

class ChannelIndexItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            box1 = this.props.numPlayers >= 1 ? 'lightUpBlue' : '',
            box2 = this.props.numPlayers >= 2 ? 'lightUpBlue' : '',
            box3 = this.props.numPlayers >= 3 ? 'lightUpBlue' : '',
            box4 = this.props.numPlayers >= 4 ? 'lightUpBlue' : ''
        }
    }

    render () {
        return (
            <div className="lobby-channel-index-item">
                <div className="lobby-channel-title">
                    {this.props.roomName}
                </div>
                <div className="lobby-channel-players-container">
                    <div className="lobby-channel-players-icon1">
                        <i className={`fas fa-square fa-xs ${this.state.box1}`}></i> <i className={`fas fa-square fa-xs ${this.state.box2}`}></i> <i className={`fas fa-square fa-xs ${this.state.box3}`}></i> <i className={`fas fa-square fa-xs ${this.state.box4}`}></i>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChannelIndexItem;