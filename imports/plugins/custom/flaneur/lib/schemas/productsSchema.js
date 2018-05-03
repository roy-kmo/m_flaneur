import { Products } from '/lib/collections';
import SimpleSchema from "simpl-schema";
import { Product } from '/lib/collections/schemas';

Product.extend({
  careInstructions: {
    type: String,
    optional: true
  },
  dimensions: {
    type: String,
    optional: true
  }
});
