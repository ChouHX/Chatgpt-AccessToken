import MarkdownIt from "markdown-it"
// @ts-ignore
import mdKatex from "markdown-it-katex"
import mdHighlight from "markdown-it-highlightjs"
import mdKbd from "markdown-it-kbd"
import preWrapperPlugin from "./preWrapper"
import hljs from 'highlight.js'

export const md = MarkdownIt({
  html: true,
  linkify: true,
  breaks: true,
  highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
          try {
              return hljs.highlight(lang, str).value;
          } catch (__) {}
      }

      return ''; // 使用额外的默认转义
  }
})
  .use(mdKatex)
  .use(mdHighlight, {
    inline: true
  })
  .use(mdKbd)
  .use(preWrapperPlugin)
