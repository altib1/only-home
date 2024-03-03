import express from "express";
import { createLocations, getHousePublications, getHousePublication, updateHousePublication, deleteHousePublication, getOwnerHousePublications } from "../controllers/Locations.controller.js";
import multer from 'multer';
import passport from 'passport';

const router = express.Router();
// Multer middleware to handle file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname)
    },
  })
const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 5 }, fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
});

const requireAuth = passport.authenticate('jwt', { session: false });

router.post('/create', requireAuth,
  upload.fields([
    { name: 'OwnerJustification', maxCount: 1 },
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1},
    { name: 'image5', maxCount: 1},
  ]), 
  createLocations
);

// Retrieve all house publications
router.get('/', getHousePublications);

// Retrieve current owners house publications
router.get('/owner/:id', requireAuth, getOwnerHousePublications);

// Retrieve a specific house publication
router.get('/:id', getHousePublication);


// Update a house publication
router.put('/update/:id', requireAuth,
  upload.fields([
    { name: 'OwnerJustification', maxCount: 1 },
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
    { name: 'image5', maxCount: 1 },
  ]),
  updateHousePublication
);

// Delete a house publication
router.delete('/delete/:id', requireAuth, deleteHousePublication);

export default router;