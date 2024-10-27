"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = exports.checkAdmin = exports.checkForSeller = void 0;
const checkForSeller = (req, res, next) => {
    const userRole = req.user?.roles;
    if (!userRole) {
        res.status(403).json({
            messageType: "error",
            message: "Access Denied. No Role Found"
        });
    }
    else {
        const hasRole = userRole.includes("Seller");
        if (!hasRole) {
            res.status(403).json({
                messageType: "error",
                message: "Restricted role for sellers only"
            });
        }
        else {
            next();
        }
    }
};
exports.checkForSeller = checkForSeller;
//checks for both seller and admin and allows only users
const checkAdmin = (req, res, next) => {
    const userRole = req.user?.roles;
    if (!userRole) {
        res.status(403).json({
            messageType: "error",
            message: "Access Denied. No Role Found"
        });
    }
    else {
        const hasRole = userRole.includes("Admin") || userRole.includes("Seller");
        if (hasRole) {
            res.status(403).json({
                messageType: "error",
                message: "Restricted role for admin and sellers"
            });
        }
        else {
            next();
        }
    }
};
exports.checkAdmin = checkAdmin;
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