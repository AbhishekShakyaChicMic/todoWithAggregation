const { default: mongoose } = require("mongoose");
const helpers = require("../helpers");
const todoModel = require("../models/todoModel");
const { findUser, findData, updateData } = require("../services/mongodbService");
const { MESSAGES } = require("../utils/constants");

const todoController = {}

todoController.createTodo = async (payload) => {

    const data = {
        userId: payload.user.userId,
        title:payload.title,
        content:payload.content,
    }

    const doc = new todoModel(data);
    await doc.save();

    const result = helpers.createSuccessResponse(MESSAGES.TODO_CREATED);
    return result;
}

todoController.getTodoList = async (payload) => {
    console.log(payload.user.userId);
    const lists = await findData(todoModel,
        { $match: { $and: [{ userId: new mongoose.Types.ObjectId( payload.user.userId) }, { isDeleted: false }] } }
    );
    
    const result = helpers.createSuccessResponse(MESSAGES.SUCCESS, lists);
    return result;
}

todoController.getTodoListById = async (payload) => {
    console.log(payload.id);
    const list = await findData(
        todoModel,
        { $match: { $and: [{ _id: new mongoose.Types.ObjectId(payload.id)}, { isDeleted: false }] } }
    );
    const result = helpers.createSuccessResponse(MESSAGES.SUCCESS, list);
    return result;
}

todoController.updateTodoById=async (payload) => {
    const data = {};

    if (payload.title) data.title = payload.title;
    if (payload.content) data.content = payload.content;

    const list = await updateData(
        todoModel,
        { $match: { _id: new mongoose.Types.ObjectId(payload.id) } },
        { $set: data },
        { $merge: { into: "todos", on: "_id", whenMatched: "merge", whenNotMatched: "insert" } }
    );
    const result = helpers.createSuccessResponse(MESSAGES.TODO_UPDATED_SUCCESSFULLY, list);
    return result;
}

todoController.deleteTodoById=async (payload) => {
    console.log(payload.id);
    const list = await updateData(
        todoModel,
        { $match: { _id: new mongoose.Types.ObjectId(payload.id) } },
        { $set: { isDeleted: true } },
        { $merge: { into: "todos", on: "_id", whenMatched: "merge", whenNotMatched: "insert" } }
    );
    const result = helpers.createSuccessResponse(MESSAGES.TODO_DELETED_SUCCESSFULLY, list);
    return result;
}

module.exports = todoController;