import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import config from '@/config/jwt'

const db = new PrismaClient();

function generateToken(params = {}) {
    return jwt.sign(params, config.secret, {
        expiresIn: config.expiresIn,
    });
}

export default {
    async authenticate(req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await db.user.findUnique({ where: { email } });

        if (!user)
            return res.status(400).send({ error: 'User not found' });

        if (!await bcrypt.compare(password, user.password))
            return res.status(400).send({ error: 'Invalid password' });

        user.password = undefined;

        const token = generateToken({ id: user.id });

        res.send({
            user,
            token
        });
    },
};
