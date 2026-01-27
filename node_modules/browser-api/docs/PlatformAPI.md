<a name="PlatformAPI"></a>

## PlatformAPI
Browser APIs pertaining to the browser's platform.

**Kind**: global class  

* [PlatformAPI](#PlatformAPI)
    * [.version](#PlatformAPI+version) : <code>string</code>
    * [.isKnownPlatform()](#PlatformAPI+isKnownPlatform) ⇒ <code>boolean</code>
    * [.isWindows()](#PlatformAPI+isWindows) ⇒ <code>boolean</code>
    * [.isMacOS()](#PlatformAPI+isMacOS) ⇒ <code>boolean</code>
    * [.isLinux()](#PlatformAPI+isLinux) ⇒ <code>boolean</code>
    * [.isAndroid()](#PlatformAPI+isAndroid) ⇒ <code>boolean</code>
    * [.isIOS()](#PlatformAPI+isIOS) ⇒ <code>boolean</code>
    * [.isDesktop()](#PlatformAPI+isDesktop) ⇒ <code>boolean</code>
    * [.isMobile()](#PlatformAPI+isMobile) ⇒ <code>boolean</code>
    * [.hasSystemArchitecture()](#PlatformAPI+hasSystemArchitecture) ⇒ <code>boolean</code>
    * [.is32BitSystem()](#PlatformAPI+is32BitSystem) ⇒ <code>boolean</code>
    * [.is64BitSystem()](#PlatformAPI+is64BitSystem) ⇒ <code>boolean</code>
    * [.hasBrowserArchitecture()](#PlatformAPI+hasBrowserArchitecture) ⇒ <code>boolean</code>
    * [.is32BitBrowser()](#PlatformAPI+is32BitBrowser) ⇒ <code>boolean</code>
    * [.is64BitBrowser()](#PlatformAPI+is64BitBrowser) ⇒ <code>boolean</code>


* * *

<a name="PlatformAPI+version"></a>

### platformAPI.version : <code>string</code>
The browser's four-part version string, e.g. 80.0.3987.28452.

**Kind**: instance property of [<code>PlatformAPI</code>](#PlatformAPI)  

* * *

<a name="PlatformAPI+isKnownPlatform"></a>

### platformAPI.isKnownPlatform() ⇒ <code>boolean</code>
Check if the system on which the browser is a known platform.

**Kind**: instance method of [<code>PlatformAPI</code>](#PlatformAPI)  
**Returns**: <code>boolean</code> - True if the system is a known platform.  

* * *

<a name="PlatformAPI+isWindows"></a>

### platformAPI.isWindows() ⇒ <code>boolean</code>
Check if the system on which the browser is running is an Windows platform.

**Kind**: instance method of [<code>PlatformAPI</code>](#PlatformAPI)  
**Returns**: <code>boolean</code> - True if the system is an Windows platform.  

* * *

<a name="PlatformAPI+isMacOS"></a>

### platformAPI.isMacOS() ⇒ <code>boolean</code>
Check if the system on which the browser is running is an macOS platform.

**Kind**: instance method of [<code>PlatformAPI</code>](#PlatformAPI)  
**Returns**: <code>boolean</code> - True if the system is an macOS platform.  

* * *

<a name="PlatformAPI+isLinux"></a>

### platformAPI.isLinux() ⇒ <code>boolean</code>
Check if the system on which the browser is running is an Linux platform.

**Kind**: instance method of [<code>PlatformAPI</code>](#PlatformAPI)  
**Returns**: <code>boolean</code> - True if the system is an Linux platform.  

* * *

<a name="PlatformAPI+isAndroid"></a>

### platformAPI.isAndroid() ⇒ <code>boolean</code>
Check if the system on which the browser is running is an Android platform.

**Kind**: instance method of [<code>PlatformAPI</code>](#PlatformAPI)  
**Returns**: <code>boolean</code> - True if the system is an Android platform.  

* * *

<a name="PlatformAPI+isIOS"></a>

### platformAPI.isIOS() ⇒ <code>boolean</code>
Check if the system on which the browser is running is an iOS platform.

**Kind**: instance method of [<code>PlatformAPI</code>](#PlatformAPI)  
**Returns**: <code>boolean</code> - True if the system is an iOS platform.  

* * *

<a name="PlatformAPI+isDesktop"></a>

### platformAPI.isDesktop() ⇒ <code>boolean</code>
Check if the system on which the browser is running is a desktop platform.

**Kind**: instance method of [<code>PlatformAPI</code>](#PlatformAPI)  
**Returns**: <code>boolean</code> - True if the system is a desktop platform.  

* * *

<a name="PlatformAPI+isMobile"></a>

### platformAPI.isMobile() ⇒ <code>boolean</code>
Check if the system on which the browser is running is a mobile platform.

**Kind**: instance method of [<code>PlatformAPI</code>](#PlatformAPI)  
**Returns**: <code>boolean</code> - True if the system is a mobile platform.  

* * *

<a name="PlatformAPI+hasSystemArchitecture"></a>

### platformAPI.hasSystemArchitecture() ⇒ <code>boolean</code>
Check if the browser knows the architecture of the system it is running on.

**Kind**: instance method of [<code>PlatformAPI</code>](#PlatformAPI)  
**Returns**: <code>boolean</code> - True if the system architecture is known.  

* * *

<a name="PlatformAPI+is32BitSystem"></a>

### platformAPI.is32BitSystem() ⇒ <code>boolean</code>
Check if the browser is running on a 32-bit system.

**Kind**: instance method of [<code>PlatformAPI</code>](#PlatformAPI)  
**Returns**: <code>boolean</code> - True if the system's architecture is 32-bit.  

* * *

<a name="PlatformAPI+is64BitSystem"></a>

### platformAPI.is64BitSystem() ⇒ <code>boolean</code>
Check if the browser is running on a 64-bit system.

**Kind**: instance method of [<code>PlatformAPI</code>](#PlatformAPI)  
**Returns**: <code>boolean</code> - True if the system's architecture is 64-bit.  

* * *

<a name="PlatformAPI+hasBrowserArchitecture"></a>

### platformAPI.hasBrowserArchitecture() ⇒ <code>boolean</code>
Check if the browser knows its own architecture.

**Kind**: instance method of [<code>PlatformAPI</code>](#PlatformAPI)  
**Returns**: <code>boolean</code> - True if the browser's architecture is known.  

* * *

<a name="PlatformAPI+is32BitBrowser"></a>

### platformAPI.is32BitBrowser() ⇒ <code>boolean</code>
Check if the browser is a 32-bit application.

**Kind**: instance method of [<code>PlatformAPI</code>](#PlatformAPI)  
**Returns**: <code>boolean</code> - True if the browser's architecture is 32-bit.  

* * *

<a name="PlatformAPI+is64BitBrowser"></a>

### platformAPI.is64BitBrowser() ⇒ <code>boolean</code>
Check if the browser is a 64-bit application.

**Kind**: instance method of [<code>PlatformAPI</code>](#PlatformAPI)  
**Returns**: <code>boolean</code> - True if the browser's architecture is 64-bit.  

* * *

