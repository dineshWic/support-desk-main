const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  googleLoginUser,
  googleRegisterUser,
  getMe,
} = require('../controllers/userController')

const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)

router.post('/google', googleRegisterUser)
router.post('/googleLogin', googleLoginUser)

router.get('/me', protect, getMe)

module.exports = router
