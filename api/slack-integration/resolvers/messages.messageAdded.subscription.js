const { pubsub, getConnection } = require('../../../slack/connection');
const slackMessageMap = require('../data-mappings/message');

const { rtmAPI: rtm } = getConnection();

const TOPIC = 'messageAdded';

function onMessageHandler(messageData) {
  pubsub.publish(TOPIC, {
    [TOPIC]: slackMessageMap(messageData)
  });
}

rtm.on('message', onMessageHandler);

module.exports = {
  subscribe: () => pubsub.asyncIterator(TOPIC)
};
