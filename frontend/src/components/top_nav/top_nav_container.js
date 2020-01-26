import {connect} from 'react-redux';
import TopNav from './top_nav';
import {withRouter} from 'react-router-dom'
import {openModal} from '../../actions/modal_actions';

const mapStateToProps = (state,ownProps) => ({
    currentUser: state.session.user,
    mapId: ownProps.match.params.mapId
})

const mapDispatchToProps = dispatch => ({
    openModal: modalForm => dispatch(openModal(modalForm))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopNav))