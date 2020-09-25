'use strict'

const routes = require('./../routes/index') // Starting Routes

exports.plugin = {
    name: 'api',
    version: '1.0.0',
    register: async function (server, options) {
        server.route(routes)
    }
}
