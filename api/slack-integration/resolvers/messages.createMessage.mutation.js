const slackMessageMap = require('../../slack-integration/data-mappings/message');

module.exports = async function createMessage (parent, args, { dataSources }) {
  const channelName = 'conversation-1';
  const conversation = await dataSources.conversationsAPI.getConversation(channelName);

  async function createConversation() {
    return dataSources.conversationsAPI.createConversation(channelName, [process.env.SLACK_ME_ID])
      .then(channel => dataSources.conversationsAPI.inviteUser({
        channelId: channel.id,
        userIds: [process.env.SLACK_ME_ID, process.env.SLACK_APP_ID]
      }));
  }

  return (conversation ? Promise.resolve(conversation) : createConversation())
    .then(channel => dataSources.conversationsAPI.chatPostMessage(channel.id, args.text))
    .then(slackMessageMap);
}
