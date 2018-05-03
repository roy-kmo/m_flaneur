import { BrowserPolicy } from "meteor/browser-policy-common";

import './methods/flaneurMethods';
import './init';
import '../lib/schemas/productsSchema';

BrowserPolicy.content.allowOriginForAll("https://widget.intercom.io:*");
BrowserPolicy.content.allowOriginForAll("https://js.intercomcdn.com:*");
BrowserPolicy.content.allowOriginForAll("https://static.intercomassets.com:*");
