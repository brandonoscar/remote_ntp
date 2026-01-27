<a name="AutocompleteAPI"></a>

## AutocompleteAPI
Browser APIs pertaining to search and autocomplete.

**Kind**: global class  

* [AutocompleteAPI](#AutocompleteAPI)
    * _instance_
        * [.addObserver(observer)](#AutocompleteAPI+addObserver)
        * [.query(input, preventInlineAutocomplete)](#AutocompleteAPI+query)
        * [.stop()](#AutocompleteAPI+stop)
        * [.openMatch(index, url, middleButton, altKey, ctrlKey, metaKey, shiftKey)](#AutocompleteAPI+openMatch)
    * _static_
        * [.AutocompleteClassification](#AutocompleteAPI.AutocompleteClassification) : <code>object</code>
        * [.AutocompleteMatch](#AutocompleteAPI.AutocompleteMatch) : <code>object</code>
        * [.AutocompleteResultChangedCallback](#AutocompleteAPI.AutocompleteResultChangedCallback) : <code>function</code>


* * *

<a name="AutocompleteAPI+addObserver"></a>

### autocompleteAPI.addObserver(observer)
Add an observer to be notified when a search's autocomplete results have
changed.

**Kind**: instance method of [<code>AutocompleteAPI</code>](#AutocompleteAPI)  

| Param | Type | Description |
| --- | --- | --- |
| observer | [<code>AutocompleteResultChangedCallback</code>](#AutocompleteAPI.AutocompleteResultChangedCallback) | Callback triggered when a search's autocomplete result has changed. |


* * *

<a name="AutocompleteAPI+query"></a>

### autocompleteAPI.query(input, preventInlineAutocomplete)
Request the browser for a set of autocomplete matches for a user-specified
search query. When results are available, all
[registered observers](#AutocompleteAPI+addObserver) will be notified.

**Kind**: instance method of [<code>AutocompleteAPI</code>](#AutocompleteAPI)  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> | String to request autocomplete results for. |
| preventInlineAutocomplete | <code>boolean</code> | Inform the browser that the        autocomplete result should not contain inline matches. This should        primarily be set to to true in cases such as the user deleted text        from the search input. |


* * *

<a name="AutocompleteAPI+stop"></a>

### autocompleteAPI.stop()
If an autocomplete query is ongoing, cancel the request. Note that there is
no guarantee the ongoing request is cancelled before the
[registered observers](#AutocompleteAPI+addObserver) are notified.

**Kind**: instance method of [<code>AutocompleteAPI</code>](#AutocompleteAPI)  

* * *

<a name="AutocompleteAPI+openMatch"></a>

### autocompleteAPI.openMatch(index, url, middleButton, altKey, ctrlKey, metaKey, shiftKey)
Attempt to navigate to a specific autocomplete match.

This is done via a browser API (rather than a simple href) because the
browser may update the match URL with parameters that were not available
when the match was generated. These are namely time-based parameters.

**Kind**: instance method of [<code>AutocompleteAPI</code>](#AutocompleteAPI)  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | Index of the match in autocomplete matches array. |
| url | <code>string</code> | URL of the match to open. This is redundant with        index, but is used as a final check for stale/malicious results. |
| middleButton | <code>boolean</code> | Whether the user's middle mouse button was        pressed to navigate to the match. If true, will open the match in a        new tab. |
| altKey | <code>boolean</code> | Whether the user's Alt key was pressed when the        match was selected. |
| ctrlKey | <code>boolean</code> | Whether the user's Control key was pressed when        the match was selected. If true, will open the match in a new tab        (Windows or Linux), or will defer the click to the OS (macOS). |
| metaKey | <code>boolean</code> | Whether the user's Meta key was pressed when the        match was selected. If true, will open the match in a new tab        (macOS), or will defer the click to the OS (Windows or Linux). |
| shiftKey | <code>boolean</code> | Whether the user's Shift key was pressed when        the match was selected. If true, will open the match in a new        window. |


* * *

<a name="AutocompleteAPI.AutocompleteClassification"></a>

### AutocompleteAPI.AutocompleteClassification : <code>object</code>
Autocomplete matches contain text spans that should be classified according
to the below list of styles. Each classification contains an offset into the
text at which the classification starts and a bitmask of styles that should
be applied to that section of text.

<table>
 <thead>
   <tr>
     <th>Style</th>
     <th>Description</th>
     <th>Value</th>
   </tr>
 </thead>
 <tbody>
   <tr>
     <td>None</td>
     <td>No style should be applied</td>
     <td><code>0</code></td>
   </tr>
   <tr>
     <td>URL</td>
     <td>The text is a URL</td>
     <td><code>1 << 1</code></td>
   </tr>
   <tr>
     <td>Match</td>
     <td>Match for the user's search term</td>
     <td><code>1 << 2</code></td>
   </tr>
   <tr>
     <td>Dim</td>
     <td>Helper or descriptive text</td>
     <td><code>1 << 3</code></td>
   </tr>
 </tbody>
</table>

**Kind**: static typedef of [<code>AutocompleteAPI</code>](#AutocompleteAPI)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| offset | <code>number</code> | Position in the text this classification starts. |
| style | <code>number</code> | Bitmask of styles to apply to this classification. |


* * *

<a name="AutocompleteAPI.AutocompleteMatch"></a>

### AutocompleteAPI.AutocompleteMatch : <code>object</code>
A single autocomplete match for a search query. Contains information on the
match itself (e.g. the URL and text of the match) and details on how the
match should be displayed to the user.

There is abundant documentation in Chromium (link below) on these details.
Developers should read that documentation before using this API.

**Kind**: static typedef of [<code>AutocompleteAPI</code>](#AutocompleteAPI)  
**See**: [https://github.com/chromium/chromium/blob/80.0.3987.0/components/omnibox/browser/autocomplete_match.h](https://github.com/chromium/chromium/blob/80.0.3987.0/components/omnibox/browser/autocomplete_match.h)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| contents | <code>string</code> | The text to display for the autocomplete match. |
| contentsClass | [<code>Array.&lt;AutocompleteClassification&gt;</code>](#AutocompleteAPI.AutocompleteClassification) | List           of style classifications for the contents string. |
| description | <code>string</code> | Additional helper text for the match, e.g. a title or description. |
| descriptionClass | [<code>Array.&lt;AutocompleteClassification&gt;</code>](#AutocompleteAPI.AutocompleteClassification) | List of style classifications for the description string. |
| destinationUrl | <code>string</code> | URL to navigate to when the user selects this match. |
| type | <code>string</code> | Type of the match result. |
| isSearchType | <code>boolean</code> | Whether the match type is a search result (as opposed to a URL). |
| fillIntoEdit | <code>string</code> | Text to display when this match is selected via arrow/tab keys. |
| inlineAutocompletion | <code>string</code> | Text to display after the user's cursor while typing. |
| allowedToBeDefaultMatch | <code>boolean</code> | Whether the match can be the default match. |


* * *

<a name="AutocompleteAPI.AutocompleteResultChangedCallback"></a>

### AutocompleteAPI.AutocompleteResultChangedCallback : <code>function</code>
Callback triggered when a search's autocomplete results have changed.

**Kind**: static typedef of [<code>AutocompleteAPI</code>](#AutocompleteAPI)  

| Param | Type | Description |
| --- | --- | --- |
| result | <code>object</code> | Object containing the autocomplete result. |
| result.input | <code>string</code> | Search query which generated the result. |
| result.matches | [<code>Array.&lt;AutocompleteMatch&gt;</code>](#AutocompleteAPI.AutocompleteMatch) | List of matches. |


* * *

