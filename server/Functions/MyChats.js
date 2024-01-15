const myChat = require("../Models/MyChats");
const msgSchema = require("../Models/Chat");

exports.registerMyChat = async (body) => {
    const newMyChat = myChat(body);
    await newMyChat.save();
    return newMyChat;
};

exports.fetchMyChats = async (body) => {
    const get = await myChat.find({ users: { $elemMatch: { $eq: body } } })
        .populate("users")
        .sort({ updatedAt: -1 });
    return get;
};

exports.checkChatByName = async (name) => {
    const check = await myChat.findOne({ groupName: name });
    return check;
};

exports.saveMsg = async (body) => {
    const msg = msgSchema(body);
    await msg.save();
    return msg;
};

exports.updateLatest = async (id, msg, sender) => {
    const up = myChat.findByIdAndUpdate(id, { latestMessage: { msg: msg, sender: sender } });
    return up;
};

exports.getMsgs = async (id) => {
    const msg = await msgSchema.find({ chat: id });
    return msg;
};