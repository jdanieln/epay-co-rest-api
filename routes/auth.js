const auth = require('./../controllers/auth')
const common = require('./../controllers/common')
const Joi = require('@hapi/joi')

module.exports = [
    {
        method: 'GET',
        path: '/user-profile',
        handler: auth.getUserProfile,
        options: {
            description: 'GetUserProfile endpoint',
            notes: 'Return user profile',
            tags: ['api'],
            validate: {
                headers: Joi.object().keys({
                    'authorization': Joi.string().required()
                }).unknown()
            }
        }
    },
    {
        method: 'GET',
        path: '/verify-token',
        handler: auth.verifyToken,
        options: {
            description: 'verify-token endpoint',
            notes: 'Return token verified',
            tags: ['api'],
            validate: {
                headers: Joi.object().keys({
                    'authorization': Joi.string().required()
                }).unknown()
            }
        }
    },
    {
        method: 'POST',
        path:'/token',
        handler: auth.validateUser,
        options: {
            description: 'Login endpoint',
            notes: 'Return token generated',
            tags: ['api'],
            auth: false,
            validate: {
                payload: Joi.object().keys({
                    email: Joi.string().required(),
                    password: Joi.string().required()
                }),
                failAction: common.failValidation
            }
        }
    }
]
