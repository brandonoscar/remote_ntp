<a name="BrowserAPI"></a>

## BrowserAPI
Library for accessing APIs embedded by Rebel Browser under the object
<code>window.rebel</code>.

**Kind**: global class  

* * *

<a name="BrowserAPI+loadInternalUrl"></a>

### browserAPI.loadInternalUrl(url) ⇒ <code>boolean</code>
Load a native chrome:// URL. URLs that cause the browser to crash (e.g.
chrome://crash) are forbidden.

**Kind**: instance method of [<code>BrowserAPI</code>](#BrowserAPI)  
**Returns**: <code>boolean</code> - Whether the provided URL is a valid chrome:// URL.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | URL with a chrome:// protocol to load. |


* * *

