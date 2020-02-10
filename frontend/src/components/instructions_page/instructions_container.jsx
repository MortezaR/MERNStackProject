import { connect } from 'react-redux';
import Instructions from './instructions'

const mapStateToProps = state => ({
    currentUser: state.session.user
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Instructions);