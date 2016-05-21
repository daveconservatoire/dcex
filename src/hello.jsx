import React from 'react';
import Audio from './audio.jsx';

const ProgressBar = React.createClass({
  propTypes: {
    value: React.PropTypes.number.isRequired,
    max: React.PropTypes.number.isRequired
  },

  render() {
    const {value, max} = this.props;

    return (
      <div>Progress {value} / {max}</div>
    );
  }
});

const PitchExercice = React.createClass({
  propTypes: {
    
  },
  
  getInitialState() {
    const pitch = this.genPitch();
    
    return {
      started: true,
      pitch: pitch,
      pitchVariation: this.varPitch(pitch)
    }
  },
  
  genPitch() {
    const min = 80, max = 800;
    
    return min + Math.round(Math.random() * (max - min));
  },
  
  varPitch(pitch) {
    const delta = 100;
  },

  start() {
    this.setState({started: true});
  },

  playSound() {
    Audio.playRegularSequence(["A0", "C0"], 0.5);
  },

  renderExercice() {
    return (
      <div>
        <div><ProgressBar value={10} max={100} /></div>
        <div>
          <div>
            <div>You will hear two notes. Is the second note lower or higher in pitch?</div>
            <button type="button" onClick={this.playSound}>Play Again</button>
          </div>
          <div>
            <form>
              <h3>Answer</h3>
              <div>
                <label>
                  <input type="radio" name="solution" value="0" />
                  Lower
                </label>
              </div>
              <div>
                <label>
                  <input type="radio" name="solution" value="1" />
                  Higher
                </label>
              </div>
              <button type="button">Check Answer</button>
            </form>
          </div>
        </div>
      </div>
    );
  },

  renderStart() {
    return <button type="button" onClick={this.start}>Start Now</button>;
  },

  render() {
    return (
      <div>
        {this.state.started ? this.renderExercice() : this.renderStart()}
      </div>
    );
  }
});

const Hello = React.createClass({
  render() {
    return <div><PitchExercice /></div>;
  }
});

export { Hello as default };
