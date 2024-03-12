import express from "express";
import passport from 'passport';

import { setFilter, HousesListFilteredAndSort, StudentLikesTheHousePublication, getFilter} from "../controllers/match.controller.js";

const router = express.Router();
const requireAuth = passport.authenticate('jwt', { session: false });

router.post('/set-filter', requireAuth, setFilter);
router.get('/get-filter', requireAuth, getFilter);
router.get('/locations', requireAuth, HousesListFilteredAndSort);
router.post('/liked', requireAuth, StudentLikesTheHousePublication);

export default router;