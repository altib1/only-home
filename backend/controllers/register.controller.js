import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

// Create a Nodemailer transporter using MailHog's SMTP settings
const transporter = nodemailer.createTransport({
  host: 'mailhog',
  port: 1025, // MailHog's SMTP port
  ignoreTLS: true, // To ignore TLS issues, as MailHog uses non-secure SMTP
});


export const register = async (req, res, next) => {
  console.log('test');
  let existingUser;

  if (req.userId) {
    existingUser = await prisma.user.findUnique({
      where: {
        id: req.userId,
      },
    });
  }

  if (!existingUser) {
    return next(errorHandler(404, "User doesn't exist!"));
  }

  // Extracting file paths from multer
  const identityDocumentPath = req.files['identityDocument'] && req.files['identityDocument'][0]
  ? req.files['identityDocument'][0].path
  : '';

const visaleDocumentPath = req.files['visaleDocument'] && req.files['visaleDocument'][0]
  ? req.files['visaleDocument'][0].path
  : '';

const addressJustificationPath = req.files['addressJustificationGuarantor'] && req.files['addressJustificationGuarantor'][0]
  ? req.files['addressJustificationGuarantor'][0].path
  : '';

const guarantorIncomeJustificationPath = req.files['guarantorIncomeJustification'] && req.files['guarantorIncomeJustification'][0]
  ? req.files['guarantorIncomeJustification'][0].path
  : '';

const schoolCertificatePath = req.files['schoolCertificate'] && req.files['schoolCertificate'][0]
  ? req.files['schoolCertificate'][0].path
  : '';
const guarantorIdentityDocumentPath = req.files['identityDocumentGuarantor'] && req.files['identityDocumentGuarantor'][0]
  ? req.files['identityDocumentGuarantor'][0].path
  : '';    

  // Extracting other fields from req.body
  const {
    firstName,
    lastName,
    email,
    birthDay,
    budget,
    city,
    identityDocument,
    gender,
    hasPets,
    hobbiesAndInterests,
    housingType,
    identityDocumentGuarantor,
    guarantorIncomeJustification,
    ownerAnimalAcceptance,
    ownerSmokeAcceptance,
    password,
    phoneNumber,
    postalCode,
    preferredHousing,
    addressJustificationGuarantor,
    schoolName,
    schoolStatus,
    searchType,
    smokingHabit,
    status,
    visaleDocument,
    warrantyPeople
  } = req.body;

  try {
    let newUser;

    if (status === 'etudiant') {
      // Update the existing user based on email
      newUser = await prisma.user.update({
        where: {
          id: req.userId,
        },
        data: {
          firstName,
          lastName,
          birthDay: new Date(birthDay),
          gender,
          city,
          postalCode,
          phoneNumber: parseInt(phoneNumber, 0),
          students: {
            create: {
              Dossier: {
                create: {
                  dateDossier: new Date(),
                  validation: false,
                  schoolName,
                  schoolStatus,
                  warrantyPeople: warrantyPeople === 'true',
                  hasPets: hasPets === 'true',
                  smokingHabit,
                  preferredHousing,
                  hobbiesAndInterests,
                  housingType,
                  searchType,
                  budget: parseInt(budget, 2),
                  documents: {
                    create: [
                      {
                        libelle: 'Identity Document',
                        type: 'identity',
                        filePath: identityDocumentPath,
                        publicationDate: new Date(),
                        modificationDate: new Date(),
                      },
                      {
                        libelle: 'Visale Document',
                        type: 'visale',
                        filePath: visaleDocumentPath,
                        publicationDate: new Date(),
                        modificationDate: new Date(),
                      },
                      {
                        libelle: 'guarantor Address Justification',
                        type: 'guarantor_address_justification',
                        filePath: addressJustificationPath,
                        publicationDate: new Date(),
                        modificationDate: new Date(),
                      },
                      {
                        libelle: 'guarantor Identity Justification',
                        type: 'guarantor_identity_justification',
                        filePath: guarantorIdentityDocumentPath,
                        publicationDate: new Date(),
                        modificationDate: new Date(),
                      },
                      {
                        libelle: 'School Certificate',
                        type: 'school_certificate',
                        filePath: schoolCertificatePath,
                        publicationDate: new Date(),
                        modificationDate: new Date(),
                      },
                      {
                        libelle: 'guarantor Income Justification',
                        type: 'guarantor_income__justification',
                        filePath: guarantorIncomeJustificationPath,
                        publicationDate: new Date(),
                        modificationDate: new Date(),
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        include: {
          students: {
            include: {
              Dossier: {
                include: {
                  documents: true,
                },
              },
            },
          },
        },
      });
    } else if (status === 'proprietaire') {
      // Update the existing user based on email
      newUser = await prisma.user.update({
        where: {
          id: req.userId,
        },
        data: {
          firstName,
          lastName,
          birthDay: new Date(birthDay),
          gender,
          city,
          postalCode,
          phoneNumber: parseInt(phoneNumber, 0),
          owner: {
            create: {
              ownerAnimalAcceptance: ownerAnimalAcceptance === 'true',
              ownerSmokeAcceptance: ownerSmokeAcceptance === 'true',
              documents: {
                create: [
                  {
                    libelle: 'Identity Document (Owner)',
                    type: 'identity_owner',
                    filePath: identityDocumentPath,
                    publicationDate: new Date(),
                    modificationDate: new Date(),
                  },
                ],
              },
            },
          },
        },
        include: {
          owner: {
            include: {
              documents: true,
            },
          },
        },
      });
    }

    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};