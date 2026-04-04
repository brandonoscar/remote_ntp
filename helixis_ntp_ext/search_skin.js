/*
 * Helixis Search Skin JS
 *
 * This script applies minor cosmetic tweaks to Google search results pages.
 * It does NOT:
 *   - Call preventDefault() on any event
 *   - Hijack, reorder, or filter search results
 *   - Inject iframes or third-party content
 *   - Intercept form submissions or navigation
 *   - Make any fetch/AJAX/XHR requests
 *
 * It ONLY:
 *   - Adds a CSS class to <body> for theme scoping
 *   - Sets meta theme-color for the browser chrome
 */

(function () {
  "use strict";

  // Add a scoping class so search_skin.css can target only Helixis-skinned pages.
  document.body.classList.add("helixis-search-skin");

  // Set the browser's theme-color meta tag to match Helixis purple.
  var meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "theme-color";
    document.head.appendChild(meta);
  }
  meta.content = "#0d0520";
})();
