import { Meteor } from 'meteor/meteor';
import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "SSR Preview",
  name: "reaction-ssr-preview",
  icon: "fa fa-building",
  autoEnable: true,
  settings: {
  	prerenderPort: 3005,
  	chromeLocation: Meteor.settings.prerenderChromeLocation,
  	prerenderWaitAfterLastRequest: 8000,
  	prerenderCacheMaxEntries: 100,
  	prerenderCacheTTL: 60 * 60 * 24, /* one day */
    prerenderPaths: [
      /^\/$/,
      /\/tag\/*/,
      /\/product\/*/,
    ]
  },
  registry: []
});
