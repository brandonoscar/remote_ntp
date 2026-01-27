# BrowserAPI

BrowserAPI is a set of APIs for accessing data and controls of the Rebel
Browser. The browser exposes controls through the `window.rebel` object. This
library wraps around that object with a friendlier interface than the browser
itself can provide.

## Installing

BrowserAPI is a node package that can be installed with `npm`:

```bash
npm install git+https://github.com/RebelBrowser/browser_api.git
```

## Documentation

API documentation is generated from `jsdoc`-style comments in the API source.
See the [docs](https://rebelbrowser.github.io/browser_api/) page for the latest
documentation.

## Development

To setup the repository, run:

```bash
git clone https://github.com/RebelBrowser/browser_api.git
cd browser_api
npm install
```

Implementations of browser APIs are split by feature. The root
[BrowserAPI](lib/browser_api.js) class is responsible for storing the handle
to `window.rebel`. It also contains APIs that are one-off methods, not tied to a
specific feature.

When creating a new API, consider where the API should be added. If it is
related to an existing feature, it likely belongs in that feature's source file.
If it is an entirely new feature, it belongs in its own implementation file.
One-off, static APIs are fine to add to the root BrowserAPI implementation.

It is required that every public class and method are documented using `jsdoc`
comments. When adding new APIs, or changing existing APIs, be sure to generate
new documentation to be included in your commit. Simple run:

```bash
npm run docs
```

Code should also be formatted before commit:

```bash
npm run format
```

To add new features to the object that is actually exported by this package, see
[index.js](index.js). The gist is to import the new feature at the top of the
file, create an instace of the feature (`new YourFeatureAPI()`) alongside the
existing features, and add a link to the feature's documentation above the
module export.

## Testing

TODO either setup testing framework for development / figure out how to run
RemoteNTP with local version of BrowserAPI.
