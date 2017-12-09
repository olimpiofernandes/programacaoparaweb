import React, { Component } from 'react';
import axios from 'axios';
import {Link, Route, Redirect} from 'react-router-dom';
import {EditData} from '../Services/EditData';
import {DeleteData} from '../Services/DeleteData';
import '../../index.css';


class EditPost extends Component {

  constructor(props){
    super(props);
    this.state = {
      title: '',
      text: '',
      user_name: '',
      user_id: '',
      posts: [],
      comments: [],
      redirect: false
    }
    this.editPost = this.editPost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.onChange = this.onChange.bind(this);
}
componentDidMount(){
  if(sessionStorage.getItem("userData")){
    //this.setState({id: sessionStorage.getItem("idAuth")});
  }
  else{
    this.setState({redirect: true});
  }
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
        .then(function (responsePosts) {
          console.log(responsePosts.data);
          self.setState({posts: responsePosts.data});
        })
        .catch(function (error) {
        });

    axios.get('http://localhost:4567/api/comment/commentsPost/'+idPost)
        .then(function (responseComments) {
          console.log(responseComments.data);
          self.setState({comments: responseComments.data});
        })
        .catch(function (error) {
        });    

}

editPost(){

      this.dataPost = {
        title: this.state.title,
        text: this.state.text,
        user_name: sessionStorage.getItem("nameAuth"),
        user_id: sessionStorage.getItem("idAuth"),
      }

      let idPosts = this.props.match.params.id;
      if(this.state.title && this.state.text && this.state.user_name && this.state.user_id){
        EditData(`posts/${idPosts}`, this.dataPost).then((result) => {
          let responseJSON = result;
          if(responseJSON){
            this.setState({confirm: true});
            console.log(responseJSON);
            console.log("Post updated!");
          }
          else{
            alert("Error edit post!");
          }
        });
      }
    
}

  deletePost(){ 

    let idPosts = this.props.match.params.id;
    axios.delete('http://localhost:4567/api/post/' + idPosts)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value});
    console.log(this.state);
  }


  render() {
    if(this.state.redirect){ return (<Redirect to={'/login'}/>) }


    let titlePost, textPost;

    let postRecForId  = this.state.posts.map(function(value, index){
      titlePost = value.title;
      textPost = value.text;
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
        <div className="blog-header ajustTitleBlog">
         {postRecForId}
         <button type="button" className="btn btn-danger" onClick={this.deletePost}>Delete this post</button>
         <br/><br/><br/>
         <div className="">
         <h6 className="form-signin-heading">Update post</h6>
         <input type="text" name="title" id="inputEmail" className="form-control" placeholder={titlePost} onChange={this.onChange}/> <br/>
         <textarea name="text" className="form-control" id="exampleTextarea" rows="3" placeholder={textPost}  onChange={this.onChange}></textarea> <br/>
         <input type="submit" value="Uptade post" className="btn btn-lg btn-primary btn-block" onClick={this.editPost} /> <br/>
         </div>

         <br/><br/>
         <h3 className="blog-title">Comments</h3><br/>
         <p className="lead blog-description"></p>
         <p>{listComments}</p>
        </div>

     </div>
    </div>
    );
  };
}

export default EditPost;