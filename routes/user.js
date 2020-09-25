const user = require('./../controllers/user')
const common = require('./../controllers/common')
const Joi = require('@hapi/joi')
const userModel = require('../validations/user')

module.exports = [{
    method: 'POST',
    path:'/user',
    handler: user.createUser,
    options: {
        auth: false,
        description: 'Register user endpoint',
        notes: 'Return user model',
        tags: ['api'],
        validate: {
            payload: userModel,
            options: {
                allowUnknown: true
            },  
            failAction: common.failValidation
        }
    }
},
{
    method: 'GET',
    path: '/user',
    handler: user.getUsers,
    options: {
        description: 'Get users endpoint',
        notes: 'Return user list',
        tags: ['api'],
        validate: {
            headers: Joi.object().keys({
                'authorization': Joi.string().required()
            }).unknown(),
            failAction: common.failValidation
        }
    }
},
{
    method: 'PUT',
    path:'/user/{id}',
    handler: user.updateUser,
    options: {
        auth: false,
        description: 'Update user endpoint',
        notes: 'Return user model',
        tags: ['api'],
        validate: {
            payload: userModel,
            options: {
                allowUnknown: true
            },
            headers: Joi.object().keys({
                'authorization': Joi.string().required()
            }).unknown(),
            failAction: common.failValidation
        }
    }
},
{
    method: 'DELETE',
    path:'/user/{id}',
    handler: user.deleteUser,
    options: {
        description: 'Delete user endpoint',
        notes: 'Return user model',
        tags: ['api'],
        auth: 'jwt',
        validate: {
            params: Joi.object().keys({
                id : Joi.string()
                        .required()
                        .description('the id for user'),
            }),
            failAction: common.failValidation,
            headers: Joi.object().keys({
                'authorization': Joi.string().required()
            }).unknown()
        }
    }
}]
