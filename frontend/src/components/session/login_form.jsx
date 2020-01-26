import './login_form.scss'
import React from "react"
import { Link } from 'react-router-dom'

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
        this.showErrors = this.showErrors.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleGuestSignIn = this.handleGuestSignIn.bind(this);
    }

    handleInput(kind) {
        return e => this.setState({
            [kind]: e.currentTarget.value
        })
    }

    handleSignIn(e) {
        e.preventDefault();
        this.props.login(this.state).then(() => {
            if (this.props.currentUser) this.props.history.push("/map")
        })
    }

    handleGuestSignIn(e) {
        e.preventDefault();
        this.setState({
            username: 'Guest',
            password: 'password'
        })
        this.props.login(this.state).then(() => {
            if (this.props.currentUser) this.props.history.push("/map")
        })
    }

    handleLogout(e) {
        e.preventDefault();
        this.props.logout();
    }

    showErrors() {
        return (
            <ul>
                {Object.values(this.props.errors).map((error, i) =>
                    <li key={i}>
                        {error}
                    </li>
                )}
            </ul>
        )
    }

    render() {

        return (
        <div className="login-page">
            <div className="login-box">
                <h2 className='login-title'><p>Big</p> <p>Bad</p> <p>Wolf</p> </h2>
                <form className="login-form">
                    <input type="text" placeholder="Username" value={this.state.username} onChange={this.handleInput('username')} />
                    <input type="password" placeholder="Password" value={this.state.password} onChange={this.handleInput('password')} />
                    <div className="login-row">
                        <button onClick={this.handleSignIn} >Login</button>
                    </div>
                </form>
                <div className="login-row">
                    <Link className="login-link" to={'/signup'}>Signup instead</Link>
                    <button className="guest" onClick={this.handleGuestSignIn} >Guest Login</button>
                </div>
                {/* <button onClick={this.handleLogout}>Logout</button> */}
                <h6>{this.showErrors()}</h6>
            </div>
        </div>
        )
    }
}

export default LoginForm