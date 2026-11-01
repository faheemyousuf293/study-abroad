import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_founder" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_logo_carousel" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_logo_carousel" ADD COLUMN "subtitle" varchar;
  ALTER TABLE "pages_blocks_core_strengths" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_services" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_newsletter" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_rich_text" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_founder" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_logo_carousel" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_logo_carousel" ADD COLUMN "subtitle" varchar;
  ALTER TABLE "_pages_v_blocks_core_strengths" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_services" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_newsletter" ADD COLUMN "hidden" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD COLUMN "hidden" boolean DEFAULT false;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero" DROP COLUMN "hidden";
  ALTER TABLE "pages_blocks_founder" DROP COLUMN "hidden";
  ALTER TABLE "pages_blocks_logo_carousel" DROP COLUMN "hidden";
  ALTER TABLE "pages_blocks_logo_carousel" DROP COLUMN "subtitle";
  ALTER TABLE "pages_blocks_core_strengths" DROP COLUMN "hidden";
  ALTER TABLE "pages_blocks_services" DROP COLUMN "hidden";
  ALTER TABLE "pages_blocks_newsletter" DROP COLUMN "hidden";
  ALTER TABLE "pages_blocks_rich_text" DROP COLUMN "hidden";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "hidden";
  ALTER TABLE "_pages_v_blocks_founder" DROP COLUMN "hidden";
  ALTER TABLE "_pages_v_blocks_logo_carousel" DROP COLUMN "hidden";
  ALTER TABLE "_pages_v_blocks_logo_carousel" DROP COLUMN "subtitle";
  ALTER TABLE "_pages_v_blocks_core_strengths" DROP COLUMN "hidden";
  ALTER TABLE "_pages_v_blocks_services" DROP COLUMN "hidden";
  ALTER TABLE "_pages_v_blocks_newsletter" DROP COLUMN "hidden";
  ALTER TABLE "_pages_v_blocks_rich_text" DROP COLUMN "hidden";`)
}
