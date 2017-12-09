import React, { Component } from 'react';
import Home from './components/Home/Home';
import Authors from './components/Author/Authors';
import Posts from './components/Post/Posts';
import editPost from './components/Post/EditPost';
import CreatePost from './components/Post/CreatePost';
import Login from './components/Login/Login';
import Admin from './components/Admin/Admin';
import SignupAuthors from './components/Signup/SignupAuthors';


import {Switch, Route} from 'react-router-dom';

class Main extends Component {
  render() {
    return (
      <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/Home" component={Home} />
          <Route path="/Authors" component={Authors} />
          <Route path="/Posts" component={Posts} />
          <Route path="/Login" component={Login} />
          <Route path="/Admin" component={Admin} />
          <Route path="/CreatePost" component={CreatePost} />
          <Route path="/SignupAuthors" component={SignupAuthors} />
          <Route path="/EditPost/:id" component={editPost} />

      </Switch>

    );
  }
}

export default Main;
