-- CreateTable
CREATE TABLE "LeetcodeSubmissionHistory" (
    "id" TEXT NOT NULL,
    "problemTitle" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "submissionId" TEXT NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LeetcodeSubmissionHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RatingHistory" (
    "id" TEXT NOT NULL,
    "ojProfileId" INTEGER NOT NULL,
    "platform" "Platform" NOT NULL DEFAULT 'CODEFORCES',
    "contestTitle" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "contestDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RatingHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LeetcodeSubmissionHistory_submissionId_key" ON "LeetcodeSubmissionHistory"("submissionId");

-- AddForeignKey
ALTER TABLE "RatingHistory" ADD CONSTRAINT "RatingHistory_ojProfileId_fkey" FOREIGN KEY ("ojProfileId") REFERENCES "OjProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
