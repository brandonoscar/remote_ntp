/**
 * An object containing metrics about a WiFi network the browser has discovered.
 * If the system the browser is running on does not support all metrics, they
 * will be 0 (signalLevel) or -1 (rxMbps / txMbps).
 *
 * @typedef {object} WiFiStatus
 * @memberof NetworkAPI
 *
 * @property {string} ssid - The service set identifier (SSID) of the WiFi
 *           network.
 * @property {string} bssid - The basic service set identifier (BSSID) of the
 *           WiFi access point.
 * @property {string} connectionState - The WiFi network's current connection
 *           state (one of "Connected", "Connecting", "NotConnected").
 * @property {number} rssi - The received signal strength indicator of the
 *           network, in dBm. Will typically be on a scale of -100 (worst
 *           strength) to 0 (best strength).
 * @property {number} signalLevel - The RSSI signal quality rating using the
 *           system's RSSI quality rating thresholds. Will typically be on a
 *           scale of 0 (worst strength) to `maxSignalLevel` (best strength).
 * @property {number} maxSignalLevel - The system's maximum signal level.
 * @property {number} frequency - The network channel's band, in MHz.
 * @property {number} linkSpeed - The current link speed, in Mbps.
 * @property {number} rxMbps - The current receive link speed, in Mbps.
 * @property {number} txMbps - The current transmit link speed, in Mbps.
 * @property {number} maxRxMbps - The maximum supported receive link speed, in
 *           Mbps.
 * @property {number} maxTxMbps - The maximum supported transmit link speed, in
 *           Mbps.
 * @property {number} noiseMeasurement - The current aggregate noise measurement
 *           for the network, in dBm.
 *
 * @see {@link https://developer.android.com/reference/android/net/wifi/WifiInfo}
 * @see {@link https://developer.apple.com/documentation/corewlan/cwnetwork}
 * @see {@link https://docs.microsoft.com/en-us/windows/win32/api/wlanapi/}
 */

/**
 * Callback triggered when browser's WiFi status has changed.
 *
 * The parameter provided to the callback depends on how the callback was
 * [registered]{@link NetworkAPI#addWiFiStatusObserver}. If requested to be
 * notified about all networks, then the provided parameter will be a list of
 * all WiFi networks discovered by the browser. Otherwise, it will be the
 * currently connected WiFi network (if there is one).
 *
 * @callback WifiStatusChangedCallback
 * @memberof NetworkAPI
 *
 * @param {NetworkAPI.WiFiStatus[]|NetworkAPI.WiFiStatus} status - A list of all
 *        discovered WiFi networks, or the currently connected WiFi network.
 */

/**
 * Browser APIs pertaining to the underlying network the browser is running on.
 *
 * @hideconstructor
 */
class NetworkAPI {
  constructor(api) {
    this._handle = api._handle;

    this._wifiStatusObservers = [];

    this._defaultWifiStatus = Object.freeze({
      ssid: '',
      bssid: '',
      connectionState: '',
      rssi: -1,
      signalLevel: -1,
      maxSignalLevel: -1,
      frequency: -1,
      linkSpeed: -1,
      rxMbps: -1,
      txMbps: -1,
      maxRxMbps: -1,
      maxTxMbps: -1,
      noiseMeasurement: -1,
    });

    if (this.hasNetworkAPI()) {
      this._handle.network.onWiFiStatusChanged = () =>
        this._notifyAboutWiFiStatus();
    }
  }

  /**
   * Check whether the browser supports networking queries.
   *
   * @return {boolean} True if network APIs are supported.
   */
  hasNetworkAPI() {
    if (this._handle === null) {
      return false;
    }

    const network = this._handle.network;
    return network && typeof network === 'object';
  }

  /**
   * Create an object holding the default WiFi status metrics.
   *
   * @return {NetworkAPI.WiFiStatus} The default WiFi status.
   */
  getDefaultWiFiStatus() {
    return Object.assign({}, this._defaultWifiStatus);
  }

  /**
   * Add an observer to be notified when the browser's WiFi status has changed.
   * The provided callback is triggered immediately with the browser's current
   * WiFi status (if it has one).
   *
   * @param {NetworkAPI.WifiStatusChangedCallback} observer - Callback triggered
   *        when the browser's WiFi status has changed.
   * @param {boolean} [notifyAll=false] - Whether to be notified of all WiFi
   *        networks discovered by the browser, or only the currently connected
   *        WiFi network.
   */
  addWiFiStatusObserver(observer, notifyAll) {
    if (!this.hasNetworkAPI()) {
      return;
    }

    if (typeof notifyAll !== 'boolean') {
      notifyAll = false;
    }

    this._wifiStatusObservers.push({
      observer: observer,
      notifyAll: notifyAll,
    });

    const wiFiStatus = this._createWiFiStatusList();

    if (notifyAll) {
      if (wiFiStatus.length !== 0) {
        observer(wiFiStatus);
      }
    } else {
      const connectedWiFiStatus = wiFiStatus.find(
        (status) => status.connectionState !== 'NotConnected'
      );

      if (connectedWiFiStatus !== undefined) {
        observer(connectedWiFiStatus);
      }
    }
  }

  /**
   * Request the browser for an updated WiFi status. When results are available,
   * all [registered observers]{@link NetworkAPI#addWiFiStatusObserver} will be
   * notified.
   */
  updateWiFiStatus() {
    if (!this.hasNetworkAPI()) {
      return;
    }

    this._handle.network.updateWiFiStatus();
  }

  /**
   * Notify all observers of a change in the browser's WiFi status.
   *
   * @private
   */
  _notifyAboutWiFiStatus() {
    const wiFiStatus = this._createWiFiStatusList();

    const connectedWiFiStatus = wiFiStatus.find(
      (status) => status.connectionState !== 'NotConnected'
    );

    this._wifiStatusObservers.forEach((observer) => {
      if (observer.notifyAll) {
        observer.observer(wiFiStatus);
      } else if (connectedWiFiStatus !== undefined) {
        observer.observer(connectedWiFiStatus);
      }
    });
  }

  /**
   * Convert WiFi status metrics provided by the browser to a list of objects to
   * be given to observers.
   *
   * @return {NetworkAPI.WiFiStatus} The created status.
   *
   * @private
   */
  _createWiFiStatusList() {
    if (!this.hasNetworkAPI()) {
      return [];
    }

    let wiFiStatus = this._handle.network.wiFiStatus;
    if (wiFiStatus === null) {
      return [];
    }

    if (!Array.isArray(wiFiStatus)) {
      wiFiStatus = [wiFiStatus];
    }

    // Fill in properties that may not appear in older browser versions.
    const defaultWiFiStatus = this.getDefaultWiFiStatus();

    wiFiStatus.forEach((status) => {
      for (const metric in defaultWiFiStatus) {
        if (!status.hasOwnProperty(metric)) {
          status[metric] = defaultWiFiStatus[metric];
        }
      }
    });

    return wiFiStatus;
  }
}

module.exports = NetworkAPI;
