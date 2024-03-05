import express from "express";
import { setFilter, HousesListFilteredAndSort} from "../controllers/match.controller.js";

const router = express.Router();

router.post('/setFilter', setFilter);
router.get('/match',HousesListFilteredAndSort);

export default router;