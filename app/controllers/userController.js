const helpers = require('../helpers');
const mongoose = require('mongoose')
const userModel = require('../models/userModel');
const { findUser, updateUser, updateData, findData } = require('../services/mongodbService');
const { MESSAGES } = require('../utils/constants');
const commonFunctions = require('../utils/utils');

let userController = {};

userController.registerUser = async (payload) => {
    const user = await findData(
        userModel,
        { $match: { email: payload.email } }
    );

    if (user[0] && !user[0].isDeleted) {
        throw helpers.createErrorResponse(MESSAGES.EMAIL_ALREADY_EXISTS, "ALREADY_EXISTS")
    }

    const data = {
        name: payload.name,
        email: payload.email,
        password: commonFunctions.hashPassword(payload.password),
        mobile: payload.mobile,
    };

    if (user[0].isDeleted) {
        await updateData(
            userModel,
            { $match: { email: payload.email } },
            { $set: { ...data ,isDeleted:false} },
            { $merge: { into: "users", on: "email", whenMatched: "merge", whenNotMatched: "insert" } }
        )
    } else {
        const doc = new userModel(data);
        await doc.save();
    }

    let result = helpers.createSuccessResponse(MESSAGES.SUCCESS);
    return result;
}

userController.login = async (payload) => {

    const user = await findData(
        userModel,
        { $match: { email: payload.email } }
    );

    if (!user[0] || user[0].isDeleted) {
        throw helpers.createErrorResponse(MESSAGES.USER_NOT_REGISTER, "DATA_NOT_FOUND");
    }

    if (!commonFunctions.compareHash(payload.password, user[0].password)) {
        throw helpers.createErrorResponse(MESSAGES.INVALID_PASSWORD, "FORBIDDEN");
    }

    const token = commonFunctions.encryptJwt({ userId: user[0]._id });
    let result = helpers.createSuccessResponse(MESSAGES.LOGGED_IN_SUCCESSFULLY, { token: token });
    return result;
}

userController.getProfile = async (payload) => {
    const user = await findData(
        userModel,
        {
            $match:{ _id: new mongoose.Types.ObjectId(payload.user.userId) }
        }
    );
    return helpers.createSuccessResponse(MESSAGES.SUCCESS, user)
}

userController.updateProfile = async (payload) => {
    const data = {};

    if (payload.name) { data.name = payload.name };
    if (payload.mobile) { data.mobile = payload.mobile };

    await updateData(
        userModel,
        { $match: { _id: new mongoose.Types.ObjectId(payload.user.userId) } },
        { $set: data },
        { $merge: { into: "users", on: "_id", whenMatched: "merge", whenNotMatched: "fail" } }
    )

    let result = helpers.createSuccessResponse(MESSAGES.PROFILE_UPDATE_SUCCESSFULLY);
    return result;
}

userController.deleteProfile = async (payload) => {

    const data = {
        isDeleted: true,
    }

    await updateData(
        userModel,
        { $match: { _id: new mongoose.Types.ObjectId(payload.user.userId) } },
        { $set: data },
        { $merge: { into: "users", on: "_id", whenMatched: "merge", whenNotMatched: "fail" } }
    )
    let result = helpers.createSuccessResponse(MESSAGES.PROFILE_DELETED_SUCCESSFULLY);
    return result;
}

module.exports = userController