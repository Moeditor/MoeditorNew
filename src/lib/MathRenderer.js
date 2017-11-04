import LRU from 'lru-cache';

let cache = LRU(512);

let renderDiv = document.createElement('div');
renderDiv.style.width = renderDiv.style.height = 0;
renderDiv.style.visibility = 'hidden';
document.body.appendChild(renderDiv);

function generateCacheKey (s, display) {
  return display.toString().substr(0, 1) + s;
}

export default class MathRenderer {
  constructor () {
    this.currID = 0;
    this.maths = {};
  }

  add (s, display) {
    let id = this.currID++;
    let key = {
      s: s,
      display: display,
      res: cache.get(generateCacheKey(s, display))
    };
    this.maths[id] = key;
    return id;
  }

  async doRender () {
    return await new Promise((resolve, reject) => {
      while (renderDiv.firstChild) renderDiv.removeChild(renderDiv.firstChild);
      _.forOwn(this.maths, math => {
        if (math.res) return; // Cached

        let div = document.createElement('div');
        let border = math.display ? '$$' : '$';
        div.innerText = `${border}${math.s}${border}`;
        math.renderDiv = div;

        renderDiv.appendChild(div);
      });

      window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub, renderDiv]);
      window.MathJax.Hub.Queue(() => {
        _.forOwn(this.maths, math => {
          if (math.res) return;

          math.res = math.renderDiv.innerHTML;

          cache.set(generateCacheKey(math.s, math.display), math.res);
        });
        resolve();
      });
    });
  }

  get (id) {
    return this.maths[id].res;
  }
}
