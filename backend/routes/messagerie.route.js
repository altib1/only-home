import express from "express";
import { getOwnerHouseStudents, generatePdfContract } from "../controllers/Messagerie.controller.js";
import passport from 'passport';

const router = express.Router();

const requireAuth = passport.authenticate('jwt', { session: false });

// Retrieve current owners house publications
router.get('/owner/:id', requireAuth, getOwnerHouseStudents);
// Generate a pdf contract
router.post('/contract', requireAuth, generatePdfContract);


export default router;