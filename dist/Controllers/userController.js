"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.getUser = exports.signup = void 0;
const userModel_1 = require("../Models/userModel");
const signup = async (req, res) => {
    try {
        const { email, password, confirmPassword, username, roles, address } = req.body;
        // Validate input
        if (!email || !password || !username || !confirmPassword) {
            res.status(400).json({
                message: "Email/Password/Username is required",
            });
        }
        else {
            // Check if user exists with same email and/or same username
            const user = await userModel_1.userModel.findOne({ email });
            const usern = await userModel_1.userModel.findOne({ username });
            if (user || usern) {
                res.status(400).json({
                    messageType: "error",
                    message: "User already exists",
                });
            }
            else {
                if (roles == "user" || roles == "Seller") {
                    if (!address) {
                        res.status(400).json({
                            messageType: "error",
                            message: "Address required"
                        });
                    }
                    else {
                        const newUser = await userModel_1.userModel.create({
                            email,
                            password,
                            confirmPassword,
                            username,
                            roles,
                            address
                        });
                        if (newUser) {
                            res.status(201).json({
                                messageType: "success",
                                message: newUser,
                            });
                        }
                    }
                }
                else {
                    const newUser = await userModel_1.userModel.create({
                        email,
                        password,
                        confirmPassword,
                        username,
                        roles
                    });
                    if (newUser) {
                        res.status(201).json({
                            messageType: "success",
                            message: newUser,
                        });
                    }
                }
            }
        }
    }
    catch (error) {
        if (error instanceof Error) {
            // Handle specific Mongoose validation errors
            if (error.name === 'ValidationError') {
                // Check if email validation failed
                const emailError = 'Invalid email format';
                res.status(400).json({
                    messageType: "error",
                    message: emailError,
                });
            }
            else {
                res.status(500).json({
                    message: error || "Internal Server Error",
                });
            }
        }
    }
};
exports.signup = signup;
const getUser = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel_1.userModel.findOne({ email });
        if (!user) {
            res.status(404).json({
                messageType: "error",
                message: "No user found"
            });
        }
        else {
            res.status(200).json({
                messageType: "success",
                message: user
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error || "Internal Server Error",
        });
    }
};
exports.getUser = getUser;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                messageType: "success",
                message: "Email or Password is required"
            });
        }
        else {
            const token = await userModel_1.userModel.matchPassword(email, password);
            res.status(200).json({
                messageType: "success",
                message: "Sign in successful", token: token
            });
        }
    }
    catch (error) {
        res.status(401).json({
            messageType: "error",
            message: "Sign in failed"
        });
    }
};
exports.login = login;
const logout = async (req, res) => {
    res.json({
        messageType: "success",
        message: "Logged out successfully"
    });
};
exports.logout = logout;
//# sourceMappingURL=userController.js.map