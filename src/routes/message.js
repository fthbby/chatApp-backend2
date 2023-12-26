const { addMessage, getAllMessage } = require('../controllers/message')

const router = require('express').Router()


router.post("/addmsg/", addMessage);
router.post("/getmsg/", getAllMessage);

module.exports = router;