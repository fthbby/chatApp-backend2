const { getAllUsers } = require("../controllers/user");
const router = require("express").Router();

router.get("/allusers", getAllUsers);

module.exports = router;
