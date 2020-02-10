import React from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import {Link} from 'react-router-dom';
import './top_nav.scss';

class TopNavProfileDropdown extends React.Component {
    constructor(props) {
        super(props)

    }

    handleClickOutside() {
        this.props.toggleProfileDropdown();
    }

    render () {
        return (
            <ul className={`topnav-dropdown`}>
                <li className="topnav-dropdown-item">
                    <Link to='/profile'><i className="fas fa-user-circle"></i> Profile</Link>
                </li>
                <li className="topnav-dropdown-item">
                    <Link to='/settings'><i className="fas fa-cog"></i> Settings</Link>
                </li>
                <li onClick={this.props.handleLogout}className="topnav-dropdown-item">
                    <Link to='/login'><i className="fas fa-sign-out-alt"></i> Logout</Link>
                </li>
            </ul>
        )
    }
}

export default enhanceWithClickOutside(TopNavProfileDropdown);