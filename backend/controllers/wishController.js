const asyncHandler = require('express-async-handler')
const Wish = require('../models/wishModel')

// @desc Get wishes
// @route GET /api/wishes
// @access Private
const getWishes = asyncHandler(async (req, res) => {
    wishes = await Wish.find()
    res.status(200).json({
        message: wishes
    })
})

// @desc Set wish
// @route POST /api/wishes
// @access Private
const setWish = asyncHandler(async (req, res) => {
    if (!req.body.message) {
        res.status(400)
        throw new Error('Please add a message for the wish to create in the Database')
    }

    const wish = await Wish.create({
        message: req.body.message
    })

    res.status(200).json(wish)
})

// @desc Update wish
// @route PUT /api/wishes/:id
// @access Private
const updateWish = asyncHandler(async (req, res) => {
    const wish = await Wish.findById(req.params.id)
    if(!wish){
        res.status(400)
        throw new Error('Wish not found')
    }

    const updatedGoal = await Wish.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.status(200).json(updatedGoal)
})

// @desc Delete wish
// @route DELETE /api/wishes/:id
// @access Private
const deleteWish = asyncHandler(async (req, res) => {
    const wish = await Wish.findById(req.params.id)
    if(!wish){
        res.status(400)
        throw new Error('Wish not found')
    }

    await wish.remove()

    res.status(200).json({
        id: req.params.id
    })
})

module.exports = {
    getWishes,
    setWish,
    updateWish,
    deleteWish,
}