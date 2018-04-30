import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Reaction } from '/server/api';
import { Colors } from '../../lib/collections';

const validateColor = function ({
  name,
  description,
  pantoneCode,
  hexCode
}) {
  check(name, String);
  check(description, String);
  check(pantoneCode, String);
  check(hexCode, String);

  if (name === '') {
    throw new Meteor.Error(400, 'Name is required');
  }
  if (pantoneCode === '') {
    throw new Meteor.Error(400, 'Pantone Code is required');
  }
  if (hexCode === '') {
    throw new Meteor.Error(400, 'HEX Code is required');
  }
}

Meteor.methods({
  'Colors.create' (fields) {
    check(fields, Object);
    const {
      name,
      description,
      pantoneCode,
      hexCode
    } = fields;

    validateColor({ name, description, pantoneCode, hexCode });

    if (!this.userId) {
      throw new Meteor.Error(401, 'Unauthorized');
    }

    if (Reaction.hasAdminAccess() === false) {
      throw new Meteor.Error(403, 'You do not have admin permissions');
    }

    const existingByName = Colors.findOne({ name }, { fields: { _id: 1 }});
    if (existingByName) {
      throw new Meteor.Error(400, 'A color with the name you specified already exists');
    }
    const existingByPantone = Colors.findOne({ pantoneCode }, { fields: { _id: 1 }});
    if (existingByPantone) {
      throw new Meteor.Error(400, 'A color with the pantone code you specified already exists');
    }
    const existingByHex = Colors.findOne({ hexCode }, { fields: { _id: 1 }});
    if (existingByHex) {
      throw new Meteor.Error(400, 'A color with the HEX code you specified already exists');
    }

    Colors.insert({
      name,
      description,
      pantoneCode,
      hexCode,
      createdAt: new Date()
    });
  },

  'Colors.update' (fields) {
    check(fields, Object);
    const {
      _id,
      name,
      description,
      pantoneCode,
      hexCode
    } = fields;

    validateColor({ name, description, pantoneCode, hexCode });

    if (!this.userId) {
      throw new Meteor.Error(401, 'Unauthorized');
    }

    if (Reaction.hasAdminAccess() === false) {
      throw new Meteor.Error(403, 'You do not have admin permissions');
    }

    if (_id === '') {
      throw new Meteor.Error(400, 'No _id supplied');
    }

    const color = Colors.findOne(_id);
    if (!color) {
      throw new Meteor.Error(404, 'Color not found');
    }

    const idSelector = {
      _id: {
        $ne: _id
      }
    };
    const existingByName = Colors.findOne({ name, ... idSelector}, { fields: { _id: 1 }});
    if (existingByName) {
      throw new Meteor.Error(400, 'A color with the name you specified already exists');
    }
    const existingByPantone = Colors.findOne({ pantoneCode, ... idSelector }, { fields: { _id: 1 }});
    if (existingByPantone) {
      throw new Meteor.Error(400, 'A color with the pantone code you specified already exists');
    }
    const existingByHex = Colors.findOne({ hexCode, ... idSelector }, { fields: { _id: 1 }});
    if (existingByHex) {
      throw new Meteor.Error(400, 'A color with the HEX code you specified already exists');
    }

    Colors.update(_id, {
      name,
      description,
      pantoneCode,
      hexCode,
      updatedAt: new Date()
    });
  },

  'Colors.delete' (_id) {
    check(_id, String);

    if (!this.userId) {
      throw new Meteor.Error(401, 'Unauthorized');
    }

    if (Reaction.hasAdminAccess() === false) {
      throw new Meteor.Error(403, 'You do not have admin permissions.');
    }

    if (_id === '') {
      throw new Meteor.Error(400, 'No _id supplied');
    }

    Colors.remove(_id);
  }
});
