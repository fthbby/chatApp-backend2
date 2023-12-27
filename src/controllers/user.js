const User = require("../model/user");
const bcrypt = require("bcryptjs");

const register = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // const usernameCheck = await User.findOne({ username });

    // if (usernameCheck) {
    //   return res.json({ msg: "USERNAME already in use", status: false });
    // }

    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "email already in use", status: false });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      //   username,
      firstName,
      lastName,
      password: hashedPassword,
    });

    delete user.password;
    return res.json({ status: true, user });
  } catch (err) {
    console.log("error at register controller :", err);
  }
};

const login = async (req, res, next) => {
  try {
    console.log("LOGIN ", req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ msg: "incorrect email or password", status: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ msg: "incorrect email or password", status: false });
    }
    delete user.password;
    return res.json({ status: true, user });
  } catch (err) {
    console.log("error at login controller :", err);
  }
};

const setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage,
    });
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (err) {
    console.log("error at setAvatar controller :", err);
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
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

module.exports = { register, login, setAvatar, getAllUsers };
