import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_destinations_items_flag" AS ENUM('it', 'gb', 'fr', 'de', 'ie', 'es', 'nl', 'be', 'at', 'hu', 'pl', 'us', 'ca', 'au', 'cn', 'tr');
  CREATE TYPE "public"."enum__pages_v_blocks_destinations_items_flag" AS ENUM('it', 'gb', 'fr', 'de', 'ie', 'es', 'nl', 'be', 'at', 'hu', 'pl', 'us', 'ca', 'au', 'cn', 'tr');
  CREATE TABLE "pages_blocks_destinations_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"flag" "enum_pages_blocks_destinations_items_flag",
  	"title" varchar,
  	"image_id" integer,
  	"href" varchar DEFAULT '#'
  );
  
  CREATE TABLE "pages_blocks_destinations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_destinations_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"flag" "enum__pages_v_blocks_destinations_items_flag",
  	"title" varchar,
  	"image_id" integer,
  	"href" varchar DEFAULT '#',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_destinations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"title" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_destinations_items" ADD CONSTRAINT "pages_blocks_destinations_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_destinations_items" ADD CONSTRAINT "pages_blocks_destinations_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_destinations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_destinations" ADD CONSTRAINT "pages_blocks_destinations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_destinations_items" ADD CONSTRAINT "_pages_v_blocks_destinations_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_destinations_items" ADD CONSTRAINT "_pages_v_blocks_destinations_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_destinations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_destinations" ADD CONSTRAINT "_pages_v_blocks_destinations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_destinations_items_order_idx" ON "pages_blocks_destinations_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_destinations_items_parent_id_idx" ON "pages_blocks_destinations_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_destinations_items_locale_idx" ON "pages_blocks_destinations_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_destinations_items_image_idx" ON "pages_blocks_destinations_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_destinations_order_idx" ON "pages_blocks_destinations" USING btree ("_order");
  CREATE INDEX "pages_blocks_destinations_parent_id_idx" ON "pages_blocks_destinations" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_destinations_path_idx" ON "pages_blocks_destinations" USING btree ("_path");
  CREATE INDEX "pages_blocks_destinations_locale_idx" ON "pages_blocks_destinations" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_destinations_items_order_idx" ON "_pages_v_blocks_destinations_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_destinations_items_parent_id_idx" ON "_pages_v_blocks_destinations_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_destinations_items_locale_idx" ON "_pages_v_blocks_destinations_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_destinations_items_image_idx" ON "_pages_v_blocks_destinations_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_destinations_order_idx" ON "_pages_v_blocks_destinations" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_destinations_parent_id_idx" ON "_pages_v_blocks_destinations" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_destinations_path_idx" ON "_pages_v_blocks_destinations" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_destinations_locale_idx" ON "_pages_v_blocks_destinations" USING btree ("_locale");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_destinations_items" CASCADE;
  DROP TABLE "pages_blocks_destinations" CASCADE;
  DROP TABLE "_pages_v_blocks_destinations_items" CASCADE;
  DROP TABLE "_pages_v_blocks_destinations" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_destinations_items_flag";
  DROP TYPE "public"."enum__pages_v_blocks_destinations_items_flag";`)
}
