/**
 * Pretendard Variable is loaded via CDN link in layout.tsx <head>.
 * SejongHospital Bold + Light are loaded via @font-face in DS styles.css.
 * All font-family CSS variables (--font-pretendard, --font-sejong-bold,
 * --font-sejong-light) are registered by the DS @theme block.
 *
 * This file is kept for backward compat — components that imported
 * `globalFont.className` will get an empty className (harmless).
 * Remove once all font references are migrated to DS tokens.
 */

export const globalFont = {
  className: "",
};
