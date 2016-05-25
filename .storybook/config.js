import '../src/styles';
import { configure } from '@kadira/storybook';

function loadStories() {
  require('../stories/audio');
  require('../stories/exercices/pitch');
  require('../stories/exercices/intervals');
  require('../stories/exercices/major-minor');
}

configure(loadStories, module);
