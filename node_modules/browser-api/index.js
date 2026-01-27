const AutocompleteAPI = require('./lib/autocomplete_api');
const BrowserAPI = require('./lib/browser_api');
const NetworkAPI = require('./lib/network_api');
const PlatformAPI = require('./lib/platform_api');
const ThemeAPI = require('./lib/theme_api');
const TilesAPI = require('./lib/tiles_api');

// Expose the Browser API as a singleton object. This allows any number of React
// components to import the API while still communicating with the browser over
// a single channel.
const BROWSER_API_KEY = Symbol.for('rebel_browser_api');

if (Object.getOwnPropertySymbols(global).indexOf(BROWSER_API_KEY) === -1) {
  const api = new BrowserAPI();

  api.autocomplete = new AutocompleteAPI(api);
  api.network = new NetworkAPI(api);
  api.platform = new PlatformAPI(api);
  api.theme = new ThemeAPI(api);
  api.tiles = new TilesAPI(api);

  global[BROWSER_API_KEY] = Object.freeze(api);
}

// Define the singleton object storing a pointer to the API.
let singleton = {};

Object.defineProperty(singleton, 'instance', {
  get: function () {
    return global[BROWSER_API_KEY];
  },
});

// Freeze the singleton so importers cannot modify them.
Object.freeze(singleton.instance);

/**
 * This module exports the single [Browser API instance]{@link BrowserAPI.md}
 * instance extended with instances of feature APIs listed below. These APIs
 * provide access to data and controls embedded by the Rebel Browser through
 * the <code>window.rebel</code> object. See the provided links for more
 * information on these APIs.
 *
 * @module BrowserAPI
 *
 * @property {AutocompleteAPI} autocomplete -  Instance of the API for the
 *           [autocomplete]{@link AutocompleteAPI.md} feature.
 * @property {NetworkAPI} network -  Instance of the API for the
 *           [networking]{@link NetworkAPI.md} feature.
 * @property {PlatformAPI} platform -  Instance of the API for the
 *           [platform]{@link PlatformAPI.md} feature.
 * @property {ThemeAPI} theme -  Instance of the API for the
 *           [theme]{@link ThemeAPI.md} feature.
 * @property {TilesAPI} tiles -  Instance of the API for the
 *           [tiles]{@link TilesAPI.md} feature.
 */
module.exports = singleton.instance;
