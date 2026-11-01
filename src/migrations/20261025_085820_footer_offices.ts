import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_site_settings_socials_platform" ADD VALUE 'whatsapp' BEFORE 'linkedin';
  CREATE TABLE "footer_offices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"address" varchar NOT NULL,
  	"map_query" varchar
  );
  
  CREATE TABLE "footer_offices_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "site_settings" ALTER COLUMN "site_name" SET DEFAULT 'ScholarshipHive Edutancy';
  ALTER TABLE "site_settings_locales" ALTER COLUMN "copyright" SET DEFAULT 'ScholarshipHive Edutancy 2026';
  ALTER TABLE "footer_locales" ALTER COLUMN "about_title" SET DEFAULT 'ScholarshipHive Edutancy';
  ALTER TABLE "footer_locales" ADD COLUMN "offices_title" varchar DEFAULT 'Our Offices';
  ALTER TABLE "footer_offices" ADD CONSTRAINT "footer_offices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_offices_locales" ADD CONSTRAINT "footer_offices_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_offices"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "footer_offices_order_idx" ON "footer_offices" USING btree ("_order");
  CREATE INDEX "footer_offices_parent_id_idx" ON "footer_offices" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_offices_locales_locale_parent_id_unique" ON "footer_offices_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "footer_offices" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_offices_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "footer_offices" CASCADE;
  DROP TABLE "footer_offices_locales" CASCADE;
  ALTER TABLE "site_settings_socials" ALTER COLUMN "platform" SET DATA TYPE text;
  DROP TYPE "public"."enum_site_settings_socials_platform";
  CREATE TYPE "public"."enum_site_settings_socials_platform" AS ENUM('facebook', 'instagram', 'linkedin', 'x', 'youtube');
  ALTER TABLE "site_settings_socials" ALTER COLUMN "platform" SET DATA TYPE "public"."enum_site_settings_socials_platform" USING "platform"::"public"."enum_site_settings_socials_platform";
  ALTER TABLE "site_settings" ALTER COLUMN "site_name" SET DEFAULT 'Scholarshiphive Edutancy';
  ALTER TABLE "site_settings_locales" ALTER COLUMN "copyright" SET DEFAULT 'Scholarshiphive Edutancy 2026';
  ALTER TABLE "footer_locales" ALTER COLUMN "about_title" SET DEFAULT 'About Scholarshiphive Edutancy';
  ALTER TABLE "footer_locales" DROP COLUMN "offices_title";`)
}
