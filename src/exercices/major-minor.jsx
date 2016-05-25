import React from 'react';
import Questionare, {randBoolean, valueFromDescriptor, ValueDescriptor} from './sound-questionare.jsx';

export default React.createClass({
  mixins: [Questionare],

  propTypes: {
    base: ValueDescriptor
  },

  getDefaultProps() {
    return {
      base: ["C4", "..", "B5"]
    };
  },

  newRound() {
    const baseNote = valueFromDescriptor(this.props.base);
    const isMajor = randBoolean();
    const third = isMajor ? 4 : 3;
    const chord = [baseNote, baseNote + third, baseNote + 7];

    return {
      description: "You will hear one chord. Is is major or minor?",
      notes: [chord],
      answerOptions: [
        ["Major", "major"],
        ["Minor", "minor"]
      ],
      rightAnswer: isMajor ? "major" : "minor"
    };
  },

  render() {
    return this.renderQuiz();
  }
});
