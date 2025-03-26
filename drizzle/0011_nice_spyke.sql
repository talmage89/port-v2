CREATE TABLE "chat_queries" (
	"id" serial PRIMARY KEY NOT NULL,
	"client_ip" varchar(50) NOT NULL,
	"query" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
