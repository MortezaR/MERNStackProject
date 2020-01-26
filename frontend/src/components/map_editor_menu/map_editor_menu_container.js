import {connect} from 'react-redux';
import MapEditorMenu from './map_editor_menu';
import {withRouter} from 'react-router-dom';

const mapStateToProps = (state,ownProps) => ({
    currentUser: state.session.user,
    mapId: ownProps.match.params.mapId
})

const mapDispatchToProps = dispatch => ({

})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MapEditorMenu))