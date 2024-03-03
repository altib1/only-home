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


export const createLocations = async (req, res, next) => {
  let existingUser;

  if (req.user.id) {
    existingUser = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });
  }

  if (!existingUser) {
    return next(errorHandler(404, "User doesn't exist!"));
  }

  if (existingUser.role !== 'owner') {
    return next(errorHandler(403, 'You are not authorized to create a location'));
  }

  // Extracting file paths from multer
  const OwnerJustificationPath = req.files['OwnerJustification'] && req.files['OwnerJustification'][0]
  ? req.files['OwnerJustification'][0].path
  : '';

  const image1Path = req.files['image1'] && req.files['image1'][0]
  ? req.files['image1'][0].path
  : '';

  const image2Path = req.files['image2'] && req.files['image2'][0]
  ? req.files['image2'][0].path
  : '';
  const image3Path = req.files['image3'] && req.files['image3'][0]
  ? req.files['image3'][0].path
  : '';
  const image4Path = req.files['image4'] && req.files['image4'][0]
  ? req.files['image4'][0].path
  : '';
  const image5Path = req.files['image5'] && req.files['image5'][0]
  ? req.files['image5'][0].path
  : '';


  // Extracting other fields from req.body
  const {
    housingType,
    rentingType,
    furnished,
    housingAddress,
    postalCode,
    city,
    surfaceSize,
    numberOfRooms,
    OwnerJustification,
    description,
    housingOptions,
    energyPerformance,
    pollutionPerformance,
    monthlyCosts,
    otherCosts,
    garatysCosts,
    image1,
    image2,
    image3,
    image4,
    image5,
  } = req.body;


  try {
    const newHousePublication = await prisma.housePublication.create({
      data: {
        premium: false,
        owner: {
          connect: {
            id: req.user.id,
          },
        },
        house: {
          create: {
            address: housingAddress,
            postalCode,
            city,
            type: housingType,
            totalAreaSize: parseInt(surfaceSize),
            numberOfRooms: parseInt(numberOfRooms),
            furnished,
            rentingType,
            description,
            energyPerformance,
            pollutionPerformance,
            rent: parseInt(monthlyCosts),
            tax: parseInt(otherCosts),
            rentIncludingTax: parseInt(monthlyCosts) + parseInt(otherCosts),
            cautionTotal: parseInt(garatysCosts),
            housingOptions,
            documents: {
              create: [
                {
                  libelle: 'Owner Justification',
                  type: 'owner_justification',
                  filePath: OwnerJustificationPath,
                  publicationDate: new Date(),
                  modificationDate: new Date(),
                },
                {
                  libelle: 'Image 1',
                  type: 'image',
                  filePath: image1Path,
                  publicationDate: new Date(),
                  modificationDate: new Date(),
                },
                {
                  libelle: 'Image 2',
                  type: 'image',
                  filePath: image2Path,
                  publicationDate: new Date(),
                  modificationDate: new Date(),
                },
                {
                  libelle: 'Image 3',
                  type: 'image',
                  filePath: image3Path,
                  publicationDate: new Date(),
                  modificationDate: new Date(),
                },
                {
                  libelle: 'Image 4',
                  type: 'image',
                  filePath: image4Path,
                  publicationDate: new Date(),
                  modificationDate: new Date(),
                },
                {
                  libelle: 'Image 5',
                  type: 'image',
                  filePath: image5Path,
                  publicationDate: new Date(),
                  modificationDate: new Date(),
                },
              ],
            },
          },
        },
      },
    });
    res.status(201).json(newHousePublication);
  } catch (err) {
    next(err);
  }
};


export const getHousePublication = async (req, res, next) => {
  const housePublicationId = req.params.id;

  try {
    const housePublication = await prisma.housePublication.findUnique({
      where: {
        id: parseInt(housePublicationId),
      },
      include: {
        house: {
          include: {
            documents: true,
          },
        },
      },
    });

    if (!housePublication) {
      return next(errorHandler(404, 'House publication not found'));
    }

    res.status(200).json(housePublication);
  } catch (err) {
    next(err);
  }
};

export const getOwnerHousePublications = async (req, res, next) => {
  try {
    const ownerId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const pageSize = 8;
    const skip = (page - 1) * pageSize;

    const totalPublications = await prisma.housePublication.count({
      where: {
        ownerId: ownerId,
      },
    });
    
    const ownerHousePublications = await prisma.housePublication.findMany({
      where: {
        ownerId: ownerId,
      },
      include: {
        house: {
          include: {
            documents: true,
          },
        },
      },
      skip: skip,
      take: pageSize,
    });

    // Filter publications to include only those owned by the authenticated user
    const filteredPublications = ownerHousePublications.filter((publication) => {
      return publication.ownerId === ownerId;
    });

    res.status(200).json({
      publications: filteredPublications,
      totalPublications: totalPublications,
    });
  } catch (err) {
    next(err);
  }
};



export const getHousePublications = async (req, res, next) => {
  try {
    const housePublications = await prisma.housePublication.findMany({
      include: {
        house: {
          include: {
            documents: true,
            owner: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    res.status(200).json(housePublications);
  } catch (err) {
    next(err);
  }
};

export const updateHousePublication = async (req, res, next) => {
  const housePublicationId = req.params.id;

  // Extracting file paths from multer
  const OwnerJustificationPath = req.files['OwnerJustification'] && req.files['OwnerJustification'][0]
  ? req.files['OwnerJustification'][0].path
  : '';

  const image1Path = req.files['image1'] && req.files['image1'][0]
  ? req.files['image1'][0].path
  : '';

  const image2Path = req.files['image2'] && req.files['image2'][0]
  ? req.files['image2'][0].path
  : '';
  const image3Path = req.files['image3'] && req.files['image3'][0]
  ? req.files['image3'][0].path
  : '';
  const image4Path = req.files['image4'] && req.files['image4'][0]
  ? req.files['image4'][0].path
  : '';
  const image5Path = req.files['image5'] && req.files['image5'][0]
  ? req.files['image5'][0].path
  : '';


  // Extracting other fields from req.body
  const {
    housingType,
    rentingType,
    furnished,
    housingAddress,
    postalCode,
    city,
    surfaceSize,
    numberOfRooms,
    OwnerJustification,
    description,
    housingOptions,
    energyPerformance,
    pollutionPerformance,
    monthlyCosts,
    otherCosts,
    garatysCosts,
    image1,
    image2,
    image3,
    image4,
    image5,
  } = req.body;
  
  try {
    // Check if the house publication exists
    const existingHousePublication = await prisma.housePublication.findUnique({
      where: {
        id: parseInt(housePublicationId),
      },
    });

    if (!existingHousePublication) {
      return next(errorHandler(404, 'House publication not found'));
    }

    // Update the house publication
    const updatedHousePublication = await prisma.housePublication.update({
      where: {
        id: parseInt(housePublicationId),
      },
      data: {
        premium: false,
        house: {
          update: {
            address: housingAddress,
            postalCode,
            city,
            type: housingType,
            totalAreaSize: parseInt(surfaceSize),
            numberOfRooms: parseInt(numberOfRooms),
            furnished,
            rentingType,
            description,
            energyPerformance,
            pollutionPerformance,
            rent: parseInt(monthlyCosts),
            tax: parseInt(otherCosts),
            rentIncludingTax: parseInt(monthlyCosts) + parseInt(otherCosts),
            cautionTotal: parseInt(garatysCosts),
            housingOptions,
            documents: {
              updateMany: [
                {
                  where: {
                    type: 'owner_justification',
                  },
                  data: {
                    filePath: OwnerJustificationPath,
                    modificationDate: new Date(),
                  },
                },
                {
                  where: {
                    type: 'image',
                    libelle: 'Image 1',
                  },
                  data: {
                    filePath: image1Path,
                    modificationDate: new Date(),
                  },
                },
                {
                  where: {
                    type: 'image',
                    libelle: 'Image 2',
                  },
                  data: {
                    filePath: image2Path,
                    modificationDate: new Date(),
                  },
                },
                {
                  where: {
                    type: 'image',
                    libelle: 'Image 3',
                  },
                  data: {
                    filePath: image3Path,
                    modificationDate: new Date(),
                  },
                },
                {
                  where: {
                    type: 'image',
                    libelle: 'Image 4',
                  },
                  data: {
                    filePath: image4Path,
                    modificationDate: new Date(),
                  },
                },
                {
                  where: {
                    type: 'image',
                    libelle: 'Image 5',
                  },
                  data: {
                    filePath: image5Path,
                    modificationDate: new Date(),
                  },
                },
              ],
            },
          },
        },
      },
      include: {
        house: {
          include: {
            documents: true,
          },
        },
      },
    });

    res.status(200).json(updatedHousePublication);
  } catch (err) {
    // Handle specific update-related errors
    if (err.code === 'P2025') {
      // P2025: Unique constraint failed for fields
      return next(errorHandler(400, 'Validation error: Unique constraint failed.'));
    }

    next(err);
  }
};

export const deleteHousePublication = async (req, res, next) => {
  const housePublicationId = req.params.id;
  console.log(housePublicationId);

  try {
    const existingHousePublication = await prisma.housePublication.findUnique({
      where: {
        id: parseInt(housePublicationId),
      },
      select: {
        ownerId: true,
      },
    });

    if (!existingHousePublication) {
      return next(errorHandler(404, 'House publication not found'));
    }

    // Check if the authenticated user is the owner of the publication
    if (existingHousePublication.ownerId !== req.user.id) {
      return next(errorHandler(403, 'You are not authorized to delete this publication'));
    }

    // Delete the house publication
    await prisma.housePublication.delete({
      where: {
        id: parseInt(housePublicationId),
      },
    });

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
