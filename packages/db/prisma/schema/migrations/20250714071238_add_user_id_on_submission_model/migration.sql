/*
  Warnings:

  - Added the required column `userId` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Submission_ojProfileId_platform_submittedOn_key";

-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Submission_userId_platform_idx" ON "Submission"("userId", "platform");

-- CreateIndex
CREATE INDEX "Submission_ojProfileId_submittedOn_idx" ON "Submission"("ojProfileId", "submittedOn");

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
