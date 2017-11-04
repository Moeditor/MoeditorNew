import yaml from 'js-yaml';
import sass from 'node-sass';
import path from 'path';
import url from 'url';
import fs from 'fs';

export default {
  // Theme for UI (and Editor)
  uiThemeDOMTag: null, // A <style> tag
  uiThemeName: null,
  uiTheme: null,
  loadUITheme (theme) {
    if (this.uiThemeName === theme) return this.uiTheme;
    this.uiThemeName = theme;

    // Load theme from `themes` dir in app
    // TODO: User custom theme
    let themePath = path.join(app.root, 'themes/ui', theme);

    // Load ui theme properties
    let uiTheme = yaml.load(fs.readFileSync(path.join(themePath, 'ui.yaml'), 'utf8'));

    // Load ui theme SCSS
    // We want to use Sass for editor theme, but we can't load a .scss file with <link>
    // So render the Sass to CSS and append a <style> to document.head
    let uiThemeCSS = sass.renderSync({
      file: path.join(themePath, 'ui.scss')
    }).css.toString();
    if (this.uiThemeDOMTag) {
      // Remove old <style> tag
      document.head.removeChild(this.uiThemeDOMTag);
    }

    let tag = this.uiThemeDOMTag = document.createElement('style');
    tag.innerHTML = uiThemeCSS;
    document.head.appendChild(tag);

    // Return the UI theme object for React
    return (this.uiTheme = uiTheme);
  },

  // Theme for highlight.js
  highlightThemeDOMTag: null, // A <link> tag
  highlightThemeName: null,
  setHighlightTheme (highlightTheme) {
    if (this.highlightThemeName === highlightTheme) return 0;
    this.highlightThemeName = highlightTheme;

    if (this.highlightThemeDOMTag !== null) {
      // Remove old <link> tag
      document.head.removeChild(this.highlightThemeDOMTag);
    }

    let tag = this.highlightThemeDOMTag = document.createElement('link');
    tag.rel = 'stylesheet';
    // Use CSS files in node_modules/highlight.js/styles
    tag.href = url.resolve('file://', path.resolve(app.root, `node_modules/highlight.js/styles/${highlightTheme}.css`));

    document.head.appendChild(tag);
  },

  // Get all highlight themes built-in highlight.js
  getHighlightThemeList () {
    let dir = path.resolve(app.root, `node_modules/highlight.js/styles`);
    return fs.readdirSync(dir).filter(s => s.endsWith('.css')).map(s => s.substr(0, s.length - 4));
  },

  // Theme for preview (use renderTheme)
  previewThemeDOMTag: null,
  previewThemeName: null,
  setPreviewTheme (previewTheme) {
    if (this.previewThemeName === previewTheme) return;
    this.previewThemeName = previewTheme;

    if (this.previewThemeDOMTag !== null) {
      // Remove old <link> tag
      document.head.removeChild(this.previewThemeDOMTag);
    }

    let tag = this.previewThemeDOMTag = document.createElement('link');
    tag.rel = 'stylesheet';
    // Use CSS files in themes/preview
    tag.href = url.resolve('file://', path.resolve(app.root, `themes/render/${previewTheme}/style.css`));

    document.head.appendChild(tag);
  },

  init () {
    this.setHighlightTheme(app.getConfigItem('highlightTheme'));
    this.setPreviewTheme(app.getConfigItem('renderTheme'));
  }
};
