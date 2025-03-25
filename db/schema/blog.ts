import { relations } from "drizzle-orm";
import { pgTable, serial, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const blogRelations = relations(blogs, ({ many }) => ({
  blogsToTags: many(blogsToTags),
}));

export const blogTags = pgTable("blog_tags", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const blogTagsRelations = relations(blogTags, ({ many }) => ({
  blogsToTags: many(blogsToTags),
}));

export const blogsToTags = pgTable("blogs_to_tags", {
  blogId: integer("blog_id")
    .notNull()
    .references(() => blogs.id, { onDelete: "cascade" }),
  tagId: integer("tag_id")
    .notNull()
    .references(() => blogTags.id, { onDelete: "cascade" }),
});

export const blogsToTagsRelations = relations(blogsToTags, ({ one }) => ({
  blog: one(blogs, { fields: [blogsToTags.blogId], references: [blogs.id] }),
  tag: one(blogTags, { fields: [blogsToTags.tagId], references: [blogTags.id] }),
}));
