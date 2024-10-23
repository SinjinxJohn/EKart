"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_1 = require("../Services/auth");
const UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ },
    password: { type: String, min: 8, required: true },
    roles: { type: [String], default: ["user"] },
    confirmPassword: { type: String, required: true, min: 8 }
});
UserSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified("password"))
        return next();
    if (this.password != this.confirmPassword) {
        return next(Error("Passwords do not match"));
    }
    const salt = await bcrypt_1.default.genSalt(10);
    const hashedpassword = await bcrypt_1.default.hash(user.password, salt);
    user.password = hashedpassword;
    user.confirmPassword = "";
    next();
});
UserSchema.static("matchPassword", async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }
    const isMatch = await bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Password is incorrect");
    }
    const token = (0, auth_1.createTokenForUser)(user);
    return token;
});
exports.userModel = (0, mongoose_1.model)('UserModel', UserSchema);
//# sourceMappingURL=userModel.js.map