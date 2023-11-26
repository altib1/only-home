module.exports = {
  // Use the POSTGRES_URL environment variable for database connection
  DB: process.env.POSTGRES_URL,

  // Set the application port using APP_PORT environment variable
  APP_PORT: process.env.APP_PORT || 8080,
};