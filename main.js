import url from 'url';
import path from 'path';
import fs from 'fs';
import { app, BrowserWindow, ipcMain } from 'electron';

let debug = process.env.NODE_ENV === 'development' || true;
let mainWindow = null;
let args = [];
let openFiles = [];

function readConfig () {
  try {
    global.config = JSON.parse(fs.readFileSync(path.join(app.getPath('userData'), 'config.json', 'utf8')));
  } catch (e) {
    global.config = require('./default-config.json');
  }
}

function writeConfig () {
  fs.writeFileSync(path.join(app.getPath('userData'), 'config.json'), JSON.stringify(global.config), 'utf8');
}

function createWindow (openFile) {
  readConfig();

  let config = global.config;

  let options = {
    width: config.windowBounds.width,
    height: config.windowBounds.height,
    title: 'Moeditor',
    frame: false,
    autoHideMenuBar: true,
    show: debug
  };

  if (config.windowBounds.x) options.x = config.windowBounds.x;
  if (config.windowBounds.y) options.y = config.windowBounds.y;

  mainWindow = new BrowserWindow(options);

  mainWindow.loadURL(url.resolve('file://', path.join(__dirname, '/src/index.html')));
  if (debug) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('send-open-file-name', openFile);
  });

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

function parseArgs () {
  openFiles = process.argv.filter(s => {
    if (s.startsWith('--')) {
      s = s.substring(2, s.length);
      let i = s.indexOf('=');
      if (i !== -1) {
        s = { [s.substring(0, i)]: s.substring(i + 1, s.length) };
      }

      args.push(s);

      return false;
    }

    return true;
  });

  if (args.includes('unpacked')) {
    openFiles = openFiles.splice(2);
  } else {
    openFiles = openFiles.splice(1);
  }
}

function init () {
  parseArgs();
  if (!openFiles.length) {
    createWindow(null);
  } else {
    openFiles.forEach(createWindow);
  }
}

app.on('ready', init);

app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('m-get-config-item', (event, key) => {
  event.returnValue = global.config[key];
});

ipcMain.on('m-set-config-item', (event, key, value) => {
  global.config[key] = value;
  writeConfig();
});

ipcMain.on('m-get-config', (event) => {
  event.returnValue = global.config;
});

ipcMain.on('m-set-config', (event, newConfig) => {
  global.config = newConfig;
  writeConfig();
});
