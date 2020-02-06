import { connect } from 'react-redux';
import Lobby from './lobby';

const mapStateToProps = state => ({
    currentUser: state.session.user
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Lobby)