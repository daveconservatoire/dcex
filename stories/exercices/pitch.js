import React from 'react';
import PitchEx from '../../src/exercices/pitch.jsx';
import { storiesOf, action } from '@kadira/storybook';

storiesOf('PitchEx', module)
  .add('.easy', () => (
    <PitchEx />
  ));
