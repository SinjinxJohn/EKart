"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.secret = void 0;
exports.createTokenForUser = createTokenForUser;
exports.validateToken = validateToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.secret = process.env.secret || "betty-bought-some-butter-but-the-butter-was-bitter";
function createTokenForUser(user) {
    const payload = {
        _id: user.id,
        username: user.username,
        roles: user.roles,
    };
    const token = jsonwebtoken_1.default.sign(payload, exports.secret, { expiresIn: '2h' });
    return token;
}
function validateToken(token) {
    const payload = jsonwebtoken_1.default.verify(token, exports.secret);
    // console.log(payload);
    return payload;
}
//# sourceMappingURL=auth.js.map