const { pubsub, getConnection } = require('../../../slack/connection');
const slackMessageMap = require('../data-mappings/message');

const { socketModeClient } = getConnection();

const TOPIC = 'messageAdded';

async function onMessageHandler(response) {
  await response.ack();

  const slackEvent = response.body.event;

  if(slackEvent && slackEvent.type === 'message') {
    if (slackEvent.subtype) {
      return;
    }

    await pubsub.publish(TOPIC, {
      [TOPIC]: slackMessageMap(response.event),
      channelId: response.event.channel
    });
  }
}

socketModeClient.on('message', onMessageHandler);

module.exports = {
  subscribe: () => pubsub.asyncIterator(TOPIC)
};
