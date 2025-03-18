CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL PRIMARY KEY,
    "username" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "accounts" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "api_key" TEXT NOT NULL,
    "is_active" BOOLEAN DEFAULT true,
    "product_count" INTEGER DEFAULT 0,
    "last_synced" TIMESTAMP,
    "user_id" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "inventory" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "sku" TEXT NOT NULL UNIQUE,
    "category" TEXT,
    "subcategory" TEXT,
    "quantity" INTEGER DEFAULT 0,
    "status" TEXT DEFAULT 'Out of Stock',
    "platform" TEXT NOT NULL,
    "account_id" INTEGER NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    "last_updated" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "metrics" (
    "id" SERIAL PRIMARY KEY,
    "total_products" INTEGER DEFAULT 0,
    "low_stock" INTEGER DEFAULT 0,
    "out_of_stock" INTEGER DEFAULT 0,
    "pending_orders" INTEGER DEFAULT 0,
    "user_id" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    "last_updated" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);