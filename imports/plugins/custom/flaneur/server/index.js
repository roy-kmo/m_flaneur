import { BrowserPolicy } from "meteor/browser-policy-common";

import './methods/flaneurMethods';
import './methods/coreMethods';
import './init';
import '../lib/schemas/productsSchema';
import '../lib/schemas/ordersSchema';
import '../lib/schemas/cartItemSchema';

BrowserPolicy.content.allowOriginForAll("https://widget.intercom.io:*");
BrowserPolicy.content.allowOriginForAll("https://js.intercomcdn.com:*");
BrowserPolicy.content.allowOriginForAll("https://static.intercomassets.com:*");
BrowserPolicy.content.allowOriginForAll("https://aktively.us3.list-manage.com:*");
BrowserPolicy.content.allowOriginForAll("https://fr-assets.com:*");
BrowserPolicy.content.allowOriginForAll("https://chimpstatic.com:*");

const absoluteUrl = Meteor.absoluteUrl().slice(0, -1);
if (absoluteUrl.includes('localhost') === false) {
  BrowserPolicy.content.allowOriginForAll(`${absoluteUrl}:*`);
}
