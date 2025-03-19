import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  category: varchar("category", {
    length: 100,
    enum: ["frontend", "backend", "database", "cloud", "other"],
  }),
  description: text("description"),
});
