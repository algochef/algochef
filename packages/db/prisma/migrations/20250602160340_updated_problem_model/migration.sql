/*
  Warnings:

  - A unique constraint covering the columns `[problemCode]` on the table `Problem` will be added. If there are existing duplicate values, this will fail.
  - Made the column `problemCode` on table `Problem` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Problem_slug_key";

-- AlterTable
ALTER TABLE "Problem" ALTER COLUMN "problemCode" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Problem_problemCode_key" ON "Problem"("problemCode");
