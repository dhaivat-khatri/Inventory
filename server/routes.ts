import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAccountSchema, insertInventorySchema, PlatformType, InventoryStatus } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Generic error handler
  const handleError = (res: Response, error: any) => {
    console.error('API Error:', error);
    const status = error.status || 500;
    const message = error.message || 'Internal Server Error';
    res.status(status).json({ error: message });
  };

  // Get all accounts for a user
  app.get('/api/accounts', async (req: Request, res: Response) => {
    try {
      // In a real app, we'd get the userId from the session
      const userId = 1; // Using default user for now
      const accounts = await storage.getAccounts(userId);
      res.json(accounts);
    } catch (error) {
      handleError(res, error);
    }
  });

  // Create new account
  app.post('/api/accounts', async (req: Request, res: Response) => {
    try {
      // In a real app, we'd get the userId from the session
      const userId = 1; // Using default user for now
      
      // Validate request body
      const accountData = insertAccountSchema.parse({
        ...req.body,
        userId
      });
      
      const account = await storage.createAccount(accountData);
      res.status(201).json(account);
    } catch (error) {
      handleError(res, error);
    }
  });

  // Delete account
  app.delete('/api/accounts/:id', async (req: Request, res: Response) => {
    try {
      const accountId = parseInt(req.params.id);
      if (isNaN(accountId)) {
        return res.status(400).json({ error: 'Invalid account ID' });
      }
      
      const result = await storage.deleteAccount(accountId);
      if (!result) {
        return res.status(404).json({ error: 'Account not found' });
      }
      
      res.status(204).send();
    } catch (error) {
      handleError(res, error);
    }
  });

  // Get inventory items with optional filtering
  app.get('/api/inventory', async (req: Request, res: Response) => {
    try {
      const { platform, status, search } = req.query;
      
      const filters: {
        platform?: string;
        status?: string;
        search?: string;
      } = {};
      
      if (platform && typeof platform === 'string') {
        filters.platform = platform;
      }
      
      if (status && typeof status === 'string') {
        filters.status = status;
      }
      
      if (search && typeof search === 'string') {
        filters.search = search;
      }
      
      const items = await storage.getInventoryItems(filters);
      res.json(items);
    } catch (error) {
      handleError(res, error);
    }
  });

  // Get single inventory item
  app.get('/api/inventory/:id', async (req: Request, res: Response) => {
    try {
      const itemId = parseInt(req.params.id);
      if (isNaN(itemId)) {
        return res.status(400).json({ error: 'Invalid item ID' });
      }
      
      const item = await storage.getInventoryItem(itemId);
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      
      res.json(item);
    } catch (error) {
      handleError(res, error);
    }
  });

  // Create inventory item
  app.post('/api/inventory', async (req: Request, res: Response) => {
    try {
      // Validate request body
      const itemData = insertInventorySchema.parse(req.body);
      
      const item = await storage.createInventoryItem(itemData);
      res.status(201).json(item);
    } catch (error) {
      handleError(res, error);
    }
  });

  // Update inventory item
  app.patch('/api/inventory/:id', async (req: Request, res: Response) => {
    try {
      const itemId = parseInt(req.params.id);
      if (isNaN(itemId)) {
        return res.status(400).json({ error: 'Invalid item ID' });
      }
      
      const updates = req.body;
      const updatedItem = await storage.updateInventoryItem(itemId, updates);
      
      if (!updatedItem) {
        return res.status(404).json({ error: 'Item not found' });
      }
      
      res.json(updatedItem);
    } catch (error) {
      handleError(res, error);
    }
  });

  // Delete inventory item
  app.delete('/api/inventory/:id', async (req: Request, res: Response) => {
    try {
      const itemId = parseInt(req.params.id);
      if (isNaN(itemId)) {
        return res.status(400).json({ error: 'Invalid item ID' });
      }
      
      const result = await storage.deleteInventoryItem(itemId);
      if (!result) {
        return res.status(404).json({ error: 'Item not found' });
      }
      
      res.status(204).send();
    } catch (error) {
      handleError(res, error);
    }
  });

  // Get inventory metrics
  app.get('/api/metrics', async (req: Request, res: Response) => {
    try {
      // In a real app, we'd get the userId from the session
      const userId = 1; // Using default user for now
      
      let metrics = await storage.getMetrics(userId);
      
      // Calculate metrics if not available
      if (!metrics) {
        metrics = await storage.calculateMetrics(userId);
      }
      
      res.json(metrics);
    } catch (error) {
      handleError(res, error);
    }
  });

  // Get platform types (for dropdown options)
  app.get('/api/platforms', (_req: Request, res: Response) => {
    res.json({
      platforms: PlatformType.options
    });
  });

  // Get inventory status types (for dropdown options)
  app.get('/api/statuses', (_req: Request, res: Response) => {
    res.json({
      statuses: InventoryStatus.options
    });
  });

  // Add sample data for testing
  app.post('/api/seed-data', async (_req: Request, res: Response) => {
    try {
      const userId = 1; // Default user
      
      // Create sample accounts
      const shopifyAccount = await storage.createAccount({
        name: "My Shopify Store",
        platform: "Shopify",
        apiKey: "sk_test_shopify123",
        userId
      });
      
      const amazonAccount = await storage.createAccount({
        name: "Amazon Seller",
        platform: "Amazon",
        apiKey: "sk_test_amazon456",
        userId
      });
      
      const etsyAccount = await storage.createAccount({
        name: "Etsy Shop",
        platform: "Etsy",
        apiKey: "sk_test_etsy789",
        userId
      });
      
      // Create sample inventory items
      await storage.createInventoryItem({
        name: "Cotton T-Shirt",
        sku: "TS-001-BLK",
        category: "Apparel",
        subcategory: "T-Shirts",
        quantity: 42,
        platform: "Shopify",
        accountId: shopifyAccount.id
      });
      
      await storage.createInventoryItem({
        name: "Ceramic Coffee Mug",
        sku: "MUG-101-WHT",
        category: "Kitchen",
        subcategory: "Mugs",
        quantity: 8,
        platform: "Amazon",
        accountId: amazonAccount.id
      });
      
      await storage.createInventoryItem({
        name: "Leather Wallet",
        sku: "WAL-220-BRN",
        category: "Accessories",
        subcategory: "Wallets",
        quantity: 0,
        platform: "Etsy",
        accountId: etsyAccount.id
      });
      
      await storage.createInventoryItem({
        name: "Wireless Headphones",
        sku: "HP-330-BLK",
        category: "Electronics",
        subcategory: "Audio",
        quantity: 15,
        platform: "Shopify",
        accountId: shopifyAccount.id
      });
      
      await storage.createInventoryItem({
        name: "Bamboo Cutting Board",
        sku: "CB-440-NAT",
        category: "Kitchen",
        subcategory: "Cutting Boards",
        quantity: 27,
        platform: "Amazon",
        accountId: amazonAccount.id
      });
      
      // Calculate metrics
      await storage.calculateMetrics(userId);
      
      res.status(201).json({ message: "Sample data created successfully" });
    } catch (error) {
      handleError(res, error);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
