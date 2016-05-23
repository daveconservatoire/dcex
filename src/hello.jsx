import './styles';

import React from 'react';
import PitchExercice from './exercices/pitch.jsx'

const Hello = React.createClass({
  render() {
    return <div><PitchExercice /></div>;
  }
});

export {Hello as default};
