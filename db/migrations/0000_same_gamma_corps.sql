CREATE TABLE "category" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "category_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "photo_booth" (
	"id" serial PRIMARY KEY NOT NULL,
	"photo_url" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"team_id" integer,
	"tags" text[],
	"category_id" integer,
	"caption" text,
	"is_featured" boolean DEFAULT false,
	"metadata" jsonb DEFAULT '{}'::jsonb
);
--> statement-breakpoint
CREATE TABLE "team" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "team_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "photo_booth" ADD CONSTRAINT "photo_booth_team_id_team_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "photo_booth" ADD CONSTRAINT "photo_booth_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE no action ON UPDATE no action;