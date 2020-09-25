'use strict'

const Boom = require('@hapi/boom')

async function failValidation(request, h, error) {
    return Boom.badRequest(error)
}

module.exports = {
    failValidation
}
