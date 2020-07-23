const Message = require('./message');
const messages = require('./messages.messages.query');
const createMessage = require('./messages.createMessage.mutation');
const messageAdded = require('./messages.messageAdded.subscription');

module.exports = {
  Query: {
    messages
  },

  Mutation: {
    createMessage
  },

  Subscription: {
    messageAdded
  },

  Message
};
