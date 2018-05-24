import { Products } from '/lib/collections';
import SimpleSchema from "simpl-schema";
import { Product } from '/lib/collections/schemas';
import { registerSchema } from "@reactioncommerce/schemas";

const ExtendedProductSchema = Product.clone().extend(
  {
    careInstructions: {
      type: String,
      optional: true
    },
    dimensions: {
      type: String,
      optional: true
    }
  }
);

Products.attachSchema(ExtendedProductSchema, { replace: true, selector: { type: 'simple' }});
registerSchema('Product', ExtendedProductSchema);
