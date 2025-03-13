"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("rootpath");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const users_controller_1 = __importDefault(require("./users/users.controller"));
const error_handler_1 = __importDefault(require("./_middleware/error-handler"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
// API routes
app.use('/users', users_controller_1.default);
// Global error handler
app.use((err, req, res, next) => {
    (0, error_handler_1.default)(err, req, res, next);
});
// Start server
const port = process.env.NODE_ENV === 'production' ? Number(process.env.PORT) || 80 : 4000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
