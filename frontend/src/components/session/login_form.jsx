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
                    <input type="text" placeholder="Password" value={this.state.password} onChange={this.handleInput('password')} />
                </form>
                <div className="login-row">
                    <Link className="login-link" to={'/signup'}>Signup instead</Link>
                    <button onClick={this.handleSignIn} >Login</button>
                </div>
                <button onClick={this.handleLogout}>Logout</button>
                <h6>{this.showErrors()}</h6>
            </div>
        </div>
        )
    }
}

export default LoginForm