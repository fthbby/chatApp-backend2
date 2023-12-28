const { register, login, uploadAvatar } = require("../controllers/auth");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/upload-image", uploadAvatar);

module.exports = router;
