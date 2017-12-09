import React, { Component } from 'react';
import {PostData} from '../Services/PostData';
import {Redirect, Link} from 'react-router-dom';
import '../../css/signin.css';

class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password:'',
      redirect: false
    }
    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  login(){

  if(this.state.email && this.state.password){
    PostData('login/', this.state).then((result) => {
      let responseJSON = result;
      if(responseJSON){
        sessionStorage.setItem('idAuth', responseJSON.id);
        sessionStorage.setItem('nameAuth', responseJSON.name);
        sessionStorage.setItem('emailAuth', responseJSON.email);
        sessionStorage.setItem('tokenAuth', responseJSON.token);
        sessionStorage.setItem('userData', responseJSON);
        this.setState({redirect: true});
      }
      else{
        console.log("error login");
        alert("Erro ao fazer login!");
      }
    });
  }

}

  onChange(e){
    this.setState({[e.target.name]: e.target.value});
    console.log(this.state);
  }

  render() {

    if(this.state.redirect){
      return (<Redirect to={'/Admin'} />)
    }
    if(sessionStorage.getItem("userData")){
      return (<Redirect to={'/Admin'} />)
    }

    return (
        <div className="container ajustWidth">
        <div className="form-signin">
        <h2 className="form-signin-heading">Please sign in</h2>
        <input type="email" name="email" id="inputEmail" className="form-control" placeholder="Email address" onChange={this.onChange}/> <br/>
        <input type="password" name="password" id="inputPassword" className="form-control" placeholder="Password" onChange={this.onChange}/> <br/>
        <input type="submit" value="Sign in" className="btn btn-lg btn-primary btn-block" onClick={this.login} /><br/><br/>
        <Link to={`/SignupAuthors`}><a className="btn btn-secondary" role="button">Signup</a></Link>
      </div>
      </div>
    );
  }
}

export default Login;
