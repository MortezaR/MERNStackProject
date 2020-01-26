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
        this.demo1 = this.demo1.bind(this);
        this.demo2 = this.demo2.bind(this);
        this.demo3 = this.demo3.bind(this);
        this.demo4 = this.demo4.bind(this);
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

    demo1(e) {
        e.preventDefault();
        this.props.login({
            username: 'myqueen',
            password: 'demo123'
        }).then(() => {
            if (this.props.currentUser) this.props.history.push("/home")
        })
    }

    demo2(e) {
        e.preventDefault();
        this.props.login({
            username: 'myqueen2',
            password: 'demo123'
        }).then(() => {
            if (this.props.currentUser) this.props.history.push("/home")
        })
    }

    demo3(e) {
        e.preventDefault();
        this.props.login({
            username: 'myqueen3',
            password: 'demo123'
        }).then(() => {
            if (this.props.currentUser) this.props.history.push("/home")
        })
    }

    demo4(e) {
        e.preventDefault();
        this.props.login({
            username: 'myqueen4',
            password: 'demo123'
        }).then(() => {
            if (this.props.currentUser) this.props.history.push("/home")
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
                    <button onClick={this.handleSignIn} >Login</button>
                    <button onClick={this.demo1} >demo1</button>
                    <button onClick={this.demo2} >demo2</button>
                    <button onClick={this.demo3} >demo3</button>
                    <button onClick={this.demo4} >demo4</button>

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