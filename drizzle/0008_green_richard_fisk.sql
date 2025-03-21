ALTER TABLE "project_case_studies" DROP CONSTRAINT "project_case_studies_project_id_projects_id_fk";
--> statement-breakpoint
ALTER TABLE "project_case_studies_technologies" DROP CONSTRAINT "project_case_studies_technologies_case_study_id_project_case_studies_id_fk";
--> statement-breakpoint
ALTER TABLE "projects_to_tags" DROP CONSTRAINT "projects_to_tags_project_id_projects_id_fk";
--> statement-breakpoint
ALTER TABLE "projects_to_tags" DROP CONSTRAINT "projects_to_tags_tag_id_project_tags_id_fk";
--> statement-breakpoint
ALTER TABLE "project_case_studies" ADD CONSTRAINT "project_case_studies_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_case_studies_technologies" ADD CONSTRAINT "project_case_studies_technologies_case_study_id_project_case_studies_id_fk" FOREIGN KEY ("case_study_id") REFERENCES "public"."project_case_studies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects_to_tags" ADD CONSTRAINT "projects_to_tags_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects_to_tags" ADD CONSTRAINT "projects_to_tags_tag_id_project_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."project_tags"("id") ON DELETE cascade ON UPDATE no action;