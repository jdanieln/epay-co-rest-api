'use strict'

const User = require('./../models/user')
const bcrypt = require('bcrypt')
const Boom = require('@hapi/boom')
const jwt = require('jsonwebtoken')

async function getUserProfile (req, h) {
    const { auth } = req
    return h.response(auth.credentials.user)
}


async function verifyToken (req, h) {
    try {
        const { auth } = req
        const userLogged = auth.credentials.user
        const result = await User.findById(userLogged._id)
        if(result) {
            if(!result.active) {
                return Boom.unauthorized('Usuario no activo')
            } else {
                return h.response(true)
            }
        } else {
            return Boom.unauthorized('Usuario no existe')
        }
    } catch (error) {
        return Boom.badData(error)
    }
}

async function validateUser(request, h) {
    try {
        const { payload } = request
        const { email } = payload
    
        const document = await User.findOne({ email: email })
    
        if (document === null) {
            return Boom.unauthorized('Usuario no registrado')
        }
    
        const passwordRight = await bcrypt.compareSync(payload.password, document.password)
        const result = (passwordRight) ? document : false
        if (result) {
            const { remoteAddress, host, hostname, id  } = request.info
            const info = {
                client: {
                    remoteAddress,
                    host,
                    hostname,
                    id
                },
                user: document._id
            }
    
       
            
            const token = jwt.sign({
                user: document,
            }, process.env.JWT_KEY)
    
            return h.response({
                token,
                user: document
            })
        } else {
            return Boom.unauthorized('Contraseña incorrecta')
        }
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    validateUser,
    getUserProfile,
    verifyToken
}
