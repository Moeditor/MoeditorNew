import fs from 'fs';
import path from 'path';

export default class FileManager {
  constructor (filename) {
    this.open(filename);
  }

  open (filename) {
    this.filename = filename;
    this.content = '';
    this.saved = true;
  }

  haveFile () {
    return !!this.filename;
  }

  isSaved () {
    return this.saved;
  }

  read () {
    this.content = fs.readFileSync(this.filename).toString();
    this.saved = true;
  }

  save () {
    fs.writeFileSync(this.filename, this.content);
    this.saved = true;
  }

  setContent (content) {
    if (this.content === content) return;
    this.saved = false;
    this.content = content;
  }

  getContent () {
    return this.content;
  }

  getFileBasename () {
    return path.basename(this.filename);
  }

  saveAs (filename) {
    this.filename = filename;
    this.save();
  }

  close () {
    this.content = '';
    this.filename = '';
    this.saved = true;
  }
}
