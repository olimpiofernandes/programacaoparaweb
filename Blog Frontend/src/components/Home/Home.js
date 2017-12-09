import React, { Component } from 'react';
import axios from 'axios';
import '../../index.css';

import {Link} from 'react-router-dom';

class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
          user: [],
          posts: []
        };
    }
     
    componentDidMount(){
      /*
      let config = {
            headers: {
             'Access-Control-Allow-Origin': '*',
             'content-type': 'application/json',
             //'Access-Control-Allow-Credentials': true
            }
        };
        */

        let self = this;
        axios.get('http://localhost:4567/api/user/')
            .then(function (responseUser) {
              self.setState({user: responseUser.data});
            })
            .catch(function (error) {
            });

       axios.get('http://localhost:4567/api/posts/')
                .then(function (responsePosts) {
                  self.setState({posts: responsePosts.data});
                })
                .catch(function (error) {
                });
    
    }

   render() {
    let list, posts;
    if(this.state.user != []){
    list  = this.state.user.map(function(value, index){
        let newIndex = index + 1;
        return(
            <li><a href="#">{value.name} - {value.email}</a></li>
          );
      });
    }
     if(this.state.posts != []){
     posts  = this.state.posts.map(function(posts, index){
      let newIndex = index + 1;
          return(
                  <div className="row">
                        <div className="blog-post">
                          <Link to={`/Posts/${posts.id}`}><h4 className="blog-post-title">{posts.title}</h4></Link>
                          <p className="blog-post-meta"> {posts.postsDate}, By <a href="#">{posts.user_name}</a></p>
                          <p>{posts.text}</p>
                       </div>
                </div>
            );
        });
    }
    return (
    <div className="container ajustMarginContainer">
    <div className="row">

    <div className="col-sm-8 blog-main">
    <div className="blog-header ajustTitleBlog">
       <h1 className="blog-title">The Blog - Prog. for web</h1>
       <p className="lead blog-description"> An example blog using React and Kotlin </p>
    </div><br/><br/>

      {posts}

   <br/><br/>
   </div>
   <div className="col-sm-3 offset-sm-1 blog-sidebar">
          <div className="sidebar-module">
            <h4>Authors</h4>
            <ol className="list-unstyled">
              {list}
            </ol>
          </div>
        </div>
  </div>
</div>
    );

  }

}

export default Home;
