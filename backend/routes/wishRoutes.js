const express = require('express')
const router = express.Router()
const {getWishes, setWish, updateWish, deleteWish} = require('../controllers/wishController')
const protect = require('../middleware/authMiddleware')

router.get('/', protect, getWishes)

router.post('/', protect, setWish)

router.put('/:id', protect, updateWish)

router.delete('/:id', protect, deleteWish)

module.exports = router