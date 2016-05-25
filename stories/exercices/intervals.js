import React from 'react';
import IntervalsEx from '../../src/exercices/intervals.jsx';
import { storiesOf, action } from '@kadira/storybook';

storiesOf('IntervalsEx', module)
  .add('Octave and Perfect 5th', () => (
    <IntervalsEx intervals={[12, 7]} />
  ))
  .add('Major 3rd', () => (
    <IntervalsEx intervals={[12, 7, 4]} />
  ))
  .add('Perfect 4th', () => (
    <IntervalsEx intervals={[12, 7, 4, 5]} />
  ))
  .add('Major 6th', () => (
    <IntervalsEx intervals={[12, 7, 4, 5, 9]} />
  ))
  .add('Major 2nd', () => (
    <IntervalsEx intervals={[12, 7, 4, 5, 9, 2]} />
  ))
  .add('Major 7th', () => (
    <IntervalsEx intervals={[12, 7, 4, 5, 9, 2, 11]} />
  ));
