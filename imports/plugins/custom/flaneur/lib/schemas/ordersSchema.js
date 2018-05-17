import SimpleSchema from "simpl-schema";
import { OrderDocument } from '/lib/collections/schemas';

OrderDocument.extend({
  flaneurNotes: {
    type: Array
  },
  'flaneurNotes.$': Object,
  'flaneurNotes.$.userId': String,
  'flaneurNotes.$.userName': String,
  'flaneurNotes.$.text': String,
  'flaneurNotes.$.createdAt': String
});
