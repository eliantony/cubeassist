import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const options = [
  'one', 'two', 'three'
];
const defaultOption = options[0];


class App extends React.Component {
  constructor() {
    super();
    this.state = { value: 'Hello World' };
  }
   _onSelect = (e) => {
    //alert(e.value);
    //this.value = e.target.value;
    this.setState({ value: e.value });
  };

  render() {
    return (

      <div className="App">
  
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p>{this.state.value}</p> 
        <Dropdown options={options}  
              onChange={this._onSelect}
              value={defaultOption} 
              placeholder="Select an option" />
      </header>
    </div>
     
    );
  }
}


function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3As.jpg"
      alt="Katherine Johnson"
    />
  );
}


// ========================================





export default App;
