import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function findStudentByUserId(id) {
    const student = await prisma.user.findUnique({
        where : {
            id : id,
        },
    })
    return student
}

async function getFilterById (id)
{
    studentid = findStudentByUserId(id);
        const filters = await prisma.filters.findUnique({
            where: {
                id:studentid
            },
        })
        return filters
}

async function getHousesByCityFilters (city){

        const Houses = await prisma.filters.findUnique({
            where: {
                city:city
            },
        });
        return Houses;
}

export const setFilter = async (req, res, next) =>
{
    const { type, city,  rentmin, rentmax } = req.body;
    studentid = findStudentByUserId(req.user.id);
    try {
        const newFilters = await prisma.filters.create({
            data: {
                type,
                city,
                rentmin,
                rentmax,
                studentid,
                numberOfRooms,
                totalAreaSizeMin,
                totalAreaSizeMax,
                furnished
            },
        });
        res.status(201).json(newFilters);
    } catch (err) {
        next(err);
    }
}

function matchHouses(houses, filter) {
    const scoredHouses = houses.map(house => {
      let score = 0;
      if (house.type === filter.type) score += 1;
      if (house.rent >= filter.rentmin && house.rent <= filter.rentmax) score += 1;
      if (house.numberOfRooms === filter.numberOfRooms) score +=1;
      if (house.furnished === filter.furnished) score +=1;
      if (house.totalAreaSize >= filter.totalAreaSizeMin && house.totalAreaSize <= filter.totalAreaSizeMax) score += 1;
      return { ...house, score };
    });
    scoredHouses.sort((a, b) => b.score - a.score);
    return scoredHouses;
  }

export const HousesListFilteredAndSort = async (req, res, next) =>
{
    try {
        filters = getFilterById(req.user.id);
        housesByCity = getHousesByCityFilters(filters.city);
        res.status(201).json(matchHouses(housesByCity, filters));
    } 
    catch (err) {
        next(err);
    }
}