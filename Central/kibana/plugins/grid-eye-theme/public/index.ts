import './scss/header.scss';
import './scss/loader.scss';
import './scss/login.scss';
import './scss/home.scss';
import './scss/space_selector.scss';

import { GridEyeThemePlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, Kibana Platform `plugin()` initializer.
export function plugin() {
  return new GridEyeThemePlugin();
}