CREATE TABLE "project_case_studies" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"problem" text NOT NULL,
	"solution" text NOT NULL,
	"challenges" text NOT NULL,
	"results" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "project_case_studies_technologies" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"case_study_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "project_case_studies" ADD CONSTRAINT "project_case_studies_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_case_studies_technologies" ADD CONSTRAINT "project_case_studies_technologies_case_study_id_project_case_studies_id_fk" FOREIGN KEY ("case_study_id") REFERENCES "public"."project_case_studies"("id") ON DELETE no action ON UPDATE no action;