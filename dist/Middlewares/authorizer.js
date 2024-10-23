"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = void 0;
const checkRole = (req, res, next) => {
    const userRole = req.user?.roles;
    if (!userRole) {
        // console.log(req.user);
        res.status(403).json({
            messageType: "error",
            message: "Access Denied. No Role Found"
        });
    }
    else {
        const hasRole = userRole.includes("Admin");
        if (!hasRole) {
            res.status(403).json({
                messageType: "error",
                message: "User does not have enough permission to access this route"
            });
        }
        next();
    }
};
exports.checkRole = checkRole;
//# sourceMappingURL=authorizer.js.map