import React from 'react';
import './testform.scss';

class ChannelIndexItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <div className="lobby-channel-index-item">
                <div className="lobby-channel-title">
                    Room Title
                </div>
                <div className="lobby-channel-players-container">
                    <div className="lobby-channel-players-icon1">
                        <i className="fas fa-square fa-xs"></i> <i className="fas fa-square fa-xs"></i> <i className="fas fa-square fa-xs"></i> <i className="fas fa-square fa-xs"></i>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChannelIndexItem;