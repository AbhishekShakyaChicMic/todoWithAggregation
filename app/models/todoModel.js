const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    userId: { type:mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, default: "" },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Todo', todoSchema);