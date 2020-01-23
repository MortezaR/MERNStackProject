import React from "react"

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(kind) {
        return e => this.setState({
            [kind]: e.currentTarget.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.login(this.state).then(() => console.log(this.props.currentUser));
    }

    render() {

        return (
            <div>
                <form handleSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Username" value={this.state.username} onChange={this.handleInput('username')} />
                    <input type="text" placeholder="Password" value={this.state.password} onChange={this.handleInput('password')} />
                </form>
                <h6>{this.props.errors}</h6>
            </div>
        )
    }
}

export default LoginForm