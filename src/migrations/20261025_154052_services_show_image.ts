import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_services_panels" ADD COLUMN "show_image" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_services_panels" ADD COLUMN "show_image" boolean DEFAULT true;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_services_panels" DROP COLUMN "show_image";
  ALTER TABLE "_pages_v_blocks_services_panels" DROP COLUMN "show_image";`)
}
