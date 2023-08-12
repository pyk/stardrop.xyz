CREATE TABLE IF NOT EXISTS "stardrops" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"symbol" text,
	"description" text,
	"media_cid" text,
	"activity_type" text,
	"activity_network" text,
	"activity_data" jsonb
);
