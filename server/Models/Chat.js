const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserSchema"
    },
    content: {
        type: String,
        trim: true
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MyChats"
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("ChatSchema", chatSchema);