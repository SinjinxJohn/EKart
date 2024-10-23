"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import AuthController from "../Controllers/userController";
const express_1 = __importDefault(require("express"));
const userController_1 = require("../Controllers/userController");
const userRouter = express_1.default.Router();
userRouter.use(express_1.default.json());
userRouter.post('/signup', userController_1.signup);
userRouter.post('/login', userController_1.login);
userRouter.get('/logout', userController_1.logout);
exports.default = userRouter;
//# sourceMappingURL=userRoutes.js.map