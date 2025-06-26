/*
  Warnings:

  - Added the required column `totalSolved` to the `OjProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OjProfile" ADD COLUMN     "badge" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "easySolved" INTEGER,
ADD COLUMN     "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "maxRank" INTEGER,
ADD COLUMN     "maxRating" INTEGER,
ADD COLUMN     "mediumSolved" INTEGER,
ADD COLUMN     "rank" INTEGER,
ADD COLUMN     "rating" INTEGER,
ADD COLUMN     "totalContests" INTEGER,
ADD COLUMN     "totalSolved" INTEGER NOT NULL;
