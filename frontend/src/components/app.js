
import React from 'react';
// import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
// import LoginFormContainer from './session/login_form_container';
// import SignupFormContainer from './session/signup_form_container';
import LobbyContainer from './lobby/lobby_container'
import gameCanvas from './gameCanvas'
import MapEditor from './map_editor/map_editor'
import TopNav from './top_nav/top_nav'
import LoginFormContainer from './session/login_form_container'
import SignupFormContainer from './session/signup_form_container'
import ProfileContainer from './profile/profile_container.js'
import '../App.scss'

const App = () => (
  <div>
    <TopNav />
    <Switch>
{/*       
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <ProtectedRoute exact path="/game" component={UsersIndexContainer} /> */}
      <Route exact path="/map" component={MapEditor} />
      <Route exact path="/map/:mapId" component={MapEditor} />
      <Route exact path="/" component={LoginFormContainer} />
      <Route exact path="/home" component={LobbyContainer} />
      <Route exact path="/game" component={gameCanvas} />
      <Route exact path="/signup" component={SignupFormContainer} />
      <Route exact path="/profile" component={ProfileContainer} />
      {/* <ProtectedRoute exact path="/editor" component={ProfileContainer} /> */}

    </Switch>
  </div>
);

export default App;