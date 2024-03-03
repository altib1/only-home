import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import authRouter from './routes/auth.route.js';
import config from './config/Config.js';
import registerRouter from './routes/register.route.js';
import locationsRouter from './routes/locations.route.js';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const app = express();

const prisma = new PrismaClient();

async function connectToDatabase() {
  try {
    await prisma.$connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET, // Replace with your own secret key
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const user = await prisma.user.findFirst({
        where: {
          id: jwtPayload.id,
        },
      });

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

app.use(cors()); // Enable CORS

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api/auth", authRouter );

app.use("/api/account/information", registerRouter);
app.use("/api/locations", locationsRouter);

// Serve static files from the "uploads" directory
app.use('/uploads', express.static('uploads'));

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({ 
  success: false,
  statusCode, 
  message, 
  });
});

// Connect to the database
connectToDatabase();

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Send back a JSON response
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: req.app.get('env') === 'development' ? err : {}
  });
});

app.listen(config.APP_PORT); // Listen on port defined in environment
console.log(`Server listening on port ${config.APP_PORT}, using Prisma for database connection.`);

// Close Prisma connection before application terminates
app.on('beforeExit', async () => {
  await prisma.$disconnect();
});

export default app;