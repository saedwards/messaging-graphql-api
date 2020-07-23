const { Message } = require('../../messages/message.model');

module.exports = function slackMessageMap(messageData, { user } = {}) {
  return new Message(
    messageData.ts,
    messageData.user,
    messageData.text,
    {
      fromYou: !!messageData.bot_id,

      /**
       * Slack appends an ordering integer at the end of the timestamp that
       * we need to remove to correctly format the message time.
       */
      timestamp: messageData.ts.split('.')[0],
      user
    }
  );
};
