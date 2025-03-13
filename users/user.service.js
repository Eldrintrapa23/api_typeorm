"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = __importDefault(require("../_helpers/db")); // Ensure the correct path
exports.userService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db_1.default.User.findAll();
    });
}
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield getUser(id);
    });
}
function create(params) {
    return __awaiter(this, void 0, void 0, function* () {
        // validate
        if (yield db_1.default.User.findOne({ where: { email: params.email } })) {
            throw new Error(`Email "${params.email}" is already registered`);
        }
        const user = new db_1.default.User(params);
        // hash password
        user.passwordHash = yield bcryptjs_1.default.hash(params.password, 10);
        // save user
        yield user.save();
    });
}
function update(id, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield getUser(id);
        // Validate
        const usernameChanged = params.username && user.username !== params.username;
        if (usernameChanged && (yield db_1.default.User.findOne({ where: { username: params.username } }))) {
            throw `Username "${params.username}" is already taken`;
        }
        // Hash password if it was entered
        if (params.password) {
            params.passwordHash = yield bcryptjs_1.default.hash(params.password, 10);
        }
        // Copy params to user and save
        Object.assign(user, params);
        yield user.save();
    });
}
function _delete(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield getUser(id);
        yield user.destroy();
    });
}
// helper functions
function getUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield db_1.default.User.findByPk(id);
        if (!user)
            throw new Error('User not found');
        return user;
    });
}
