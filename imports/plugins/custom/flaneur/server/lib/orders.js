/**
 * @file
 * Order-related functions
 */

import { Meteor } from 'meteor/meteor';
import { SSR } from "meteor/meteorhacks:ssr";
import { Reaction } from '/server/api';
import { Orders, Shops } from '/lib/collections';

/**
 * Marks an order as acknowledged (set order.workflow.status).
 *
 * @param {String} id of order
 */
export function acknowledgeOrder (id) {
  const status = 'acknowledged'
  Orders.update(id, {
    $set: {
      'workflow.status': status
    },
    $push: {
      'workflow.workflow': status
    }
  });
}

/**
 * Sends an email to customer that Flaneur has acknowledged their order.
 *
 * @param {Object} order
 */
export function sendOrderAcknowledgmentEmail (order) {
  const shop = Shops.findOne(order.shopId);

  const tpl = "flaneurOrders/acknowledged";
  const subject = "flaneurOrders/acknowledged/subject";

  SSR.compileTemplate(tpl, Reaction.Email.getTemplate(tpl));
  SSR.compileTemplate(subject, Reaction.Email.getSubject(tpl));

  const emailLogo = Reaction.Email.getShopLogo(shop);
  const emailData = {
    shop,
    order,
    emailLogo
  };

  Reaction.Email.send({
    to: order.email,
    from: `${shop.name} <${shop.emails[0].address}>`,
    subject: SSR.render(subject, emailData),
    html: SSR.render(tpl, emailData)
  });
}

/**
 * Toggles an order being in 'exception' status. If exception is being removed,
 * sets order back to last non-exception status.
 *
 * @param {Object} order
 * @param {String} order._id
 * @param {Array} order.workflow
 */
export function toggleOrderException ({ _id, workflow }) {
  const { status } = workflow;
  const exceptionStatus = 'exception';
  const isException = status === exceptionStatus;
  const lastWorkflowStatus = workflow.workflow[workflow.workflow.length - 1];

  // Determine last status that wasn't an exception
  let lastNonExceptionStatus = '';
  workflow.workflow.forEach(status =>  {
    if (status !== exceptionStatus) {
      lastNonExceptionStatus = status;
    }
  });

  const nextWorkflowStatus = isException && lastNonExceptionStatus || exceptionStatus;

  Orders.update(_id, {
    $set: {
      'workflow.status': nextWorkflowStatus
    },
    $push: {
      'workflow.workflow': nextWorkflowStatus
    }
  });
}

/**
 * Returns the given order's admin notes
 *
 * @param {Object} order
 * @param {Array} order.flaneurNotes
 */
export function getOrderNotes ({ flaneurNotes }) {
  return flaneurNotes || [];
}

/**
 * Adds a note to the admin-level order notes.
 *
 * @param {String} orderId
 * @param {String} userId
 * @param {STring} text
 */
export function addOrderNote (orderId, userId, text) {
  const user = Meteor.users.findOne(userId, { fields: { _id: 1, name: 1 }});
  const note = {
    text,
    userId: user._id,
    userName: user.name,
    createdAt: new Date()
  };

  Orders.update(orderId, {
    $push: {
      flaneurNotes: {
        $each: [note],
        $position: 0
      }
    }
  });

  return note;
}
