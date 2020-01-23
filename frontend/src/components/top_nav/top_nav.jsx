import React from 'react';
import './top_nav.scss';

class TopNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: 'hidden'
        }
        this.handleDropdown = this.handleDropdown.bind(this)
    }

    handleDropdown () {
        if (this.state.hidden === 'hidden') {
            this.setState({
                hidden: 'show'
            })
        }
        else {
            this.setState({
                hidden: 'hidden'
            })
        }
    }


    render () {
        return (
            <div className="topnav">
                <div className="topnav-left-nav">
                    <a href="#home">Lobby</a>
                    <a className="active" href="#news">Create map</a>
                </div>
                <div className="topnav-middle-nav">
                    <a onClick={()=>this.props.handleClickEffect('obstacle')}>Obstacle</a>
                    <a onClick={()=>this.props.handleClickEffect('food')}>Food</a>
                    <a onClick={()=>this.props.handleClickEffect('remove')}>Erase</a>
                    <a  onClick={()=>this.props.handleClickEffect('house')}>Start Position</a>

                </div>
                <div className="topnav-right-nav">
                    <a href="#lobby">Save</a>
                    <a  onBlur={() => this.setState({hidden: 'hidden'})} onClick={this.handleDropdown}>Profile</a>
                    <ul className={`topnav-dropdown ${this.state.hidden}`}>
                        <li className="topnav-dropdown-item">
                            <span className="topnav-wins">Wins: 100</span>
                        </li>
                        <li className="topnav-dropdown-item">
                            <span className="topnav-losses">Losses: 0</span>
                        </li>
                        <li className="topnav-dropdown-item">
                            <span className="topnav-logout">Logout</span>
                        </li>
                    </ul>
                </div>

            </div>
        )

    }
}

export default TopNav;