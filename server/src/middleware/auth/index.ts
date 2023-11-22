import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '@/config/jwt';

export default function (req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).send({ error: 'No token provided' });

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
        return res.status(401).send({ error: 'Token error' });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ error: 'Token malformatted' });
    }
    const secret = config.secret;

    if (!secret) {
        throw new Error('JWT secret must be defined');
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) return res.status(401).send({ error: 'Token invalid' });

        if (!decoded || typeof decoded === 'string') {
            return res.status(401).send({ error: 'Token invalid' });
        }

        req.userId = decoded.id;
        return next();
    });

};
