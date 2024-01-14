const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    isOnline: {
        type: Boolean,
        default: 0
    },
}, {
    timestamps: true
});

// userSchema.pre("save", async function (next) {
//     try {
//         // console.log("Called before saving a user");
//         const salt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(this.password, salt)
//         this.password = hashedPassword
//         next();
//     } catch (error) {
//         next(error);
//     };
// });

// userSchema.methods.comparePassword = function (plainPassword, cb) {
//     bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
//         if (err) return cb(err);
//         cb(null, isMatch)
//     });
// };

module.exports = mongoose.model("UserSchema", userSchema);