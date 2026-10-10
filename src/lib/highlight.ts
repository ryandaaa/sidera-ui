import Prism from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-json'

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export function highlightCode(code: string, language: string = 'tsx'): string {
  if (!code) return ''
  const lang = language.toLowerCase()
  const grammar = Prism.languages[lang] || Prism.languages.tsx || Prism.languages.javascript
  if (!grammar) return escapeHtml(code)
  return Prism.highlight(code, grammar, lang)
}
