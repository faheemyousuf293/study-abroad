import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_students_study_area" AS ENUM('agriculture', 'architecture', 'arts', 'business', 'computer_science', 'education', 'engineering', 'environmental', 'health', 'humanities', 'law', 'life_sciences', 'manufacturing', 'physical_sciences', 'security_services', 'social_behavioural', 'social_services', 'transport_services', 'veterinary');
  ALTER TABLE "students" ADD COLUMN "study_area" "enum_students_study_area";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "students" DROP COLUMN "study_area";
  DROP TYPE "public"."enum_students_study_area";`)
}
