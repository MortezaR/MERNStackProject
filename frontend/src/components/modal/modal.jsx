import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import SignupModalContainer from '../forms/signup_modal_container';

const Modal = ({modal, closeModal}) => {
  if (!modal) {
    return null;
  }
  let component;
  switch (modal) {
    case 'signup':
      component = <SignupModalContainer />;
      break;
    default:
      return null;
  }
  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-child" onClick={e => e.stopPropagation()}>
        { component }
      </div>
    </div>
  );
}

const mapState = state => ({
  modal: state.ui.modal
})

const mapDispatch = dispatch => ({
  closeModal: () => dispatch(closeModal())
})

export default connect(mapState, mapDispatch)(Modal);