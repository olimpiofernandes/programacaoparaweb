import React, { Component } from 'react';
import axios from 'axios';
import '../../css/listPosts.css';
import '../../index.css';
import {Link} from 'react-router-dom';

class ListPosts extends Component {

  constructor(props){
    super(props);
    this.state = {
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
    axios.get('http://localhost:4567/api/posts/')
        .then(function (response) {
          console.log(response.data);
          self.setState({posts: response.data});
        })
        .catch(function (error) {
        });
}
  render() {
    
    let list  = this.state.posts.map(function(value, index){
      return(         
          <div className="row">
          <div className="blog-post">
            <Link to={`/Posts/${value.id}`}><h4 className="blog-post-title">{value.title}</h4></Link>
            <p className="blog-post-meta"> {value.postsDate}</p>
            <p>{value.text}</p>
         </div>
         </div>
        );
    });
    
    return (
      <div className="container ajustMarginContainer">
      <div class="row">
  
      <div class="col-sm-8 blog-main">
        <div className="blog-header ajustTitleBlog">
         <h1 className="blog-title">Posts</h1>
         <p className="lead blog-description"> All posts </p>
        </div><br/><br/>
  
        {list}
  
     <br/><br/>
     </div>
    </div>
  </div>
    );
  };
}

export default ListPosts;
