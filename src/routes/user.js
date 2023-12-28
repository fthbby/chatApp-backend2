const { getAllUsers, uploadAvatar, removeAvatar } = require("../controllers/user");
const router = require("express").Router();

router.get("/allusers", getAllUsers);
router.post("/image", uploadAvatar);
router.put('/image', removeAvatar)
module.exports = router;
