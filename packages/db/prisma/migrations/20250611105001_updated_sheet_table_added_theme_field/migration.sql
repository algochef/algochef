-- CreateEnum
CREATE TYPE "SheetTheme" AS ENUM ('CYAN', 'TEAL', 'EMERALD', 'INDIGO', 'BLUE', 'YELLOW');

-- AlterTable
ALTER TABLE "Sheet" ADD COLUMN     "theme" "SheetTheme" NOT NULL DEFAULT 'INDIGO';
