const { register, login, setAvatar, getAllUsers } = require('../controllers/user')

const router = require('express').Router()


router.post('/register', register)
router.post('/login', login)
router.post('/setavatar/:id', setAvatar)
router.get('/allusers', getAllUsers)


module.exports = router;