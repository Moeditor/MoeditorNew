import { ipcRenderer, shell } from 'electron';
import path from 'path';
import url from 'url';

import theming from './theming';
import renderer from './renderer';
import metaInfo from './metaInfo';
import FileManager from './FileManager';

// The global app object in renderer process
window.app = {
  theming: theming,

  renderer: renderer,

  metaInfo: metaInfo,

  // NOTE: The path is incorrect with Webpack
  root: path.resolve(__dirname, '../../'),

  // Get the path of a file in 'assets' dir
  getAsset (asset) {
    return path.join(this.root, 'assets', asset);
  },

  // Get the URL of a file in 'assets' dir
  getAssetURL (asset) {
    return url.resolve('file://', this.getAsset(asset));
  },

  // Open a link with Electron's shell.openExternal()
  openLink (link) {
    shell.openExternal(link);
  },

  // Get / Set the configure by sending ipc message to main process
  getConfig () {
    return ipcRenderer.sendSync('m-get-config');
  },

  setConfig (newConfig) {
    return ipcRenderer.sendSync('m-set-config', newConfig);
  },

  getConfigItem (key) {
    return ipcRenderer.sendSync('m-get-config-item', key);
  },

  setConfigItem (key, value) {
    ipcRenderer.sendSync('m-set-config-item', key, value);
  }
};

ipcRenderer.on('send-open-file-name', (event, filename) => {
  app.fileManager = new FileManager(filename);
  if (app.fileManager.haveFile()) {
    try {
      app.fileManager.read();
    } catch (e) {
      console.log(`Failed to read file "${filename}".`);
      console.log(e);
    }
  }

  // Start the app after recived the open file name
  app.init();
});
