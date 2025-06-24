/*
  Warnings:

  - The values [SPOJ] on the enum `Platform` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `isActive` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `problemId` on the `Tag` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[url]` on the table `Problem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Problem` will be added. If there are existing duplicate values, this will fail.
  - Made the column `slug` on table `Problem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Platform_new" AS ENUM ('CODEFORCES', 'CODECHEF', 'LEETCODE', 'ATCODER', 'CSES');
ALTER TABLE "Contest" ALTER COLUMN "platform" DROP DEFAULT;
ALTER TABLE "Contest" ALTER COLUMN "platform" TYPE "Platform_new" USING ("platform"::text::"Platform_new");
ALTER TABLE "Problem" ALTER COLUMN "platform" TYPE "Platform_new" USING ("platform"::text::"Platform_new");
ALTER TYPE "Platform" RENAME TO "Platform_old";
ALTER TYPE "Platform_new" RENAME TO "Platform";
DROP TYPE "Platform_old";
ALTER TABLE "Contest" ALTER COLUMN "platform" SET DEFAULT 'CODEFORCES';
COMMIT;

-- DropForeignKey
ALTER TABLE "CompanyTag" DROP CONSTRAINT "CompanyTag_problemId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_problemId_fkey";

-- AlterTable
ALTER TABLE "CompanyTag" ALTER COLUMN "problemId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "isActive",
ALTER COLUMN "problemCode" DROP NOT NULL,
ALTER COLUMN "slug" SET NOT NULL;

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "problemId";

-- CreateTable
CREATE TABLE "TagsOnProblems" (
    "problemId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "TagsOnProblems_pkey" PRIMARY KEY ("problemId","tagId")
);

-- CreateTable
CREATE TABLE "CompanyTagOnProblems" (
    "problemId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "companyTagId" INTEGER,

    CONSTRAINT "CompanyTagOnProblems_pkey" PRIMARY KEY ("problemId","companyId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Problem_url_key" ON "Problem"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Problem_slug_key" ON "Problem"("slug");

-- AddForeignKey
ALTER TABLE "TagsOnProblems" ADD CONSTRAINT "TagsOnProblems_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnProblems" ADD CONSTRAINT "TagsOnProblems_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyTagOnProblems" ADD CONSTRAINT "CompanyTagOnProblems_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyTagOnProblems" ADD CONSTRAINT "CompanyTagOnProblems_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyTagOnProblems" ADD CONSTRAINT "CompanyTagOnProblems_companyTagId_fkey" FOREIGN KEY ("companyTagId") REFERENCES "CompanyTag"("id") ON DELETE SET NULL ON UPDATE CASCADE;
