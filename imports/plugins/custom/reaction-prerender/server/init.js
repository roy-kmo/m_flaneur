import { Reaction, Hooks } from '/server/api';
import { Packages } from "/lib/collections";

const refreshPackage = function () {
  console.log('Refreshing prerender settings');

  const shopId = Reaction.getShopId();

  Packages.remove({
    name: 'reaction-prerender',
    shopId
  });
};

Hooks.Events.add('onCoreInit', function () {
  refreshPackage();
});
