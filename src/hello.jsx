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

window.Audio = Audio;

function randRange(min, max) {
  return min + Math.round(Math.random() * (max - min));
}

const PitchExercice = React.createClass({
  propTypes: {
    
  },
  
  getInitialState() {
    return {
      started: true,
      solution: null,
      pitch: this.genPitch(),
      pitchVariation: this.varPitch()
    };
  },
  
  genPitch() {
    return randRange(27, 62);
  },
  
  varPitch() {
    return randRange(5, 10) * (Math.random() >= 0.5 ? 1 : -1);
  },

  start() {
    this.setState({started: true});
  },

  playSound() {
    const note1 = Audio.semitoneToNote(this.state.pitch);
    const note2 = Audio.semitoneToNote(this.state.pitch + this.state.pitchVariation);

    Audio.playRegularSequence([note1, note2], 2);
  },

  checkAnswer() {
    const s = this.state;
    const correct = s.pitchVariation > 0 ? "1" : "0";

    console.log("check", correct, s.solution);
  },

  updateState(s) {
    return (e) => {
      const ns = {};
      ns[s] = e.target.value;

      this.setState(ns);
    };
  },

  renderExercice() {
    const s = this.state;

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
                  <input type="radio" onChange={this.updateState('solution')} name="solution" value="0" />
                  Lower
                </label>
              </div>
              <div>
                <label>
                  <input type="radio" onChange={this.updateState('solution')} name="solution" value="1" />
                  Higher
                </label>
              </div>
              <button type="button" onClick={this.checkAnswer}>Check Answer</button>
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
