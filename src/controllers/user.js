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

const uploadAvatar = async (req, res, next) => {
  try {
    const { base64, id } = req.body;
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.json({ msg: "no user found" });
    }

    const userId = user._id;
    const image = base64;
    const userData = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      image,
    });

    return res.json({
      userData,
      isSet: userData.isAvatarImageSet,
      image: userData.image,
      success: true,
    });
  } catch (err) {
    res.send({ Status: "error setting avatar", err });
  }
};

const removeAvatar = async (req, res, next) => {
  try {
    const { id, base64 } = req.body;
    if (!id) {
      return res.json({ msg: "no user" });
    }
    const user = await User.findOne({ _id: id });

    const userId = user._id;

    const userData = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: false,
      image: null,
    });

    return res.json({
      userData,
      isSet: userData.isAvatarImageSet,
      image: null,
      success: true,
    });
  } catch (err) {
    res.send(("err", err));
  }
};

module.exports = { getAllUsers, uploadAvatar, removeAvatar };
