import { db } from "./db";
import { IStorage } from "./storage";
import { 
  User, InsertUser, 
  Account, InsertAccount, 
  Inventory, InsertInventory, 
  Metrics, InsertMetrics,
  InventoryStatus,
  users,
  accounts,
  inventory,
  metrics
} from "../shared/schema";
import { eq, and, like, asc, desc, or, isNull } from "drizzle-orm";

export class PgStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  // Account methods
  async getAccounts(userId: number): Promise<Account[]> {
    return await db.select().from(accounts).where(eq(accounts.userId, userId));
  }

  async getAccount(id: number): Promise<Account | undefined> {
    const result = await db.select().from(accounts).where(eq(accounts.id, id));
    return result[0];
  }

  async createAccount(account: InsertAccount): Promise<Account> {
    const result = await db.insert(accounts).values(account).returning();
    return result[0];
  }

  async updateAccount(id: number, updates: Partial<Account>): Promise<Account | undefined> {
    const result = await db.update(accounts)
      .set(updates)
      .where(eq(accounts.id, id))
      .returning();
    return result[0];
  }

  async deleteAccount(id: number): Promise<boolean> {
    try {
      // Delete related inventory items first to maintain referential integrity
      await db.delete(inventory).where(eq(inventory.accountId, id));
      
      // Then delete the account
      await db.delete(accounts).where(eq(accounts.id, id));
      return true;
    } catch (error) {
      console.error("Error deleting account:", error);
      return false;
    }
  }

  // Inventory methods
  async getInventoryItems(filters?: { platform?: string; status?: string; search?: string }): Promise<Inventory[]> {
    let query = db.select().from(inventory);
    
    // Apply filters if provided
    if (filters) {
      const conditions = [];
      
      if (filters.platform) {
        conditions.push(eq(inventory.platform, filters.platform));
      }
      
      if (filters.status) {
        conditions.push(eq(inventory.status, filters.status));
      }
      
      if (filters.search) {
        conditions.push(
          or(
            like(inventory.name, `%${filters.search}%`),
            like(inventory.sku, `%${filters.search}%`),
            like(inventory.category || '', `%${filters.search}%`)
          )
        );
      }
      
      if (conditions.length > 0) {
        query = query.where(and(...conditions));
      }
    }
    
    return await query.orderBy(asc(inventory.name));
  }

  async getInventoryItem(id: number): Promise<Inventory | undefined> {
    const result = await db.select().from(inventory).where(eq(inventory.id, id));
    return result[0];
  }

  async getInventoryItemBySku(sku: string): Promise<Inventory | undefined> {
    const result = await db.select().from(inventory).where(eq(inventory.sku, sku));
    return result[0];
  }

  async createInventoryItem(item: InsertInventory): Promise<Inventory> {
    // Determine status based on quantity
    let status: InventoryStatus = "Out of Stock";
    if (item.quantity && item.quantity > 10) {
      status = "In Stock";
    } else if (item.quantity && item.quantity > 0) {
      status = "Low Stock";
    }
    
    // Create the inventory item with status
    const result = await db.insert(inventory)
      .values({ ...item, status })
      .returning();
    
    // Update account product count
    const account = await this.getAccount(item.accountId);
    if (account) {
      await this.updateAccount(account.id, { 
        productCount: (account.productCount || 0) + 1 
      });
    }
    
    return result[0];
  }

  async updateInventoryItem(id: number, updates: Partial<Inventory>): Promise<Inventory | undefined> {
    // If quantity is being updated, update status accordingly
    if (updates.quantity !== undefined) {
      if (updates.quantity > 10) {
        updates.status = "In Stock";
      } else if (updates.quantity > 0) {
        updates.status = "Low Stock";
      } else {
        updates.status = "Out of Stock";
      }
    }
    
    const result = await db.update(inventory)
      .set({ ...updates, lastUpdated: new Date() })
      .where(eq(inventory.id, id))
      .returning();
      
    return result[0];
  }

  async deleteInventoryItem(id: number): Promise<boolean> {
    try {
      // Get the item to update account count after deletion
      const item = await this.getInventoryItem(id);
      
      if (!item) {
        return false;
      }
      
      // Delete the item
      await db.delete(inventory).where(eq(inventory.id, id));
      
      // Update account product count
      const account = await this.getAccount(item.accountId);
      if (account) {
        await this.updateAccount(account.id, { 
          productCount: Math.max((account.productCount || 0) - 1, 0) 
        });
      }
      
      return true;
    } catch (error) {
      console.error("Error deleting inventory item:", error);
      return false;
    }
  }

  // Metrics methods
  async getMetrics(userId: number): Promise<Metrics | undefined> {
    const result = await db.select().from(metrics).where(eq(metrics.userId, userId));
    return result[0];
  }

  async updateMetrics(userId: number, updates: Partial<InsertMetrics>): Promise<Metrics | undefined> {
    // Check if metrics exist for this user
    const existingMetrics = await this.getMetrics(userId);
    
    if (existingMetrics) {
      // Update existing metrics
      const result = await db.update(metrics)
        .set({ ...updates, lastUpdated: new Date() })
        .where(eq(metrics.id, existingMetrics.id))
        .returning();
      return result[0];
    } else {
      // Create new metrics
      const result = await db.insert(metrics)
        .values({ ...updates, userId })
        .returning();
      return result[0];
    }
  }

  async calculateMetrics(userId: number): Promise<Metrics> {
    // Get all inventory items
    const items = await db.select().from(inventory)
      .innerJoin(accounts, eq(inventory.accountId, accounts.id))
      .where(eq(accounts.userId, userId));
      
    // Calculate metrics
    const totalProducts = items.length;
    const lowStock = items.filter(item => item.inventory.status === "Low Stock").length;
    const outOfStock = items.filter(item => item.inventory.status === "Out of Stock").length;
    
    // For this example, we'll set pendingOrders to 0 - in a real system this would count actual orders
    const pendingOrders = 0;
    
    // Update metrics in database
    const updatedMetrics = await this.updateMetrics(userId, {
      totalProducts,
      lowStock,
      outOfStock,
      pendingOrders,
      userId
    });
    
    return updatedMetrics!;
  }
}

// Export an instance of the PgStorage
export const pgStorage = new PgStorage();