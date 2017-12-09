import React, { Component } from 'react';
import '../../index.css';

import {Link} from 'react-router-dom';

class NavBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      redirect: false,
      id: ''
    }
   this.logout = this.logout.bind(this);
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

  render() {
    var opcButton;
    var opcProfile;
    if(sessionStorage.getItem("idAuth")){
      opcProfile = <Link to="/Admin"><button className="btn btn-outline-success my-2 my-sm-0 ajustButton" type="submit"> Profile </button></Link>;
      opcButton = <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.logout}> Logout </button>;
    }else{
      opcButton = <Link to="/Login"><button className="btn btn-outline-success my-2 my-sm-0" type="submit"> Login </button></Link>;
      opcProfile = '';
    }
    return (
      <div>
      <nav className="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">
      <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <a className="navbar-brand" href="#">Blog</a>

      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul className="navbar-nav mr-auto">

          <li className="nav-item active">
              <Link to="/Home" className="nav-link "> Home </Link>
          </li>
          <li className="nav-item active">
              <Link to="/Posts" className="nav-link "> Posts </Link>
          </li>
          <li className="nav-item active">
              <Link to="/Authors" className="nav-link "> Authors </Link>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">

        {opcProfile}{opcButton}
        </form>
      </div>
    </nav>

      </div>
    );
  }
}

export default NavBar;
