const asyncHandler = require('express-async-handler')

// @desc Get wishes
// @route GET /api/wishes
// @access Private
const getWishes = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "Get wishes"
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
    res.status(200).json({
        message: "Set wish"
    })
})

// @desc Update wish
// @route PUT /api/wishes/:id
// @access Private
const updateWish = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: `Update wish ${req.params.id}`
    })
})

// @desc Delete wish
// @route DELETE /api/wishes/:id
// @access Private
const deleteWish = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: `Delete wish ${req.params.id}`
    })
})

module.exports = {
    getWishes,
    setWish,
    updateWish,
    deleteWish,
}