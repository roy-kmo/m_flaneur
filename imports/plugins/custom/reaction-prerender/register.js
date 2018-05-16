import { Meteor } from 'meteor/meteor';
import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: 'Prerender',
  name: 'reaction-prerender',
  icon: 'fa fa-building',
  autoEnable: true,
  settings: {
    prerenderPort: 3005,
    // Chrome/Chromium location for prerendering locally
    localChromeLocation: '/chromium/Chromium.app/Contents/MacOS/Chromium',
    prerenderPageLoadTimeout: 30000,
    prerenderWaitAfterLastRequest: 20000,
    prerenderCacheMaxEntries: 100,
    prerenderCacheTTL: 60 * 60 * 24, /* one day */
    // Paths to prerender + class names that when clicked in static HTML,
    // prompt a spinner to appear, and click to be re-triggered after full app is loaded.
    // * as a key is reserved for class names that appear on all pre-rendered pages
    // (like an add to cart or login button in a header).
    prerenderPaths: {
      '*': [
        'cart-icon',
      ],
      '/': [],
      '/tag/*': [],
      '/product/*': [
        'js-add-to-cart'
      ]
    }
  },
  registry: []
});
