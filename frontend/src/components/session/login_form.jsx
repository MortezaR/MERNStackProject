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
        this.demo1 = this.demo1.bind(this);
        this.demo2 = this.demo2.bind(this);
        this.demo3 = this.demo3.bind(this);
        this.demo4 = this.demo4.bind(this);
        this.demo5 = this.demo5.bind(this);
        this.demo6 = this.demo6.bind(this);
        this.demo7 = this.demo7.bind(this);
        this.demo8 = this.demo8.bind(this);
    }

    handleInput(kind) {
        return e => this.setState({
            [kind]: e.currentTarget.value
        })
    }

    handleSignIn(e) {
        e.preventDefault();
        this.props.login(this.state).then(() => {
            if (typeof this.props.currentUser !== 'undefined' && Object.values(this.props.currentUser).length > 0) this.props.history.push("/lobby")
        })
    }

    handleGuestSignIn(e) {
        e.preventDefault();
        let randName = 'Guest #' + Math.random().toString(36).substring(2, 12);
        let randPassword =  Math.random().toString(36).substring(2, 15);
        this.props.signup({username: randName, password: randPassword, password2: randPassword})
        .then(() => {
            if (this.props.signedIn === true) this.props.login({username: randName, password: randPassword}) 
        })
        .then(() => {
            if (this.props.signedIn === true) this.props.history.push('/lobby')
        })

        // let randString = 'password1'
        //     this.props.login({username: 'Guest', password: randString})
        //     .then(() => {
        //         if (this.props.signedIn === true) this.props.history.push('/lobby');
        //     })
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


    demo8(e) {
        e.preventDefault();
        this.props.login({
            username: 'myqueen8',
            password: 'demo123'
        }).then(() => {
            if (this.props.currentUser) this.props.history.push("/home")
        })
    }

    demo5(e) {
        e.preventDefault();
        this.props.login({
            username: 'myqueen5',
            password: 'demo123'
        }).then(() => {
            if (this.props.currentUser) this.props.history.push("/home")
        })
    }


    demo6(e) {
        e.preventDefault();
        this.props.login({
            username: 'myqueen6',
            password: 'demo123'
        }).then(() => {
            if (this.props.currentUser) this.props.history.push("/home")
        })
    }

    demo7(e) {
        e.preventDefault();
        this.props.login({
            username: 'myqueen7',
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
                    <input type="text" placeholder=" username" value={this.state.username} onChange={this.handleInput('username')} />
                    <input type="text" placeholder=" password" value={this.state.password} onChange={this.handleInput('password')} />
                    <div className="login-row">
                        <button onClick={this.handleSignIn} >Login</button>
                    </div>
                    {/* <input type="text" placeholder="Password" value={this.state.password} onChange={this.handleInput('password')} /> */}
                    {/* <button onClick={this.handleSignIn} >Login</button>
                    <button onClick={this.demo1} >demo1</button>
                    <button onClick={this.demo2} >demo2</button>
                    <button onClick={this.demo3} >demo3</button>
                    <button onClick={this.demo4} >demo4</button>
                    <button onClick={this.demo5} >demo5</button>
                    <button onClick={this.demo6} >demo6</button>
                    <button onClick={this.demo7} >demo7</button>
                    <button onClick={this.demo8} >demo9</button> */}

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