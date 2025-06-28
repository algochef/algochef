/*
  Warnings:

  - You are about to drop the `Submissions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Submissions" DROP CONSTRAINT "Submissions_ojProfileId_fkey";

-- DropTable
DROP TABLE "Submissions";

-- CreateTable
CREATE TABLE "Submission" (
    "id" SERIAL NOT NULL,
    "platform" "Platform" NOT NULL,
    "submittedOn" TIMESTAMP(3) NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,
    "ojProfileId" INTEGER NOT NULL,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Submission_ojProfileId_platform_submittedOn_key" ON "Submission"("ojProfileId", "platform", "submittedOn");

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_ojProfileId_fkey" FOREIGN KEY ("ojProfileId") REFERENCES "OjProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
