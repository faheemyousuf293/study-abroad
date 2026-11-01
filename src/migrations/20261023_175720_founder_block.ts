import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_founder_socials_platform" AS ENUM('instagram', 'whatsapp', 'facebook', 'linkedin', 'x', 'youtube');
  CREATE TYPE "public"."enum__pages_v_blocks_founder_socials_platform" AS ENUM('instagram', 'whatsapp', 'facebook', 'linkedin', 'x', 'youtube');
  CREATE TABLE "pages_blocks_founder_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_pages_blocks_founder_socials_platform",
  	"url" varchar DEFAULT '#'
  );
  
  CREATE TABLE "pages_blocks_founder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Meet Our Founder',
  	"name" varchar,
  	"role" varchar,
  	"bio" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_founder_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"platform" "enum__pages_v_blocks_founder_socials_platform",
  	"url" varchar DEFAULT '#',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_founder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Meet Our Founder',
  	"name" varchar,
  	"role" varchar,
  	"bio" varchar,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_founder_socials" ADD CONSTRAINT "pages_blocks_founder_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_founder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_founder" ADD CONSTRAINT "pages_blocks_founder_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_founder" ADD CONSTRAINT "pages_blocks_founder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_founder_socials" ADD CONSTRAINT "_pages_v_blocks_founder_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_founder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_founder" ADD CONSTRAINT "_pages_v_blocks_founder_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_founder" ADD CONSTRAINT "_pages_v_blocks_founder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_founder_socials_order_idx" ON "pages_blocks_founder_socials" USING btree ("_order");
  CREATE INDEX "pages_blocks_founder_socials_parent_id_idx" ON "pages_blocks_founder_socials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_founder_socials_locale_idx" ON "pages_blocks_founder_socials" USING btree ("_locale");
  CREATE INDEX "pages_blocks_founder_order_idx" ON "pages_blocks_founder" USING btree ("_order");
  CREATE INDEX "pages_blocks_founder_parent_id_idx" ON "pages_blocks_founder" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_founder_path_idx" ON "pages_blocks_founder" USING btree ("_path");
  CREATE INDEX "pages_blocks_founder_locale_idx" ON "pages_blocks_founder" USING btree ("_locale");
  CREATE INDEX "pages_blocks_founder_image_idx" ON "pages_blocks_founder" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_founder_socials_order_idx" ON "_pages_v_blocks_founder_socials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_founder_socials_parent_id_idx" ON "_pages_v_blocks_founder_socials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_founder_socials_locale_idx" ON "_pages_v_blocks_founder_socials" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_founder_order_idx" ON "_pages_v_blocks_founder" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_founder_parent_id_idx" ON "_pages_v_blocks_founder" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_founder_path_idx" ON "_pages_v_blocks_founder" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_founder_locale_idx" ON "_pages_v_blocks_founder" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_founder_image_idx" ON "_pages_v_blocks_founder" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_founder_socials" CASCADE;
  DROP TABLE "pages_blocks_founder" CASCADE;
  DROP TABLE "_pages_v_blocks_founder_socials" CASCADE;
  DROP TABLE "_pages_v_blocks_founder" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_founder_socials_platform";
  DROP TYPE "public"."enum__pages_v_blocks_founder_socials_platform";`)
}
