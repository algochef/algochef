/*
  Warnings:

  - The primary key for the `RatingHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "RatingHistory" DROP CONSTRAINT "RatingHistory_pkey",
ADD CONSTRAINT "RatingHistory_pkey" PRIMARY KEY ("ojProfileId", "platform", "date");
