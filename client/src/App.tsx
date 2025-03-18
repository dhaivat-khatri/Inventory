import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import DashboardPage from "@/pages/DashboardPage";
import InventoryPage from "@/pages/InventoryPage";
import SettingsPage from "@/pages/SettingsPage";
import LandingPage from "@/pages/LandingPage";
import FeatureListPage from "@/pages/FeatureListPage";
import IntegrationsPage from "@/pages/IntegrationsPage";
import ProductPage from "@/pages/ProductPage";
import WarehousePage from "@/pages/WarehousePage";
import OrderFulfillmentPage from "@/pages/OrderFulfillmentPage";
import AnalyticsPage from "@/pages/AnalyticsPage";
import OrdersPage from "@/pages/OrdersPage";
import ItemGroupingPage from "@/pages/ItemGroupingPage";
import SerialTrackingPage from "@/pages/SerialTrackingPage";
import PriceListPage from "@/pages/PriceListPage";
import BarcodePage from "@/pages/BarcodePage";
import RoadmapPage from "@/pages/RoadmapPage";
import { useEffect } from "react";
import { apiRequest } from "./lib/queryClient";
import { useToast } from "@/hooks/use-toast";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/inventory" component={InventoryPage} />
      <Route path="/products" component={ProductPage} />
      <Route path="/warehouses" component={WarehousePage} />
      <Route path="/orders" component={OrdersPage} />
      <Route path="/fulfillment" component={OrderFulfillmentPage} />
      <Route path="/analytics" component={AnalyticsPage} />
      <Route path="/item-grouping" component={ItemGroupingPage} />
      <Route path="/serial-tracking" component={SerialTrackingPage} />
      <Route path="/price-lists" component={PriceListPage} />
      <Route path="/barcodes" component={BarcodePage} />
      <Route path="/settings" component={SettingsPage} />
      <Route path="/features" component={FeatureListPage} />
      <Route path="/integrations" component={IntegrationsPage} />
      <Route path="/roadmap" component={RoadmapPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const { toast } = useToast();

  // Setup initial data (development only)
  useEffect(() => {
    const setupInitialData = async () => {
      try {
        // Only seed data if inventory is empty
        const inventoryRes = await fetch('/api/inventory');
        const inventory = await inventoryRes.json();
        
        if (Array.isArray(inventory) && inventory.length === 0) {
          await apiRequest('POST', '/api/seed-data', {});
          
          toast({
            title: "Sample data loaded",
            description: "Demo data has been loaded for testing purposes",
          });
        }
      } catch (error) {
        console.error("Error seeding initial data:", error);
      }
    };
    
    setupInitialData();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
