/*
  Warnings:

  - You are about to drop the `CompanyTagOnProblems` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TagsOnProblems` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CompanyTagOnProblems" DROP CONSTRAINT "CompanyTagOnProblems_companyTagId_fkey";

-- DropForeignKey
ALTER TABLE "CompanyTagOnProblems" DROP CONSTRAINT "CompanyTagOnProblems_problemId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnProblems" DROP CONSTRAINT "TagsOnProblems_problemId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnProblems" DROP CONSTRAINT "TagsOnProblems_tagId_fkey";

-- DropTable
DROP TABLE "CompanyTagOnProblems";

-- DropTable
DROP TABLE "TagsOnProblems";

-- CreateTable
CREATE TABLE "TagsOnProblem" (
    "problemId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "TagsOnProblem_pkey" PRIMARY KEY ("problemId","tagId")
);

-- CreateTable
CREATE TABLE "CompanyTagOnProblem" (
    "problemId" INTEGER NOT NULL,
    "companyTagId" INTEGER NOT NULL,

    CONSTRAINT "CompanyTagOnProblem_pkey" PRIMARY KEY ("problemId","companyTagId")
);

-- CreateTable
CREATE TABLE "Sheet" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Sheet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Section" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "sheetId" INTEGER NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectionOnProblem" (
    "problemId" INTEGER NOT NULL,
    "sectionId" INTEGER NOT NULL,

    CONSTRAINT "SectionOnProblem_pkey" PRIMARY KEY ("problemId","sectionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sheet_slug_key" ON "Sheet"("slug");

-- AddForeignKey
ALTER TABLE "TagsOnProblem" ADD CONSTRAINT "TagsOnProblem_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnProblem" ADD CONSTRAINT "TagsOnProblem_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyTagOnProblem" ADD CONSTRAINT "CompanyTagOnProblem_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyTagOnProblem" ADD CONSTRAINT "CompanyTagOnProblem_companyTagId_fkey" FOREIGN KEY ("companyTagId") REFERENCES "CompanyTag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_sheetId_fkey" FOREIGN KEY ("sheetId") REFERENCES "Sheet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionOnProblem" ADD CONSTRAINT "SectionOnProblem_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionOnProblem" ADD CONSTRAINT "SectionOnProblem_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;
