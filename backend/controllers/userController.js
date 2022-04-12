const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')


// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {

    const {name, email, password} = req.body
    if (!name | !email | !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if user already exists
    userExists = await User.findOne({email})
    if (userExists) {
        res.status(400)
        throw new Error('User with email already exists')
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json(
            {
                user,
                token: generateToken(user.id)
            }
        )
    } else {
        res.status(400)
        throw new Error('Invalid Data')
    }
})

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    if (!email | !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check for user email and compare hashed password
    const user = await User.findOne({email})
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json(
            {
                user,
                token: generateToken(user.id)
            }
        )
    } else {
        res.status(400)
        throw new Error('Invalid Credentials')
    }
})

// @desc Get user data
// @route GET /api/users/:id
// @access Private
const getUserData = asyncHandler(async (req, res) => {
    if (req.params.id == req.user.id) {
        const user = await User.findById(req.user.id)
        res.status(200).json(user)
    } else {
        res.status(401)
        throw new Error('Invalid UserId')
    }
})

// Generate Token

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:'1h'})
}

module.exports = {
    registerUser,
    loginUser,
    getUserData,
}