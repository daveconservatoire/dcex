import Tone from 'tone';

const instrument = new Tone.MonoSynth({
  "volume" : 1,
  "envelope" : {
    "attack" : 0.1,
    "decay" : 0.3,
    "release" : 2
  }
}).toMaster();

const Audio = {
  simpleSynth: new Tone.SimpleSynth().toMaster(),

  play(notes) {

    const self = this;
    const seq = new Tone.Sequence(function(time, note) {
      console.log("seq running", time, note);
      self.simpleSynth.triggerAttackRelease(note, "6n", time);
    }, notes, "4n");

    console.log("sequence", seq);
    seq.loop = false;
    seq.start(0);

    Tone.Transport.start(0);
  }
};

window.DCAudio = Audio;

export {Audio as default};
