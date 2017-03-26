-- This table stores user sessions. The up script was copied from from `node-connect-pg-simple`
-- The original script can be found here:
-- https://github.com/voxpelli/node-connect-pg-simple/blob/ec5874eb236226f5d4f576aff9c0413d46b1c5fb/table.sql

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
