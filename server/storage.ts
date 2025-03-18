import { 
  Account, InsertAccount, 
  Inventory, InsertInventory, 
  Metrics, InsertMetrics,
  User, InsertUser,
  InventoryStatus
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Account methods
  getAccounts(userId: number): Promise<Account[]>;
  getAccount(id: number): Promise<Account | undefined>;
  createAccount(account: InsertAccount): Promise<Account>;
  updateAccount(id: number, updates: Partial<Account>): Promise<Account | undefined>;
  deleteAccount(id: number): Promise<boolean>;
  
  // Inventory methods
  getInventoryItems(filters?: { platform?: string; status?: string; search?: string }): Promise<Inventory[]>;
  getInventoryItem(id: number): Promise<Inventory | undefined>;
  getInventoryItemBySku(sku: string): Promise<Inventory | undefined>;
  createInventoryItem(item: InsertInventory): Promise<Inventory>;
  updateInventoryItem(id: number, updates: Partial<Inventory>): Promise<Inventory | undefined>;
  deleteInventoryItem(id: number): Promise<boolean>;
  
  // Metrics methods
  getMetrics(userId: number): Promise<Metrics | undefined>;
  updateMetrics(userId: number, updates: Partial<InsertMetrics>): Promise<Metrics | undefined>;
  calculateMetrics(userId: number): Promise<Metrics>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private accounts: Map<number, Account>;
  private inventory: Map<number, Inventory>;
  private metricsData: Map<number, Metrics>;
  private userId: number;
  private accountId: number;
  private inventoryId: number;
  private metricsId: number;

  constructor() {
    this.users = new Map();
    this.accounts = new Map();
    this.inventory = new Map();
    this.metricsData = new Map();
    this.userId = 1;
    this.accountId = 1;
    this.inventoryId = 1;
    this.metricsId = 1;
    
    // Add default user for testing
    this.createUser({ username: "admin", password: "password" });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Account methods
  async getAccounts(userId: number): Promise<Account[]> {
    return Array.from(this.accounts.values()).filter(
      (account) => account.userId === userId
    );
  }

  async getAccount(id: number): Promise<Account | undefined> {
    return this.accounts.get(id);
  }

  async createAccount(insertAccount: InsertAccount): Promise<Account> {
    const id = this.accountId++;
    const now = new Date();
    const account: Account = { 
      ...insertAccount, 
      id, 
      isActive: true, 
      productCount: 0, 
      lastSynced: now 
    };
    this.accounts.set(id, account);
    return account;
  }

  async updateAccount(id: number, updates: Partial<Account>): Promise<Account | undefined> {
    const account = this.accounts.get(id);
    if (!account) return undefined;
    
    const updatedAccount = { ...account, ...updates };
    this.accounts.set(id, updatedAccount);
    return updatedAccount;
  }

  async deleteAccount(id: number): Promise<boolean> {
    return this.accounts.delete(id);
  }

  // Inventory methods
  async getInventoryItems(filters?: { platform?: string; status?: string; search?: string }): Promise<Inventory[]> {
    let items = Array.from(this.inventory.values());
    
    if (filters) {
      if (filters.platform) {
        items = items.filter(item => item.platform === filters.platform);
      }
      
      if (filters.status) {
        items = items.filter(item => item.status === filters.status);
      }
      
      if (filters.search) {
        const search = filters.search.toLowerCase();
        items = items.filter(
          item => 
            item.name.toLowerCase().includes(search) || 
            item.sku.toLowerCase().includes(search) ||
            (item.category && item.category.toLowerCase().includes(search))
        );
      }
    }
    
    return items;
  }

  async getInventoryItem(id: number): Promise<Inventory | undefined> {
    return this.inventory.get(id);
  }

  async getInventoryItemBySku(sku: string): Promise<Inventory | undefined> {
    return Array.from(this.inventory.values()).find(
      (item) => item.sku === sku
    );
  }

  async createInventoryItem(insertItem: InsertInventory): Promise<Inventory> {
    const id = this.inventoryId++;
    const now = new Date();
    
    // Determine status based on quantity
    let status: InventoryStatus = "Out of Stock";
    if (insertItem.quantity && insertItem.quantity > 0) {
      status = insertItem.quantity <= 10 ? "Low Stock" : "In Stock";
    }
    
    const item: Inventory = { 
      ...insertItem, 
      id, 
      status,
      lastUpdated: now 
    };
    
    this.inventory.set(id, item);
    
    // Update product count for the account
    const account = this.accounts.get(insertItem.accountId);
    if (account) {
      this.updateAccount(account.id, { 
        productCount: account.productCount + 1 
      });
    }
    
    // Recalculate metrics
    await this.calculateMetrics(1); // Using default user ID for now
    
    return item;
  }

  async updateInventoryItem(id: number, updates: Partial<Inventory>): Promise<Inventory | undefined> {
    const item = this.inventory.get(id);
    if (!item) return undefined;
    
    // Update status if quantity changed
    if (updates.quantity !== undefined) {
      if (updates.quantity <= 0) {
        updates.status = "Out of Stock";
      } else if (updates.quantity <= 10) {
        updates.status = "Low Stock";
      } else {
        updates.status = "In Stock";
      }
    }
    
    const updatedItem = { 
      ...item, 
      ...updates, 
      lastUpdated: new Date() 
    };
    
    this.inventory.set(id, updatedItem);
    
    // Recalculate metrics
    await this.calculateMetrics(1); // Using default user ID for now
    
    return updatedItem;
  }

  async deleteInventoryItem(id: number): Promise<boolean> {
    const item = this.inventory.get(id);
    if (!item) return false;
    
    const result = this.inventory.delete(id);
    
    // Update product count for the account
    const account = this.accounts.get(item.accountId);
    if (account && result) {
      this.updateAccount(account.id, { 
        productCount: Math.max(0, account.productCount - 1) 
      });
    }
    
    // Recalculate metrics
    if (result) {
      await this.calculateMetrics(1); // Using default user ID for now
    }
    
    return result;
  }

  // Metrics methods
  async getMetrics(userId: number): Promise<Metrics | undefined> {
    return Array.from(this.metricsData.values()).find(
      (m) => m.userId === userId
    );
  }

  async updateMetrics(userId: number, updates: Partial<InsertMetrics>): Promise<Metrics | undefined> {
    const existingMetrics = await this.getMetrics(userId);
    
    if (!existingMetrics) {
      // Create new metrics if not exists
      const id = this.metricsId++;
      const metrics: Metrics = {
        id,
        totalProducts: updates.totalProducts || 0,
        lowStock: updates.lowStock || 0,
        outOfStock: updates.outOfStock || 0,
        pendingOrders: updates.pendingOrders || 0,
        userId,
        lastUpdated: new Date()
      };
      
      this.metricsData.set(id, metrics);
      return metrics;
    } else {
      // Update existing metrics
      const updatedMetrics = {
        ...existingMetrics,
        ...updates,
        lastUpdated: new Date()
      };
      
      this.metricsData.set(existingMetrics.id, updatedMetrics);
      return updatedMetrics;
    }
  }

  async calculateMetrics(userId: number): Promise<Metrics> {
    const items = await this.getInventoryItems();
    
    const totalProducts = items.length;
    const lowStock = items.filter(item => item.status === "Low Stock").length;
    const outOfStock = items.filter(item => item.status === "Out of Stock").length;
    
    // We'll use a mock value for pending orders as it's not part of our schema
    const pendingOrders = 18;
    
    return this.updateMetrics(userId, {
      totalProducts,
      lowStock,
      outOfStock,
      pendingOrders,
      userId
    }) as Promise<Metrics>;
  }
}

export const storage = new MemStorage();
