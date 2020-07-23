const { User } = require('../../users/user.model');

module.exports = (userData) => {
  return new User(
    userData.id,
    (userData.profile && userData.profile.display_name) || userData.real_name,
    {
      colour: userData.color,
      avatarUrl: userData.profile.image_48
    }
  );
};
