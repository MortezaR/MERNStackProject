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
        const saveForm = (
                <SaveMapForm  
                saveMapForm={this.state.saveMapForm}
                rockCount={this.props.rockCount}
                foodCount={this.props.foodCount}
                foods={this.props.foods}
                rocks={this.props.rocks}
                houses={this.props.houses}
                title={this.props.title}
                url={this.props.url} 
                currentUser={this.props.currentUser}
                mapId={this.props.mapId}
            />
        ) 
        const updateForm = (
            <UpdateMapForm  
            saveMapForm={this.state.saveMapForm}
            rockCount={this.props.rockCount}
            foodCount={this.props.foodCount}
            foods={this.props.foods}
            rocks={this.props.rocks}
            houses={this.props.houses}
            title={this.props.title}
            url={this.props.url} 
            currentUser={this.props.currentUser}
            mapId={this.props.mapId}
            />
        )
        let pickedForm;
        this.props.mapId ? pickedForm = updateForm : pickedForm = saveForm
        if (!this.props.currentUser) return null;
        return (
            <div className="topnavtwo">
                <div className="topnavtwo-left-nav">
                        <a className="active" href="#home">Lobby</a>
                        <a href="#/map">Create map</a>
                    </div>
                <div className="topnavtwo-middle-nav hidden-topnav">
                </div>
                    <div className="topnavtwo-right-nav">
                        <a onClick={this.saveMapForm}>Save</a>
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
                        {
                            pickedForm
                        }
                    </div>
            </div>
        )

    }
}

export default TopNavTwo;