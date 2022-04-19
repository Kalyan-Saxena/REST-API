const asyncHandler = require('express-async-handler')
const Wish = require('../models/wishModel')
const User = require('../models/userModel')

// @desc Get wishes
// @route GET /api/wishes
// @access Private
const getWishes = asyncHandler(async (req, res) => {
    wishes = await Wish.find({userId:req.user.id})
    res.status(200).json({
        messages: wishes
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
        message: req.body.message,
        userId: req.user.id
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

    const user = await User.findById(req.user.id)
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }
    
    if (wish.userId.toString() !== user.id) {
        res.status(401)
        throw new Error('User is not authorized to update the wish message')
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

    const user = await User.findById(req.user.id)
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }
        
    if (wish.userId.toString() !== user.id) {
        res.status(401)
        throw new Error('User is not authorized to delete the wish message')
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