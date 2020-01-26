import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { login, signup } from '../../actions/session_actions';
import SignUpModal from './signup_modal';
import {openModal, closeModal} from '../../actions/modal_actions'


const mapState = ({ errors }) => ({
    errors: errors.session,
    formType: 'signup',
    navLink: <Link to="/login">log in instead</Link>,
})

const mapDispatch = dispatch =>  ({
    processForm: (user) => dispatch(signup(user)).then(() => dispatch(closeModal())),
    closeModal: () => dispatch(closeModal())
})

export default connect(mapState, mapDispatch)(SignUpModal);
