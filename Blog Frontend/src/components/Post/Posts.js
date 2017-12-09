import React, { Component } from 'react';
import axios from 'axios';
import ListPosts from './ListPosts';
import DetailsPosts from './DetailsPosts';
import EditPost from './EditPost';


import {Switch, Route, Link} from 'react-router-dom';

class Posts extends Component {

  render() {
    return (
    <Switch>
      <Route exact path="/Posts" component={ListPosts}/>
      <Route path="/Posts/:id" component={DetailsPosts}/>

    </Switch>
    );
  };
}

export default Posts;