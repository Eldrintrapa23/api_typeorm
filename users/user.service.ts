import bcrypt from 'bcryptjs';
import db from '../_helpers/db'; // Ensure the correct path
import { User } from '../users/user.model'; // Ensure correct import

export const userService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

// helper function moved up to avoid reference issues
async function getUser(id: number): Promise<User> {
    const user = await db.User.findByPk(id);
    if (!user) throw new Error('User not found');
    return user;
}

async function getAll(): Promise<User[]> {
    return await db.User.findAll();
}

async function getById(id: number): Promise<User> {
    return await getUser(id);
}

async function create(params: { email: string; password?: string; [key: string]: any }): Promise<void> {
    // validate
    if (await db.User.findOne({ where: { email: params.email } })) {
        throw new Error(`Email "${params.email}" is already registered`);
    }

    const user = new db.User(params);

    // hash password
    if (params.password) {
        user.passwordHash = await bcrypt.hash(params.password, 10);
    }

    // save user
    await user.save();
}

async function update(id: number, params: { username?: string; password?: string; [key: string]: any }): Promise<void> {
    const user = await getUser(id);

    // validate
    const usernameChanged = params.username && user.username !== params.username;
    if (usernameChanged && (await db.User.findOne({ where: { username: params.username } }))) {
        throw new Error(`Username "${params.username}" is already taken`);
    }

    // hash password if it was entered
    if (params.password) {
        params.passwordHash = await bcrypt.hash(params.password, 10);
    }

    // copy params to user and save
    Object.assign(user, params);
    await user.save();
}

async function _delete(id: number): Promise<void> {
    const user = await getUser(id);
    await user.destroy();
}
