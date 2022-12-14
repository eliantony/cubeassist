import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import CountDown from './CountDown'
import PlayNotification from './PlayNotification';
import ToggleSwitch from "./ToggleSwitch";
import './App.css';
const options = [
  '3x3', '2x2', 'Skewb'
];
const defaultOption = options[0];

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      scramble: '',
      cubeType: '',
      time: "",
      isInspecting: false,
      isFirstWarning: false,
      isSecondWarning: false,
      soundOn: false,
      firstBeepAudio: null,
      secondBeepAudio: null

    };
  }
  _onSelect = (e) => {
    this.generate(e.value)
  };
  _onRegenClick = (e) => {
    this.generate(this.state.cubeType)
  }
  _onStartClick = (e) => {
    this.setState({
      isInspecting: true
    })

  }

  _onCancelClick = (e) => {
    this.setState({
      isInspecting: false,
      isFirstWarning: false,
      isSecondWarning: false
    })
    this.generate(this.state.cubeType)
  }

  _onTick = (e) => {
    if (!this.state.soundOn){
      return;
    }
    if (this.state.isFirstWarning === false && e <= 7) {
      this.state.firstBeepAudio.play();
      this.setState(
        {
          isFirstWarning: true,
        }
      );
    }
    if (this.state.isSecondWarning === false && e <= 3) {
      this.state.secondBeepAudio.play();
      this.setState(
        {
          isSecondWarning: true
        }
      );
    }
  }

  _onSoundToggle = (e) => {
    this.setState(
      {
        soundOn: e.value
      }
    );
  }

  componentDidMount() {
    this.generate(options[0]);
  }

  generate(cubeType) {
    switch (cubeType) {
      case "3x3":
        this.setState(
          {
            cubeType: "3x3",
            scramble: generate3x3()
          }
        );
        break;
      case "2x2":
        this.setState(
          {
            cubeType: "2x2",
            scramble: generate2x2()
          }
        );
        break;
      case "Skewb":
        this.setState(
          {
            cubeType: "Skewb",
            scramble: generateSkewb()
          }
        );
        break;

      default:
        break;
    }
  }

  CountDownMake() {
    let onTimesup = () => {
      this._onCancelClick();
    }
    return (
      <div>
        <CountDown
          onTimesup={onTimesup}
          duration={15}
          onTick={this._onTick}
        ></CountDown>
      </div>
    )
  }



  _audioMounted = (e) => {
    if (e.id === "first-beep")
    {
      this.setState({
        firstBeepAudio: e.audioElement
      })
    }
    if (e.id === "second-beep")
    {
      this.setState({
        secondBeepAudio: e.audioElement
      })
    }
    
  }

  render() {
    return (
      <div className="App">

        {this.state.soundOn &&
          <div>

            <PlayNotification
              sound="audio/first-beep.wav"
              id="first-beep"
              onMount={this._audioMounted}>
            </PlayNotification>
            <PlayNotification
              sound="audio/second-beep.wav"
              id="second-beep"
              onMount={this._audioMounted}>
            </PlayNotification>
          </div>

        }
        <header className="App-header">
          <div>
            {this.state.isInspecting === false &&
              <div className='Rows'>
                <Dropdown className='cubetype-dropdown'
                  options={options}
                  onChange={this._onSelect}
                  value={defaultOption}
                  placeholder="Select an option"
                />
                <ToggleSwitch
                  label="Sound"
                  isOn={this.state.soundOn}
                  onChange={this._onSoundToggle} />
              </div>
            }
          </div>

          <div className='main-box'>
            {this.state.isInspecting === false &&
              <p className='Scramble-txt' >{this.state.scramble}</p>
            }
            {this.state.isInspecting
              && this.CountDownMake()}
          </div>
          <div className='bottom'>

          </div>


          {!this.state.isInspecting &&
            <div className='button-container'>
              <button className="Generate-button"
                onClick={this._onRegenClick}>GENERATE</button>

              <div className="button-container">
                <button className="Start-button"
                  onClick={this._onStartClick}>START</button>
              </div>

            </div>


          }

          {this.state.isInspecting &&
            <div className='button-container'>
              <button className="Cancel-button"
                onClick={this._onCancelClick}>CANCEL</button>
            </div>
          }



        </header>

      </div>

    );
  }
}



function generate3x3() {
  var scrambleFinal = ""
  var face = 0
  var faceChar = "0"
  var prevFace = 0
  let length = getRandomArbitrary(19, 21);
  var faceAmt = 0
  var faceAmtChar = "0"
  for (let i = 0; i < length; i++) {
    faceAmt = getRandomArbitrary(1, 4)
    face = getRandomExcluding(1, 6, prevFace)
    switch (faceAmt) {
      case 1:
        faceAmtChar = "'"
        break;

      case 2:
      case 3:
        faceAmtChar = "2"
        break;

      case 4:
        faceAmtChar = " "
        break;

      default:
        faceAmtChar = "-"
        break;
    }
    switch (face) {
      case 1:
        faceChar = "R"
        break;

      case 2:
        faceChar = "L"
        break;

      case 3:
        faceChar = "U"
        break;

      case 4:
        faceChar = "D"
        break;

      case 5:
        faceChar = "F"
        break;

      case 6:
        faceChar = "B"
        break;

      default:
        faceChar = "-"
        break;
    }

    if (faceAmtChar === " ") {
      scrambleFinal = scrambleFinal + String(faceChar) + " "
    }
    else {
      scrambleFinal = scrambleFinal + String(faceChar) + String(faceAmtChar) + " "
    }
    prevFace = face
  }
  return String(scrambleFinal);
}

function generate2x2() {
  var scrambleFinal = ""
  var face = 0
  var faceChar = "0"
  var prevFace = 0
  let length = getRandomArbitrary(9, 11);
  var faceAmt = 0
  var faceAmtChar = "0"
  for (let i = 0; i < length; i++) {
    faceAmt = getRandomArbitrary(1, 4)
    face = getRandomExcluding(1, 3, prevFace)
    switch (faceAmt) {
      case 1:
        faceAmtChar = "'"
        break;

      case 2:
      case 3:
        faceAmtChar = "2"
        break;

      case 4:
        faceAmtChar = " "
        break;

      default:
        faceAmtChar = "-"
        break;
    }
    switch (face) {
      case 1:
        faceChar = "R"
        break;

      case 2:
        faceChar = "F"
        break;

      case 3:
        faceChar = "U"
        break;

      default:
        faceChar = "-"
        break;
    }

    if (faceAmtChar === " ") {
      scrambleFinal = scrambleFinal + String(faceChar) + " "
    }
    else {
      scrambleFinal = scrambleFinal + String(faceChar) + String(faceAmtChar) + " "
    }
    prevFace = face
  }
  return String(scrambleFinal);
}
function generateSkewb() {
  var scrambleFinal = ""
  var face = 0
  var faceChar = "0"
  var prevFace = 0
  let length = getRandomArbitrary(8, 10);
  var faceAmt = 0
  var faceAmtChar = "0"
  for (let i = 0; i < length; i++) {
    faceAmt = getRandomArbitrary(1, 2)
    face = getRandomExcluding(1, 4, prevFace)

    switch (faceAmt) {
      case 1:
        faceAmtChar = "'"
        break;

      case 2:
        faceAmtChar = " "
        break;

      default:
        faceAmtChar = "-"
        break;
    }
    switch (face) {
      case 1:
        faceChar = "R"
        break;

      case 2:
        faceChar = "U"
        break;

      case 3:
        faceChar = "L"
        break;

      case 4:
        faceChar = "B"
        break;

      default:
        faceChar = "-"
        break;
    }

    if (faceAmtChar === " ") {
      scrambleFinal = scrambleFinal + String(faceChar) + " "
    }
    else {
      scrambleFinal = scrambleFinal + String(faceChar) + String(faceAmtChar) + " "
    }
    prevFace = face
  }
  return String(scrambleFinal);
}
function getRandomArbitrary(min, max) {
  max = max + 1
  return Math.floor(Math.random() * (max - min) + min);
}
function getRandomExcluding(min, max, value) {
  do {
    var rand = getRandomArbitrary(min, max);
    if (rand !== value)
      return rand;
  } while (true);
}

export default App;
