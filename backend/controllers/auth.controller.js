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



export const google = async (req, res, next) => {
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: req.body.email,
            },
        });

        if (existingUser) {
            const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET);
            const { password, ...rest } = existingUser;
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const parts = req.body.name.split(' ');
            const newUser = await prisma.user.create({
                data: {
                    firstName: parts[0],
                    lastName: parts[1],
                    email: req.body.email,
                    password: hashedPassword
                },
            });

            const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET);
            const { password, ...rest } = newUser;
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
        }
    } catch (err) {
        next(err);
    }
};