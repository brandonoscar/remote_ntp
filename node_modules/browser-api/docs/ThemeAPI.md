<a name="ThemeAPI"></a>

## ThemeAPI
Browser APIs pertaining to the browser and system themes.

**Kind**: global class  

* [ThemeAPI](#ThemeAPI)
    * _instance_
        * [.hasThemeAPI()](#ThemeAPI+hasThemeAPI) ⇒ <code>boolean</code>
        * [.getDefaultBackground()](#ThemeAPI+getDefaultBackground) ⇒ [<code>BackgroundImage</code>](#ThemeAPI.BackgroundImage)
        * [.addThemeObserver(observer)](#ThemeAPI+addThemeObserver)
        * [.showOrHideCustomizeMenu()](#ThemeAPI+showOrHideCustomizeMenu)
    * _static_
        * [.BackgroundImage](#ThemeAPI.BackgroundImage) : <code>object</code>
        * [.Theme](#ThemeAPI.Theme) : <code>object</code>
        * [.ThemeChanged](#ThemeAPI.ThemeChanged) : <code>function</code>


* * *

<a name="ThemeAPI+hasThemeAPI"></a>

### themeAPI.hasThemeAPI() ⇒ <code>boolean</code>
Check whether the browser supports theme customizations.

**Kind**: instance method of [<code>ThemeAPI</code>](#ThemeAPI)  
**Returns**: <code>boolean</code> - True if theme customizations are supported.  

* * *

<a name="ThemeAPI+getDefaultBackground"></a>

### themeAPI.getDefaultBackground() ⇒ [<code>BackgroundImage</code>](#ThemeAPI.BackgroundImage)
Create an object holding the default background image properties.

**Kind**: instance method of [<code>ThemeAPI</code>](#ThemeAPI)  
**Returns**: [<code>BackgroundImage</code>](#ThemeAPI.BackgroundImage) - The default background image.  

* * *

<a name="ThemeAPI+addThemeObserver"></a>

### themeAPI.addThemeObserver(observer)
Add an observer to be notified when the browser or system theme has
changed. The provided callback is triggered immediately with the current
theme.

**Kind**: instance method of [<code>ThemeAPI</code>](#ThemeAPI)  

| Param | Type | Description |
| --- | --- | --- |
| observer | [<code>ThemeChanged</code>](#ThemeAPI.ThemeChanged) | Callback triggered when the        browser or system theme has changed. |


* * *

<a name="ThemeAPI+showOrHideCustomizeMenu"></a>

### themeAPI.showOrHideCustomizeMenu()
Show or hide the Customize Chrome side panel.

**Kind**: instance method of [<code>ThemeAPI</code>](#ThemeAPI)  

* * *

<a name="ThemeAPI.BackgroundImage"></a>

### ThemeAPI.BackgroundImage : <code>object</code>
Meta-information about a background image.

**Kind**: static typedef of [<code>ThemeAPI</code>](#ThemeAPI)  
**See**: [https://github.com/chromium/chromium/blob/80.0.3987.0/chrome/browser/search/background/ntp_background_data.h#L55](https://github.com/chromium/chromium/blob/80.0.3987.0/chrome/browser/search/background/ntp_background_data.h#L55)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| imageUrl | <code>string</code> | URL of the image. |
| imageAlignment | <code>string</code> | The CSS background-position image style. |
| imageTiling | <code>string</code> | The CSS background-repeat image style. |
| thumbnailUrl | <code>string</code> | URL of a thumbnail for the image. |
| attributionLine1 | <code>string</code> | First line of any attribution for the           image, possibly empty. |
| attributionLine2 | <code>string</code> | Second line of any attribution for the           image, possibly empty. |
| attributionUrl | <code>string</code> | A URL to find out more about the image,           possibly empty. |
| attributionImageUrl | <code>string</code> | URL of the attribution image,           possibly empty. |


* * *

<a name="ThemeAPI.Theme"></a>

### ThemeAPI.Theme : <code>object</code>
Object defining the system' and user's theme.

**Kind**: static typedef of [<code>ThemeAPI</code>](#ThemeAPI)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| darkModeEnabled | <code>boolean</code> | The system's dark mode preference. |
| background | [<code>BackgroundImage</code>](#ThemeAPI.BackgroundImage) | The background image chosen           by the user, if any. |


* * *

<a name="ThemeAPI.ThemeChanged"></a>

### ThemeAPI.ThemeChanged : <code>function</code>
Callback triggered when browser or system theme has changed.

**Kind**: static typedef of [<code>ThemeAPI</code>](#ThemeAPI)  

| Param | Type | Description |
| --- | --- | --- |
| theme | [<code>Theme</code>](#ThemeAPI.Theme) | The newly applied theme. |


* * *

