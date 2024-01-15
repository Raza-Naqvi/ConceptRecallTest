const { fetchUser, registerUser } = require("../Functions/authFunctions");
const bcrypt = require("bcrypt");
const { successResponse, failResponse, errorResponse } = require("../Utils/response");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
    try {
        const emailCheck = await fetchUser(req.body);
        if (emailCheck) {
            return failResponse(req, res, "This email already exists");
        };
        const salt = await bcrypt.genSalt(10);
        const pswd = await bcrypt.hash(req.body.password, salt);
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: pswd,
        };
        const result = await registerUser(data);
        return successResponse(req, res, result);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

exports.signIn = async (req, res) => {
    try {
        const result = await fetchUser(req.body);
        if (!result) {
            return failResponse(req, res, "no user found with this email!");
        };
        const validPsd = await bcrypt.compare(req.body.password, result.password);
        if (validPsd) {
            const token = jwt.sign(
                {
                    id: result.id,
                    email: result.email,
                    username: result.name,
                },
                "Test",
                { expiresIn: "5d" }
            );
            const data = { token: token, user: result };
            return successResponse(req, res, data);
        } else {
            return failResponse(req, res, "incorrect password");
        };
    } catch (error) {
        return errorResponse(req, res, error);
    };
};