import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  category: varchar("category", {
    length: 100,
    enum: [
      "frontend",
      "backend",
      "database",
      "cloud",
      "devops",
      "testing",
      "framework",
      "mobile",
      "design",
      "AI",
      "other",
    ],
  }),
  description: text("description"),
  order: integer("order").default(0),
});
