import React, { Component } from 'react';
import axios from 'axios';
import '../../index.css';

class Authors extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: []
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
    //axios.get('https://swapi.co/api/people')
        .then(function (response) {
          console.log(response.data);
          self.setState({user: response.data});
        })
        .catch(function (error) {
        });
}

  render() {
    let list  = this.state.user.map(function(value, index){
    index = index+1;
      return(
            <tr>
              <th scope="row">{index}</th>
              <td>{value.name}</td>
              <td>{value.email}</td>
            </tr>
        );
    });
    return (
      <div className="container ajustMarginContainer">
        <div class="row">
           <div className="blog-header ajustTitleBlog">
             <h1 className="blog-title">Authors</h1>
             <p className="lead blog-description"> all blog authors </p>
           </div>
 

        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>E-mail</th>
            </tr>
          </thead>
          <tbody>
            {list}
          </tbody>
        </table>
    </div>
  </div>  
    );
  }
}

export default Authors;
