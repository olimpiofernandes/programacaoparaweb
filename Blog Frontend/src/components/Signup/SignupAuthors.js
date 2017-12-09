import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {PostData} from '../Services/PostData';
import {Link} from 'react-router-dom';
import '../../index.css';

class SignupAuthors extends Component {

     constructor(props){
       super(props);
       this.state = {
         name: '',
         email: '',
         password: '',
         redirect: false,
         confirm: false
       }
       this.logout = this.logout.bind(this);
       this.createUser = this.createUser.bind(this);
       this.onChange = this.onChange.bind(this);
     }

     componentWillMount(){
       if(sessionStorage.getItem("userData")){
         console.log("call user feed");
       }
       else{
         this.setState({redirect: true});
       }
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
    createUser(){
      if(this.state.name && this.state.email && this.state.password){
        PostData('user/', this.state).then((result) => {
          let responseJSON = result;
          if(responseJSON){
            this.setState({confirm: true});
            console.log(responseJSON);
            console.log("User Create!");
          }
          else{
            alert("Error create user!");
          }
        });
      }
    
    }
    onChange(e){
      this.setState({[e.target.name]: e.target.value});
      console.log(this.state);
    }

     render(){
       let confirmation;
       if(this.state.confirm == true){
         return( 
           <div>
           <br/><br/>
           <div className="alert alert-success" role="alert"><strong>Well done!</strong> You was inserted!</div> <br/>
           <Link to={`/CreatePost`}><button type="button" className="btn btn-success">OK!</button></Link>
           </div>
         );
       } 
       return(
         <div><br/><br/>
         <br/>
         <div className="container">
         <div className="divBody">
         <h2 className="form-signin-heading">Register authors</h2>
         <input type="name" name="name" id="inputEmail" className="form-control" placeholder="Name" onChange={this.onChange}/> <br/>
         <input type="email" name="email" id="inputEmail" className="form-control" placeholder="Email address" onChange={this.onChange}/> <br/>
         <input type="password" name="password" id="inputPassword" className="form-control" placeholder="Password" onChange={this.onChange}/> <br/>
         <input type="submit" value="Save" className="btn btn-lg btn-primary btn-block" onClick={this.createUser} />
       </div>
       {confirmation}
       </div>
       </div>
       );
     }
}

export default SignupAuthors;
