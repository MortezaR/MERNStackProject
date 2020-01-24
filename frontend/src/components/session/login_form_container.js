import {connect} from 'react-redux';
import { login, logout } from '../../actions/session_actions'
import LoginForm from './login_form'

const mapStateToProps = state => ({
    errors: state.errors.session,
    currentUser: state.session.user
})

const mapDispatchToProps = dispatch => ({
    login: (user) => dispatch(login(user)),
    logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)