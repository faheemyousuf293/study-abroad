import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_blocks_services_panels_cards_accent" ADD VALUE 'navy' BEFORE 'gold';
  ALTER TYPE "public"."enum__pages_v_blocks_services_panels_cards_accent" ADD VALUE 'navy' BEFORE 'gold';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_services_panels_cards" ALTER COLUMN "accent" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_services_panels_cards" ALTER COLUMN "accent" SET DEFAULT 'blue'::text;
  DROP TYPE "public"."enum_pages_blocks_services_panels_cards_accent";
  CREATE TYPE "public"."enum_pages_blocks_services_panels_cards_accent" AS ENUM('blue', 'red', 'gold');
  ALTER TABLE "pages_blocks_services_panels_cards" ALTER COLUMN "accent" SET DEFAULT 'blue'::"public"."enum_pages_blocks_services_panels_cards_accent";
  ALTER TABLE "pages_blocks_services_panels_cards" ALTER COLUMN "accent" SET DATA TYPE "public"."enum_pages_blocks_services_panels_cards_accent" USING "accent"::"public"."enum_pages_blocks_services_panels_cards_accent";
  ALTER TABLE "_pages_v_blocks_services_panels_cards" ALTER COLUMN "accent" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_services_panels_cards" ALTER COLUMN "accent" SET DEFAULT 'blue'::text;
  DROP TYPE "public"."enum__pages_v_blocks_services_panels_cards_accent";
  CREATE TYPE "public"."enum__pages_v_blocks_services_panels_cards_accent" AS ENUM('blue', 'red', 'gold');
  ALTER TABLE "_pages_v_blocks_services_panels_cards" ALTER COLUMN "accent" SET DEFAULT 'blue'::"public"."enum__pages_v_blocks_services_panels_cards_accent";
  ALTER TABLE "_pages_v_blocks_services_panels_cards" ALTER COLUMN "accent" SET DATA TYPE "public"."enum__pages_v_blocks_services_panels_cards_accent" USING "accent"::"public"."enum__pages_v_blocks_services_panels_cards_accent";`)
}
