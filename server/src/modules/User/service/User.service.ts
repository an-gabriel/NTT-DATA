import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import config from '@/config/jwt'
import { IUser } from '@/modules/User/interfaces'

const db = new PrismaClient();

export default class AuthService {
    static async authenticate(email: string, password: string): Promise<{ user: IUser; token: string }> {
        const user = await db.user.findUnique({ where: { email } });

        if (!user) {
            throw new Error('User not found');
        }

        if (!await bcrypt.compare(password, user.password)) {
            throw new Error('Invalid password');
        }

        user.password = undefined;

        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: config.expiresIn,
        });

        return { user, token };
    }
}
