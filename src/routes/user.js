const { register, login, uploadAvatar, getAllUsers } = require('../controllers/user')

const router = require('express').Router()


router.post('/register', register)
router.post('/login', login)
router.post('/upload-image', uploadAvatar)
router.get('/allusers', getAllUsers)


module.exports = router;