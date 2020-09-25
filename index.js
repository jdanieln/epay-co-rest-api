'use strict'

const Hapi = require('@hapi/hapi')
require('dotenv').config() // Starting env variables
require('./database') // Starting MONGODB connection
const auth = require('./auth')
//Adding Swagger to project
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision')
const HapiSwagger = require('hapi-swagger')

const swaggerOptions = {
    info: {
        title: 'ePayCo API Documentation',
        version: '0.0.1',
    }
}

const init = async () => {
    const port = process.env.PORT || 3000
    const server = Hapi.server({
        port
    })

    //Registering Api Swagger to project
    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ])
    await server.register({
        plugin: require('hapi-cors'),
        options: {
            origins: ['*'],
            methods: ['POST, GET, PUT, DELETE, OPTIONS'],
        }
    })//Enable Cors

    await server.register(require('hapi-auth-jwt2'))

    server.auth.strategy('jwt', 'jwt', {
        key: process.env.JWT_KEY,
        validate: auth.validate
    })

    server.auth.default('jwt')
    
    await server.register(require('./plugins/api'), {
        routes: {
            prefix: '/api'
        }
    })//Enable api

    await server.start()
    console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {

    console.log(err)
    process.exit(1)
})

init()
