import { meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Server } from '/server/api';
import { FileRecord } from "@reactioncommerce/file-collections";
import { Media } from "/imports/plugins/core/files/server";
import { Assets } from '/lib/collections';
import { Reaction } from '/server/api';

Meteor.methods({
  'Flaneur.uploadFile' (fileInfo, fileData) {
    check(fileInfo, Object);
    check(fileData, String);
    const fileRecord = new FileRecord({
      original: {
        name: fileInfo.name,
        size: fileInfo.size,
        type: fileInfo.type,
        updatedAt: new Date()
      }
    });
    fileRecord.attachData(new Buffer(fileData, 'binary'));

    return Media.insert(fileRecord);
  },

  'Flaneur.getFeatureLine' () {
    const asset = Assets.findOne({ name: 'headerFeatureLine' });
    if (!asset) {
      return {
        content: '',
        isEnabled: false
      };
    }

    const content = JSON.parse(asset.content);
    return {
      content: content.content,
      isEnabled: content.isEnabled
    };
  },

  'Flaneur.updateFeatureLine' (data) {
    check(data, Object);
    const {
      content,
      isEnabled
    } = data;
    check(content, String);
    check(isEnabled, Boolean);

    const assetContent = { content, isEnabled };

    if (!this.userId) {
      throw new Meteor.Error(401, 'Unauthorized');
    }

    if (Reaction.hasAdminAccess() === false) {
      throw new Meteor.Error(403, 'You do not have admin permissions');
    }

    const assetContentStr = JSON.stringify(assetContent);
    const name = 'headerFeatureLine';
    const existing = Assets.findOne({ name });

    if (existing) {
      Assets.update({ name }, {
        $set: {
          content: assetContentStr
        }
      });
    } else {
      Assets.insert({
        name,
        type: 'setting',
        content: assetContentStr
      });
    }
  }
});
