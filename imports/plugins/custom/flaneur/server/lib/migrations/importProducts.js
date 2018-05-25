/**
 * @file
 * Import 2 product - Duvet Covers & Sateen Sheets
 */
import { Reaction } from "/server/api";
import { Products } from '/lib/collections';
import { Fixture } from "/server/api/core/importer";

export default function importProducts() {
  if (Products.find({ type: 'simple' }).count() < 2) {
    console.log('Importing Duvet Covers & Sateen Sheets products');
    Products.remove({}, { multi: true });
  } else {
    return;
  }

  Fixture.process(Assets.getText("custom/data/Products.json"), ["title"], Reaction.Importer.product);
}
