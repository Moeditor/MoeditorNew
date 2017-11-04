window.diff_match_patch = require('googlediff');
let Prism = require('prismjs');

require('./clunderscore.js');

require('./scripts/cleditCore.js');
require('./scripts/cleditHighlighter.js');
require('./scripts/cleditKeystroke.js');
require('./scripts/cleditSelectionMgr.js');
require('./scripts/cleditUndoMgr.js');
require('./scripts/cleditUtils.js');
require('./scripts/cleditWatcher.js');

let mdGrammar = require('./mdGrammar.js');

export default function cledit (contentElt, scrollElt, cb) {
  let option = {
    fences: true,
    tables: true,
    footnotes: true,
    abbrs: true,
    deflists: true,
    tocs: true,
    dels: true,
    subs: true,
    sups: true,
    maths: true
  };

  let editor = window.cledit(contentElt, scrollElt);
  cb(editor);
  let prismGrammar = mdGrammar(option);

  let svc = require('./clSvc').clEditorMarkdownSvc();
  let converter = svc.createConverter(option);

  editor.init({
    sectionHighlighter (section) {
      return Prism.highlight(section.text, prismGrammar);
    },
    codeBlocksHighlighter (div) {
      let codeBlocks = div.querySelectorAll('.pre.gfm');
      for (let codeBlock of codeBlocks) {
        let lines = codeBlock.innerText.split('\n\n');
        let firstLine = lines.shift();
        let lastLine = lines.pop();

        let lang = _.trimStart(firstLine.trim(), firstLine[0]).trim().split(' ')[0];

        let code = lines.join('\n');
        let highlighted = app.renderer.highlight(code, lang);

        codeBlock.innerHTML = firstLine + '\n' + highlighted + '\n' + lastLine;
      }
    },
    // Optional (increases performance on large documents)
    sectionParser (text) {
      let sections = svc.parseSections(converter, text).sections;
      return sections;
      // let offset = 0;
      // let sectionList = [];
      // (text + '\n\n').replace(/^.+[ \t]*\n=+[ \t]*\n+|^.+[ \t]*\n-+[ \t]*\n+|^#{1,6}[ \t]*.+?[ \t]*#*\n+/gm, (match, matchOffset) => {
      //   sectionList.push(text.substring(offset, matchOffset));
      //   offset = matchOffset;
      // });
      // sectionList.push(text.substring(offset));
      // return sectionList;
    }
  });

  return editor;
}
