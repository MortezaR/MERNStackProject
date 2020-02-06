import React from 'react'
import { Link } from 'react-router-dom'

class SignupForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            password2: ''
        }
        this.handleInput = this.handleInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showErrors = this.showErrors.bind(this);
    }

    handleInput(kind) {
        return (e) => {
            this.setState({[kind]: e.currentTarget.value})
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.signup(this.state)
        .then(() => {
            if (this.props.signedIn === true) this.props.login({username: this.state.username, password: this.state.password}) 
        })
        .then(() => {
            if (this.props.signedIn === true) this.props.history.push('/lobby')
        })
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
            <div className="signup-page">
            <div className="signup-box">
                <h2 className='signup-title'><p>Big</p> <p>Bad</p> <p>Wolf</p> </h2>
                <form className="signup-form">
                    <input type="text" placeholder=" username" value={this.state.username} onChange={this.handleInput('username')}/>
                    <input type="password" placeholder=" enter password" value={this.state.password} onChange={this.handleInput('password')}/>
                    <input type="password" placeholder=" re-enter password" value={this.state.password2} onChange={this.handleInput('password2')}/>
                </form>
                <div className="signup-row">
                    <Link className="signup-link" to={'/login'}>Login instead</Link>
                    <button onClick={this.handleSubmit}>Sign Up</button>
                </div>
                <h6>{this.showErrors()}</h6>
            </div>
            </div>
        )
    }
}

export default SignupForm