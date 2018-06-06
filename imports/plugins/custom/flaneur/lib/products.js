/**
 * @file
 * Product-related helper functions
 */

import { Tags } from '/lib/collections';

/**
 * Determines whether the given product has been tagged with "Capsule".
 *
 * @param {Object} product
 *
 * @returns {Boolean}
 */
export function isProductCapsule (product) {
  let isCapsule = false;
  const allTags = Tags.find().fetch();
  const capsuleTag = allTags.find(tag => tag.slug === 'capsule');
  const productTagIds = product.hashtags || [];
  capsuleTag && productTagIds.forEach(tagId => {
    if (tagId === capsuleTag._id) {
      isCapsule = true;
    }
  });
  return isCapsule;
}
