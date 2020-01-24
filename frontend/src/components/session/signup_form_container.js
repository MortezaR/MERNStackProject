import { connect } from 'react-redux';
import { login, signup } from '../../actions/session_actions';
import SignupForm from './signup_form';

const mapStateToProps = state => ({
    errors: state.errors.session,
    currentUser: state.session.user,
    signedIn: state.session.isSignedIn
})

const mapDispatchToProps = dispatch => ({
    signup: (user) => dispatch(signup(user)),
    login: (user) => dispatch(login(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm)