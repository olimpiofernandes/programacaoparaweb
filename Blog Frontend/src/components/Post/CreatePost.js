import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {PostData} from '../Services/PostData';

class CreatePost extends Component {

  constructor(props){
    super(props);
    this.state = {
      title: '',
      text: '',
      user_name: sessionStorage.getItem("nameAuth"),
      user_id: sessionStorage.getItem("idAuth"),
      redirect: false,
      confirm: false
    }
   this.logout = this.logout.bind(this);
   this.createPosts = this.createPosts.bind(this);
   this.onChange = this.onChange.bind(this);
  }

  componentWillMount(){
    if(sessionStorage.getItem("userData")){
      //this.setState({id: sessionStorage.getItem("idAuth")});
    }
    else{
      this.setState({redirect: true});
    }
  }

  createPosts(){
      if(this.state.title && this.state.text && this.state.user_name && this.state.user_id){
        PostData('posts/', this.state).then((result) => {
          let responseJSON = result;
          if(responseJSON){
            this.setState({confirm: true});
            console.log(responseJSON);
            console.log("Posts Send!");
          }
          else{
            alert("Error send posts!");
          }
        });
      }
    
    }
    onChange(e){
      this.setState({[e.target.name]: e.target.value});
      console.log(this.state);
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
    let confirmation;

    if(this.state.confirm == true){
      return( 
        <div>
        <br/><br/>
        <div className="alert alert-success" role="alert"><strong>Well done!</strong> Your post was posted!</div> <br/>
        <Link to={`/Admin`}><button type="button" className="btn btn-success">OK!</button></Link>
        </div>
      );
    } 
    return(

      <div><br/><br/>
      <br/>
      <div className="container">
      <div className="divBody">
      <h2 className="form-signin-heading">Create new Posts</h2>
      <input type="name" name="title" id="inputEmail" className="form-control" placeholder="Title" onChange={this.onChange}/> <br/>
      <textarea name="text" placeholder="Write your post here..." className="form-control" id="exampleTextarea" rows="3" onChange={this.onChange}></textarea> <br/>
      <input type="submit" value="Save posting" className="btn btn-lg btn-primary btn-block" onClick={this.createPosts} /> <br/>
    </div>
      {confirmation}
    </div>
    </div>

    );
  }
}

export default CreatePost;
