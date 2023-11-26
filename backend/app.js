const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const config = require('./config/Config');
const routes = require('./routes/Routes');

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


app.use(cors()); // Enable CORS

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/todos', routes);

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

module.exports = app;