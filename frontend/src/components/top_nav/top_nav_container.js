import {connect} from 'react-redux';
import TopNav from './top_nav';
import {withRouter} from 'react-router-dom'

const mapStateToProps = (state,ownProps) => ({
    currentUser: state.session.user,
    mapId: ownProps.match.params.mapId
})

const mapDispatchToProps = dispatch => ({

})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopNav))