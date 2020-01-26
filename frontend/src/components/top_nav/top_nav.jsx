import React from 'react';
import {Link} from 'react-router-dom'
import './top_nav.scss';
import SaveMapForm from '../save_map_form/save_map_form.jsx';
import UpdateMapForm from '../save_map_form/update_map_form';

class TopNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileDropdown: 'hidden',
            saveMapForm: 'hidden'
        }
        this.profileDropdown = this.profileDropdown.bind(this)
        this.handleDropdown = this.handleDropdown.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.myRef = React.createRef();
        // this.saveMapForm = this.saveMapForm.bind(this)
    }

    

    componentDidMount () {
        document.addEventListener('mousedown', this.handleDropdown, false)
    }

    componentWillUnmount () {
        document.removeEventListener('mousedown', this.handleDropdown, false)
    }

    // handleDropdown () {
    //     if (this.state.hidden === 'hidden') {
    //         this.setState({
    //             hidden: 'show'
    //         })
    //     }
    //     else {
    //         this.setState({
    //             hidden: 'hidden'
    //         })
    //     }
    // }

    handleLogout () {
        this.props.logout()
        this.props.history.push('/login')
    }
    handleDropdown (e) {
        if (this.myRef.current.contains(e.target)) {
            this.profileDropdown();
        }
        return null;
    }

    profileDropdown () {
        if (this.state.profileDropdown === 'hidden') {
            this.setState({
                profileDropdown: 'fadein'
            })
        }
        else if (this.state.profileDropdown === 'fadein') {
            this.setState({
                profileDropdown: 'fadeout'
            })
        }
        else if (this.state.profileDropdown === 'fadeout') {
            this.setState({
                profileDropdown: 'fadein'
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
        const loggedIn = (
            <div className="topnav-right-nav">
                <a onClick={this.profileDropdown}>{this.props.currentUser.username}</a>
                <ul ref={this.myRef} onClick={this.handleDropdown} className={`topnav-dropdown ${this.state.profileDropdown}`}>
                    <li className="topnav-dropdown-item">
                        <Link to='/profile'><i class="fas fa-user-circle"></i> Profile</Link>
                    </li>
                    <li className="topnav-dropdown-item">
                        <Link to='/profile'><i class="fas fa-cog"></i> Settings</Link>
                    </li>
                    <li onClick={this.handleLogout}className="topnav-dropdown-item">
                        <Link to='/profile'><i class="fas fa-sign-out-alt"></i> Logout</Link>
                    </li>
                </ul>
            </div>
        )

        const loggedOut = (
            <div className="topnav-right-nav">
                <Link to='/login'>Sign Up</Link>
                <Link to='/login'>Login</Link>
            </div>
        )

        let rightNav = this.props.currentUser ? loggedIn : loggedOut
        return (
            <div className="topnav">
                <div className="topnav-left-nav">
                    <Link to='/lobby'>Lobby</Link>
                    <Link to='/map'>Create a Map</Link>
                </div>
                {
                    rightNav
                }
            </div>
        )

    }
}

export default TopNav;