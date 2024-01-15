const { Router } = require("express");
const { middleWareFunc } = require("../Utils/userMiddleWare");
const {
    // newMyChat,
    getMyChats,
    sendMsg,
    getChat,
    createChatByName,
    joinChat,
} = require("../Controllers/MyChats");

const myChatRoute = Router()
    // .get("/newChat/:userId", middleWareFunc, newMyChat)
    .get("/myChats", middleWareFunc, getMyChats)
    .post("/newMsg", middleWareFunc, sendMsg)
    .get("/getMsg/:chatId", middleWareFunc, getChat)
    .post('/newChat', middleWareFunc, createChatByName)
    .post('/joinChat', middleWareFunc, joinChat)

module.exports = myChatRoute;