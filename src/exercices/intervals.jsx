import React from 'react';
import {noteToSemitone} from '../audio';
import Questionare, {randDirection, valueFromDescriptor, ValueDescriptor} from './sound-questionare.jsx';
import _ from 'lodash';

const INTERVALS = {
  2: "Major 2nd",
  4: "Major 3rd",
  5: "Perfect 4th",
  7: "Perfect 5th",
  9: "Major 6th",
  11: "Major 7th",
  12: "Octave"
};

export default React.createClass({
  mixins: [Questionare],

  propTypes: {
    intervals: React.PropTypes.arrayOf(React.PropTypes.number),
    base: ValueDescriptor
  },

  getDefaultProps() {
    return {
      intervals: [12, 7, 4, 5, 9, 2, 11],
      base: "C4"
    };
  },

  newRound() {
    const base = this.props.base;
    const interval = _.sample(this.props.intervals);

    const notes = [base, noteToSemitone(base) + interval];

    return {
      description: "You will hear two notes - what is their interval?",
      notes: notes,
      answerOptions: this.intervalsOptions(),
      rightAnswer: interval
    };
  },

  intervalsOptions() {
    return _.map(this.props.intervals, (i) => {
      return [INTERVALS[i], i]
    });
  },

  render() {
    return this.renderQuiz();
  }
});
