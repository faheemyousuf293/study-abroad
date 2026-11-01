import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_logo_carousel_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"name" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "pages_blocks_logo_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"duration" numeric DEFAULT 40,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logo_carousel_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"name" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logo_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"duration" numeric DEFAULT 40,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_logo_carousel_logos" ADD CONSTRAINT "pages_blocks_logo_carousel_logos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_carousel_logos" ADD CONSTRAINT "pages_blocks_logo_carousel_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_logo_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_carousel" ADD CONSTRAINT "pages_blocks_logo_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_carousel_logos" ADD CONSTRAINT "_pages_v_blocks_logo_carousel_logos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_carousel_logos" ADD CONSTRAINT "_pages_v_blocks_logo_carousel_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_logo_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_carousel" ADD CONSTRAINT "_pages_v_blocks_logo_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_logo_carousel_logos_order_idx" ON "pages_blocks_logo_carousel_logos" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_carousel_logos_parent_id_idx" ON "pages_blocks_logo_carousel_logos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_carousel_logos_locale_idx" ON "pages_blocks_logo_carousel_logos" USING btree ("_locale");
  CREATE INDEX "pages_blocks_logo_carousel_logos_image_idx" ON "pages_blocks_logo_carousel_logos" USING btree ("image_id");
  CREATE INDEX "pages_blocks_logo_carousel_order_idx" ON "pages_blocks_logo_carousel" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_carousel_parent_id_idx" ON "pages_blocks_logo_carousel" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_carousel_path_idx" ON "pages_blocks_logo_carousel" USING btree ("_path");
  CREATE INDEX "pages_blocks_logo_carousel_locale_idx" ON "pages_blocks_logo_carousel" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_logo_carousel_logos_order_idx" ON "_pages_v_blocks_logo_carousel_logos" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logo_carousel_logos_parent_id_idx" ON "_pages_v_blocks_logo_carousel_logos" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_carousel_logos_locale_idx" ON "_pages_v_blocks_logo_carousel_logos" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_logo_carousel_logos_image_idx" ON "_pages_v_blocks_logo_carousel_logos" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_logo_carousel_order_idx" ON "_pages_v_blocks_logo_carousel" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logo_carousel_parent_id_idx" ON "_pages_v_blocks_logo_carousel" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_carousel_path_idx" ON "_pages_v_blocks_logo_carousel" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_logo_carousel_locale_idx" ON "_pages_v_blocks_logo_carousel" USING btree ("_locale");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_logo_carousel_logos" CASCADE;
  DROP TABLE "pages_blocks_logo_carousel" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_carousel_logos" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_carousel" CASCADE;`)
}
