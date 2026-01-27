<a name="TilesAPI"></a>

## TilesAPI
Browser APIs pertaining to the browser's New Tab Page tiles.

**Kind**: global class  

* [TilesAPI](#TilesAPI)
    * _instance_
        * [.addObserver(observer)](#TilesAPI+addObserver)
        * [.addTile(url, title)](#TilesAPI+addTile)
        * [.removeTile(url)](#TilesAPI+removeTile)
        * [.editTile(oldUrl, newUrl, newTitle)](#TilesAPI+editTile)
    * _static_
        * [.Tile](#TilesAPI.Tile) : <code>object</code>
        * [.TilesChangedCallback](#TilesAPI.TilesChangedCallback) : <code>function</code>


* * *

<a name="TilesAPI+addObserver"></a>

### tilesAPI.addObserver(observer)
Add an observer to be notified when the browser's New Tab Page tiles have
changed. If available, the provided callback is triggered immediately with
browser's current New Tab Page tiles.

**Kind**: instance method of [<code>TilesAPI</code>](#TilesAPI)  

| Param | Type | Description |
| --- | --- | --- |
| observer | [<code>TilesChangedCallback</code>](#TilesAPI.TilesChangedCallback) | Callback triggered when        the browser's New Tab Page tiles have changed. |


* * *

<a name="TilesAPI+addTile"></a>

### tilesAPI.addTile(url, title)
Add a custom New Tab Page tile to the user's profile. If successful, all
[registered observers](#TilesAPI+addObserver) will be notified.

**Kind**: instance method of [<code>TilesAPI</code>](#TilesAPI)  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | URL of the custom tile to add. |
| title | <code>string</code> | Name that should be displayed with the tile. |


* * *

<a name="TilesAPI+removeTile"></a>

### tilesAPI.removeTile(url)
Remove a custom New Tab Page tile from the user's profile. If successful,
all [registered observers](#TilesAPI+addObserver) will be notified.

**Kind**: instance method of [<code>TilesAPI</code>](#TilesAPI)  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | URL of the custom tile to remove. |


* * *

<a name="TilesAPI+editTile"></a>

### tilesAPI.editTile(oldUrl, newUrl, newTitle)
Edit a custom New Tab Page tile in the user's profile. If successful, all
[registered observers](#TilesAPI+addObserver) will be notified.

**Kind**: instance method of [<code>TilesAPI</code>](#TilesAPI)  

| Param | Type | Description |
| --- | --- | --- |
| oldUrl | <code>string</code> | URL of the custom tile to edit. |
| newUrl | <code>string</code> | New URL of the custom tile. |
| newTitle | <code>string</code> | New title of the custom tile. |


* * *

<a name="TilesAPI.Tile"></a>

### TilesAPI.Tile : <code>object</code>
A single New Tab page tile.

**Kind**: static typedef of [<code>TilesAPI</code>](#TilesAPI)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | URL of the target site. |
| title | <code>string</code> | Name that should be displayed with the tile. |
| favicon_url | <code>string</code> | URL of the favicon for the target site. |


* * *

<a name="TilesAPI.TilesChangedCallback"></a>

### TilesAPI.TilesChangedCallback : <code>function</code>
Callback triggered when browser's New Tab Page tiles have changed.

**Kind**: static typedef of [<code>TilesAPI</code>](#TilesAPI)  

| Param | Type | Description |
| --- | --- | --- |
| tiles | [<code>Array.&lt;Tile&gt;</code>](#TilesAPI.Tile) | The browser's new New Tab Page tiles. |


* * *

