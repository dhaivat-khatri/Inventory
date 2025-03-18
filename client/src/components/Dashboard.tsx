import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { 
  BadgeCheck, 
  Package,
  Search,
  Plus,
  ChevronRight,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { ConnectAccountModal } from "@/components/ConnectAccountModal";
import StatusBadge from "@/components/ui/status-badge";
import { Link } from "wouter";

export function Dashboard() {
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [platformFilter, setPlatformFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Fetch accounts
  const { 
    data: accounts, 
    isLoading: accountsLoading 
  } = useQuery({
    queryKey: ['/api/accounts'],
  });
  
  // Fetch metrics
  const { 
    data: metrics, 
    isLoading: metricsLoading 
  } = useQuery({
    queryKey: ['/api/metrics'],
  });
  
  // Fetch inventory items
  const { 
    data: inventoryItems, 
    isLoading: inventoryLoading 
  } = useQuery({
    queryKey: ['/api/inventory'],
  });
  
  // Filter inventory items based on platform and search query
  const filteredItems = inventoryItems ? inventoryItems.filter(item => {
    // Filter by platform
    if (platformFilter !== "All" && item.platform !== platformFilter) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(query) ||
        item.sku.toLowerCase().includes(query) ||
        (item.category && item.category.toLowerCase().includes(query))
      );
    }
    
    return true;
  }) : [];
  
  // Only show first 5 items in the dashboard
  const displayItems = filteredItems.slice(0, 5);
  
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <div className="flex gap-3">
            {accounts && accounts.length === 0 && (
              <Button
                className="inline-flex items-center px-5 py-3 text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
                size="lg"
              >
                <Zap className="h-5 w-5 mr-2 animate-pulse" />
                Get Started
              </Button>
            )}
            <Button
              onClick={() => setConnectModalOpen(true)}
              className="inline-flex items-center px-4 py-2 text-sm"
              variant={accounts && accounts.length === 0 ? "outline" : "default"}
            >
              Connect Account
            </Button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Connected Accounts Section */}
        <div className="py-4">
          <h2 className="text-lg font-medium mb-4">Connected Accounts</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {accountsLoading ? (
              // Loading skeletons
              Array(3).fill(0).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-5">
                      <div className="flex items-center">
                        <Skeleton className="h-12 w-12 rounded-md" />
                        <div className="ml-5 w-0 flex-1">
                          <Skeleton className="h-4 w-24 mb-2" />
                          <Skeleton className="h-6 w-32" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-5 py-3">
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : accounts && accounts.length > 0 ? (
              // Account cards
              accounts.map((account) => (
                <Card key={account.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-[#4299E1] rounded-md p-3">
                          <Package className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              {account.name}
                            </dt>
                            <dd className="flex items-center">
                              <div className="text-lg font-medium text-gray-900">
                                {account.productCount} Products
                              </div>
                              <div className="ml-2 flex-shrink-0 flex">
                                <StatusBadge status={account.isActive ? "Synced" : "Syncing..."} />
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-5 py-3">
                      <div className="text-sm">
                        <Link href={`/inventory?platform=${account.platform}`} className="font-medium text-[#4299E1] hover:text-blue-600">
                          View details
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              // Empty state
              <div className="col-span-1 sm:col-span-2 lg:col-span-3 bg-white p-6 rounded-lg border border-gray-200 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No accounts connected</h3>
                <p className="text-gray-500 mb-4">Connect your first e-commerce platform to start managing inventory</p>
                <Button onClick={() => setConnectModalOpen(true)}>
                  Connect Account
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Inventory Metrics Section */}
        <div className="py-4">
          <h2 className="text-lg font-medium mb-4">Inventory Metrics</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {metricsLoading ? (
              // Loading skeletons
              Array(4).fill(0).map((_, i) => (
                <Card key={i}>
                  <CardContent className="px-4 py-5 sm:p-6">
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-8 w-16" />
                  </CardContent>
                </Card>
              ))
            ) : metrics ? (
              // Metrics cards
              <>
                <Card>
                  <CardContent className="px-4 py-5 sm:p-6">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Products</dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">{metrics.totalProducts}</dd>
                    </dl>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="px-4 py-5 sm:p-6">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Low Stock Items</dt>
                      <dd className="mt-1 text-3xl font-semibold text-[#ECC94B]">{metrics.lowStock}</dd>
                    </dl>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="px-4 py-5 sm:p-6">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Out of Stock</dt>
                      <dd className="mt-1 text-3xl font-semibold text-red-500">{metrics.outOfStock}</dd>
                    </dl>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="px-4 py-5 sm:p-6">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Pending Orders</dt>
                      <dd className="mt-1 text-3xl font-semibold text-[#4299E1]">{metrics.pendingOrders}</dd>
                    </dl>
                  </CardContent>
                </Card>
              </>
            ) : (
              // Empty state (should not happen often as we auto-calculate)
              <Card className="col-span-1 sm:col-span-2 lg:col-span-4">
                <CardContent className="px-4 py-5 sm:p-6 text-center">
                  <p className="text-gray-500">No metrics available</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        
        {/* Inventory Overview Section */}
        <div className="py-4">
          <div className="sm:flex sm:items-center sm:justify-between mb-4">
            <h2 className="text-lg font-medium">Inventory Overview</h2>
            <div className="mt-3 sm:mt-0 sm:ml-4">
              <div className="flex rounded-md shadow-sm">
                <div className="relative flex-grow focus-within:z-10">
                  <Select
                    value={platformFilter}
                    onValueChange={setPlatformFilter}
                  >
                    <SelectTrigger className="rounded-r-none w-full">
                      <SelectValue placeholder="All Platforms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Platforms</SelectItem>
                      {accounts && accounts.map(account => (
                        <SelectItem key={account.id} value={account.platform}>
                          {account.platform}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="-ml-px relative inline-flex">
                  <div className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50">
                    <Search className="h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search"
                      className="border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <Table>
                    <TableHeader className="bg-gray-50">
                      <TableRow>
                        <TableHead className="w-1/3">Product</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead>Platform</TableHead>
                        <TableHead>Available</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="relative">
                          <span className="sr-only">Edit</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inventoryLoading ? (
                        // Loading skeletons
                        Array(5).fill(0).map((_, i) => (
                          <TableRow key={i}>
                            <TableCell>
                              <div className="flex items-center">
                                <Skeleton className="h-10 w-10 rounded-full" />
                                <div className="ml-4">
                                  <Skeleton className="h-4 w-32 mb-1" />
                                  <Skeleton className="h-3 w-24" />
                                </div>
                              </div>
                            </TableCell>
                            <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                            <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                            <TableCell><Skeleton className="h-4 w-8" /></TableCell>
                            <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                            <TableCell align="right"><Skeleton className="h-4 w-10 ml-auto" /></TableCell>
                          </TableRow>
                        ))
                      ) : displayItems.length > 0 ? (
                        // Inventory table rows
                        displayItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                    <Package className="h-6 w-6" />
                                  </div>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {item.name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {item.category} {item.subcategory ? `> ${item.subcategory}` : ''}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm text-gray-900">{item.sku}</div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm text-gray-900">{item.platform}</div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm text-gray-500">{item.quantity}</div>
                            </TableCell>
                            <TableCell>
                              <StatusBadge status={item.status} />
                            </TableCell>
                            <TableCell className="text-right text-sm font-medium">
                              <Link href={`/inventory/${item.id}`} className="text-[#4299E1] hover:text-blue-700">
                                Edit
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        // Empty state
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8">
                            <div className="flex flex-col items-center">
                              <BadgeCheck className="h-12 w-12 text-gray-300 mb-3" />
                              <h3 className="text-lg font-medium text-gray-900 mb-1">No inventory items found</h3>
                              <p className="text-gray-500 max-w-sm mb-4">
                                {accounts && accounts.length > 0 
                                  ? 'Try removing filters or add new inventory items'
                                  : 'Connect an account to start adding inventory items'}
                              </p>
                              {accounts && accounts.length > 0 ? (
                                <Link href="/inventory/new">
                                  <Button>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Item
                                  </Button>
                                </Link>
                              ) : (
                                <Button onClick={() => setConnectModalOpen(true)}>
                                  Connect Account
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                {displayItems.length > 0 && (
                  <div className="mt-4 flex justify-end">
                    <Link href="/inventory">
                      <Button variant="outline" className="flex items-center">
                        View All Inventory
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Connect Account Modal */}
      <ConnectAccountModal open={connectModalOpen} onOpenChange={setConnectModalOpen} />
    </div>
  );
}

export default Dashboard;
