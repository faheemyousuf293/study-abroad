import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_services_panels_cards_icon" AS ENUM('plane', 'target', 'grade', 'cap', 'globe', 'document');
  CREATE TYPE "public"."enum_pages_blocks_services_panels_cards_accent" AS ENUM('blue', 'red', 'gold');
  CREATE TYPE "public"."enum__pages_v_blocks_services_panels_cards_icon" AS ENUM('plane', 'target', 'grade', 'cap', 'globe', 'document');
  CREATE TYPE "public"."enum__pages_v_blocks_services_panels_cards_accent" AS ENUM('blue', 'red', 'gold');
  CREATE TABLE "pages_blocks_services_panels_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_services_panels_cards_icon" DEFAULT 'plane',
  	"accent" "enum_pages_blocks_services_panels_cards_accent" DEFAULT 'blue',
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"link_label" varchar DEFAULT 'Learn More',
  	"link_href" varchar DEFAULT '#'
  );
  
  CREATE TABLE "_pages_v_blocks_services_panels_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_services_panels_cards_icon" DEFAULT 'plane',
  	"accent" "enum__pages_v_blocks_services_panels_cards_accent" DEFAULT 'blue',
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"link_label" varchar DEFAULT 'Learn More',
  	"link_href" varchar DEFAULT '#',
  	"_uuid" varchar
  );
  
  ALTER TABLE "pages_blocks_services_panels_cards" ADD CONSTRAINT "pages_blocks_services_panels_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_panels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_panels_cards" ADD CONSTRAINT "_pages_v_blocks_services_panels_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_services_panels"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_services_panels_cards_order_idx" ON "pages_blocks_services_panels_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_panels_cards_parent_id_idx" ON "pages_blocks_services_panels_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_panels_cards_locale_idx" ON "pages_blocks_services_panels_cards" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_services_panels_cards_order_idx" ON "_pages_v_blocks_services_panels_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_panels_cards_parent_id_idx" ON "_pages_v_blocks_services_panels_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_panels_cards_locale_idx" ON "_pages_v_blocks_services_panels_cards" USING btree ("_locale");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_services_panels_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_services_panels_cards" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_services_panels_cards_icon";
  DROP TYPE "public"."enum_pages_blocks_services_panels_cards_accent";
  DROP TYPE "public"."enum__pages_v_blocks_services_panels_cards_icon";
  DROP TYPE "public"."enum__pages_v_blocks_services_panels_cards_accent";`)
}
