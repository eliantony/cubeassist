import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const options = [
  '3x3', '2x2', 'Skewb'
];
const defaultOption = options[0];


class App extends React.Component {
  constructor() {
    super();
    this.state = { 
      scramble: '',
      cubeType: '' 
    };
    
  }
   _onSelect = (e) => {
    this.generate(e.value)
  };

  componentDidMount() {
    this.generate(options[0]);
  }
  
  generate(cubeType) {
    switch (cubeType) {
      case "3x3":
        this.setState(
          {
            cubeType : "3x3",
            scramble: generate3x3()
          }
        );
        break;
        case "2x2":
        this.setState(
          {
            cubeType : "2x2",
            scramble: generate2x2()
          }
        );
        break;
        case "Skewb":
        this.setState(
          {
            cubeType : "Skewb",
            scramble: generateSkewb()
          }
        );
        break;
    
      default:
        break;
    }
    this.setState({ value: "Random scramble" });
  }

  render() {
    return (

      <div className="App">
  
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p className='Scramble-txt'>{this.state.scramble}</p>
        <Dropdown options={options}  
              onChange={this._onSelect}
              value={defaultOption} 
              placeholder="Select an option" />
      </header>
    </div>
     
    );
  }
}

function generate3x3() {
  return "genned 3x3 scramble";
}
function generate2x2() {
  return "genned 2x2 scramble";
}
function generateSkewb() {
  return "genned Skewb scramble";
}


// ========================================





export default App;
