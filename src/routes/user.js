const { getAllUsers, uploadAvatar, removeAvatar, updateUser } = require("../controllers/user");
const router = require("express").Router();

router.get("/allusers", getAllUsers);
router.post("/image", uploadAvatar);
router.put('/image', removeAvatar);
router.put('/', updateUser)
module.exports = router;
