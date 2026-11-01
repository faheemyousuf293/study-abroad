import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_students_study_level" AS ENUM('bachelors', 'masters', 'ug_diploma', 'pg_diploma', 'phd', 'diploma_certificate', 'foundation_pathway', 'others');
  ALTER TABLE "students" ADD COLUMN "study_level" "enum_students_study_level";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "students" DROP COLUMN "study_level";
  DROP TYPE "public"."enum_students_study_level";`)
}
