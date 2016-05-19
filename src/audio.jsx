import Base64Binary from './base64-binary';
import _ from 'lodash';

const AudioContext = window.AudioContext || window.webkitAudioContext;

const context = new AudioContext();

const piano = MIDI.Soundfont.acoustic_grand_piano;

export default Audio = {
  time() { return context.currentTime; },

  isAvailable() {
    return !!AudioContext;
  },

  playNoteMidi(note, start) {
    context.decodeAudioData(Base64Binary.decode(piano[note].substr(22)).buffer, function (buffer) {
      const sourceNode = context.createBufferSource();
      sourceNode.buffer = buffer;
      sourceNode.connect(context.destination);
      sourceNode.start(start);
    });
  },

  test() {
    const t = context.currentTime;

    this.playNoteMidi("C3", t + 0);
    this.playNoteMidi("D3", t + 0.5);
    this.playNoteMidi("C3", t + 1);
    this.playNoteMidi("G3", t + 1.5);
  },

  playRegularSequence(notes, interval) {
    const t = this.time();

    _.reduce(notes, (t, note) => {
      this.playNoteMidi(note, t);

      return t + interval;
    }, this.time());
  }
};
