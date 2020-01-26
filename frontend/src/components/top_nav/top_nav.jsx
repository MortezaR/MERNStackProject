import React from 'react';
import {Link} from 'react-router-dom'
import './top_nav.scss';
import SaveMapForm from '../save_map_form/save_map_form.jsx';
import UpdateMapForm from '../save_map_form/update_map_form';

class TopNav extends React.Component {
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
            <div className="topnav">
                <div className="topnav-left-nav">
                    <Link to='/lobby'>Lobby</Link>
                    <a onClick={() => this.props.openModal('signup')} className="active">Create map</a>
                </div>
                <div className="topnav-middle-nav">
                    <a onClick={()=>this.props.handleClickEffect('obstacle')}>Obstacle</a>
                    <a onClick={()=>this.props.handleClickEffect('food')}>Food</a>
                    <a onClick={()=>this.props.handleClickEffect('remove')}>Erase</a>
                    <a  onClick={()=>this.props.handleClickEffect('house')}>Start Position</a>
                    <a onClick={this.saveMapForm}>Save</a>
                </div>
                <div className="topnav-right-nav">

                    {/* <a  onBlur={() => console.log('hi')}>Profile</a> */}
                    <a  onBlur={() => {
                        return this.setState({hidden: 'hidden'})
                        }} 
                        onClick={this.handleDropdown}>Profile</a>
                    <ul className={`topnav-dropdown ${this.state.hidden}`}>
                        <li className="topnav-dropdown-item">
                            <span className="topnav-name">{this.props.currentUser.username}</span>
                        </li>
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
                    {
                        pickedForm
                    }
                </div>
            </div>
        )

    }
}

export default TopNav;