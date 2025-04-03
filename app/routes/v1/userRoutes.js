'use strict';

const { Joi } = require('../../utils/joiUtils');
const { userController } = require('../../controllers');
const CONSTANTS = require('../../utils/constants');

module.exports = [
    {
        method: 'PUT',
        path: '/user/update',
        joiSchemaForSwagger: {
            group: 'user',
            description: 'user profile update',
            model: 'UserRegister',
            body: {
                name: Joi.string(),
                mobile:Joi.string(),
            }
        },
        auth: 1,
        handler: userController.updateProfile
    },
    {
        method: 'GET',
        path: '/user/getProfile',
        joiSchemaForSwagger: {
            group: 'user',
            description: 'user profile',
            model: 'UserRegister',
        },
        auth:1,
        handler: userController.getProfile
    },
    {
        method: 'POST',
        path: '/user/login',
        joiSchemaForSwagger: {
            group: 'user',
            description: 'login a new user',
            model: 'UserRegister',
            body: {
                email: Joi.string().email().required().isValidEmail(),
                password: Joi.string().required(),
            }
        },
        handler: userController.login
    },
    {
        method: 'POST',
        path: '/user/register',
        joiSchemaForSwagger: {
            group: 'user',
            description: 'register a new user',
            model: 'UserRegister',
            body: {
                name: Joi.string().required(),
                email: Joi.string().email().required().isValidEmail(),
                password: Joi.string().required(),
                mobile: Joi.string().required(),
            }
        },
        handler: userController.registerUser
    },
    {
        method: "GET",
        path: '/',
        joiSchemaForSwagger: {
            group: 'user',
            description: 'register a new user',
            model: 'UserRegister',
        },
        handler:userController.chat,
    }
];