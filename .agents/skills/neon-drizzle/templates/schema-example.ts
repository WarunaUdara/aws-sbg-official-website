/**
 * Drizzle Schema Example
 *
 * This file demonstrates how to define database tables and relationships
 * using Drizzle ORM with Neon Postgres.
 *
 * Usage: Import these tables in your application code for type-safe queries
 */

import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  timestamp,
  boolean,
  decimal,
  json,
  index,
  unique,
  foreignKey,
} from "drizzle-orm/pg-core";

/**
 * Users Table
 *
 * Stores basic user information. Can be extended with additional fields
 * as needed by your application.
 */
export const users = pgTable(
  "users",
  {
    avatar: text("avatar"), // URL to avatar image
    createdAt: timestamp("created_at").defaultNow(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    id: serial("id").primaryKey(),
    isActive: boolean("is_active").default(true),
    name: varchar("name", { length: 255 }).notNull(),
    password: text("password"), // If not using external auth
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    createdAtIdx: index("users_created_at_idx").on(table.createdAt),
    emailIdx: index("users_email_idx").on(table.email),
  })
);

/**
 * Profiles Table
 *
 * Extended user information. Uses a foreign key to link with users.
 */
export const profiles = pgTable("profiles", {
  bio: text("bio"),
  createdAt: timestamp("created_at").defaultNow(),
  id: serial("id").primaryKey(),
  location: varchar("location", { length: 255 }),
  phone: varchar("phone", { length: 20 }),
  updatedAt: timestamp("updated_at").defaultNow(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  website: varchar("website", { length: 255 }),
});

/**
 * Posts Table
 *
 * Blog posts created by users.
 */
export const posts = pgTable(
  "posts",
  {
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    excerpt: text("excerpt"),
    id: serial("id").primaryKey(),
    published: boolean("published").default(false),
    publishedAt: timestamp("published_at"),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    title: varchar("title", { length: 255 }).notNull(),
    updatedAt: timestamp("updated_at").defaultNow(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (table) => ({
    publishedIdx: index("posts_published_idx").on(table.published),
    slugIdx: index("posts_slug_idx").on(table.slug),
    userIdIdx: index("posts_user_id_idx").on(table.userId),
  })
);

/**
 * Comments Table
 *
 * Comments on blog posts. Supports nested comments via parent_id.
 */
export const comments = pgTable(
  "comments",
  {
    approved: boolean("approved").default(false),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    id: serial("id").primaryKey(),
    parentId: integer("parent_id").references(() => comments.id, {
      onDelete: "cascade",
    }),
    postId: integer("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    updatedAt: timestamp("updated_at").defaultNow(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (table) => ({
    parentIdIdx: index("comments_parent_id_idx").on(table.parentId),
    postIdIdx: index("comments_post_id_idx").on(table.postId),
    userIdIdx: index("comments_user_id_idx").on(table.userId),
  })
);

/**
 * Tags Table
 *
 * Tags for categorizing posts.
 */
export const tags = pgTable("tags", {
  createdAt: timestamp("created_at").defaultNow(),
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
});

/**
 * PostTags Junction Table
 *
 * Many-to-many relationship between posts and tags.
 */
export const postTags = pgTable(
  "post_tags",
  {
    postId: integer("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    tagId: integer("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (table) => ({
    pk: { columns: [table.postId, table.tagId], name: "post_tags_pk" },
    postIdIdx: index("post_tags_post_id_idx").on(table.postId),
    tagIdIdx: index("post_tags_tag_id_idx").on(table.tagId),
  })
);

/**
 * Settings Table
 *
 * Application-wide or user-specific settings stored as JSON.
 */
export const settings = pgTable("settings", {
  createdAt: timestamp("created_at").defaultNow(),
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 255 }).notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
  userId: integer("user_id").references(() => users.id, {
    onDelete: "cascade",
  }), // null = global settings
  value: json("value"),
});

// ============================================================================
// Relations (optional but recommended for better type safety)
// ============================================================================

export const usersRelations = relations(users, ({ many, one }) => ({
  comments: many(comments),
  posts: many(posts),
  profile: one(profiles),
}));

export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(users, {
    fields: [profiles.userId],
    references: [users.id],
  }),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
  comments: many(comments),
  tags: many(postTags),
}));

export const commentsRelations = relations(comments, ({ one, many }) => ({
  author: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
  parent: one(comments, {
    fields: [comments.parentId],
    references: [comments.id],
  }),
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
  replies: many(comments),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  posts: many(postTags),
}));

export const postTagsRelations = relations(postTags, ({ one }) => ({
  post: one(posts, {
    fields: [postTags.postId],
    references: [posts.id],
  }),
  tag: one(tags, {
    fields: [postTags.tagId],
    references: [tags.id],
  }),
}));
