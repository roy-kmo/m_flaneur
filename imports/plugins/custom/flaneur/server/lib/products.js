/**
 * @file
 * Product-related functions
 */

import { Tags, Products } from '/lib/collections';

// Tag slugs to exclude products from PDP nav tabs
const pdpTabsExcludedTags = [
  'capsule',
  'bundle',
  'swatchbox'
];

/**
 * Returns a list of products to display in the PDP navigation tabs.
 * Excludes products tagged with pdpTabsExcludedTags defined above.
 *
 * @returns {Array} of product docs
 */
export function getProductTabList () {
  const excludedTags = Tags.find({
    slug: {
      $in: pdpTabsExcludedTags
    }
  });
  const excludedTagIds = excludedTags.map(tag => tag._id);

  return Products.find({
    type: 'simple',
    isVisible: true,
    isDeleted: { $ne: true },
    hashtags: {
      $nin: excludedTagIds
    }
  }, {
    fields: {
      title: 1,
      handle: 1
    }
  }, {
    sort: {
      title: 1
    }
  }).fetch();
}
