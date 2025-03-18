import { Sidebar } from "@/components/Sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import {
  Box,
  Package,
  Layers,
  Search,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  ArrowUpDown,
  Check
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";

export default function ItemGroupingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isItemDetailsOpen, setIsItemDetailsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedTab, setSelectedTab] = useState("active-groups");
  const { toast } = useToast();

  const [newBundle, setNewBundle] = useState({
    name: "",
    sku: "",
    description: "",
    bundleItems: [{ itemId: "", quantity: 1 }],
    price: 0,
    taxRate: 0,
    discount: 0,
    style: ""
  });
  
  // Mock data - In a real app this would come from API
  const itemGroups = [
    {
      id: 1,
      name: "Cutiepie Rompers",
      sku: "CP-ROMP-BDL",
      items: [
        { id: 101, name: "Cutiepie Rompers Jet Black", sku: "CP-ROMP-BLK", quantity: 1, price: 29.99 },
        { id: 102, name: "Cutiepie Rompers Cloudy Blue", sku: "CP-ROMP-BLU", quantity: 1, price: 29.99 },
        { id: 103, name: "Cutiepie Rompers Junior Breaker", sku: "CP-ROMP-JNR", quantity: 1, price: 24.99 }
      ],
      totalItems: 3,
      totalPrice: 84.97,
      sellingPrice: 79.99,
      status: "Active"
    },
    {
      id: 2,
      name: "Premium Headset Bundle",
      sku: "HDST-BDL-PRM",
      items: [
        { id: 201, name: "Wireless Headphones", sku: "HP-330-BLK", quantity: 1, price: 59.99 },
        { id: 202, name: "Headphone Case", sku: "HP-CASE-01", quantity: 1, price: 19.99 },
        { id: 203, name: "Extended Warranty", sku: "WRTY-HP-2YR", quantity: 1, price: 29.99 }
      ],
      totalItems: 3,
      totalPrice: 109.97,
      sellingPrice: 99.99,
      status: "Active"
    },
    {
      id: 3,
      name: "Home Office Starter Kit",
      sku: "HOME-OFF-KIT",
      items: [
        { id: 301, name: "Desk Lamp", sku: "LAMP-001", quantity: 1, price: 39.99 },
        { id: 302, name: "Wireless Mouse", sku: "MOUSE-WL", quantity: 1, price: 24.99 },
        { id: 303, name: "Desk Organizer", sku: "ORG-DESK", quantity: 1, price: 19.99 },
        { id: 304, name: "Notepad Pack", sku: "NOTE-PAD", quantity: 2, price: 9.99 }
      ],
      totalItems: 5,
      totalPrice: 104.95,
      sellingPrice: 94.99,
      status: "Draft"
    }
  ];

  // Fetch inventory items
  const { data: inventory = [], isLoading: isInventoryLoading } = useQuery({
    queryKey: ['/api/inventory'],
    refetchInterval: 5000,
  });

  // Filter bundles based on search and selected tab
  const filteredBundles = itemGroups.filter(bundle => {
    // Search filter
    const matchesSearch = 
      bundle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bundle.sku.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Tab filter
    if (selectedTab === "active-groups") return matchesSearch && bundle.status === "Active";
    if (selectedTab === "draft-groups") return matchesSearch && bundle.status === "Draft";
    
    return matchesSearch;
  });

  // Create bundle mutation
  const createBundle = useMutation({
    mutationFn: (bundle: any) => 
      apiRequest('POST', '/api/bundles', bundle),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/bundles'] });
      setIsCreateModalOpen(false);
      resetBundleForm();
      toast({
        title: "Bundle created",
        description: "New bundle has been added to inventory",
      });
    },
    onError: (error) => {
      toast({
        title: "Error creating bundle",
        description: error.toString(),
        variant: "destructive",
      });
    }
  });

  const resetBundleForm = () => {
    setNewBundle({
      name: "",
      sku: "",
      description: "",
      bundleItems: [{ itemId: "", quantity: 1 }],
      price: 0,
      taxRate: 0,
      discount: 0,
      style: ""
    });
  };

  const handleCreateBundle = () => {
    // In a real app, would call the mutation here
    console.log("Creating bundle:", newBundle);
    toast({
      title: "Bundle created",
      description: `${newBundle.name} has been added to inventory`,
    });
    setIsCreateModalOpen(false);
    resetBundleForm();
  };

  const addItemToBundle = () => {
    setNewBundle({
      ...newBundle,
      bundleItems: [...newBundle.bundleItems, { itemId: "", quantity: 1 }]
    });
  };

  const removeItemFromBundle = (index: number) => {
    const updatedItems = [...newBundle.bundleItems];
    updatedItems.splice(index, 1);
    setNewBundle({
      ...newBundle,
      bundleItems: updatedItems
    });
  };

  const updateBundleItem = (index: number, field: string, value: any) => {
    const updatedItems = [...newBundle.bundleItems];
    updatedItems[index] = { 
      ...updatedItems[index], 
      [field]: value 
    };
    setNewBundle({
      ...newBundle,
      bundleItems: updatedItems
    });
  };

  const handleViewDetails = (bundle: any) => {
    setSelectedItem(bundle);
    setIsItemDetailsOpen(true);
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
                  <h1 className="text-2xl font-semibold text-gray-900">Item Grouping & Bundling</h1>
                  <p className="mt-1 text-sm text-gray-500">
                    Categorize items into groups and create product bundles with special pricing
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Button 
                    onClick={() => setIsCreateModalOpen(true)} 
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Create Bundle
                  </Button>
                </div>
              </div>

              {/* Search bar */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search by bundle name or SKU"
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="active-groups" onValueChange={setSelectedTab} className="mb-6">
                <TabsList>
                  <TabsTrigger value="active-groups" className="flex gap-2">
                    <Layers className="h-4 w-4" />
                    <span>Active Bundles</span>
                    <span className="bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 text-xs">
                      {itemGroups.filter(b => b.status === "Active").length}
                    </span>
                  </TabsTrigger>
                  <TabsTrigger value="draft-groups" className="flex gap-2">
                    <Box className="h-4 w-4" />
                    <span>Draft Bundles</span>
                    <span className="bg-gray-100 text-gray-700 rounded-full px-2 py-0.5 text-xs">
                      {itemGroups.filter(b => b.status === "Draft").length}
                    </span>
                  </TabsTrigger>
                </TabsList>
                
                {/* Active Bundles Tab */}
                <TabsContent value="active-groups" className="mt-6">
                  {renderBundlesTable()}
                </TabsContent>
                
                {/* Draft Bundles Tab */}
                <TabsContent value="draft-groups" className="mt-6">
                  {renderBundlesTable()}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>

      {/* Create Bundle Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Create New Bundle</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="name">Bundle Name</Label>
                <Input
                  id="name"
                  value={newBundle.name}
                  onChange={(e) => setNewBundle({...newBundle, name: e.target.value})}
                  placeholder="Enter bundle name"
                />
              </div>
              <div>
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  value={newBundle.sku}
                  onChange={(e) => setNewBundle({...newBundle, sku: e.target.value})}
                  placeholder="Enter SKU"
                />
              </div>
              <div>
                <Label htmlFor="style">Style</Label>
                <Select 
                  value={newBundle.style}
                  onValueChange={(value) => setNewBundle({...newBundle, style: value})}
                >
                  <SelectTrigger id="style">
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bundle">Bundle</SelectItem>
                    <SelectItem value="group">Group</SelectItem>
                    <SelectItem value="kit">Kit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newBundle.description}
                  onChange={(e) => setNewBundle({...newBundle, description: e.target.value})}
                  placeholder="Enter bundle description"
                  rows={2}
                />
              </div>
              
              <div className="col-span-2 mt-4">
                <div className="flex justify-between items-center mb-2">
                  <Label>Bundle Items</Label>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={addItemToBundle}
                    className="flex items-center gap-1"
                  >
                    <Plus className="h-3 w-3" />
                    Add Item
                  </Button>
                </div>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead className="text-center">Quantity</TableHead>
                        <TableHead className="w-[100px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {newBundle.bundleItems.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Select 
                              value={item.itemId} 
                              onValueChange={(value) => updateBundleItem(index, 'itemId', value)}
                            >
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="Select item" />
                              </SelectTrigger>
                              <SelectContent>
                                {!isInventoryLoading && inventory.map((invItem: any) => (
                                  <SelectItem key={invItem.id} value={invItem.id.toString()}>
                                    {invItem.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className="text-center">
                            <Input
                              type="number"
                              min="1"
                              className="h-8 w-16 text-center mx-auto"
                              value={item.quantity}
                              onChange={(e) => updateBundleItem(index, 'quantity', parseInt(e.target.value))}
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => removeItemFromBundle(index)}
                              disabled={newBundle.bundleItems.length === 1}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              <div>
                <Label htmlFor="price">Selling Price</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={newBundle.price}
                  onChange={(e) => setNewBundle({...newBundle, price: parseFloat(e.target.value)})}
                  placeholder="Enter selling price"
                />
              </div>
              <div>
                <Label htmlFor="discount">Discount (%)</Label>
                <Input
                  id="discount"
                  type="number"
                  step="0.01"
                  value={newBundle.discount}
                  onChange={(e) => setNewBundle({...newBundle, discount: parseFloat(e.target.value)})}
                  placeholder="Enter discount percentage"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleCreateBundle} 
              disabled={!newBundle.name || !newBundle.sku || newBundle.bundleItems.some(item => !item.itemId)}
            >
              Create Bundle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bundle Details Modal */}
      {selectedItem && (
        <Dialog open={isItemDetailsOpen} onOpenChange={setIsItemDetailsOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>{selectedItem.name}</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <Label className="text-sm text-gray-500">SKU</Label>
                  <p className="font-medium">{selectedItem.sku}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Status</Label>
                  <p>
                    <Badge className={`${
                      selectedItem.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {selectedItem.status}
                    </Badge>
                  </p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Total Items Value</Label>
                  <p className="font-medium">${selectedItem.totalPrice.toFixed(2)}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Bundle Price</Label>
                  <p className="font-medium">${selectedItem.sellingPrice.toFixed(2)}</p>
                </div>
              </div>
              
              <Label className="text-sm text-gray-500 mb-2 block">Bundle Contents</Label>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead className="text-center">Quantity</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedItem.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.sku}</TableCell>
                        <TableCell className="text-center">{item.quantity}</TableCell>
                        <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={4} className="text-right font-medium">Subtotal</TableCell>
                      <TableCell className="text-right font-medium">${selectedItem.totalPrice.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={4} className="text-right font-medium">Bundle Discount</TableCell>
                      <TableCell className="text-right font-medium text-green-600">
                        -${(selectedItem.totalPrice - selectedItem.sellingPrice).toFixed(2)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={4} className="text-right font-bold">Bundle Price</TableCell>
                      <TableCell className="text-right font-bold">${selectedItem.sellingPrice.toFixed(2)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsItemDetailsOpen(false)}>Close</Button>
              <Button>Edit Bundle</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );

  function renderBundlesTable() {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">
                <button className="flex items-center">
                  Bundle Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
              </TableHead>
              <TableHead>
                <button className="flex items-center">
                  SKU
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
              </TableHead>
              <TableHead className="text-center">Items</TableHead>
              <TableHead className="text-right">
                <button className="flex items-center justify-end">
                  Individual Value
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
              </TableHead>
              <TableHead className="text-right">
                <button className="flex items-center justify-end">
                  Bundle Price
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBundles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No bundles found.
                </TableCell>
              </TableRow>
            ) : (
              filteredBundles.map((bundle) => (
                <TableRow key={bundle.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded bg-blue-100 flex items-center justify-center mr-3">
                        <Layers className="h-5 w-5 text-blue-600" />
                      </div>
                      <span>{bundle.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{bundle.sku}</TableCell>
                  <TableCell className="text-center">{bundle.totalItems}</TableCell>
                  <TableCell className="text-right">${bundle.totalPrice.toFixed(2)}</TableCell>
                  <TableCell className="text-right font-medium">${bundle.sellingPrice.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                          className="cursor-pointer"
                          onClick={() => handleViewDetails(bundle)}
                        >
                          <Layers className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Bundle
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Bundle
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