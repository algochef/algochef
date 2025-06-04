/*
  Warnings:

  - The primary key for the `CompanyTagOnProblems` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `companyId` on the `CompanyTagOnProblems` table. All the data in the column will be lost.
  - Made the column `companyTagId` on table `CompanyTagOnProblems` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "CompanyTagOnProblems" DROP CONSTRAINT "CompanyTagOnProblems_companyId_fkey";

-- DropForeignKey
ALTER TABLE "CompanyTagOnProblems" DROP CONSTRAINT "CompanyTagOnProblems_companyTagId_fkey";

-- AlterTable
ALTER TABLE "CompanyTagOnProblems" DROP CONSTRAINT "CompanyTagOnProblems_pkey",
DROP COLUMN "companyId",
ALTER COLUMN "companyTagId" SET NOT NULL,
ADD CONSTRAINT "CompanyTagOnProblems_pkey" PRIMARY KEY ("problemId", "companyTagId");

-- AddForeignKey
ALTER TABLE "CompanyTagOnProblems" ADD CONSTRAINT "CompanyTagOnProblems_companyTagId_fkey" FOREIGN KEY ("companyTagId") REFERENCES "CompanyTag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
