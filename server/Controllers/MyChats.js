const {
    registerMyChat,
    fetchMyChats,
    saveMsg,
    updateLatest,
    getMsgs,
    checkChatByName
} = require("../Functions/MyChats");
const { failResponse, successResponse, errorResponse } = require("../Utils/response");

exports.getMyChats = async (req, res) => {
    try {
        const getChats = await fetchMyChats(req.user.id);
        return successResponse(req, res, getChats);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

exports.createChatByName = async (req, res) => {
    try {
        const check = await checkChatByName(req.body.groupName);
        if (check !== null) {
            return failResponse(req, res, "Try a unique group name");
        } else {
            const data = {
                groupName: req.body.groupName,
                users: [req.user.id]
            };
            const save = await registerMyChat(data)
            return successResponse(req, res, save);
        };
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

exports.joinChat = async (req, res) => {
    try {
        const check = await checkChatByName(req.body.groupName);
        if (check == null) {
            return failResponse(req, res, "No group found");
        } else if (check.users.some(user => user.equals(req.user.id))) {
            return failResponse(req, res, "You are already in this group");
        } else {
            await check.users.push(req.user.id);
            await registerMyChat(check);
            return successResponse(req, res, 'user added to group');
        };
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

exports.sendMsg = async (req, res) => {
    try {
        const newMsgobj = {
            sender: req.body.sender,
            content: req.body.content,
            chat: req.body.chatId
        };
        const newMsg = await saveMsg(newMsgobj);
        const update = await updateLatest(newMsgobj.chat, newMsgobj.content, newMsgobj.sender);
        return successResponse(req, res, { newMsg, update });
    } catch (err) {
        return errorResponse(req, res, err);
    };
};

exports.getChat = async (req, res) => {
    try {
        const msg = await getMsgs(req.params.chatId);
        return successResponse(req, res, msg);
    } catch (err) {
        return errorResponse(req, res, err);
    };
};