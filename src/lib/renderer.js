import MarkdownIt from 'markdown-it';
import MarkdownItMath from 'markdown-it-math';

import MathRenderer from './MathRenderer';
import Highlighter from './Highlighter';

let md = new MarkdownIt({
  highlight: Highlighter
});

let renderMath = null; // Will be assigned below

// Simply output the origin math code, then let MathJax to render it
md.use(MarkdownItMath, {
  inlineOpen: '$',
  inlineClose: '$',
  blockOpen: '$$',
  blockClose: '$$',
  inlineRenderer (str) {
    return renderMath(str, false);
  },
  blockRenderer (str) {
    return renderMath(str, true);
  }
});

//
// Inject line numbers for sync scroll. Notes:
//
// - We track only headings and paragraphs on first level. That's enough.
// - Footnotes content causes jumps. Level limit filter it automatically.
//
// Code from markdown-it demo.
function injectLineNumbers (tokens, idx, options, env, slf) {
  if (tokens[idx].map && tokens[idx].level === 0) {
    let line = tokens[idx].map[0];
    tokens[idx].attrJoin('class', 'm-preview-line-number');
    tokens[idx].attrSet('data-line', String(line));
  }
  return slf.renderToken(tokens, idx, options, env, slf);
}

md.renderer.rules.paragraph_open = md.renderer.rules.heading_open = injectLineNumbers;

export default {
  highlight: Highlighter,

  async renderForPreview (editorContent, container) {
    let mathRenderer = new MathRenderer();
    renderMath = (s, display) => {
      let id = mathRenderer.add(s, display);
      return `<span class="m-math-renderer" data-m-math-id="${id}"></span>`;
    };

    let html = md.render(editorContent);

    await mathRenderer.doRender();

    container.innerHTML = html;

    for (let span of container.getElementsByClassName('m-math-renderer')) {
      span.innerHTML = mathRenderer.get(span.getAttribute('data-m-math-id'));
    }
  }
};
