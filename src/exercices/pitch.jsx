import React from 'react';
import Audio from '../audio.jsx';
import {RadioState} from '../common.jsx';
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
      <div className="progress progress-striped active success" style={{margin: 20}}>
        <div className="bar" style={{width: pct + "%"}}></div>
      </div>
    );
  }
});

function rand(min, max) {
  return min + Math.round(Math.random() * (max - min));
}

function randDirection() {
  return Math.random() >= 0.5 ? 1 : -1;
}

function valueFromDescriptor(descriptor) {
  const nts = Audio.noteToSemitone;

  return _.isArray(descriptor) ?
    rand(nts(descriptor[0]), nts(descriptor[1])) :
    nts(descriptor);
}

const ValueDescriptor = React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.number]);

export default React.createClass({
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
      maxScore: 3,
      started: false,
      solution: null,
      pitch: this.genPitch(),
      pitchVariation: this.varPitch()
    };
  },

  genPitch() {
    return valueFromDescriptor(this.props.pitch);
  },

  varPitch() {
    return valueFromDescriptor(this.props.variation) * randDirection();
  },

  start() {
    this.setState({started: true});
    this.playSound();
  },

  playSound(e, s) {
    s = s || this.state;

    const note1 = Audio.semitoneToNote(s.pitch);
    const note2 = Audio.semitoneToNote(s.pitch + s.pitchVariation);

    Audio.playRegularSequence([note1, note2], 2);
  },

  isCompleted(score) {
    return score >= this.state.maxScore;
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

      if (newScore != s.maxScore) {
        this.playSound(null, newState);
      }
    } else {
      if (!this.isCompleted(s.score)) this.setState({score: 0});

      this.setState({solution: null});
      this.playSound();
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
      <div className="single-exercise visited-no-recolor" id="container" style={{overflow: "hidden", visibility: "visible"}}>
        <article className="exercises-content clearfix">
          <div className="exercises-body">
            <div className="exercises-stack">&nbsp;</div>
            <div className="exercises-card current-card">
              <div className="current-card-container card-type-problem">
                <div className="current-card-container-inner vertical-shadow">
                  <div className="current-card-contents">
                    <div id="exercise-message-container" style={{display: "none"}}>
                      <div className="exercise_message"></div>
                    </div>
                    {
                      this.isCompleted(s.score) ?
                      <div className="alert alert-success masterymsg">
                        <strong>Well done!</strong> You've mastered this skill - time to move on to something new!
                      </div>
                      :
                      <ProgressBar value={s.score} max={s.maxScore}/>
                    }
                    <div id="problem-and-answer" className="framework-khan-exercises">
                      <div id="problemarea">
                        <div id="workarea">
                          <div id="problem-type-or-description">
                            <div className="problem">
                              <p>You will hear two notes. Is the second note lower or higher in pitch?</p>
                              <a className="btn_primary" onClick={this.playSound}>Play Again</a>
                            </div>
                          </div>
                        </div>
                        <div id="hintsarea"></div>
                      </div>
                      <div id="answer_area_wrap">
                        <div id="answer_area">
                          <form id="answerform" name="answerform">
                            <div className="info-box" id="answercontent">
                              <span className="info-box-header">Answer</span>
                              <div className="fancy-scrollbar" id="solutionarea">
                                <ul>
                                  <li>
                                    <label><RadioState name="solution" value="0" target={this} /> <span className="value">Lower</span></label>
                                  </li>
                                  <li>
                                    <label><RadioState name="solution" value="1" target={this} /> <span className="value">Higher</span></label>
                                  </li>
                                </ul>
                              </div>
                              <div className="answer-buttons">
                                <div className="check-answer-wrapper">
                                  <input className="simple-button green" onClick={this.checkAnswer} type="button" value="Check Answer"/>
                                </div>
                                <input className="simple-button green" id="next-question-button" name="correctnextbutton" style={{display: "none"}} type="button" value="Correct! Next Question..."/>
                                <div id="positive-reinforcement" style={{display: "none"}}>
                                  <img src="/images/face-smiley.png"/>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div style={{clear: "both"}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  },

  renderStart() {
    return (
      <div style={{textAlign: "center"}}>
        <div id="starterdiv">
          <a className="btn btn-success btn-large" onClick={this.start}>START NOW!</a>
        </div>
      </div>
    );
  },

  render() {
    return (
      <div className="lesson-content">
        {this.state.started ? this.renderExercice() : this.renderStart()}
      </div>
    );
  }
});
