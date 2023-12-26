-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "birthDay" DATE,
    "email" TEXT NOT NULL,
    "phoneNumber" INTEGER,
    "address" TEXT,
    "postalCode" TEXT,
    "city" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Students" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Owner" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dossier" (
    "id" SERIAL NOT NULL,
    "dateDossier" TIMESTAMP(3) NOT NULL,
    "validation" BOOLEAN NOT NULL,
    "dossierId" INTEGER NOT NULL,

    CONSTRAINT "Dossier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Documents" (
    "id" SERIAL NOT NULL,
    "libelle" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "fileURL" TEXT NOT NULL,
    "publicationDate" TIMESTAMP(3) NOT NULL,
    "modificationDate" TIMESTAMP(3) NOT NULL,
    "dossierId" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "Documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LikedByStudents" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "houseId" INTEGER NOT NULL,
    "likes" BOOLEAN NOT NULL,

    CONSTRAINT "LikedByStudents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "House" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "postalCode" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "constructionDate" TIMESTAMP(3) NOT NULL,
    "totalAreaSize" INTEGER NOT NULL,
    "paymentId" INTEGER NOT NULL,
    "housePublicationId" INTEGER NOT NULL,

    CONSTRAINT "House_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrincipalRooms" (
    "id" SERIAL NOT NULL,
    "surface" INTEGER NOT NULL,
    "houseId" INTEGER,

    CONSTRAINT "PrincipalRooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rooms" (
    "id" SERIAL NOT NULL,
    "surface" INTEGER NOT NULL,
    "houseId" INTEGER,

    CONSTRAINT "Rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kitchen" (
    "id" SERIAL NOT NULL,
    "surface" INTEGER NOT NULL,
    "refrigerator" BOOLEAN NOT NULL,
    "bakingOven" BOOLEAN NOT NULL,
    "sink" BOOLEAN NOT NULL,
    "bakingTray" BOOLEAN NOT NULL,
    "heatingType" TEXT NOT NULL,
    "waterHeatingType" TEXT NOT NULL,
    "suggestedFor" TEXT NOT NULL,
    "rentPrice" INTEGER NOT NULL,
    "otherFees" INTEGER NOT NULL,
    "rentPriceTTC" INTEGER NOT NULL,
    "houseId" INTEGER,

    CONSTRAINT "Kitchen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bathrooms" (
    "id" SERIAL NOT NULL,
    "surface" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "washingMachine" BOOLEAN NOT NULL,
    "dryingMachine" BOOLEAN NOT NULL,
    "houseId" INTEGER,

    CONSTRAINT "Bathrooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Garage" (
    "id" SERIAL NOT NULL,
    "surface" INTEGER NOT NULL,
    "houseId" INTEGER,

    CONSTRAINT "Garage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StorageRoom" (
    "id" SERIAL NOT NULL,
    "surface" INTEGER NOT NULL,
    "houseId" INTEGER,

    CONSTRAINT "StorageRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" SERIAL NOT NULL,
    "authorId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comments" TEXT NOT NULL,
    "ownerId" INTEGER,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HousePublication" (
    "id" SERIAL NOT NULL,
    "houseId" INTEGER NOT NULL,
    "premium" BOOLEAN NOT NULL,

    CONSTRAINT "HousePublication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL,
    "houseId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "studentsId" INTEGER NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Signatures" (
    "id" SERIAL NOT NULL,
    "signatureDate" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL,
    "studentId" INTEGER NOT NULL,
    "documentId" INTEGER NOT NULL,
    "studentsId" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "Signatures_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Students_userId_key" ON "Students"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_userId_key" ON "Owner"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Dossier_dossierId_key" ON "Dossier"("dossierId");

-- CreateIndex
CREATE UNIQUE INDEX "PrincipalRooms_houseId_key" ON "PrincipalRooms"("houseId");

-- CreateIndex
CREATE UNIQUE INDEX "Rooms_houseId_key" ON "Rooms"("houseId");

-- CreateIndex
CREATE UNIQUE INDEX "Kitchen_houseId_key" ON "Kitchen"("houseId");

-- CreateIndex
CREATE UNIQUE INDEX "Bathrooms_houseId_key" ON "Bathrooms"("houseId");

-- CreateIndex
CREATE UNIQUE INDEX "Garage_houseId_key" ON "Garage"("houseId");

-- CreateIndex
CREATE UNIQUE INDEX "StorageRoom_houseId_key" ON "StorageRoom"("houseId");

-- CreateIndex
CREATE UNIQUE INDEX "HousePublication_houseId_key" ON "HousePublication"("houseId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_houseId_key" ON "Payment"("houseId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_userId_key" ON "Payment"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_studentsId_key" ON "Payment"("studentsId");

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Owner" ADD CONSTRAINT "Owner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dossier" ADD CONSTRAINT "Dossier_dossierId_fkey" FOREIGN KEY ("dossierId") REFERENCES "Students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documents" ADD CONSTRAINT "Documents_dossierId_fkey" FOREIGN KEY ("dossierId") REFERENCES "Dossier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documents" ADD CONSTRAINT "Documents_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikedByStudents" ADD CONSTRAINT "LikedByStudents_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikedByStudents" ADD CONSTRAINT "LikedByStudents_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrincipalRooms" ADD CONSTRAINT "PrincipalRooms_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rooms" ADD CONSTRAINT "Rooms_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kitchen" ADD CONSTRAINT "Kitchen_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bathrooms" ADD CONSTRAINT "Bathrooms_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Garage" ADD CONSTRAINT "Garage_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StorageRoom" ADD CONSTRAINT "StorageRoom_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HousePublication" ADD CONSTRAINT "HousePublication_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_studentsId_fkey" FOREIGN KEY ("studentsId") REFERENCES "Students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Signatures" ADD CONSTRAINT "Signatures_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Documents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Signatures" ADD CONSTRAINT "Signatures_studentsId_fkey" FOREIGN KEY ("studentsId") REFERENCES "Students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Signatures" ADD CONSTRAINT "Signatures_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
