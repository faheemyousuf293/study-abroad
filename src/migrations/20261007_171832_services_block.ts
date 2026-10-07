import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_services_panels_image_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum_pages_blocks_services_panels_tone" AS ENUM('brand', 'warm', 'sky', 'lavender');
  CREATE TYPE "public"."enum__pages_v_blocks_services_panels_image_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum__pages_v_blocks_services_panels_tone" AS ENUM('brand', 'warm', 'sky', 'lavender');
  CREATE TABLE "pages_blocks_services_panels_offerings" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_services_panels" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"intro" varchar,
  	"offerings_label" varchar DEFAULT 'Offerings',
  	"link_label" varchar DEFAULT 'See More',
  	"link_href" varchar DEFAULT '#',
  	"image_id" integer,
  	"image_position" "enum_pages_blocks_services_panels_image_position" DEFAULT 'right',
  	"tone" "enum_pages_blocks_services_panels_tone" DEFAULT 'brand'
  );
  
  CREATE TABLE "pages_blocks_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_panels_offerings" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_panels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"intro" varchar,
  	"offerings_label" varchar DEFAULT 'Offerings',
  	"link_label" varchar DEFAULT 'See More',
  	"link_href" varchar DEFAULT '#',
  	"image_id" integer,
  	"image_position" "enum__pages_v_blocks_services_panels_image_position" DEFAULT 'right',
  	"tone" "enum__pages_v_blocks_services_panels_tone" DEFAULT 'brand',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_services_panels_offerings" ADD CONSTRAINT "pages_blocks_services_panels_offerings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_panels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_panels" ADD CONSTRAINT "pages_blocks_services_panels_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_panels" ADD CONSTRAINT "pages_blocks_services_panels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services" ADD CONSTRAINT "pages_blocks_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_panels_offerings" ADD CONSTRAINT "_pages_v_blocks_services_panels_offerings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_services_panels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_panels" ADD CONSTRAINT "_pages_v_blocks_services_panels_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_panels" ADD CONSTRAINT "_pages_v_blocks_services_panels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services" ADD CONSTRAINT "_pages_v_blocks_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_services_panels_offerings_order_idx" ON "pages_blocks_services_panels_offerings" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_panels_offerings_parent_id_idx" ON "pages_blocks_services_panels_offerings" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_panels_offerings_locale_idx" ON "pages_blocks_services_panels_offerings" USING btree ("_locale");
  CREATE INDEX "pages_blocks_services_panels_order_idx" ON "pages_blocks_services_panels" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_panels_parent_id_idx" ON "pages_blocks_services_panels" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_panels_locale_idx" ON "pages_blocks_services_panels" USING btree ("_locale");
  CREATE INDEX "pages_blocks_services_panels_image_idx" ON "pages_blocks_services_panels" USING btree ("image_id");
  CREATE INDEX "pages_blocks_services_order_idx" ON "pages_blocks_services" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_parent_id_idx" ON "pages_blocks_services" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_path_idx" ON "pages_blocks_services" USING btree ("_path");
  CREATE INDEX "pages_blocks_services_locale_idx" ON "pages_blocks_services" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_services_panels_offerings_order_idx" ON "_pages_v_blocks_services_panels_offerings" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_panels_offerings_parent_id_idx" ON "_pages_v_blocks_services_panels_offerings" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_panels_offerings_locale_idx" ON "_pages_v_blocks_services_panels_offerings" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_services_panels_order_idx" ON "_pages_v_blocks_services_panels" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_panels_parent_id_idx" ON "_pages_v_blocks_services_panels" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_panels_locale_idx" ON "_pages_v_blocks_services_panels" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_services_panels_image_idx" ON "_pages_v_blocks_services_panels" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_services_order_idx" ON "_pages_v_blocks_services" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_parent_id_idx" ON "_pages_v_blocks_services" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_path_idx" ON "_pages_v_blocks_services" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_services_locale_idx" ON "_pages_v_blocks_services" USING btree ("_locale");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_services_panels_offerings" CASCADE;
  DROP TABLE "pages_blocks_services_panels" CASCADE;
  DROP TABLE "pages_blocks_services" CASCADE;
  DROP TABLE "_pages_v_blocks_services_panels_offerings" CASCADE;
  DROP TABLE "_pages_v_blocks_services_panels" CASCADE;
  DROP TABLE "_pages_v_blocks_services" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_services_panels_image_position";
  DROP TYPE "public"."enum_pages_blocks_services_panels_tone";
  DROP TYPE "public"."enum__pages_v_blocks_services_panels_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_services_panels_tone";`)
}
