const express = require('express')
const router = express.Router()
const {getWishes, setWish, updateWish, deleteWish} = require('../controllers/wishController')

router.get('/', getWishes)

router.post('/', setWish)

router.put('/:id', updateWish)

router.delete('/:id', deleteWish)

module.exports = router