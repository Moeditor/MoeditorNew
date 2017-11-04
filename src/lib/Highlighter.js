import hljs from 'highlight.js';
import escapeHTML from 'escape-html';
import LRU from 'lru-cache';

let cache = LRU(512);

export default function Highlighter (code, lang) {
  if (lang === 'plain') return escapeHTML(code);

  let cacheKey = {
    code: code,
    lang: lang
  };

  let cached = cache.get(cacheKey);
  if (cached) return cached;

  // Cache missed
  let res = '';
  if (lang && hljs.getLanguage(lang)) {
    try {
      res = hljs.highlight(lang, code).value;
    } catch (e) {}
  } else {
    try {
      res = hljs.highlightAuto(code).value;
    } catch (e) {}
  }

  if (code.trim() !== '' && res === '') res = escapeHTML(code);

  // Set the cache
  cache.set(cacheKey, res);

  return res;
}
