import React, { Component } from 'react';
import axios from 'axios';
import {PostData} from '../Services/PostData';
import '../../index.css';


class DetailsPosts extends Component {

  constructor(props){
    super(props);
    this.state = {
      userNameComment: '',
      textComment: '',
      posts_id: this.props.match.params.id,
      comments: [],
      posts: [],
    }
    this.createComment = this.createComment.bind(this);
    this.onChange = this.onChange.bind(this);
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
    let idPost = this.props.match.params.id;
    let self = this;
    axios.get('http://localhost:4567/api/posts/'+idPost)
        .then(function (response) {
          console.log(response.data);
          self.setState({posts: response.data});
        })
        .catch(function (error) {
        });

        axios.get('http://localhost:4567/api/comment/commentsPost/'+idPost)
            .then(function (response) {
              console.log(response.data);
              self.setState({comments: response.data});
            })
            .catch(function (error) {
            });
  }

  createComment(){
    this.dataComment = {
      userNameComment: this.state.userNameComment,
      textComment: this.state.textComment,
      posts_id: this.props.match.params.id
    }
    if(this.state.userNameComment && this.state.textComment && this.state.posts_id){
      PostData('comment/', this.dataComment).then((result) => {
        let responseJSON = result;
        if(responseJSON){
          this.setState({confirm: true});
          console.log(responseJSON);
          console.log("Comment Send!");
        }
        else{
          alert("Error send comment!");
        }
      });
    }
  
  }
  onChange(e){
    this.setState({[e.target.name]: e.target.value});
    console.log(this.state);
  }


  render() {
    let list  = this.state.posts.map(function(value, index){
      return(

        <div className="row">
        <div className="blog-post">
          <h4 className="blog-post-title">{value.title}</h4>
          <p className="blog-post-meta"> {value.postsDate}</p>
          <p>{value.text}</p>
       </div>
       </div>
        );
    }); 
    let listComments  = this.state.comments.map(function(comm, index){
        return(
          <div>
          <h2>{comm.userNameComment}</h2> <p className="lead blog-description">{comm.dateComment}</p>
          <p>{comm.textComment}</p>
          </div>         

          );
      });
    return (
      <div className="container ajustMarginContainer">
      <div className="row">
  
      <div className="col-sm-8 blog-main">
        <div className="blog-header ajustTitleBlog">
         <h1 className="blog-title">Datails Posts</h1>
         <p className="lead blog-description"></p>
        </div><br/><br/>
  
        {list}
  
     <br/><br/><br/>
        <div className="blog-header ajustTitleBlog">
         <h3 className="blog-title">Comments</h3>
         <br/>
         <div className="">
         <h6 className="form-signin-heading">Create new comment</h6>
         <input type="name" name="userNameComment" id="inputEmail" className="form-control" placeholder="Your name" onChange={this.onChange}/> <br/>
         <textarea name="textComment" placeholder="Write your comment here..." className="form-control" id="exampleTextarea" rows="3" onChange={this.onChange}></textarea> <br/>
         <input type="submit" value="Save comment" className="btn btn-lg btn-primary btn-block" onClick={this.createComment} /> <br/>
         </div>

         <br/><br/>
         <p className="lead blog-description"></p>
         <p>{listComments}</p>
        </div>

     </div>
    </div>
  </div>
    );
  };
}

export default DetailsPosts;