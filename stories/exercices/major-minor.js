import React from 'react';
import MajorMinorEx from '../../src/exercices/major-minor.jsx';
import { storiesOf, action } from '@kadira/storybook';

storiesOf('MajorMinorEx', module)
  .add('run', () => (
    <div>
      <MajorMinorEx onSuccess={action('success')} />
    </div>
  ));
