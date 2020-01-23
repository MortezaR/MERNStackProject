import {connect} from 'react-redux';
import { login } from '../../actions/session_actions'
import LoginForm from './login_form'

const mapStateToProps = state => ({
    errors: state.session.errors,
    currentUser: state.session.user
})

const mapDispatchToProps = dispatch => ({
    login: (user) => dispatch(login(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)