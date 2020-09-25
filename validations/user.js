'use strict'

const Joi = require('@hapi/joi')

const userModel = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
})

module.exports = userModel
