import { meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Server } from '/server/api';
import { FileRecord } from "@reactioncommerce/file-collections";
import { Media } from "/imports/plugins/core/files/server";

Meteor.methods({
  'Flaneur.uploadFile' (fileInfo, fileData) {
    check(fileInfo, Object);
    check(fileData, String);
    console.log('here');
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
  }
});
