'use strict';

const todoController = require('../../controllers/todoController');
const { Joi } = require('../../utils/joiUtils');


module.exports = [
    {
        method: 'GET',
        path: '/todo/getTodolistById/:id',
        joiSchemaForSwagger: {
            group: 'todo',
            description: 'get todolists',
            model: 'TodoModel',
            param: {
                id: Joi.string().required(),
            }
        },
        auth: 1,
        handler: todoController.getTodoListById
    },
    {
        method: 'GET',
        path: '/todo/getTodolist',
        joiSchemaForSwagger: {
            group: 'todo',
            description: 'get todolists',
            model: 'TodoModel',
        },
        auth: 1,
        handler: todoController.getTodoList
    },
    {
        method: 'POST',
        path: '/todo/create',
        joiSchemaForSwagger: {
            group: 'todo',
            description: 'new user insert',
            model: 'TodoModel',
            body: {
                title:Joi.string().required(),
                content: Joi.string().required(),
            }
        },
        auth:1,
        handler: todoController.createTodo
    },
];