const User = require('../models/User')
const {BadRequestError, UnauthenticatedError} = require('../errors')

const jwt = require('jsonwebtoken')

const register = async(req, res) => {
    const user = await User.create({...req.body})
    const token = user.createJWT()
    console.log(token)
    res.status(StatusCodes.CREATED).json({user: {name: user.name}, token})
}

const login = async(req, res) => {
    const {email, password} = req.body
    if (!email || !password) {
        throw new BadRequestError('Pleaase provide information')
    }
    const user = await User.findOne({email})
    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const passwordMatch = await user.comparePassword(password)
    if (!passwordMatch) {
        throw new UnauthenticatedError('Invalid Credentials')
    } 
    const token = user.createJWT()
    console.log(token)
    res.status(StatusCodes.OK).json({user: {name: user.name}, token})
}

module.exports = {
    register, login
}