ALTER TABLE "project_case_studies" ALTER COLUMN "problem" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "project_case_studies" ALTER COLUMN "solution" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "project_case_studies" ALTER COLUMN "challenges" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "project_case_studies" ALTER COLUMN "results" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "project_case_studies" ADD COLUMN "approach" text;