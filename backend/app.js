// Importations des modules nécessaires
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
import messagerieRouter from './routes/messagerie.route.js';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

// Obtention du chemin absolu du répertoire de base de l'application
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Initialisation de l'application Express
const app = express();

// Création d'une nouvelle instance de PrismaClient pour interagir avec la base de données
const prisma = new PrismaClient();

// Fonction asynchrone pour établir une connexion à la base de données
async function connectToDatabase() {
  try {
    await prisma.$connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

// Configuration des options pour la stratégie JWT de Passport
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET, // Clé secrète pour le JWT
};

// Utilisation de la stratégie JWT pour l'authentification des utilisateurs
passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      // Recherche de l'utilisateur dans la base de données par son ID
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

// Activation des middlewares
app.use(cors()); // Activation de CORS pour les requêtes cross-origin
app.use(logger('dev')); // Logging des requêtes HTTP
app.use(express.json()); // Parsing des corps de requêtes JSON
app.use(express.urlencoded({ extended: false })); // Parsing des corps de requêtes URL-encoded
app.use(cookieParser()); // Parsing des cookies des requêtes
app.use(express.static(path.join(__dirname, 'public'))); // Servir les fichiers statiques depuis le répertoire "public"

// Définition des routes pour les différentes parties de l'API
app.use("/api/auth", authRouter);
app.use("/api/account/information", registerRouter);
app.use("/api/locations", locationsRouter);
app.use("/api/messagerie", messagerieRouter);
// Serve static files from the "uploads" directory
app.use('/uploads', express.static('uploads'));

// Gestion des erreurs pour les routes non trouvées (404) et les erreurs serveur (500)
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: {},
  });
});

// Démarrage du serveur sur le port spécifié dans la configuration
app.listen(config.APP_PORT, () => {
  console.log(`Server listening on port ${config.APP_PORT}, using Prisma for database connection.`);
});

// Fermeture de la connexion à la base de données Prisma avant l'arrêt de l'application
app.on('beforeExit', async () => {
  await prisma.$disconnect();
});

export default app;
