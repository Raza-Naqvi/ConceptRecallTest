const mongoose = require("mongoose");

const myChatSchema = mongoose.Schema({
    groupName: {
        type: String,
        required: true,
        unique: true,
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserSchema",
        required: true
    }],
}, {
    timestamps: true
});

module.exports = mongoose.model("MyChats", myChatSchema);