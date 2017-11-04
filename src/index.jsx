import React from 'react';
import ReactDOM from 'react-dom';

import App from './App/App.jsx';

app.theming.init();
let uiTheme = app.theming.loadUITheme(app.getConfigItem('uiTheme'));

let appConfig = app.getConfig();

function bindEvents (reactApp) {
  app.onSetConfig = () => {
    reactApp.updateConfig(app.getConfig());
    reactApp.updateTheme(app.theming.loadUITheme(app.getConfigItem('uiTheme')));
  };
}

app.init = () => {
  ReactDOM.render(<App ref={bindEvents} theme={uiTheme} appConfig={appConfig} fileManager={app.fileManager} />, document.getElementById('root'));
};
