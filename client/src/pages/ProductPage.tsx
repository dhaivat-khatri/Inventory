import { Sidebar } from "@/components/Sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/status-badge";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { 
  Package, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Tag, 
  BarChart4, 
  MoreHorizontal,
  Box,
  ArrowUpDown,
  ShoppingBag
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";

export default function ProductPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "",
    category: "",
    subcategory: "",
    quantity: 0,
    platform: "Shopify",
    description: "",
    price: 0,
    weight: 0,
    dimensions: "",
    upc: "",
    location: "",
    supplier: "",
    reorderPoint: 0
  });
  const [sortColumn, setSortColumn] = useState("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedTab, setSelectedTab] = useState("all");
  
  const { toast } = useToast();

  // Fetch inventory items
  const { data: inventory = [], isLoading } = useQuery({
    queryKey: ['/api/inventory'],
    refetchInterval: 5000,
  });

  // Fetch accounts
  const { data: accounts = [] } = useQuery({
    queryKey: ['/api/accounts'],
  });

  // Fetch platforms
  const { data: platformsData } = useQuery({
    queryKey: ['/api/platforms'],
  });
  const platforms = platformsData?.platforms || [];

  // Fetch statuses
  const { data: statusesData } = useQuery({
    queryKey: ['/api/statuses'],
  });
  const statuses = statusesData?.statuses || [];

  // Create product mutation
  const createProduct = useMutation({
    mutationFn: (product: any) => 
      apiRequest('POST', '/api/inventory', product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/inventory'] });
      queryClient.invalidateQueries({ queryKey: ['/api/metrics'] });
      setIsCreateModalOpen(false);
      resetProductForm();
      toast({
        title: "Product created",
        description: "New product has been added to inventory",
      });
    },
    onError: (error) => {
      toast({
        title: "Error creating product",
        description: error.toString(),
        variant: "destructive",
      });
    }
  });

  // Delete product mutation
  const deleteProduct = useMutation({
    mutationFn: (id: number) => 
      apiRequest('DELETE', `/api/inventory/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/inventory'] });
      queryClient.invalidateQueries({ queryKey: ['/api/metrics'] });
      toast({
        title: "Product deleted",
        description: "Product has been removed from inventory",
      });
    },
    onError: (error) => {
      toast({
        title: "Error deleting product",
        description: error.toString(),
        variant: "destructive",
      });
    }
  });

  const resetProductForm = () => {
    setNewProduct({
      name: "",
      sku: "",
      category: "",
      subcategory: "",
      quantity: 0,
      platform: "Shopify",
      description: "",
      price: 0,
      weight: 0,
      dimensions: "",
      upc: "",
      location: "",
      supplier: "",
      reorderPoint: 0
    });
  };

  const handleCreateProduct = () => {
    createProduct.mutate({
      ...newProduct,
      accountId: accounts.find(a => a.platform === newProduct.platform)?.id || 1
    });
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct.mutate(id);
    }
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Filter and sort products
  const filteredProducts = inventory.filter(product => {
    // Filter based on search query
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Filter based on tab
    if (selectedTab === "all") return matchesSearch;
    if (selectedTab === "low-stock") return matchesSearch && product.status === "Low Stock";
    if (selectedTab === "out-of-stock") return matchesSearch && product.status === "Out of Stock";
    
    return matchesSearch;
  }).sort((a, b) => {
    // Handle sorting
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Product categories for filtering
  const categories = Array.from(new Set(inventory.map(item => item.category).filter(Boolean)));

  const getAccountName = (accountId: number) => {
    const account = accounts.find(a => a.id === accountId);
    return account ? account.name : "Unknown";
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F7FAFC]">
      <Sidebar />
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">Product Management</h1>
                  <p className="mt-1 text-sm text-gray-500">
                    Manage all your products across platforms
                  </p>
                </div>
                <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={() => setIsCreateModalOpen(true)} 
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Product
                  </Button>
                </div>
              </div>

              {/* Product filters and search */}
              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          placeholder="Search products by name, SKU, or category"
                          className="pl-9"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="w-full md:w-48">
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          {categories.map((category, index) => (
                            <SelectItem key={index} value={category || ""}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-full md:w-48">
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Platforms</SelectItem>
                          {platforms.map((platform, index) => (
                            <SelectItem key={index} value={platform}>
                              {platform}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Product tabs */}
              <Tabs defaultValue="all" onValueChange={setSelectedTab} className="mb-6">
                <TabsList>
                  <TabsTrigger value="all" className="flex gap-2">
                    <Package className="h-4 w-4" />
                    <span>All Products</span>
                    <span className="bg-gray-200 text-gray-700 rounded-full px-2 py-0.5 text-xs">
                      {inventory.length}
                    </span>
                  </TabsTrigger>
                  <TabsTrigger value="low-stock" className="flex gap-2">
                    <Tag className="h-4 w-4" />
                    <span>Low Stock</span>
                    <span className="bg-amber-200 text-amber-700 rounded-full px-2 py-0.5 text-xs">
                      {inventory.filter(p => p.status === "Low Stock").length}
                    </span>
                  </TabsTrigger>
                  <TabsTrigger value="out-of-stock" className="flex gap-2">
                    <BarChart4 className="h-4 w-4" />
                    <span>Out of Stock</span>
                    <span className="bg-red-200 text-red-700 rounded-full px-2 py-0.5 text-xs">
                      {inventory.filter(p => p.status === "Out of Stock").length}
                    </span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="mt-6">
                  {renderProductTable(filteredProducts)}
                </TabsContent>
                <TabsContent value="low-stock" className="mt-6">
                  {renderProductTable(filteredProducts)}
                </TabsContent>
                <TabsContent value="out-of-stock" className="mt-6">
                  {renderProductTable(filteredProducts)}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>

      {/* Create Product Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  value={newProduct.sku}
                  onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})}
                  placeholder="Enter SKU"
                />
              </div>
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={newProduct.quantity}
                  onChange={(e) => setNewProduct({...newProduct, quantity: parseInt(e.target.value)})}
                  placeholder="Enter quantity"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  placeholder="Enter category"
                />
              </div>
              <div>
                <Label htmlFor="subcategory">Subcategory</Label>
                <Input
                  id="subcategory"
                  value={newProduct.subcategory}
                  onChange={(e) => setNewProduct({...newProduct, subcategory: e.target.value})}
                  placeholder="Enter subcategory"
                />
              </div>
              <div>
                <Label htmlFor="platform">Platform</Label>
                <Select 
                  value={newProduct.platform}
                  onValueChange={(value) => setNewProduct({...newProduct, platform: value})}
                >
                  <SelectTrigger id="platform">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {platforms.map((platform, index) => (
                      <SelectItem key={index} value={platform}>
                        {platform}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
                  placeholder="Enter price"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  placeholder="Enter product description"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.01"
                  value={newProduct.weight}
                  onChange={(e) => setNewProduct({...newProduct, weight: parseFloat(e.target.value)})}
                  placeholder="Enter weight"
                />
              </div>
              <div>
                <Label htmlFor="dimensions">Dimensions (L×W×H)</Label>
                <Input
                  id="dimensions"
                  value={newProduct.dimensions}
                  onChange={(e) => setNewProduct({...newProduct, dimensions: e.target.value})}
                  placeholder="Example: 10×5×2 cm"
                />
              </div>
              <div>
                <Label htmlFor="upc">UPC/EAN</Label>
                <Input
                  id="upc"
                  value={newProduct.upc}
                  onChange={(e) => setNewProduct({...newProduct, upc: e.target.value})}
                  placeholder="Enter UPC or EAN code"
                />
              </div>
              <div>
                <Label htmlFor="location">Warehouse Location</Label>
                <Input
                  id="location"
                  value={newProduct.location}
                  onChange={(e) => setNewProduct({...newProduct, location: e.target.value})}
                  placeholder="Example: Aisle 5, Shelf B"
                />
              </div>
              <div>
                <Label htmlFor="supplier">Supplier</Label>
                <Input
                  id="supplier"
                  value={newProduct.supplier}
                  onChange={(e) => setNewProduct({...newProduct, supplier: e.target.value})}
                  placeholder="Enter supplier name"
                />
              </div>
              <div>
                <Label htmlFor="reorderPoint">Reorder Point</Label>
                <Input
                  id="reorderPoint"
                  type="number"
                  value={newProduct.reorderPoint}
                  onChange={(e) => setNewProduct({...newProduct, reorderPoint: parseInt(e.target.value)})}
                  placeholder="Enter reorder threshold"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
            <Button type="submit" onClick={handleCreateProduct} disabled={!newProduct.name || !newProduct.sku}>
              {createProduct.isPending ? "Creating..." : "Create Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );

  function renderProductTable(products: any[]) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">
                <button 
                  className="flex items-center"
                  onClick={() => handleSort("name")}
                >
                  Product
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
              </TableHead>
              <TableHead>
                <button 
                  className="flex items-center"
                  onClick={() => handleSort("sku")}
                >
                  SKU
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
              </TableHead>
              <TableHead className="text-center">
                <button 
                  className="flex items-center justify-center"
                  onClick={() => handleSort("quantity")}
                >
                  Quantity
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
              </TableHead>
              <TableHead>
                <button 
                  className="flex items-center"
                  onClick={() => handleSort("status")}
                >
                  Status
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
              </TableHead>
              <TableHead>
                <button 
                  className="flex items-center"
                  onClick={() => handleSort("platform")}
                >
                  Platform
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  Loading products...
                </TableCell>
              </TableRow>
            ) : products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No products found.
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 mr-3">
                        <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center">
                          <Box className="h-5 w-5 text-gray-500" />
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.category || "Uncategorized"}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell className="text-center">
                    {product.quantity !== null ? product.quantity : "-"}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={product.status || "Unknown"} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span>{product.platform}</span>
                      <div className="text-xs text-gray-500 ml-1">
                        ({getAccountName(product.accountId)})
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="cursor-pointer text-red-600" 
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    );
  }
}