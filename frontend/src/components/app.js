
import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
// import LoginFormContainer from './session/login_form_container';
// import SignupFormContainer from './session/signup_form_container';
import LobbyContainer from './lobby/lobby_container';
import gameCanvas from './gameCanvas'
import MapEditor from './map_editor/map_editor'
import TopNavContainer from './top_nav/top_nav_container'
import LoginFormContainer from './session/login_form_container'
import SignupFormContainer from './session/signup_form_container';
import ProfileContainer from './profile/profile_container.js'
import '../App.scss'
import MiddleModal from './modal/middle_modal.jsx';

const App = () => (
  <div>
    <MiddleModal />
    <TopNavContainer />
    <Switch>
      <ProtectedRoute exact path="/map/:mapId" component={MapEditor} />
      <ProtectedRoute exact path="/map" component={MapEditor} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <ProtectedRoute exact path="/game" component={gameCanvas} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <ProtectedRoute exact path="/profile" component={ProfileContainer} />
      <ProtectedRoute path="/" component={LobbyContainer} />
    </Switch>
  </div>
);

export default App;