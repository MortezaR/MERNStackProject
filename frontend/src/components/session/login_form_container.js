import {connect} from 'react-redux';
import { login, logout, signup } from '../../actions/session_actions'
import LoginForm from './login_form'

const mapStateToProps = state => ({
    errors: state.errors.session,
    currentUser: state.session.user,
    signedIn: state.session.isSignedIn

})

const mapDispatchToProps = dispatch => ({
    login: (user) => dispatch(login(user)),
    logout: () => dispatch(logout()),
    signup: (user) => dispatch(signup(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)