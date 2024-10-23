"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkForToken = void 0;
const auth_1 = require("../Services/auth");
const checkForToken = () => {
    return (req, res, next) => {
        try {
            const token = req.header('Authorization')?.replace('Bearer', '').trim();
            if (!token) {
                // throw new Error();
                console.log("No token found");
            }
            else {
                const decoded = (0, auth_1.validateToken)(token);
                req.user = {
                    id: decoded._id,
                    username: decoded.username,
                    roles: decoded.roles
                };
                // console.log("token found "+ token);
            }
            // console.log(decoded.roles);
            next();
        }
        catch (error) {
            console.error("Token validation error", error);
            res.status(401);
            return next();
        }
    };
};
exports.checkForToken = checkForToken;
//# sourceMappingURL=authHelper.js.map