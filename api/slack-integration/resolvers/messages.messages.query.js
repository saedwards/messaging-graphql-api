const slackMessageMap = require('../../slack-integration/data-mappings/message');

module.exports = async function messages (parent, args, { dataSources }) {
  const channelName = 'conversation-1';

  const conversation = await dataSources.conversationsAPI.getConversation(channelName);

  return (!conversation
    ? Promise.resolve([])
    : dataSources.conversationsAPI.getConversationsHistory({
      id: conversation.id,
      max: args.max
    }))
    .then(messages => messages.map(message => slackMessageMap(message)));
};
