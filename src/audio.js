import {decode} from './base64-binary';
import piano from '../media/acoustic_grand_piano-mp3';
import _ from 'lodash';

const AudioContext = window.AudioContext || window.webkitAudioContext;

window.__audioCachedContext = window.__audioCachedContext || new AudioContext();

const context = window.__audioCachedContext;

const TONE_VALUES = {
  "C": 0,
  "D": 2,
  "E": 4,
  "F": 5,
  "G": 7,
  "A": 9,
  "B": 11
};

const ACCENT_VALUES = {
  "b": -1,
  "#": 1,
  "": 0
};

const SEMITONE_NOTE = {
  0: "C",
  1: "Db",
  2: "D",
  3: "Eb",
  4: "E",
  5: "F",
  6: "Gb",
  7: "G",
  8: "Ab",
  9: "A",
  10: "Bb",
  11: "B"
};

export function time() {
  return context.currentTime;
}

export function isAvailable() {
  return !!AudioContext;
}

function decodeBase64(data) {
  return context.decodeAudioData(decode(data.substr(22)).buffer);
}

export function playNoteMidi(note, t) {
  note = semitoneToNote(note);
  const noteData = piano[note];

  if (!noteData) {
    console.warn("can't play note", note);
    return;
  }

  decodeBase64(noteData).then(function (buffer) {
    const gainNode = context.createGain();
    gainNode.gain.value = 2;

    const sourceNode = context.createBufferSource();
    sourceNode.buffer = buffer;

    sourceNode.connect(gainNode);
    gainNode.connect(context.destination);

    sourceNode.start(t);
  });
}

export function playChord(notes, t) {
  _.each(notes, function (note) {
    playNoteMidi(note, t);
  });
}

export function playRegularSequence(notes, interval) {
  const t = time();

  _.reduce(notes, (t, note) => {
    if (_.isArray(note)) {
      playChord(note, t);
    } else {
      playNoteMidi(note, t);
    }

    return t + interval;
  }, time());
}

export function noteToSemitone(note) {
  if (_.isInteger(note)) return note;

  var parts;

  if (parts = note.match(/([A-G])([b#]?)(\d)/)) {
    const tone = parts[1], accent = parts[2], octive = parseInt(parts[3]);
    return octive * 12 - 9 + TONE_VALUES[tone] + ACCENT_VALUES[accent];
  }

  return null;
}

export function semitoneToNote(semitone) {
  if (_.isString(semitone)) return semitone;
  
  const s = semitone - 3;

  const octive = Math.floor(s / 12) + 1;
  const tone = (s + 12) % 12;

  return SEMITONE_NOTE[tone] + octive;
}
