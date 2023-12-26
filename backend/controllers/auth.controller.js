import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const signup = async (req, res, next) => {
    const { firstName, lastName,  email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    try {
        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
            },
        });
        res.status(201).json(newUser);
    } catch (err) {
        next(err);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const valideUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!valideUser) {
            return next(errorHandler(404, "User not found"));
        }
        const validPassword = bcryptjs.compareSync(password, valideUser.password);
        if (!validPassword) {
            return next(errorHandler(401, "Wrong credentials!"));
        }
        const token = jwt.sign({ id: valideUser.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        const { password: pass, ...rest } = valideUser;
        res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);
    } catch (err) {
        next(err);
    }
};