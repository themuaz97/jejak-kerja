/*
  Warnings:

  - You are about to drop the `overall_application` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "job_application" DROP CONSTRAINT "job_application_apply_overall_id_fkey";

-- DropForeignKey
ALTER TABLE "overall_application" DROP CONSTRAINT "overall_application_created_by_fkey";

-- DropForeignKey
ALTER TABLE "overall_application" DROP CONSTRAINT "overall_application_updated_by_fkey";

-- DropTable
DROP TABLE "overall_application";

-- CreateTable
CREATE TABLE "application_overall" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "application_overall_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "application_overall" ADD CONSTRAINT "application_overall_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application_overall" ADD CONSTRAINT "application_overall_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_application" ADD CONSTRAINT "job_application_apply_overall_id_fkey" FOREIGN KEY ("apply_overall_id") REFERENCES "application_overall"("id") ON DELETE CASCADE ON UPDATE CASCADE;
