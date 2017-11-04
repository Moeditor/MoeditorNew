import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';

if (process.env.NODE_ENV === 'development') {
  installExtension(REACT_DEVELOPER_TOOLS)
      .then(name => console.log(`Added Extension:  ${name}`))
      .catch(err => console.log('An error occurred: ', err));
}

import 'electron-titlebar';

import './lib/index';
import './index.jsx';
