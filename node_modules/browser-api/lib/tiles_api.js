/**
 * A single New Tab page tile.
 *
 * @typedef {object} Tile
 * @memberof TilesAPI
 *
 * @property {string} url - URL of the target site.
 * @property {string} title - Name that should be displayed with the tile.
 * @property {string} favicon_url - URL of the favicon for the target site.
 */

/**
 * Callback triggered when browser's New Tab Page tiles have changed.
 *
 * @callback TilesChangedCallback
 * @memberof TilesAPI
 *
 * @param {TilesAPI.Tile[]} tiles - The browser's new New Tab Page tiles.
 */

/**
 * Browser APIs pertaining to the browser's New Tab Page tiles.
 *
 * @hideconstructor
 */
class TilesAPI {
  constructor(api) {
    this._handle = api._handle;
    this._observers = [];

    if (this._handle !== null) {
      this._handle.onNtpTilesChanged = () => this._notify();
    }
  }

  /**
   * Add an observer to be notified when the browser's New Tab Page tiles have
   * changed. If available, the provided callback is triggered immediately with
   * browser's current New Tab Page tiles.
   *
   * @param {TilesAPI.TilesChangedCallback} observer - Callback triggered when
   *        the browser's New Tab Page tiles have changed.
   */
  addObserver(observer) {
    if (this._handle === null) {
      return;
    }

    this._observers.push(observer);

    if (this._handle.ntpTilesAvailable) {
      observer(this._handle.ntpTiles);
    }
  }

  /**
   * Add a custom New Tab Page tile to the user's profile. If successful, all
   * [registered observers]{@link TilesAPI#addObserver} will be notified.
   *
   * @param {string} url - URL of the custom tile to add.
   * @param {string} title - Name that should be displayed with the tile.
   */
  addTile(url, title) {
    if (this._handle === null) {
      return;
    }

    // Ensure a protocol has been specified, defaulting to https.
    if (!/^(https?|chrome|rebel):\/\//i.test(url)) {
      url = 'https://' + url;
    }

    this._handle.addCustomTile(url, title);
  }

  /**
   * Remove a custom New Tab Page tile from the user's profile. If successful,
   * all [registered observers]{@link TilesAPI#addObserver} will be notified.
   *
   * @param {string} url - URL of the custom tile to remove.
   */
  removeTile(url) {
    if (this._handle === null) {
      return;
    }

    this._handle.removeCustomTile(url);
  }

  /**
   * Edit a custom New Tab Page tile in the user's profile. If successful, all
   * [registered observers]{@link TilesAPI#addObserver} will be notified.
   *
   * @param {string} oldUrl - URL of the custom tile to edit.
   * @param {string} newUrl - New URL of the custom tile.
   * @param {string} newTitle - New title of the custom tile.
   */
  editTile(oldUrl, newUrl, newTitle) {
    if (this._handle === null) {
      return;
    } else if (oldUrl === '' || newUrl === '' || newTitle === '') {
      return;
    }

    // Ensure a protocol has been specified, defaulting to https.
    if (!/^(https?|chrome|rebel):\/\//i.test(newUrl)) {
      newUrl = 'https://' + newUrl;
    }

    // In practice, if the user only wishes to change a custom tile's title,
    // then the new URL must be empty. If the old and new URLs are equivalent,
    // no change will be applied, even if the title differs. This is unfortunate
    // but is due to implementation details in Chromium's backed tile storage.
    if (oldUrl === newUrl) {
      newUrl = '';
    }

    this._handle.editCustomTile(oldUrl, newUrl, newTitle);
  }

  /**
   * Notify all observers of a change in the browser's New Tab Page tiles.
   *
   * @private
   */
  _notify() {
    if (!this._handle.ntpTilesAvailable) {
      return;
    }

    const tiles = this._handle.ntpTiles;
    this._observers.forEach((observer) => observer(tiles));
  }
}

module.exports = TilesAPI;
