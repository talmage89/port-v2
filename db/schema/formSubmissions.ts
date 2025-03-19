import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const formSubmissions = pgTable("form_submissions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  reason: varchar("reason", {
    length: 255,
    enum: ["job opportunity", "project inquiry", "collaboration", "other"],
  }),
  message: text("message").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow(),
});
