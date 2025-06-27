/*
  Warnings:

  - The primary key for the `RatingHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `contestDate` on the `RatingHistory` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `RatingHistory` table. All the data in the column will be lost.
  - Added the required column `rank` to the `RatingHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RatingHistory" DROP CONSTRAINT "RatingHistory_pkey",
DROP COLUMN "contestDate",
DROP COLUMN "id",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "delta" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "rank" INTEGER NOT NULL,
ADD CONSTRAINT "RatingHistory_pkey" PRIMARY KEY ("ojProfileId", "platform");
