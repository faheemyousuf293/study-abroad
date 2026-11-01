import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero" ADD COLUMN "heading_highlight" varchar;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "subheading_lead" varchar;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "heading_highlight" varchar;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "subheading_lead" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero" DROP COLUMN "heading_highlight";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "subheading_lead";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "heading_highlight";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "subheading_lead";`)
}
