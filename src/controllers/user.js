const User = require("../model/user");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
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
      success: true,
      isAvatarImageSet: true,
      image,
      data: userData,
    });
  } catch (err) {
    res.send({ Status: "error setting avatar", err });
  }
};

const removeAvatar = async (req, res, next) => {
  try {
    const { id } = req.body;
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
      isAvatarImageSet: false,
      image: null,
      success: true,
      data: userData,
    });
  } catch (err) {
    res.send(("err", err));
  }
};

const updateUser = async (req, res, next) => {
  try {
    if (!req.body.id) {
      return res.json({ MESSAGE: "An ID IS REQUIRED" });
    }

    const user = await User.findOne({ _id: req.body.id });

    if (!user) {
      return res.json({ MESSAGE: "User not found with the provided ID" });
    }

    let userId = user._id;

    const userData = await User.findByIdAndUpdate(userId, req.body);

    console.log("Updated user data:", userData);

    return res.json({
      success: true,
      userData,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllUsers, uploadAvatar, removeAvatar, updateUser };
