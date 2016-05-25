import '../src/styles';
import { configure } from '@kadira/storybook';

function loadStories() {
  require('../stories/audio');
  require('../stories/exercices/pitch');
  require('../stories/exercices/intervals');
}

configure(loadStories, module);
