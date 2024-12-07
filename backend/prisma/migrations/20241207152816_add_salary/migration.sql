-- AlterTable
ALTER TABLE "job_application" ADD COLUMN     "expected_salary" DOUBLE PRECISION,
ADD COLUMN     "offered_salary" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "sso_providers" ALTER COLUMN "provider" DROP NOT NULL,
ALTER COLUMN "provider_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "phone_no" TEXT;
