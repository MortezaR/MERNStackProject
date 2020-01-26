
import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
// import LoginFormContainer from './session/login_form_container';
// import SignupFormContainer from './session/signup_form_container';
import LobbyContainer from './lobby/lobby_container'
import gameCanvas from './gameCanvas'
import MapEditor from './map_editor/map_editor'
import TopNavTwoContainer from './top_nav_two/top_nav__two_container'
import LoginFormContainer from './session/login_form_container'
import SignupFormContainer from './session/login_form_container';
import ProfileContainer from './profile/profile_container.js'
import '../App.scss'
import Modal from './modal/modal.jsx';

const App = () => (
  <div>
    <Modal />
 
{/*       
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <ProtectedRoute exact path="/game" component={UsersIndexContainer} /> */}
      <Switch>
        <ProtectedRoute exact path="/map/:mapId" component={MapEditor} />
        <ProtectedRoute exact path="/map" component={MapEditor} />
        <Route path="/" component={TopNavTwoContainer} />
      </Switch>
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <ProtectedRoute exact path="/lobby" component={Lobby} />
      <ProtectedRoute exact path="/game" component={gameCanvas} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <ProtectedRoute exact path="/profile" component={ProfileContainer} />
      {/* <ProtectedRoute exact path="/editor" component={ProfileContainer} /> */}

 
  </div>
);

export default App;