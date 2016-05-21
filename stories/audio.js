import React from 'react';
import Audio from '../src/audio.jsx';
import { storiesOf, action } from '@kadira/storybook';

const SequenceStory = React.createClass({
  getInitialState() {
    return {
      interval: "0.2",
      notes: "C4 D4 C4 G4"
    };
  },

  updateState(s) {
    return (e) => {
      const ns = {};
      ns[s] = e.target.value;

      this.setState(ns);
    };
  },

  play() {
    const s = this.state;

    try {
      const interval = parseFloat(s.interval);
      const notes = s.notes.split(" ");

      Audio.playRegularSequence(notes, interval);
    } catch (e) {
      console.log("Error playing notes, please check your arguments.");
    }
  },

  render() {
    const s = this.state;
    return (
      <div>
        <input type="text" onChange={this.updateState('notes')} value={s.notes} />
        <input type="text" onChange={this.updateState('interval')} value={s.interval} />
        <button onClick={this.play}>Play</button>
      </div>
    );
  }
});

storiesOf('Audio', module)
  .add('.playRegularSequence', () => (
    <SequenceStory />
  ));
