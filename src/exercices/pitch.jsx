import React from 'react';
import Questionare, {randDirection, valueFromDescriptor, ValueDescriptor} from './sound-questionare.jsx';

export default React.createClass({
  mixins: [Questionare],

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

  newRound() {
    const notes = this.genNotes();
    
    return {
      description: "You will hear two notes. Is the second note lower or higher in pitch?",
      notes: notes,
      answerOptions: [
        ["Lower", "lower"],
        ["Higher", "higher"]
      ],
      rightAnswer: notes[0] < notes[1] ? "higher" : "lower"
    };
  },
  
  genNotes() {
    const note1 = valueFromDescriptor(this.props.pitch);
    const note2 = note1 + valueFromDescriptor(this.props.variation) * randDirection();

    return [note1, note2];
  },

  render() {
    return this.renderQuiz();
  }
});
