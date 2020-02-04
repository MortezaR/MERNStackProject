import React from 'react';
import './testform.scss';
import ChannelIndexItem from './channel_index_item';
import LobbyChatMessage from './lobby_chat_message';

class TestForm extends React.Component {
    render () {
        return (
            <div className="lobby-background">
                <div className="lobby">
                    <section className="lobby-channel">
                        <header className="lobby-channel-header">
                            <div className="lobby-channel-header-wrapper">
                                <div>
                                    <a><i className="fas fa-plus-circle"></i></a> <span>Channel</span>
                                </div>
                                <input
                                    onSubmit={this.requestRoom()}
                                    type="submit"
                                    className="lobby-channel-input"
                                    type="text" 
                                    placeholder="Type channel name"
                                    onChange={this.update("requestedRoomName")}
                                    value={this.state.requestedRoomName}
                                    maxlength="17"
                                />

                            </div>
                        </header>
                        <nav className="lobby-channel-index">
                        {
                            Object.keys(this.state.rooms).map((id) => {
                                return (
                                    <ChannelIndexItem />
                                )
                            })
                        }
                        </nav>
                        <div className="lobby-channel-index-profile">
                            <div className="lobby-channel-index-profile-username">
                                <span className="lobby-user-username">MorteazPlz</span>
                                <span className="lobby-user-id">#4329</span>
                            </div>
                            <div className="lobby-channel-index-profile-icon">
                                <a><i class="far fa-check-circle fa-lg"></i></a>
                                <span>Ready?</span>
                            </div>

                        </div>
                    </section>
                    <section className="lobby-room">
                        <header className="lobby-room-header">
                                <div className="lobby-room-header-wrapper">
                                    <div className="lobby-room-header-wrapper-content">
                                        <span>Channel Name</span>
                                        <a><i className="fas fa-users fa-lg"></i></a>
                                    </div>
                                </div>
                        </header>
                        <div className="lobby-room-body">
                            {
                                this.props.messages.map((message, i) => {
                                    return (
                                        <LobbyChatMessage />
                                    )
                                })
                            }

                        </div>
                        <div className="lobby-room-input">
                            <input  id="styled" placeholder="Type a message" size="4" />
                            <svg className="send-icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                        </div>
                        <div className="lobby-room-members">
                            <div className="lobby-room-members-item">
                                <span>KennyHuffandPuffWolf</span>
                                <i class="fas fa-check-circle fa-lg"></i>
                            </div>
                            <div className="lobby-room-members-item">
                                <span>MorteazPlz</span>
                                <i class="fas fa-check-circle fa-lg"></i>
                            </div>
                            <div className="lobby-room-members-item">
                                <span>DavidHouse</span>
                                <i class="fas fa-check-circle fa-lg"></i>
                            </div>
                            <div className="lobby-room-members-item">
                                <span>BooeingPlane</span>
                                <i class="fas fa-check-circle fa-lg"></i>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    }

}

export default TestForm