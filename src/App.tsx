import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import logo from './logo.svg';
import NumericTextField from './common/components/NumericTextField';

import './inject-tap-event-plugin';
import './App.css';

interface AppState {
  secondsSinceReload: number,
  audioResumed: boolean
}

class App extends Component<any, AppState> {

  private audioCtx: AudioContext;

  interval;

  constructor() {
    super()

    this.state = {
      secondsSinceReload: 0,
      audioResumed: false
    };

    this.audioCtx = new ((window as any).AudioContext || (window as any).webkitAudioContext);
  }

  componentDidMount() {
    this.interval = setInterval(this.updateTimer, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    console.log('rendered')
    return (
      <MuiThemeProvider>
        <div
          className="App"
          onClick={() => {
            console.log('clicked')
            if (!this.state.audioResumed) {
              console.log('audioResumed')
              this.setState({
                audioResumed: true
              })

              this.audioCtx
                .resume()
                .then(() => {
                  console.log('started')
                  this.startAudio();
                })
            }
          }}

        >
          {this.renderHeader()}
          {this.renderIntro()}
          {this.renderTimeSinceLastReload()}
          {this.renderMd()}
          <div onClick={() => {

          }
          } style={{color: 'red', marginTop: '20px'}}>Start
          </div>
          <button
            onClick={() => {
              this.setState({});
            }}
            style={{color: 'red', marginTop: '20px'}}
          >
            Stop
          </button>
          {/*{this.renderCloudMessage()}*/}
        </div>
      </MuiThemeProvider>
    );
  }

  private renderHeader = () => (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo"/>
      <h1 className="App-title">Welcome to React</h1>
    </header>
  )

  private renderIntro = () => (
    <p className="App-intro">
      To get started, edit <code>src/App.tsx</code> and save to reload.
    </p>
  )

  private renderTimeSinceLastReload = () => (
    <p className="App-timer">
      <strong>{this.state.secondsSinceReload}</strong> seconds since the last cold reload.
    </p>
  )

  private renderMd = () => (
    <NumericTextField id="showcase" floatingLabelText="Welcome to MaterialUI"/>
  )

  private updateTimer = () => {
    this.setState(({secondsSinceReload}) => ({secondsSinceReload: ++secondsSinceReload}));
  }

  startAudio = () => {
    const sine = this.audioCtx.createOscillator();
    sine.start();
    sine.connect(this.audioCtx.destination);
  }

  // private renderCloudMessage = () => (
  //   <p className="App-greeting">
  //     {window.env && window.env.REACT_APP_GREETING
  //       ? <span className="App-greetingMsg">{window.env.REACT_APP_GREETING}</span>
  //       : (
  //         <span className="App-greetingStub">
  //           Please set <code>REACT_APP_GREETING</code> environment variable on your
  //           app server.
  //         </span>
  //       )
  //     }
  //   </p>
  // )
}

export default App;
