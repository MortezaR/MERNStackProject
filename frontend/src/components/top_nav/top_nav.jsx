import React from 'react';
import {Link} from 'react-router-dom'
import './top_nav.scss';
import TopNavProfileDropdown from './top_nav_profile_dropdown';

class TopNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileDropdown: false,
            saveMapForm: 'hidden'
        }
        this.toggleProfileDropdown = this.toggleProfileDropdown.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.myRef = React.createRef();
        // this.saveMapForm = this.saveMapForm.bind(this)
    }

    

    componentDidMount () {
        // document.addEventListener('mousedown', this.toggleProfileDropdown, false)
    }

    componentWillUnmount () {
        // document.removeEventListener('mousedown', this.toggleProfileDropdown, false)
    }

    handleLogout () {
        this.props.logout()
        this.props.history.push('/login')
    }

    toggleProfileDropdown () {
        this.setState({
            profileDropdown: !this.state.profileDropdown
        })
    }

    render () {
        const loggedIn = (
            <div className="topnav-right-nav">
                <a onClick={this.toggleProfileDropdown}><span>{this.props.currentUser.username}</span></a>
                {
                    this.state.profileDropdown &&
                    (
                        <TopNavProfileDropdown
                            toggleProfileDropdown={this.toggleProfileDropdown}
                            profileDropdown={this.state.profileDropdown}
                        />
                    )
                }

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