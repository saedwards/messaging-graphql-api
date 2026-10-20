const { User } = require('../../users/user.model');

module.exports = (userData) => {
  return new User(
    userData.user.id,
    userData.user.real_name,
    {
      colour: userData.user.color,
      avatarUrl: userData.user.profile.image_48
    }
  );
};
