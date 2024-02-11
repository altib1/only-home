import express from "express";
import { register } from "../controllers/register.controller.js";
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
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
});

const requireAuth = passport.authenticate('jwt', { session: false });

router.post('/register', requireAuth,
  upload.fields([
    { name: 'identityDocument', maxCount: 1 },
    { name: 'visaleDocument', maxCount: 1 },
    { name: 'addressJustificationGuarantor', maxCount: 1 },
    { name: 'guarantorIncomeJustification', maxCount: 1 },
    { name: 'schoolCertificate', maxCount: 1},
    { name: 'identityDocumentGuarantor', maxCount: 1},
  ]), 
  register
);

export default router;