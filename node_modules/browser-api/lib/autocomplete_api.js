/**
 * Autocomplete matches contain text spans that should be classified according
 * to the below list of styles. Each classification contains an offset into the
 * text at which the classification starts and a bitmask of styles that should
 * be applied to that section of text.
 *
 * <table>
 *  <thead>
 *    <tr>
 *      <th>Style</th>
 *      <th>Description</th>
 *      <th>Value</th>
 *    </tr>
 *  </thead>
 *  <tbody>
 *    <tr>
 *      <td>None</td>
 *      <td>No style should be applied</td>
 *      <td><code>0</code></td>
 *    </tr>
 *    <tr>
 *      <td>URL</td>
 *      <td>The text is a URL</td>
 *      <td><code>1 << 1</code></td>
 *    </tr>
 *    <tr>
 *      <td>Match</td>
 *      <td>Match for the user's search term</td>
 *      <td><code>1 << 2</code></td>
 *    </tr>
 *    <tr>
 *      <td>Dim</td>
 *      <td>Helper or descriptive text</td>
 *      <td><code>1 << 3</code></td>
 *    </tr>
 *  </tbody>
 * </table>
 *
 * @typedef {object} AutocompleteClassification
 * @memberof AutocompleteAPI
 *
 * @property {number} offset - Position in the text this classification starts.
 * @property {number} style - Bitmask of styles to apply to this classification.
 */

/**
 * A single autocomplete match for a search query. Contains information on the
 * match itself (e.g. the URL and text of the match) and details on how the
 * match should be displayed to the user.
 *
 * There is abundant documentation in Chromium (link below) on these details.
 * Developers should read that documentation before using this API.
 *
 * @see {@link https://github.com/chromium/chromium/blob/80.0.3987.0/components/omnibox/browser/autocomplete_match.h}
 *
 * @typedef {object} AutocompleteMatch
 * @memberof AutocompleteAPI
 *
 * @property {string} contents - The text to display for the autocomplete match.
 * @property {AutocompleteAPI.AutocompleteClassification[]} contentsClass - List
 *           of style classifications for the contents string.
 * @property {string} description
 *           Additional helper text for the match, e.g. a title or description.
 * @property {AutocompleteAPI.AutocompleteClassification[]} descriptionClass
 *           List of style classifications for the description string.
 * @property {string} destinationUrl
 *           URL to navigate to when the user selects this match.
 * @property {string} type
 *           Type of the match result.
 * @property {boolean} isSearchType
 *           Whether the match type is a search result (as opposed to a URL).
 * @property {string} fillIntoEdit
 *           Text to display when this match is selected via arrow/tab keys.
 * @property {string} inlineAutocompletion
 *           Text to display after the user's cursor while typing.
 * @property {boolean} allowedToBeDefaultMatch
 *           Whether the match can be the default match.
 */

/**
 * Callback triggered when a search's autocomplete results have changed.
 *
 * @callback AutocompleteResultChangedCallback
 * @memberof AutocompleteAPI
 *
 * @param {object} result - Object containing the autocomplete result.
 * @param {string} result.input - Search query which generated the result.
 * @param {AutocompleteAPI.AutocompleteMatch[]} result.matches - List of matches.
 */

/**
 * Browser APIs pertaining to search and autocomplete.
 *
 * @hideconstructor
 */
class AutocompleteAPI {
  constructor(api) {
    this._handle = api._handle;
    this._observers = [];

    if (this._handle !== null) {
      this._handle.search.onAutocompleteResultChanged = () => this._notify();
    }
  }

  /**
   * Add an observer to be notified when a search's autocomplete results have
   * changed.
   *
   * @param {AutocompleteAPI.AutocompleteResultChangedCallback} observer -
   *        Callback triggered when a search's autocomplete result has changed.
   */
  addObserver(observer) {
    if (this._handle === null) {
      return;
    }

    this._observers.push(observer);
  }

  /**
   * Request the browser for a set of autocomplete matches for a user-specified
   * search query. When results are available, all
   * [registered observers]{@link AutocompleteAPI#addObserver} will be notified.
   *
   * @param {string} input - String to request autocomplete results for.
   * @param {boolean} preventInlineAutocomplete - Inform the browser that the
   *        autocomplete result should not contain inline matches. This should
   *        primarily be set to to true in cases such as the user deleted text
   *        from the search input.
   */
  query(input, preventInlineAutocomplete) {
    if (this._handle === null) {
      return;
    }

    this._handle.search.queryAutocomplete(input, preventInlineAutocomplete);
  }

  /**
   * If an autocomplete query is ongoing, cancel the request. Note that there is
   * no guarantee the ongoing request is cancelled before the
   * [registered observers]{@link AutocompleteAPI#addObserver} are notified.
   */
  stop() {
    if (this._handle === null) {
      return;
    }

    this._handle.search.stopAutocomplete();
  }

  /**
   * Attempt to navigate to a specific autocomplete match.
   *
   * This is done via a browser API (rather than a simple href) because the
   * browser may update the match URL with parameters that were not available
   * when the match was generated. These are namely time-based parameters.
   *
   * @param {number} index - Index of the match in autocomplete matches array.
   * @param {string} url - URL of the match to open. This is redundant with
   *        index, but is used as a final check for stale/malicious results.
   * @param {boolean} middleButton - Whether the user's middle mouse button was
   *        pressed to navigate to the match. If true, will open the match in a
   *        new tab.
   * @param {boolean} altKey - Whether the user's Alt key was pressed when the
   *        match was selected.
   * @param {boolean} ctrlKey - Whether the user's Control key was pressed when
   *        the match was selected. If true, will open the match in a new tab
   *        (Windows or Linux), or will defer the click to the OS (macOS).
   * @param {boolean} metaKey - Whether the user's Meta key was pressed when the
   *        match was selected. If true, will open the match in a new tab
   *        (macOS), or will defer the click to the OS (Windows or Linux).
   * @param {boolean} shiftKey - Whether the user's Shift key was pressed when
   *        the match was selected. If true, will open the match in a new
   *        window.
   */
  openMatch(index, url, middleButton, altKey, ctrlKey, metaKey, shiftKey) {
    if (this._handle === null) {
      return;
    }

    this._handle.search.openAutocompleteMatch(
      index,
      url,
      middleButton,
      altKey,
      ctrlKey,
      metaKey,
      shiftKey
    );
  }

  /**
   * Notify all observers of a change in a search's autocomplete results.
   *
   * @private
   */
  _notify() {
    const result = this._handle.search.autocompleteResult;
    this._observers.forEach((observer) => observer(result));
  }
}

module.exports = AutocompleteAPI;
