-- CreateTable
CREATE TABLE "Social" (
    "userId" INTEGER NOT NULL,
    "githubUrl" TEXT,
    "linkedinUrl" TEXT,
    "instagramUrl" TEXT,
    "portfolioUrl" TEXT,
    "twitterUrl" TEXT,

    CONSTRAINT "Social_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "Social" ADD CONSTRAINT "Social_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
