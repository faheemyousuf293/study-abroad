import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_students_status" AS ENUM('new', 'contacted', 'in-progress', 'applied', 'enrolled', 'closed');
  ALTER TYPE "public"."enum_users_roles" ADD VALUE 'staff';
  ALTER TABLE "students" ADD COLUMN "office" varchar;
  ALTER TABLE "students" ADD COLUMN "onboarding_completed_at" timestamp(3) with time zone;
  ALTER TABLE "students" ADD COLUMN "status" "enum_students_status" DEFAULT 'new';
  ALTER TABLE "students" ADD COLUMN "assigned_to_id" integer;
  ALTER TABLE "students" ADD COLUMN "notes" varchar;
  ALTER TABLE "students" ADD CONSTRAINT "students_assigned_to_id_users_id_fk" FOREIGN KEY ("assigned_to_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "students_assigned_to_idx" ON "students" USING btree ("assigned_to_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "students" DROP CONSTRAINT "students_assigned_to_id_users_id_fk";
  
  ALTER TABLE "users_roles" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum_users_roles";
  CREATE TYPE "public"."enum_users_roles" AS ENUM('admin');
  ALTER TABLE "users_roles" ALTER COLUMN "value" SET DATA TYPE "public"."enum_users_roles" USING "value"::"public"."enum_users_roles";
  DROP INDEX "students_assigned_to_idx";
  ALTER TABLE "students" DROP COLUMN "office";
  ALTER TABLE "students" DROP COLUMN "onboarding_completed_at";
  ALTER TABLE "students" DROP COLUMN "status";
  ALTER TABLE "students" DROP COLUMN "assigned_to_id";
  ALTER TABLE "students" DROP COLUMN "notes";
  DROP TYPE "public"."enum_students_status";`)
}
