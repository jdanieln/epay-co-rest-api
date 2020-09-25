'use strict'

const User = require('../models/user')
const bcrypt = require('bcrypt')
const Boom = require('@hapi/boom')
const jwt = require('jsonwebtoken')


async function createUser (req, h) {
    try {
        const { payload } = req    

        payload.password = bcrypt.hashSync(payload.password, 10)
    
        const user = new User(payload)
        const result = await user.save()
        return h.response(result)
    } catch (error) {
        return Boom.badData(error)
    }
}

async function getUsers (req, h) {
    try {
        const result = await User.find({ }).populate('profile')
        return h.response(result)
    } catch (error) {
        console.log(error)
        return Boom.badData(error)
    }
}

async function updateUser (req, h) {
    const { id } = req.params
    const { payload } = req
    try {
        payload.password = bcrypt.hashSync(payload.password, 10)
        const result = await User.findByIdAndUpdate(id, payload, { new: true })
        return h.response(result)
    } catch (error) {
        console.log(error)
        return Boom.badData(error)
    }
}

async function deleteUser(req, h) {
    const { id } = req.params
    try {
        const result = await User.findByIdAndRemove(id)
        return h.response(result)
    } catch (error) {
        console.log(error)
        return Boom.badData(error)
    }
}

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser
}
