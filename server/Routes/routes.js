const { Router } = require("express");
const { signUp, signIn } = require("../Controllers/authController");

const category = Router()
    .post("/signUp", signUp)
    .post("/signIn", signIn)

module.exports = category;