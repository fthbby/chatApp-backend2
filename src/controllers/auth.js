const bcrypt = require("bcryptjs");
const User = require('../model/user')


const register = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;

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
      userData: userData,
      isSet: userData.isAvatarImageSet,
      image: userData.image,
      success: true,
    });
  } catch (err) {
    res.send({ Status: "error setting avatar", err });
  }
};

module.exports = { register, login, uploadAvatar };
