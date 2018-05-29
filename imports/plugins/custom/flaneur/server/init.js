/**
 * Delete this package in Packages collection so that each time RC restarts
 * Reaction.registerPackage() will be called again
 */

import { Reaction, Hooks } from '/server/api';
import { Packages } from "/lib/collections";
import importColors from './lib/migrations/importColors';
import setColorSlugs from './lib/migrations/setColorSlugs';
import importProducts from './lib/migrations/importProducts';
import configureStripe from './lib/config/configureStripe';
import FlaneurProductLayout from '../lib/layouts/FlaneurProductLayout';

const deleteThisPackage = function () {
  console.log('Refreshing flaneur package registry');

  const shopId = Reaction.getShopId();

  Packages.remove({
    name: 'flaneur',
    shopId
  });
};

Hooks.Events.add('onCoreInit', function () {
  deleteThisPackage();
  importColors();
  setColorSlugs();
  importProducts();
  configureStripe();
});

// Register custom order acknowledgement email template
Reaction.registerTemplate({
  title: "Orders - Acknowledged",
  name: 'flaneurOrders/acknowledged',
  type: "email",
  template: Assets.getText('custom/email/orders/acknowledged.html'),
  subject: 'Flaneur has started to dye your beddings'
});

// Register custom product detail layout, based on default "simple" layout
Reaction.registerTemplate({
  name: "productDetailSimple",
  title: "Product Detail Simple Layout",
  type: 'react',
  templateFor: ['pdp'],
  permissions: ['admin', 'owner'],
  audience: ['anonymous', 'guest'],
  template: FlaneurProductLayout()
});
