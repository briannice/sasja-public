import sanitize from 'sanitize-html'

const ALLOWED_TAGS = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'p', 'br', 'hr',
  'ul', 'ol', 'li',
  'a', 'strong', 'em', 'b', 'i', 'u', 's',
  'blockquote', 'pre', 'code',
  'img', 'figure', 'figcaption',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'div', 'span',
  'sub', 'sup',
]

const ALLOWED_ATTR: Record<string, string[]> = {
  'a': ['href', 'target', 'rel'],
  'img': ['src', 'alt', 'width', 'height'],
  '*': ['class', 'style'],
  'td': ['colspan', 'rowspan'],
  'th': ['colspan', 'rowspan'],
}

export function sanitizeHTML(html: string): string {
  return sanitize(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTR,
  })
}
