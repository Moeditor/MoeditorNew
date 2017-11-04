import { remote } from 'electron';

let electronDialog = remote.dialog;

export default {
  async openMarkdownFiles (multi) {
    return await new Promise((resolve, reject) => {
      electronDialog.showOpenDialog(
        {
          properties: ['openFile', 'multiSelections'],
          filters: [
            { name: 'Markdown Documents', extensions: [ 'md', 'mkd', 'markdown' ] },
            { name: 'All Files', extensions: [ '*' ] }
          ]
        },
        filenames => {
          resolve(filenames);
        }
      );
    });
  },

  async saveMarkdownFile () {
    return await this.save([{ name: 'Markdown Documents', extensions: [ 'md', 'mkd', 'markdown' ] }]);
  },

  async saveHTMLFile () {
    return await this.save([{ name: 'HTML Documents', extensions: [ 'html' ] }]);
  },

  async savePDFFile () {
    return await this.save([{ name: 'PDF Documents', extensions: [ 'pdf' ] }]);
  },

  async save (filters) {
    filters.push({ name: 'All Files', extensions: [ '*' ] });
    return await new Promise((resolve, reject) => {
      let window = remote.getCurrentWindow();
      electronDialog.showSaveDialog(window,
        {
          filters: filters
        },
        filename => {
          resolve(filename);
        }
      );
    });
  }
};
