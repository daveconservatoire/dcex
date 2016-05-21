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

function valueFromDescriptor(descriptor) {
  return _.isArray(descriptor) ? randRange(descriptor[0], descriptor[1]) : descriptor;
}

const ValueDescriptor = React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.number]);

const PitchExercice = React.createClass({
  propTypes: {
    pitch: ValueDescriptor,
    variation: ValueDescriptor
  },

  getDefaultProps() {
    return {
      pitch: [27, 62],
      variation: 24
    };
  },
  
  getInitialState() {
    return {
      score: 0,
      started: true,
      solution: null,
      pitch: this.genPitch(),
      pitchVariation: this.varPitch()
    };
  },
  
  genPitch() {
    return valueFromDescriptor(this.props.pitch);
  },
  
  varPitch() {
    return valueFromDescriptor(this.props.variation) * (Math.random() >= 0.5 ? 1 : -1);
  },

  start() {
    this.setState({started: true});
  },

  playSound(e, s) {
    s = s || this.state;

    const note1 = Audio.semitoneToNote(s.pitch);
    const note2 = Audio.semitoneToNote(s.pitch + s.pitchVariation);

    Audio.playRegularSequence([note1, note2], 2);
  },

  checkAnswer() {
    const s = this.state;
    const correct = s.pitchVariation > 0 ? "1" : "0";

    if (correct === s.solution) {
      const newScore = s.score + 1;
      const newState = {
        score: newScore,
        pitch: this.genPitch(),
        pitchVariation: this.varPitch(),
        solution: null
      };

      this.setState(newState);
      this.playSound(null, newState);
    } else {
      this.setState({score: 0});
    }
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
        <div><ProgressBar value={s.score} max={10} /></div>
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
                  <input type="radio" onChange={this.updateState('solution')} name="solution" value="0" checked={s.solution == '0'} />
                  Lower
                </label>
              </div>
              <div>
                <label>
                  <input type="radio" onChange={this.updateState('solution')} name="solution" value="1" checked={s.solution == '1'} />
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
