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
        if (this.props.currentUser.username) {
            if (this.myRef.current.contains(e.target)) {
                this.profileDropdown();
            }
            return null;
        }
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
        const loggedIn = (
            <div className="topnav-right-nav">
                <a onClick={this.profileDropdown}><span>{this.props.currentUser.username}</span></a>
                <ul ref={this.myRef} onClick={this.handleDropdown} className={`topnav-dropdown ${this.state.profileDropdown}`}>
                    <li className="topnav-dropdown-item">
                        <Link to='/profile'><i className="fas fa-user-circle"></i> Profile</Link>
                    </li>
                    <li className="topnav-dropdown-item">
                        <Link to='/profile'><i className="fas fa-cog"></i> Settings</Link>
                    </li>
                    <li onClick={this.handleLogout}className="topnav-dropdown-item">
                        <Link to='/profile'><i className="fas fa-sign-out-alt"></i> Logout</Link>
                    </li>
                </ul>
            </div>
        )
        const loggedOut = (
            <div className="topnav-right-nav">
                <Link to='/signup'>Sign Up</Link>
                <Link to='/login'>Login</Link>
            </div>
        )
        //check if logged in and render correct topnav elements
        let rightNav = this.props.currentUser.username ? loggedIn : loggedOut
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