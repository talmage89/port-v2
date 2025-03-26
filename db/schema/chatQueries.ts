import { pgTable, serial, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const chatQueries = pgTable("chat_queries", {
  id: serial("id").primaryKey(),
  clientIp: varchar("client_ip", { length: 50 }).notNull(),
  query: text("query").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
