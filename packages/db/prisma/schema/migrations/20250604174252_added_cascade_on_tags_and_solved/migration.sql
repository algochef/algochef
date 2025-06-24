-- DropForeignKey
ALTER TABLE "CompanyTagOnProblems" DROP CONSTRAINT "CompanyTagOnProblems_problemId_fkey";

-- DropForeignKey
ALTER TABLE "Solved" DROP CONSTRAINT "Solved_problemId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnProblems" DROP CONSTRAINT "TagsOnProblems_problemId_fkey";

-- AddForeignKey
ALTER TABLE "TagsOnProblems" ADD CONSTRAINT "TagsOnProblems_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyTagOnProblems" ADD CONSTRAINT "CompanyTagOnProblems_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solved" ADD CONSTRAINT "Solved_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
