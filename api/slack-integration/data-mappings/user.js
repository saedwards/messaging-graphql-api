const { User } = require('../../users/user.model');

module.exports = (userData) => {
  return new User(
    userData.id,
    (userData.profile && userData.profile.display_name) || userData.user.real_name,
    {
      colour: userData.user.color,
      avatarUrl: userData.user.profile.image_48
    }
  );
};
