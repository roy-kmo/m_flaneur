import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Pages = new Mongo.Collection('Pages');

Pages.schema = new SimpleSchema({
  title: {
    type: String
  },
  path: {
    type: String
  },
  isPublished: {
    type: String,
    optional: true
  },
  body: {
    type: String,
    optional: true
  },
  createdAt: {
    type: Date,
    optional: true
  },
  updatedAt: {
    type: Date,
    optional: true
  }
});

export default Pages;
