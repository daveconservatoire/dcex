import React from 'react';
import Audio from './audio.jsx';
import _ from 'lodash';

const ProgressBar = React.createClass({
  propTypes: {
    value: React.PropTypes.number.isRequired,
    max: React.PropTypes.number.isRequired
  },

  render() {
    const {value, max} = this.props;
    const pct = value / max * 100;

    return (
      <div style={{background: "#E9E6E1", borderRadius: 32, height: 23, overflow: "hidden"}}>
        <div style={{width: pct + "%", height: "100%", background: "#19C1C3", transition: "all 1s"}}></div>
      </div>
    );
  }
});

window.Audio = Audio;

function randRange(min, max) {
  return min + Math.round(Math.random() * (max - min));
}

function valueFromDescriptor(descriptor) {
  const nts = Audio.noteToSemitone;

  return _.isArray(descriptor) ?
    randRange(nts(descriptor[0]), nts(descriptor[1])) :
    nts(descriptor);
}

const ValueDescriptor = React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.number]);

const RadioState = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    value: React.PropTypes.any,
    target: React.PropTypes.object
  },

  updateState() {
    const ns = {};
    ns[this.props.name] = this.props.value;
    this.props.target.setState(ns);
  },

  render() {
    const p = this.props;
    const targetValue = p.target.state[p.name];

    return <input type="radio" name={p.name} value={p.value} onChange={this.updateState} checked={targetValue == p.value} />
  }
});

const PitchExercice = React.createClass({
  propTypes: {
    pitch: ValueDescriptor,
    variation: ValueDescriptor
  },

  getDefaultProps() {
    return {
      pitch: ["C3", "B5"],
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
      <div style={{background: "#f7f7f7", width: 752, boxShadow: "0 1px 3px #cccccc", border: "1px solid #cccccc"}}>
        <div style={{margin: 20}}><ProgressBar value={s.score} max={10} /></div>
        <div style={{marginTop: 30, display: "flex"}}>
          <div style={{flex: 1, height: 250, padding: "0 20px"}}>
            <div>You will hear two notes. Is the second note lower or higher in pitch?</div>
            <button type="button" onClick={this.playSound}>Play Again</button>
          </div>
          <div>
            <div style={{background: "#eee", boxShadow: "0 1px 2px #ccc", border: "1px solid #ccc", padding: 10, marginRight: -15}}>
              <form>
                <h3 style={{margin: 0, marginBottom: 10, color: "#777", textShadow: "0 1px 0 #fff"}}>Answer</h3>
                <div>
                  <label>
                    <RadioState name="solution" value="0" target={this} />
                    Lower
                  </label>
                </div>
                <div>
                  <label>
                    <RadioState name="solution" value="1" target={this} />
                    Higher
                  </label>
                </div>
                <button type="button" onClick={this.checkAnswer} style={{marginTop: 10}}>Check Answer</button>
              </form>
            </div>
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
