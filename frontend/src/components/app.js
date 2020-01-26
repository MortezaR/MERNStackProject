
import React from 'react';
// import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
// import LoginFormContainer from './session/login_form_container';
// import SignupFormContainer from './session/signup_form_container';
import Lobby from './lobby/lobby'
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
      <Route exact path="/login" component={LoginFormContainer} />
      <Route exact path="/lobby" component={Lobby} />
      <Route exact path="/game" component={gameCanvas} />
      <Route exact path="/signup" component={SignupFormContainer} />
<<<<<<< HEAD
      {/* <Route path="/" component={Lobby} /> */}
=======
      <Route exact path="/profile" component={ProfileContainer} />
>>>>>>> 577c89a17d9a64db7be31b582c201cbcde20d9fe
      {/* <ProtectedRoute exact path="/editor" component={ProfileContainer} /> */}

    </Switch>
  </div>
);

export default App;