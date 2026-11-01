import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" ALTER COLUMN "site_name" SET DEFAULT 'Scholarshiphive Edutancy';
  ALTER TABLE "site_settings_locales" ALTER COLUMN "copyright" SET DEFAULT 'Scholarshiphive Edutancy 2026';
  ALTER TABLE "footer_locales" ALTER COLUMN "about_title" SET DEFAULT 'About Scholarshiphive Edutancy';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" ALTER COLUMN "site_name" SET DEFAULT 'YourBrand';
  ALTER TABLE "site_settings_locales" ALTER COLUMN "copyright" SET DEFAULT 'YourBrand 2026';
  ALTER TABLE "footer_locales" ALTER COLUMN "about_title" SET DEFAULT 'About YourBrand';`)
}
