import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "students" ALTER COLUMN "destination" SET DATA TYPE text;
  DROP TYPE "public"."enum_students_destination";
  CREATE TYPE "public"."enum_students_destination" AS ENUM('gb', 'us', 'au', 'de', 'ca', 'ie', 'nz', 'sg', 'ae', 'nl', 'fr', 'se', 'at', 'dk', 'fi', 'it', 'hu', 'ch', 'es', 'lt', 'lv', 'cy', 'pl', 'my', 'mu', 'hk', 'cn', 'vn', 'mt', 'jp', 'be', 'ru', 'kr', 'ge', 'id', 'ph', 'cz', 'pk');
  ALTER TABLE "students" ALTER COLUMN "destination" SET DATA TYPE "public"."enum_students_destination" USING "destination"::"public"."enum_students_destination";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "students" ALTER COLUMN "destination" SET DATA TYPE text;
  DROP TYPE "public"."enum_students_destination";
  CREATE TYPE "public"."enum_students_destination" AS ENUM('gb', 'us', 'au', 'de', 'ca', 'ie', 'nz', 'sg', 'ae', 'nl', 'fr', 'se', 'at', 'dk', 'fi', 'it', 'hu', 'ch', 'es', 'lt', 'lv', 'cy', 'pl', 'my', 'mu', 'hk', 'cn', 'vn', 'mt', 'jp', 'be', 'ru', 'kr', 'ge', 'id', 'ph', 'cz', 'in');
  ALTER TABLE "students" ALTER COLUMN "destination" SET DATA TYPE "public"."enum_students_destination" USING "destination"::"public"."enum_students_destination";`)
}
