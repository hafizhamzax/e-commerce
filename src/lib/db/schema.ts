import { pgTable, text, timestamp, doublePrecision, uuid } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description").notNull(),
    excerpt: text("excerpt").notNull(),
    price: doublePrecision("price").notNull(),
    gumroadLink: text("gumroad_link").notNull(),
    imageUrl: text("image_url").notNull(),
    category: text("category").notNull(),
    publishedAt: timestamp("published_at").defaultNow().notNull(),
});
