/*
  Warnings:

  - You are about to drop the column `user_id` on the `job_application` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "job_application" DROP CONSTRAINT "job_application_user_id_fkey";

-- AlterTable
ALTER TABLE "job_application" DROP COLUMN "user_id",
ADD COLUMN     "created_by" TEXT,
ADD COLUMN     "updated_by" TEXT;

-- AddForeignKey
ALTER TABLE "job_application" ADD CONSTRAINT "fk_user_created" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "job_application" ADD CONSTRAINT "fk_user_updated" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
