/*
  Warnings:

  - Made the column `easySolved` on table `OjProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `maxRank` on table `OjProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `maxRating` on table `OjProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `mediumSolved` on table `OjProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rank` on table `OjProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rating` on table `OjProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `totalContests` on table `OjProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "OjProfile" ADD COLUMN     "hardSolved" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "easySolved" SET NOT NULL,
ALTER COLUMN "easySolved" SET DEFAULT 0,
ALTER COLUMN "maxRank" SET NOT NULL,
ALTER COLUMN "maxRank" SET DEFAULT 0,
ALTER COLUMN "maxRating" SET NOT NULL,
ALTER COLUMN "maxRating" SET DEFAULT 0,
ALTER COLUMN "mediumSolved" SET NOT NULL,
ALTER COLUMN "mediumSolved" SET DEFAULT 0,
ALTER COLUMN "rank" SET NOT NULL,
ALTER COLUMN "rank" SET DEFAULT 0,
ALTER COLUMN "rating" SET NOT NULL,
ALTER COLUMN "rating" SET DEFAULT 0,
ALTER COLUMN "totalContests" SET NOT NULL,
ALTER COLUMN "totalContests" SET DEFAULT 0,
ALTER COLUMN "totalSolved" SET DEFAULT 0;
