"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const logger_1 = __importDefault(require("./util/logger/logger"));
const errorhandler_middleware_1 = require("./middleware/errorhandler.middleware");
const express_status_monitor_1 = __importDefault(require("express-status-monitor"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const PORT = process.env.PORT || 80;
const app = (0, express_1.default)();
app.use((0, express_status_monitor_1.default)({ path: "/status" }));
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: "http://localhost:3001",
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
/** Log the request */
app.use((req, res, next) => {
    /** Log the req */
    logger_1.default.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
    res.on("finish", () => {
        /** Log the res */
        logger_1.default.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
    });
    next();
});
/** Rules of our API */
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});
app.use(routes_1.default);
app.use(errorhandler_middleware_1.errorHandler);
/** 404 Error handling */
app.use((_, res) => {
    const error = new Error("Not found");
    logger_1.default.error(error);
    res.status(404).json({
        message: error.message,
    });
});
const uri = process.env.DB;
/** Connect to mongo */
mongoose_1.default
    .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
    logger_1.default.debug(`Mongodb connected successfully`);
})
    .catch((error) => {
    logger_1.default.error(`unable to connect - ${error.message}`);
    throw error;
});
/** Configure Socket.io and pass the Express app instance **/
app.listen(PORT, () => {
    logger_1.default.info(`Server is running on http://localhost:${PORT}`);
});
