const User = require("../Models/registerModel");

const getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.send({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.userName
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Server error' });
  }
};

module.exports = getProfile;
