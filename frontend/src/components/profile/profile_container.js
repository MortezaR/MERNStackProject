import {connect} from 'react-redux';
import Profile from './profile';

const mapStateToProps = state => ({
    errors: state.errors.session,
    currentUser: state.session.user
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)