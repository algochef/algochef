-- AlterTable
ALTER TABLE "OjProfile" ALTER COLUMN "lastUpdated" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Submissions" (
    "id" SERIAL NOT NULL,
    "platform" "Platform" NOT NULL,
    "submittedOn" TIMESTAMP(3) NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,
    "ojProfileId" INTEGER NOT NULL,

    CONSTRAINT "Submissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Submissions_ojProfileId_platform_submittedOn_key" ON "Submissions"("ojProfileId", "platform", "submittedOn");

-- AddForeignKey
ALTER TABLE "Submissions" ADD CONSTRAINT "Submissions_ojProfileId_fkey" FOREIGN KEY ("ojProfileId") REFERENCES "OjProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
