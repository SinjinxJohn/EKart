"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
// import { checkForToken } from "./Middlewares/authHelper";
const userRoutes_1 = __importDefault(require("./Routes/userRoutes"));
const productRoutes_1 = __importDefault(require("./Routes/productRoutes"));
const authHelper_1 = require("./Middlewares/authHelper");
const cartRoutes_1 = __importDefault(require("./Routes/cartRoutes"));
const orderRoutes_1 = __importDefault(require("./Routes/orderRoutes"));
const paymentRouter_1 = __importDefault(require("./Routes/paymentRouter"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// app.use(checkForToken);
//Enpoints
app.get("/", (req, res) => {
    res.status(200).send("This is the backend of EKart");
});
app.use("/", userRoutes_1.default);
app.use("/product", (0, authHelper_1.checkForToken)(), productRoutes_1.default);
app.use("/cart", (0, authHelper_1.checkForToken)(), cartRoutes_1.default);
app.use('/order', (0, authHelper_1.checkForToken)(), orderRoutes_1.default);
app.use('/payments', (0, authHelper_1.checkForToken)(), paymentRouter_1.default);
const server = http_1.default.createServer(app);
//starter server logic
server.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});
//db connection
mongoose_1.default.connect(process.env.MONGO_URL || "betty").then(function (db) {
    console.log("Connected to the database successfully");
}).catch(function (err) {
    console.log(err);
});
// module.exports = app;
//# sourceMappingURL=index.js.map