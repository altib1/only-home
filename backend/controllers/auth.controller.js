import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { passwordResetEmailHTML } from '../components/passwordResetEmail.js';

// Create a Nodemailer transporter using MailHog's SMTP settings
const transporter = nodemailer.createTransport({
  host: 'mailhog',
  port: 1025, // MailHog's SMTP port
  ignoreTLS: true, // To ignore TLS issues, as MailHog uses non-secure SMTP
});

function generateToken(userId) {
  const payload = { sub: userId };
  const options = { expiresIn: '1h' };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

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
        const token = generateToken(newUser.id);
        res.status(201).json({ user: newUser, access_token: token });
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
        res.cookie("access_token", token, { httpOnly: true, sameSite: 'lax', secure: true }).status(200).json({ user: rest, access_token: token });
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
            res.cookie('access_token', token, { httpOnly: true, sameSite: 'lax', secure: true }).status(200).json({ user: rest, access_token: token });
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
            res.cookie('access_token', token, { httpOnly: true, sameSite: 'lax', secure: true }).status(200).json({ user: rest, access_token: token });
          }
    } catch (err) {
        next(err);
    }
};


export const requestPasswordReset = async (req, res, next) => {
    const { email } = req.body;
    
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
  
      if (!user) {
        return next(errorHandler(404, "Le email n'existe pas chez nous"));
      }
  
      // Generate a unique token for password reset
      const resetToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  
      // Get the HTML email template content
      const emailBody = passwordResetEmailHTML.replace('${resetToken}', resetToken);

      await transporter.sendMail({
        from: 'onlyhomedev@gmail.com', // Replace with your email address
        to: email,
        subject: 'Password Reset',
        html: emailBody,
        //text: `Reset your password by clicking on this link: http://localhost:8080/password-reset-confirmation?token=${resetToken}`,
      });
  
      res.status(200).json({ message: 'Le lien a été envoyée avec succes' });
    } catch (err) {
      next(err);
    }
  };
  
  export const resetPassword = async (req, res, next) => {
    const { token, newPassword } = req.body;
  
    try {
      // Verify the token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  
      // Here, you'd typically check if the token is valid and not expired
      // You might also want to check if the token matches the user's stored resetToken in the database
  
      // Update the user's password with the new password
      const hashedPassword = bcryptjs.hashSync(newPassword, 10);
      await prisma.user.update({
        where: {
          id: decodedToken.userId,
        },
        data: {
          password: hashedPassword,
        },
      });
  
      res.status(200).json({ message: 'Password reset successful' });
    } catch (err) {
      next(err);
    }
  };