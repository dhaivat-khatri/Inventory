import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Platform types
export const PlatformType = z.enum(["Shopify", "Amazon", "Etsy", "WooCommerce", "eBay"]);
export type PlatformType = z.infer<typeof PlatformType>;

// Connected accounts model
export const accounts = pgTable("accounts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  platform: text("platform").notNull(),
  apiKey: text("api_key").notNull(),
  isActive: boolean("is_active").default(true),
  productCount: integer("product_count").default(0),
  lastSynced: timestamp("last_synced"),
  userId: integer("user_id").notNull().references(() => users.id),
});

export const insertAccountSchema = createInsertSchema(accounts).pick({
  name: true,
  platform: true,
  apiKey: true,
  userId: true,
});

export type InsertAccount = z.infer<typeof insertAccountSchema>;
export type Account = typeof accounts.$inferSelect;

// Inventory status options
export const InventoryStatus = z.enum(["In Stock", "Low Stock", "Out of Stock"]);
export type InventoryStatus = z.infer<typeof InventoryStatus>;

// Inventory model
export const inventory = pgTable("inventory", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  sku: text("sku").notNull().unique(),
  category: text("category"),
  subcategory: text("subcategory"),
  quantity: integer("quantity").default(0),
  status: text("status").default("Out of Stock"),
  platform: text("platform").notNull(),
  accountId: integer("account_id").notNull().references(() => accounts.id),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

export const insertInventorySchema = createInsertSchema(inventory).pick({
  name: true,
  sku: true,
  category: true,
  subcategory: true,
  quantity: true,
  platform: true,
  accountId: true,
});

export type InsertInventory = z.infer<typeof insertInventorySchema>;
export type Inventory = typeof inventory.$inferSelect;

// Inventory metrics model to store cached counts for dashboard
export const metrics = pgTable("metrics", {
  id: serial("id").primaryKey(),
  totalProducts: integer("total_products").default(0),
  lowStock: integer("low_stock").default(0),
  outOfStock: integer("out_of_stock").default(0),
  pendingOrders: integer("pending_orders").default(0),
  userId: integer("user_id").notNull().references(() => users.id),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

export const insertMetricsSchema = createInsertSchema(metrics).pick({
  totalProducts: true,
  lowStock: true,
  outOfStock: true,
  pendingOrders: true,
  userId: true,
});

export type InsertMetrics = z.infer<typeof insertMetricsSchema>;
export type Metrics = typeof metrics.$inferSelect;
