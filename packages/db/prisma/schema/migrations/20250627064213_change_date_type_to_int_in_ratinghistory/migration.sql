/*
  Warnings:

  - You are about to alter the column `date` on the `RatingHistory` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "RatingHistory" ALTER COLUMN "date" SET DATA TYPE INTEGER;
