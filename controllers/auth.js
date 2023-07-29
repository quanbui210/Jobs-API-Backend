const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError} = require('../errors')
const bcrypt = require('bcryptjs')

const register = async(req, res) => {
    const {name, email, password} = req.body
    const tempUser = {name, email, password}
    const salt = await bcrypt.genSalt(10)
    if (!name || !email || !password) {
        throw new BadRequestError('Information missing!!!')
    }
    const user = await User.create({...req.body})
    res.status(StatusCodes.CREATED).json({user})
}

const login = async(req, res) => {
    res.send('login')
}


module.exports = {
    register, login
}