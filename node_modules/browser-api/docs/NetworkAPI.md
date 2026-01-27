<a name="NetworkAPI"></a>

## NetworkAPI
Browser APIs pertaining to the underlying network the browser is running on.

**Kind**: global class  

* [NetworkAPI](#NetworkAPI)
    * _instance_
        * [.hasNetworkAPI()](#NetworkAPI+hasNetworkAPI) ⇒ <code>boolean</code>
        * [.getDefaultWiFiStatus()](#NetworkAPI+getDefaultWiFiStatus) ⇒ [<code>WiFiStatus</code>](#NetworkAPI.WiFiStatus)
        * [.addWiFiStatusObserver(observer, [notifyAll])](#NetworkAPI+addWiFiStatusObserver)
        * [.updateWiFiStatus()](#NetworkAPI+updateWiFiStatus)
    * _static_
        * [.WiFiStatus](#NetworkAPI.WiFiStatus) : <code>object</code>
        * [.WifiStatusChangedCallback](#NetworkAPI.WifiStatusChangedCallback) : <code>function</code>


* * *

<a name="NetworkAPI+hasNetworkAPI"></a>

### networkAPI.hasNetworkAPI() ⇒ <code>boolean</code>
Check whether the browser supports networking queries.

**Kind**: instance method of [<code>NetworkAPI</code>](#NetworkAPI)  
**Returns**: <code>boolean</code> - True if network APIs are supported.  

* * *

<a name="NetworkAPI+getDefaultWiFiStatus"></a>

### networkAPI.getDefaultWiFiStatus() ⇒ [<code>WiFiStatus</code>](#NetworkAPI.WiFiStatus)
Create an object holding the default WiFi status metrics.

**Kind**: instance method of [<code>NetworkAPI</code>](#NetworkAPI)  
**Returns**: [<code>WiFiStatus</code>](#NetworkAPI.WiFiStatus) - The default WiFi status.  

* * *

<a name="NetworkAPI+addWiFiStatusObserver"></a>

### networkAPI.addWiFiStatusObserver(observer, [notifyAll])
Add an observer to be notified when the browser's WiFi status has changed.
The provided callback is triggered immediately with the browser's current
WiFi status (if it has one).

**Kind**: instance method of [<code>NetworkAPI</code>](#NetworkAPI)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| observer | [<code>WifiStatusChangedCallback</code>](#NetworkAPI.WifiStatusChangedCallback) |  | Callback triggered        when the browser's WiFi status has changed. |
| [notifyAll] | <code>boolean</code> | <code>false</code> | Whether to be notified of all WiFi        networks discovered by the browser, or only the currently connected        WiFi network. |


* * *

<a name="NetworkAPI+updateWiFiStatus"></a>

### networkAPI.updateWiFiStatus()
Request the browser for an updated WiFi status. When results are available,
all [registered observers](#NetworkAPI+addWiFiStatusObserver) will be
notified.

**Kind**: instance method of [<code>NetworkAPI</code>](#NetworkAPI)  

* * *

<a name="NetworkAPI.WiFiStatus"></a>

### NetworkAPI.WiFiStatus : <code>object</code>
An object containing metrics about a WiFi network the browser has discovered.
If the system the browser is running on does not support all metrics, they
will be 0 (signalLevel) or -1 (rxMbps / txMbps).

**Kind**: static typedef of [<code>NetworkAPI</code>](#NetworkAPI)  
**See**

- [https://developer.android.com/reference/android/net/wifi/WifiInfo](https://developer.android.com/reference/android/net/wifi/WifiInfo)
- [https://developer.apple.com/documentation/corewlan/cwnetwork](https://developer.apple.com/documentation/corewlan/cwnetwork)
- [https://docs.microsoft.com/en-us/windows/win32/api/wlanapi/](https://docs.microsoft.com/en-us/windows/win32/api/wlanapi/)

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| ssid | <code>string</code> | The service set identifier (SSID) of the WiFi           network. |
| bssid | <code>string</code> | The basic service set identifier (BSSID) of the           WiFi access point. |
| connectionState | <code>string</code> | The WiFi network's current connection           state (one of "Connected", "Connecting", "NotConnected"). |
| rssi | <code>number</code> | The received signal strength indicator of the           network, in dBm. Will typically be on a scale of -100 (worst           strength) to 0 (best strength). |
| signalLevel | <code>number</code> | The RSSI signal quality rating using the           system's RSSI quality rating thresholds. Will typically be on a           scale of 0 (worst strength) to `maxSignalLevel` (best strength). |
| maxSignalLevel | <code>number</code> | The system's maximum signal level. |
| frequency | <code>number</code> | The network channel's band, in MHz. |
| linkSpeed | <code>number</code> | The current link speed, in Mbps. |
| rxMbps | <code>number</code> | The current receive link speed, in Mbps. |
| txMbps | <code>number</code> | The current transmit link speed, in Mbps. |
| maxRxMbps | <code>number</code> | The maximum supported receive link speed, in           Mbps. |
| maxTxMbps | <code>number</code> | The maximum supported transmit link speed, in           Mbps. |
| noiseMeasurement | <code>number</code> | The current aggregate noise measurement           for the network, in dBm. |


* * *

<a name="NetworkAPI.WifiStatusChangedCallback"></a>

### NetworkAPI.WifiStatusChangedCallback : <code>function</code>
Callback triggered when browser's WiFi status has changed.

The parameter provided to the callback depends on how the callback was
[registered](#NetworkAPI+addWiFiStatusObserver). If requested to be
notified about all networks, then the provided parameter will be a list of
all WiFi networks discovered by the browser. Otherwise, it will be the
currently connected WiFi network (if there is one).

**Kind**: static typedef of [<code>NetworkAPI</code>](#NetworkAPI)  

| Param | Type | Description |
| --- | --- | --- |
| status | [<code>Array.&lt;WiFiStatus&gt;</code>](#NetworkAPI.WiFiStatus) \| [<code>WiFiStatus</code>](#NetworkAPI.WiFiStatus) | A list of all        discovered WiFi networks, or the currently connected WiFi network. |


* * *

