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


export const getOwnerHouseStudents = async (req, res, next) => {
  try {
    const ownerId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const pageSize = 1;
    const skip = (page - 1) * pageSize;


    const totalLikedStudents = await prisma.likedByStudents.count({
      where: {
        housePublication: {
          ownerId: ownerId,
        },
      },
    });
    

    const ownerHousePublications = await prisma.housePublication.findMany({
      where: {
        ownerId: ownerId,
      },
      include: {
        house: true,
        likedByStudents: {
          include: {
            student: {
              include: {
                user: true,
                Dossier: true,
              },
            },
            housePublication: {
              include: {
                house: true,
              },
            },
          },
        },
      },
      skip: skip,
      take: pageSize,
    });
    
    // Extracting liked students from each house publication
    const likedStudentsByHouses = ownerHousePublications.map((publication) => {
      return publication.likedByStudents.map((like) => ({
        id: like.id,
        student: like.student,
        housePublication: like.housePublication,
      }));
    });

    const isLastPage = totalLikedStudents <= page * pageSize;
    
    // Flatten the array of arrays into a single array
    const allLikedStudents = likedStudentsByHouses.flat();
    
    res.status(200).json({
      likedStudents: allLikedStudents,
      totalLikedStudents: totalLikedStudents,
      isLastPage: isLastPage,
    });
  } catch (err) {
    next(err);
  }
};

export const generatePdfContract = async (req, res, next) => {
  try {
    const { studentId, housePublicationId, startingDate, contractDuration, rentAmount, rentTaxesAmount } = req.body;
    const student = await prisma.students.findUnique({
      where: {
        id: Number(studentId),
      },
      include: {
        user: true,
        Dossier: true,
      },
    });
    const housePublication = await prisma.housePublication.findUnique({
      where: {
        id: Number(housePublicationId),
      },
      include: {
        house: true,
        owner: {
          include: {
            user: true,
          },
        },
      },
    });

    const contractData = {
      studentName: student.user.firstName,
      studentLastName: student.user.lastName,
      studentPhone: student.user.phone,
      studentAddress: student.user.address,
      studentCity: student.user.city,
      studentPostalCode: student.user.postalCode,
      studentCountry: student.user.country,
      houseAddress: housePublication.house.address,
      houseCity: housePublication.house.city,
      housePostalCode: housePublication.house.postalCode,
      houseCountry: housePublication.house.country,
      houseType: housePublication.house.type,
      houseSurface: housePublication.house.totalAreaSize,
      houseRooms: housePublication.house.rooms,
      houseFurnished: housePublication.house.furnished,
      houseDescription: housePublication.house.description,
      housePerformanceEnergetique: housePublication.house.energyPerformance,
      housePollutionEnergetique: housePublication.house.pollutionPerformance,
      houseOptions: housePublication.house.housingOptions,
      houseCautionTotal: housePublication.house.cautionTotal,
      ownerName: housePublication.owner.user.firstName,
      ownerLastName: housePublication.owner.user.lastName,
      ownerPhone: housePublication.owner.user.phone,
      ownerAddress: housePublication.owner.user.address,
      ownerCity: housePublication.owner.user.city,
      ownerPostalCode: housePublication.owner.user.postalCode,
      ownerCountry: housePublication.owner.user.country,
      startingDate: startingDate,
      contractDuration: contractDuration,
      rentAmount: rentAmount,
      rentTaxesAmount: rentTaxesAmount,
    };

    res.status(200).json({
      success: true,
      message: 'Contract data generated successfully',
      contractData,
    });
  } catch (err) {
    next(err);
  }
}