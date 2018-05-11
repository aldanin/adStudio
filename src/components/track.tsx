import React, { Component } from 'react';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Slider from 'react-rangeslider-extended';
// import logo from './logo.svg';
// import NumericTextField from './common/components/NumericTextField';

// import './inject-tap-event-plugin';
// import './App.css';

class TrackBase extends Component<any, any> {

  interval;

  state = {
    secondsSinceReload: 0,
  };

  handleChange(value) {
    this.setState({
      value: value,
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <Slider
        value={1}
        orientation="vertical"
        onChange={
          this.handleChange
        }
      />
    );
  }
}

export default TrackBase;
