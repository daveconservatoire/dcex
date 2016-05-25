import React from 'react';
import {noteToSemitone, playRegularSequence} from '../audio';
import {RadioState, ProgressBar} from '../common.jsx';
import _ from 'lodash';

export function rangedRand(min, max) {
  return min + Math.round(Math.random() * (max - min));
}

export function randDirection() {
  return Math.random() >= 0.5 ? 1 : -1;
}

export function valueFromDescriptor(descriptor) {
  const nts = noteToSemitone;
  
  if (_.isArray(descriptor)) {
    if (descriptor.length == 3 && descriptor[1] == "..")
      return rangedRand(nts(descriptor[0]), nts(descriptor[2]));
    else
      return nts(_.sample(descriptor));
  } else {
    return nts(descriptor);
  }
}

export const ValueDescriptor = React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.number]);

export default {
  getInitialState() {
    return _.merge({
      score: 0,
      maxScore: 10,
      started: false,
      userAnswer: null
    }, this.newRound());
  },

  start() {
    this.setState({started: true});
    this.playSound();
  },

  isCompleted(score) {
    return score >= this.state.maxScore;
  },

  checkAnswer() {
    const s = this.state;
    const correct = s.rightAnswer;

    if (correct === s.userAnswer) {
      const newScore = s.score + 1;
      const newState = _.merge({
        score: newScore,
        userAnswer: null
      }, this.newRound());

      this.setState(newState);

      if (newScore != s.maxScore) {
        this.playSound(null, newState);
      }
    } else {
      if (!this.isCompleted(s.score)) this.setState({score: 0});

      this.setState({userAnswer: null});
      this.playSound();
    }
  },

  playSound(e, s) {
    s = s || this.state;

    playRegularSequence(s.notes, 2);
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
                              <p>{s.description}</p>
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
                              <div className="fancy-scrollbar">
                                <ul>
                                  {_.map(s.answerOptions, (opt) => {
                                    return (
                                      <li>
                                        <label><RadioState name="userAnswer" value={opt[1]} target={this} /> <span className="value">{opt[0]}</span></label>
                                      </li>
                                    );
                                  })}
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

  renderQuiz() {
    return (
      <div className="lesson-content">
        {this.state.started ? this.renderExercice() : this.renderStart()}
      </div>
    );
  }
};
