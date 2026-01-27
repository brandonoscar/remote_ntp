/**
 * Library for accessing APIs embedded by Rebel Browser under the object
 * <code>window.rebel</code>.
 *
 * @hideconstructor
 */
class BrowserAPI {
  constructor() {
    /**
     * Handle to store the window.rebel object, if it exists.
     *
     * @private
     */
    this._handle = null;

    if (typeof window !== 'undefined' && window.rebel) {
      this._handle = window.rebel;
    }
  }

  /**
   * Load a native chrome:// URL. URLs that cause the browser to crash (e.g.
   * chrome://crash) are forbidden.
   *
   * @param {string} url - URL with a chrome:// protocol to load.
   *
   * @return {boolean} Whether the provided URL is a valid chrome:// URL.
   */
  loadInternalUrl(url) {
    try {
      const parsed = new URL(url);

      if (this._handle !== null) {
        return this._handle.loadInternalUrl(url);
      }
    } catch (error) {}

    return false;
  }
}

module.exports = BrowserAPI;
