/*
  Warnings:

  - A unique constraint covering the columns `[userId,platform]` on the table `OjProfile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[handle,platform]` on the table `OjProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `platform` to the `OjProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_contestId_fkey";

-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_userId_fkey";

-- DropForeignKey
ALTER TABLE "CompanyTagOnProblem" DROP CONSTRAINT "CompanyTagOnProblem_companyTagId_fkey";

-- DropForeignKey
ALTER TABLE "OjProfile" DROP CONSTRAINT "OjProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "Sheet" DROP CONSTRAINT "Sheet_userId_fkey";

-- DropForeignKey
ALTER TABLE "Solved" DROP CONSTRAINT "Solved_userId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnProblem" DROP CONSTRAINT "TagsOnProblem_tagId_fkey";

-- DropIndex
DROP INDEX "OjProfile_handle_key";

-- AlterTable
ALTER TABLE "OjProfile" ADD COLUMN     "platform" "Platform" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "OjProfile_userId_platform_key" ON "OjProfile"("userId", "platform");

-- CreateIndex
CREATE UNIQUE INDEX "OjProfile_handle_platform_key" ON "OjProfile"("handle", "platform");

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "Contest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnProblem" ADD CONSTRAINT "TagsOnProblem_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyTagOnProblem" ADD CONSTRAINT "CompanyTagOnProblem_companyTagId_fkey" FOREIGN KEY ("companyTagId") REFERENCES "CompanyTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OjProfile" ADD CONSTRAINT "OjProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solved" ADD CONSTRAINT "Solved_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sheet" ADD CONSTRAINT "Sheet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
