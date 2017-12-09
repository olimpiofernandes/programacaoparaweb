import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import '../../index.css';

class Admin extends Component {

     constructor(props){
       super(props);
       this.state = {
         redirect: false,
         posts: [],
         id: ''
       }
      this.logout = this.logout.bind(this);
     }

     componentWillMount(){
       if(sessionStorage.getItem("userData")){
         //this.setState({id: sessionStorage.getItem("idAuth")});
       }
       else{
         this.setState({redirect: true});
       }

       let self = this;

       axios.get('http://localhost:4567/api/posts/postsUser/'+sessionStorage.getItem("idAuth"))
           .then(function (responsePosts) {
             self.setState({posts: responsePosts.data});
           })
           .catch(function (error) {
           }); 
     }


    logout(){
       sessionStorage.setItem('idAuth', '');
       sessionStorage.setItem('nameAuth', '');
       sessionStorage.setItem('emailAuth', '');
       sessionStorage.setItem('tokenAuth', '');
       sessionStorage.setItem("userData", '');
       sessionStorage.clear();
       this.setState({redirect: true});
     }

     render(){
       if(this.state.redirect){
         return (<Redirect to={'/login'}/>)
       }

       let idUser = sessionStorage.getItem("idAuth");
       let postsList;

       if(this.state.posts != []){
        postsList  = this.state.posts.map(function(posts, index){
         let newIndex = index + 1;
             return(
                   <div className="col-md-4">
                   <h4>{posts.title}</h4>
                   <p>{posts.text}</p>
                   <p><Link to={`/Posts/${posts.id}`}><a className="btn btn-secondary" role="button">View details</a></Link> &nbsp;
                      <Link to={`/EditPost/${posts.id}`}><a className="btn btn-secondary" role="button">Edit</a></Link>
                   </p>

                 </div>
               );
           });
       }
       return(

    <div>
    <div className="jumbotron">
      <h1 className="display-3"> {sessionStorage.getItem("nameAuth").toUpperCase()}</h1>
      <p className="lead"> {sessionStorage.getItem("emailAuth")}</p>
      <p>
      <Link to={'/CreatePost'}><a className="btn btn-outline-info AjustButtonSubMenu" href="#" role="button">Create Posts</a></Link>
      <Link to={'/SignupAuthors'}><a className="btn btn-outline-info AjustButtonSubMenu" href="#" role="button">Register new authors</a></Link>
      </p>
    </div>
  <br/><br/>
   <div className="container">
   <h2>My posts</h2><br/>
     <div className="row">
       {postsList}
     </div>
    </div>
  </div>
       );
     }
}

export default Admin;
