import React from 'react';
import {Link} from 'react-router-dom'
import './top_nav_two.scss';
import SaveMapForm from '../save_map_form/save_map_form.jsx';
import UpdateMapForm from '../save_map_form/update_map_form';

class TopNavTwo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: 'hidden',
            saveMapForm: 'hidden'
        }
        this.handleDropdown = this.handleDropdown.bind(this)
        this.saveMapForm = this.saveMapForm.bind(this)
    }

    componentDidMount () {
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

    saveMapForm () {
        if (this.state.saveMapForm === 'hidden') {
            this.setState({
                saveMapForm: 'fadein'
            })
        }
        else if (this.state.saveMapForm === 'fadein') {
            this.setState({
                saveMapForm: 'fadeout'
            })
        }
        else if (this.state.saveMapForm === 'fadeout') {
            this.setState({
                saveMapForm: 'fadein'
            })
        }
    }

    render () {
        if (!this.props.currentUser) return null;
        let name = this.props.currentUser.username ? this.props.currentUser.username : 'Sign In'
        return (
            <div className="topnavtwo">
                <div className="topnavtwo-left-nav">
                        <Link className="active" to='/lobby'>Lobby</Link>
                        <a href="#/map">Create map</a>
                    </div>
                <div className="topnavtwo-middle-nav hidden-topnav">
                </div>
                    <div className="topnavtwo-right-nav">
                        <a onClick={this.handleDropdown}>Profile</a>
                        <ul className={`topnavtwo-dropdown ${this.state.hidden}`}>
                            <li className="topnavtwo-dropdown-item">
                                <span className="topnavtwo-name">{this.props.currentUser.username}</span>
                            </li>
                            <li className="topnavtwo-dropdown-item">
                                <span className="topnavtwo-wins">Wins: 100</span>
                            </li>
                            <li className="topnavtwo-dropdown-item">
                                <span className="topnavtwo-losses">Losses: 0</span>
                            </li>
                            <li className="topnavtwo-dropdown-item">
                                <span className="topnavtwo-logout">Logout</span>
                            </li>
                        </ul>
                    </div>
            </div>
        )

    }
}

export default TopNavTwo;