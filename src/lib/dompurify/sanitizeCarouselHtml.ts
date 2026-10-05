import DOMPurify from "isomorphic-dompurify";

// The carousel description editor only produces these tags, so anything else
// in a stored description is dropped (tags unwrapped, attributes removed).
const CAROUSEL_HTML_CONFIG = {
  ALLOWED_TAGS: ["p", "br", "strong", "em", "u"],
  ALLOWED_ATTR: [],
};

export function sanitizeCarouselHtml(html: string): string {
  return DOMPurify.sanitize(html, CAROUSEL_HTML_CONFIG);
}
