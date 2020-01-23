
import React from 'react';
// import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
// import LoginFormContainer from './session/login_form_container';
// import SignupFormContainer from './session/signup_form_container';
import Lobby from './lobby'
import MapEditor from './map_editor/map_editor'
import LoginFormContainer from './session/login_form_container'
import '../App.scss'

const App = () => (
  <div>
    {/* <NavBarContainer /> */}
    <Switch>
{/*       
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <ProtectedRoute exact path="/game" component={UsersIndexContainer} /> */}
      <Route exact path="/map" component={MapEditor} />
      <Route exact path="/login" component={LoginFormContainer} />
      <Route path="/" component={Lobby} />
      {/* <ProtectedRoute exact path="/editor" component={ProfileContainer} /> */}

    </Switch>
  </div>
);

export default App;