import React, { Component } from 'react';
import NavBar from './components/NavBar/NavBar';
import Main from './Main';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="starter-template">
            <Main />
          </div>  
        </div>  

      </div>
    );
  }
}

export default App;
