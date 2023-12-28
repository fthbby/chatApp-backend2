const User = require("../model/user");



const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "image",
      "_id",
      "firstName",
      "lastName",
    ]);

    return res.json(users);
  } catch (err) {
    console.log("err :", err);
    next(err);
  }
};

module.exports = { getAllUsers };
