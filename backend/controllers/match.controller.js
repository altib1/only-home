import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const findStudentByUserId = async (userId) => {
    const student = await prisma.students.findFirst({
      where: {
        userId: userId
      }
    });
  
    return student ? student.id : null;
  };

async function getFilterById (id)
{
    const studentid = await findStudentByUserId(id);
    const filters = await prisma.filters.findMany({
        where: {
            studentId: studentid
        },
    })
    return filters
}

async function getHousesByCityFilters (city){
    const Houses = await prisma.house.findMany({
        where: {
            city: city
        },
        include: {
            documents: true,
        },
    });
    return Houses;
}

export const getFilter = async (req, res, next) => {
    try {
      const studentId = await prisma.students
        .findUnique({
          where: {
            userId: req.user.id,
          },
        })
        .then((student) => student?.id);
  
      if (!studentId) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      const filters = await prisma.filters.findUnique({
        where: {
          studentId,
        },
      });
  
      res.status(200).json(filters || {});
    } catch (err) {
      next(err);
    }
  };

export const setFilter = async (req, res, next) =>
{
    const { houseType, rentType, city,  rentmin, rentmax } = req.body;
    const studentid = await findStudentByUserId(req.user.id);
    try {
        const existingFilters = await prisma.filters.findFirst({
            where: {
                studentId: studentid
            },
        });

        let newFilters;
        if (existingFilters) {
            newFilters = await prisma.filters.update({
                where: {
                    id: existingFilters.id
                },
                data: {
                    houseType,
                    rentType,
                    city,  
                    rentmin, 
                    rentmax
                },
            });
        } else {
            newFilters = await prisma.filters.create({
                data: {
                    houseType,
                    rentType,
                    city,  
                    rentmin, 
                    rentmax,
                    studentId: studentid
                },
            });
        }
        res.status(201).json(newFilters);
    } catch (err) {
        next(err);
    }
}

function matchHouses(houses, filter) {
    const scoredHouses = houses.map(house => {
        let score = 0;
        if (filter.houseType && house.type === filter.houseType) score += 1;
        if (filter.rentType && house.rentingType === filter.rentType) score += 1;
        if (filter.city && house.city === filter.city) score += 1;
        if (filter.rentmin && filter.rentmax && house.rent >= filter.rentmin && house.rent <= filter.rentmax) score += 1;
        return { ...house, score };
    });
    scoredHouses.sort((a, b) => b.score - a.score);
    return scoredHouses;
}

export const HousesListFilteredAndSort = async (req, res, next) => {
    try {
      const studentid = await findStudentByUserId(req.user.id);
      const filters = await prisma.filters.findFirst({
        where: {
          studentId: studentid,
        },
      });
  
      // Build the where clause dynamically
      const whereClause = {};
  
      if (filters) {
        whereClause.AND = [];
  
        if (filters.city) {
            whereClause.AND.push({
                city: {
                  equals: filters.city,
                },
              });
        }
  
        if (filters.houseType) {
          whereClause.AND.push({
            type: filters.houseType,
          });
        }
  
        if (filters.rentType) {
          whereClause.AND.push({
            rentingType: filters.rentType,
          });
        }
  
        // Use OR logic for rent type (optional filter)
        whereClause.AND.push({
          rentingType: filters.rentType ? { in: [filters.rentType] } : { in: [''] },
        });
  
        if (filters.rentmin) {
          whereClause.AND.push({
            rent: { gte: filters.rentmin },
          });
        }
  
        if (filters.rentmax) {
          whereClause.AND.push({
            rent: Object.assign({}, whereClause.rent || {}, { lte: filters.rentmax }),
          });
        }
  
        // Check if there are conditions in the AND array
        if (whereClause.AND.length === 0) {
          delete whereClause.AND;
        }
      }

  
      let housesByCity = await prisma.house.findMany({
        where: whereClause,
        include: {
          documents: true,
        },
      });
  
      // Get the houses that the user has already liked
      const likedHouses = await prisma.likedByStudents.findMany({
        where: {
          studentId: req.user.id,
          likes: true,
        },
      });
  
      // Filter out liked houses
      housesByCity = housesByCity.filter(
        (house) => !likedHouses.some((likedHouse) => likedHouse.housePublicationId === house.id)
      );
  
      res.status(200).json(housesByCity);
    } catch (err) {
      next(err);
    }
  };
  
  
  

export const StudentLikesTheHousePublication = async (req, res, next) => {
    try {
        const studentId = await findStudentByUserId(req.user.id);

        if (!studentId) {
            return res.status(400).json({ error: 'Student not found' });
        }

        const { housePublicationId } = req.body;

        const newLike = await prisma.likedByStudents.create({
            data: {
                studentId: studentId,
                housePublicationId: housePublicationId,
                likes: true
            }
        });

        res.status(200).json(newLike);
    } catch (err) {
        next(err);
    }
}