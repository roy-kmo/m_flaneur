/**
 * Delete this package in Packages collection so that each time RC restarts
 * Reaction.registerPackage() will be called again
 */

import { Reaction, Hooks } from '/server/api';
import { Packages } from "/lib/collections";
import importColors from './lib/migrations/importColors';
import configureStripe from './lib/config/configureStripe';

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
