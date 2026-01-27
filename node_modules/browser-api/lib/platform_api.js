/**
 * Enumeration for the operating system's platform.
 *
 * @private
 * @enum
 *
 * @property {number} Unknown - The platform has not been determined.
 * @property {number} Windows - Windows desktop device.
 * @property {number} MacOS - macOS desktop device.
 * @property {number} Linux - Linux desktop device.
 * @property {number} Android - Android phone or tablet.
 * @property {number} iOS - iOS phone or tablet.
 */
const PlatformType = Object.freeze({
  Unknown: 1,
  Windows: 2,
  MacOS: 3,
  Linux: 4,
  Android: 5,
  iOS: 6,
});

/**
 * Browser APIs pertaining to the browser's platform.
 *
 * @hideconstructor
 */
class PlatformAPI {
  constructor(api) {
    this._handle = api._handle;

    /**
     * The browser's four-part version string, e.g. 80.0.3987.28452.
     *
     * @type string
     */
    this.version = null;

    /**
     * The operating system's platform type.
     *
     * @type PlatformType
     * @private
     */
    this._platform = PlatformType.Unknown;

    /**
     * The operating system's architecture (32-bit or 64-bit).
     *
     * @type number
     * @private
     */
    this._systemArch = -1;

    /**
     * The browser's architecture (32-bit or 64-bit).
     *
     * @type number
     * @private
     */
    this._browserArch = -1;

    if (this._handle !== null) {
      this.version = this._handle.platformInfo.version;
      this._platform = this._parsePlatform();
    }

    if (this._platform === PlatformType.Unknown) {
      this._platform = this._inferPlatform();
    }

    if (this._handle !== null && this._platform !== PlatformType.Unknown) {
      [this._systemArch, this._browserArch] = this._parseArchitecture();
    }
  }

  /**
   * Check if the system on which the browser is a known platform.
   *
   * @return {boolean} True if the system is a known platform.
   */
  isKnownPlatform() {
    return this._platform !== PlatformType.Unknown;
  }

  /**
   * Check if the system on which the browser is running is an Windows platform.
   *
   * @return {boolean} True if the system is an Windows platform.
   */
  isWindows() {
    return this._platform === PlatformType.Windows;
  }

  /**
   * Check if the system on which the browser is running is an macOS platform.
   *
   * @return {boolean} True if the system is an macOS platform.
   */
  isMacOS() {
    return this._platform === PlatformType.MacOS;
  }

  /**
   * Check if the system on which the browser is running is an Linux platform.
   *
   * @return {boolean} True if the system is an Linux platform.
   */
  isLinux() {
    return this._platform === PlatformType.Linux;
  }

  /**
   * Check if the system on which the browser is running is an Android platform.
   *
   * @return {boolean} True if the system is an Android platform.
   */
  isAndroid() {
    return this._platform === PlatformType.Android;
  }

  /**
   * Check if the system on which the browser is running is an iOS platform.
   *
   * @return {boolean} True if the system is an iOS platform.
   */
  isIOS() {
    return this._platform === PlatformType.iOS;
  }

  /**
   * Check if the system on which the browser is running is a desktop platform.
   *
   * @return {boolean} True if the system is a desktop platform.
   */
  isDesktop() {
    return this.isWindows() || this.isMacOS() || this.isLinux();
  }

  /**
   * Check if the system on which the browser is running is a mobile platform.
   *
   * @return {boolean} True if the system is a mobile platform.
   */
  isMobile() {
    return this.isAndroid() || this.isIOS();
  }

  /**
   * Check if the browser knows the architecture of the system it is running on.
   *
   * @return {boolean} True if the system architecture is known.
   */
  hasSystemArchitecture() {
    return this._systemArch !== -1;
  }

  /**
   * Check if the browser is running on a 32-bit system.
   *
   * @return {boolean} True if the system's architecture is 32-bit.
   */
  is32BitSystem() {
    return this._systemArch === 32;
  }

  /**
   * Check if the browser is running on a 64-bit system.
   *
   * @return {boolean} True if the system's architecture is 64-bit.
   */
  is64BitSystem() {
    return this._systemArch === 64;
  }

  /**
   * Check if the browser knows its own architecture.
   *
   * @return {boolean} True if the browser's architecture is known.
   */
  hasBrowserArchitecture() {
    return this._browserArch !== -1;
  }

  /**
   * Check if the browser is a 32-bit application.
   *
   * @return {boolean} True if the browser's architecture is 32-bit.
   */
  is32BitBrowser() {
    return this._browserArch === 32;
  }

  /**
   * Check if the browser is a 64-bit application.
   *
   * @return {boolean} True if the browser's architecture is 64-bit.
   */
  is64BitBrowser() {
    return this._browserArch === 64;
  }

  /**
   * Convert the system on which the browser is running to a PlatformType value.
   *
   * @private
   */
  _parsePlatform() {
    const platform = this._handle.platformInfo.platform;

    if (platform === 'Android') {
      return PlatformType.Android;
    } else if (platform === 'iOS') {
      return PlatformType.iOS;
    } else if (platform === 'Windows') {
      return PlatformType.Windows;
    } else if (platform === 'Mac OS X') {
      return PlatformType.MacOS;
    } else if (platform === 'Linux') {
      return PlatformType.Linux;
    }

    return PlatformType.Unknown;
  }

  /**
   * Infer the system on which the browser is running from its User-Agent and
   * convert to a PlatformType value.
   *
   * @private
   */
  _inferPlatform() {
    if (
      typeof window === 'undefined' ||
      typeof window.navigator === 'undefined' ||
      typeof window.navigator.userAgent === 'undefined'
    ) {
      return PlatformType.Unknown;
    }

    const platforms = [
      { platform: PlatformType.Android, regex: /Android/ },
      { platform: PlatformType.iOS, regex: /(iPhone|iPad|iPod)/ },
      { platform: PlatformType.Linux, regex: /(Linux|X11(?!.*CrOS))/ },
      {
        platform: PlatformType.MacOS,
        regex: /(Mac OS|Mac OS X|MacPPC|MacIntel|Mac_PowerPC|Macintosh)/,
      },
      { platform: PlatformType.Windows, regex: /(Windows)/ },
    ];

    for (const index in platforms) {
      const platform = platforms[index];

      if (platform.regex.test(window.navigator.userAgent)) {
        return platform.platform;
      }
    }

    return PlatformType.Unknown;
  }

  /**
   * Obtain the system's and browser's architectures (32-bit or 64-bit). If not
   * supported by the browser, falls back to the User-Agent, if possible.
   *
   * @private
   */
  _parseArchitecture() {
    const platformInfo = this._handle.platformInfo;
    let systemArch = -1;
    let browserArch = -1;

    if (
      typeof platformInfo.systemArch === 'undefined' ||
      typeof platformInfo.browserArch === 'undefined'
    ) {
      // On Windows, we can fall back to the User-Agent.
      if (typeof window !== 'undefined' && this.isWindows()) {
        const agent = window.navigator.userAgent;

        if (agent.indexOf('WOW64') !== -1) {
          systemArch = 64;
          browserArch = 32;
        } else if (agent.indexOf('Win64') !== -1) {
          systemArch = 64;
          browserArch = 64;
        } else {
          systemArch = 32;
          browserArch = 32;
        }
      }
    } else {
      systemArch = platformInfo.systemArch;
      browserArch = platformInfo.browserArch;
    }

    return [systemArch, browserArch];
  }
}

module.exports = PlatformAPI;
