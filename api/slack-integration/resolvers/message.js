// Missing
const { User } = require('../../users/user.model');
const slackUserMap = require('../../slack-integration/data-mappings/user');

const Message = {
  user: (message, args, { dataSources }) => message.userId
    ? dataSources.usersAPI.getUsersInfo(message.userId).then(slackUserMap)
    : anonymousUser
};

const anonymousUser = new User(
  'user',
  'You'
);

module.exports = Message;
