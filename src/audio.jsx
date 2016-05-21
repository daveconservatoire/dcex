import Base64Binary from './base64-binary';
import piano from '../media/acoustic_grand_piano-mp3';
import _ from 'lodash';

const AudioContext = window.AudioContext || window.webkitAudioContext;

const context = new AudioContext();

// A = 0
// B = 1
// C = 2
// D = 3
// E = 4
// F = 5
// G = 6

// A0 = 0
// Bb0 = 1
// B0 = 2
// C1 = 3
// Db1 = 4
// D1 = 5
// Eb1 = 6
// E1 = 7
// F1 = 8
// Gb1 = 9
// G1 = 10
// Ab1 = 11
// A1 = 12
// Bb1 = 13
// B1 = 14

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

  playRegularSequence(notes, interval) {
    const t = this.time();

    _.reduce(notes, (t, note) => {
      this.playNoteMidi(note, t);

      return t + interval;
    }, this.time());
  }
};
