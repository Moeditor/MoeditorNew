import jQuery from 'jquery';

export default class ScrollSyncer {
  constructor (editor, editorScroller, previewContainer, previewScroller) {
    this.editor = editor;
    this.editorScroller = editorScroller;
    this.previewContainer = previewContainer;
    this.previewScroller = previewScroller;
    this.scrollMap = null;
  }

  buildScrollMap () {
    this.editorClientWidth = this.editor.clientWidth;
    this.previewContainerClientWidth = this.previewContainer.clientWidth;

    var i, offset, nonEmptyList, pos, a, b, lineHeightMap, linesCount,
        acc, sourceLikeDiv,
        _scrollMap;

    let computedStyle = window.getComputedStyle(this.editor);
    let lineHeight = computedStyle.lineHeight;

    sourceLikeDiv = document.createElement('div');
    sourceLikeDiv.style.position = 'absolute';
    sourceLikeDiv.style.visibility = 'hidden';
    sourceLikeDiv.style.height = 'auto';
    sourceLikeDiv.style.width = (this.editor.clientWidth - parseFloat(computedStyle.paddingLeft) - parseFloat(computedStyle.paddingRight)) + 'px';
    sourceLikeDiv.style.fontSize = computedStyle.fontSize;
    sourceLikeDiv.style.fontFamily = computedStyle.fontFamily;
    sourceLikeDiv.style.lineHeight = lineHeight;
    sourceLikeDiv.style.whiteSpace = computedStyle.whiteSpace;
    // NOTE: The `box-sizing` must be 'content-box'
    sourceLikeDiv.style.boxSizing = 'content-box';
    sourceLikeDiv.style.padding = computedStyle.padding;
    document.body.appendChild(sourceLikeDiv);

    offset = this.previewContainer.scrollTop - this.previewContainer.offsetTop;
    _scrollMap = [];
    nonEmptyList = [];
    lineHeightMap = [];

    acc = 0;
    this.editor.innerText.split('\n').forEach(function (str) {
      var h, lh;

      lineHeightMap.push(acc);

      if (str.length === 0) {
        acc++;
        return;
      }

      sourceLikeDiv.innerText = str;
      h = parseFloat(window.getComputedStyle(sourceLikeDiv).height);
      lh = parseFloat(lineHeight);
      acc += Math.round(h / lh);
    });

    document.body.removeChild(sourceLikeDiv);

    lineHeightMap.push(acc);
    linesCount = acc;

    for (i = 0; i < linesCount; i++) { _scrollMap.push(-1); }

    nonEmptyList.push(0);
    _scrollMap[0] = 0;

    Array.from(this.previewContainer.getElementsByClassName('m-preview-line-number')).forEach((el) => {
      let t = el.getAttribute('data-line');
      if (t === '') return;
      t = lineHeightMap[t];
      if (t !== 0) nonEmptyList.push(t);
      _scrollMap[t] = Math.round(el.getBoundingClientRect().top + offset);
    });

    nonEmptyList.push(linesCount);
    _scrollMap[linesCount] = this.previewContainer.scrollHeight;

    pos = 0;
    for (i = 1; i < linesCount; i++) {
      if (_scrollMap[i] !== -1) {
        pos++;
        continue;
      }

      a = nonEmptyList[pos];
      b = nonEmptyList[pos + 1];
      _scrollMap[i] = Math.round((_scrollMap[b] * (i - a) + _scrollMap[a] * (b - i)) / (b - a));
    }

    this.scrollMap = _scrollMap;
  }

  refresh () {
    this.scrollMap = null;
  }

  tryRebuildScrollMap () {
    if (!this.scrollMap) return this.buildScrollMap();
    if (this.editor.clientWidth !== this.editorClientWidth || this.previewContainer.clientWidth !== this.previewContainerClientWidth) {
      return this.buildScrollMap();
    }
  }

  editorToPreview = _.throttle(() => {
    if (jQuery(this.editorScroller).is(':animated')) {
      this.editorScrollerLastAnimateTime = _.now();
      return;
    }

    if (this.editorScrollerLastAnimateTime && _.now() - this.editorScrollerLastAnimateTime < 200) {
      return;
    }

    this.tryRebuildScrollMap();

    let lineHeight = parseFloat(window.getComputedStyle(this.editor).lineHeight);

    let lineNo = Math.floor(this.editorScroller.scrollTop / lineHeight);
    let posTo = this.scrollMap[Math.min(lineNo, this.scrollMap.length - 1)] - this.scrollMap[0];

    jQuery(this.previewScroller).stop(true).animate({
      scrollTop: posTo
    }, 100, 'linear');
  }, 100);

  previewToEditor = _.throttle(() => {
    if (jQuery(this.previewScroller).is(':animated')) {
      this.previewScrollerLastAnimateTime = _.now();
      return;
    }

    if (this.previewScrollerLastAnimateTime && _.now() - this.previewScrollerLastAnimateTime < 200) {
      return;
    }

    this.tryRebuildScrollMap();

    let scrollTop = this.previewScroller.scrollTop + this.scrollMap[0];
    let lineHeight = parseFloat(window.getComputedStyle(this.editor).lineHeight);

    let lines = Object.keys(this.scrollMap);

    if (lines.length < 1) {
      return;
    }

    let l = 0;
    let r = lines.length - 1;
    while (l < r) {
      let mid = parseInt(l + (r - l) / 2);
      if (this.scrollMap[lines[mid]] >= scrollTop) r = mid;
      else l = mid + 1;
    }
    let line = lines[r];

    jQuery(this.editorScroller).stop(true).animate({
      scrollTop: lineHeight * line
    }, 100, 'linear');
  }, 100);
}
