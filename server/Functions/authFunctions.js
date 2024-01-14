const userModel = require("../Models/userModel");

exports.fetchUser = async (body) => {
    const uResult = await userModel.findOne({ email: body.email });
    return uResult;
};

exports.registerUser = async (body) => {
    const newUser = new userModel(body);
    await newUser.save();
    return newUser;
};