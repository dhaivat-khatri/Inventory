import { Sidebar } from "@/components/Sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Package, 
  Search, 
  Plus, 
  Eye, 
  Printer, 
  ShoppingBag, 
  Truck, 
  DollarSign, 
  BarChart, 
  Filter,
  ArrowUpDown,
  CheckSquare,
  ClipboardList,
  ListFilter,
  MoreHorizontal,
  Boxes,
  Download,
  ChevronDown,
  FileText,
  Tag,
  Receipt,
  FileSpreadsheet,
  CheckCircle2
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export default function OrderFulfillmentPage() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPickingModalOpen, setIsPickingModalOpen] = useState(false);
  const [isPackingModalOpen, setIsPackingModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const { toast } = useToast();

  // Mock data - In a real app this would come from API
  const orders = [
    {
      id: 1001,
      orderNumber: "ORD-10034",
      customerName: "John Doe",
      email: "john.doe@example.com",
      platform: "Shopify",
      storeName: "My Shopify Store",
      date: "2023-05-15",
      status: "Ready to Pick",
      paymentStatus: "Paid",
      totalItems: 3,
      total: 129.97,
      shippingMethod: "Standard Ground",
      items: [
        { id: 1, name: "Cotton T-Shirt", sku: "TS-001-BLK", quantity: 1, price: 29.99, location: "A-1-1" },
        { id: 2, name: "Leather Wallet", sku: "WAL-220-BRN", quantity: 1, price: 49.99, location: "B-3-2" },
        { id: 3, name: "Ceramic Coffee Mug", sku: "MUG-101-WHT", quantity: 1, price: 49.99, location: "A-2-3" }
      ]
    },
    {
      id: 1002,
      orderNumber: "ORD-10035",
      customerName: "Jane Smith",
      email: "jane.smith@example.com",
      platform: "Amazon",
      storeName: "My Amazon Store",
      date: "2023-05-15",
      status: "Picking in Progress",
      paymentStatus: "Paid",
      totalItems: 2,
      total: 78.98,
      shippingMethod: "Express",
      items: [
        { id: 1, name: "Wireless Headphones", sku: "HP-330-BLK", quantity: 1, price: 59.99, location: "C-1-4", picked: true },
        { id: 2, name: "Bamboo Cutting Board", sku: "CB-440-NAT", quantity: 1, price: 18.99, location: "D-2-1", picked: false }
      ],
      pickProgress: 50
    },
    {
      id: 1003,
      orderNumber: "ORD-10036",
      customerName: "Robert Johnson",
      email: "robert.j@example.com",
      platform: "eBay",
      storeName: "My eBay Store",
      date: "2023-05-14",
      status: "Ready to Pack",
      paymentStatus: "Paid",
      totalItems: 1,
      total: 149.99,
      shippingMethod: "Standard Ground",
      items: [
        { id: 1, name: "Bluetooth Speaker", sku: "SPK-550-BLK", quantity: 1, price: 149.99, location: "B-2-2", picked: true }
      ],
      pickProgress: 100
    },
    {
      id: 1004,
      orderNumber: "ORD-10037",
      customerName: "Emily Williams",
      email: "emily.w@example.com",
      platform: "Etsy",
      storeName: "My Etsy Store",
      date: "2023-05-14",
      status: "Packing in Progress",
      paymentStatus: "Paid",
      totalItems: 3,
      total: 87.97,
      shippingMethod: "Standard Ground",
      items: [
        { id: 1, name: "Ceramic Coffee Mug", sku: "MUG-101-WHT", quantity: 1, price: 19.99, location: "A-2-3", packed: true },
        { id: 2, name: "Canvas Print", sku: "ART-660-LRG", quantity: 1, price: 39.99, location: "E-1-2", packed: true },
        { id: 3, name: "Scented Candle", sku: "CNL-770-VAN", quantity: 1, price: 27.99, location: "D-3-4", packed: false }
      ],
      packProgress: 67
    },
    {
      id: 1005,
      orderNumber: "ORD-10038",
      customerName: "Michael Brown",
      email: "michael.b@example.com",
      platform: "Shopify",
      storeName: "My Shopify Store",
      date: "2023-05-13",
      status: "Ready to Ship",
      paymentStatus: "Paid",
      totalItems: 2,
      total: 108.98,
      shippingMethod: "Expedited",
      items: [
        { id: 1, name: "Leather Belt", sku: "BLT-880-BRN", quantity: 1, price: 49.99, location: "C-2-1", packed: true },
        { id: 2, name: "Sunglasses", sku: "SG-990-BLK", quantity: 1, price: 58.99, location: "B-1-3", packed: true }
      ],
      packProgress: 100
    },
    {
      id: 1006,
      orderNumber: "ORD-10039",
      customerName: "Sarah Davis",
      email: "sarah.d@example.com",
      platform: "Amazon",
      storeName: "My Amazon Store",
      date: "2023-05-13",
      status: "Shipped",
      paymentStatus: "Paid",
      totalItems: 4,
      total: 214.96,
      shippingMethod: "Two-Day",
      trackingNumber: "1Z999AA10123456784",
      carrier: "UPS",
      shippedDate: "2023-05-14",
      items: [
        { id: 1, name: "Wireless Headphones", sku: "HP-330-BLK", quantity: 1, price: 59.99, location: "C-1-4" },
        { id: 2, name: "Bluetooth Speaker", sku: "SPK-550-BLK", quantity: 1, price: 149.99, location: "B-2-2" },
        { id: 3, name: "Phone Case", sku: "PC-100-BLK", quantity: 1, price: 24.99, location: "A-3-1" },
        { id: 4, name: "Screen Protector", sku: "SP-110-CLR", quantity: 1, price: 19.99, location: "A-3-2" }
      ]
    },
    {
      id: 1007,
      orderNumber: "ORD-10040",
      customerName: "David Miller",
      email: "david.m@example.com",
      platform: "eBay",
      storeName: "My eBay Store",
      date: "2023-05-12",
      status: "Delivered",
      paymentStatus: "Paid",
      totalItems: 1,
      total: 199.99,
      shippingMethod: "Express",
      trackingNumber: "9400123456123456781234",
      carrier: "USPS",
      shippedDate: "2023-05-12",
      deliveredDate: "2023-05-14",
      items: [
        { id: 1, name: "Tablet Stand", sku: "TS-220-ALU", quantity: 1, price: 199.99, location: "D-1-2" }
      ]
    }
  ];

  // Filter orders based on search and selected tab
  const filteredOrders = orders.filter(order => {
    // Search filter
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.status.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Tab filter
    if (selectedTab === "all") return matchesSearch;
    if (selectedTab === "to-pick") return matchesSearch && order.status === "Ready to Pick";
    if (selectedTab === "to-pack") return matchesSearch && order.status === "Ready to Pack";
    if (selectedTab === "to-ship") return matchesSearch && order.status === "Ready to Ship";
    if (selectedTab === "shipped") return matchesSearch && (order.status === "Shipped" || order.status === "Delivered");
    
    return matchesSearch;
  });

  // Handlers for actions
  const startPicking = (order) => {
    setSelectedOrder(order);
    setIsPickingModalOpen(true);
  };

  const startPacking = (order) => {
    setSelectedOrder(order);
    setIsPackingModalOpen(true);
  };

  const shipOrder = (order) => {
    toast({
      title: "Order shipped",
      description: `Order ${order.orderNumber} has been marked as shipped.`
    });
  };

  const completePickItem = (orderId, itemId) => {
    // In a real app, this would call an API
    console.log(`Picked item ${itemId} for order ${orderId}`);
    
    // Update local state for demo purposes
    setSelectedOrder(prev => {
      const updatedItems = prev.items.map(item => 
        item.id === itemId ? { ...item, picked: true } : item
      );
      
      const allPicked = updatedItems.every(item => item.picked);
      const pickProgress = Math.round(
        (updatedItems.filter(item => item.picked).length / updatedItems.length) * 100
      );
      
      return {
        ...prev,
        items: updatedItems,
        pickProgress,
        status: allPicked ? "Ready to Pack" : "Picking in Progress"
      };
    });
  };

  const completePackItem = (orderId, itemId) => {
    // In a real app, this would call an API
    console.log(`Packed item ${itemId} for order ${orderId}`);
    
    // Update local state for demo purposes
    setSelectedOrder(prev => {
      const updatedItems = prev.items.map(item => 
        item.id === itemId ? { ...item, packed: true } : item
      );
      
      const allPacked = updatedItems.every(item => item.packed);
      const packProgress = Math.round(
        (updatedItems.filter(item => item.packed).length / updatedItems.length) * 100
      );
      
      return {
        ...prev,
        items: updatedItems,
        packProgress,
        status: allPacked ? "Ready to Ship" : "Packing in Progress"
      };
    });
  };

  const finishPicking = () => {
    toast({
      title: "Picking completed",
      description: `Order ${selectedOrder.orderNumber} is now ready to pack.`
    });
    setIsPickingModalOpen(false);
  };

  const finishPacking = () => {
    toast({
      title: "Packing completed",
      description: `Order ${selectedOrder.orderNumber} is now ready to ship.`
    });
    setIsPackingModalOpen(false);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Ready to Pick":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{status}</Badge>;
      case "Picking in Progress":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{status}</Badge>;
      case "Ready to Pack":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">{status}</Badge>;
      case "Packing in Progress":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">{status}</Badge>;
      case "Ready to Ship":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">{status}</Badge>;
      case "Shipped":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{status}</Badge>;
      case "Delivered":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
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
                  <h1 className="text-2xl font-semibold text-gray-900">Order Fulfillment</h1>
                  <p className="mt-1 text-sm text-gray-500">
                    Pick, pack, and ship orders from all your channels
                  </p>
                </div>
                <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="flex items-center gap-2" variant="outline">
                        <Download className="h-4 w-4" />
                        Export
                        <ChevronDown className="h-4 w-4 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => {
                        toast({
                          title: "Exporting as CSV",
                          description: "Your fulfillment data is being exported as CSV"
                        });
                      }}>
                        <FileText className="h-4 w-4 mr-2" />
                        Export as CSV
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        toast({
                          title: "Exporting as Excel",
                          description: "Your fulfillment data is being exported as Excel file"
                        });
                      }}>
                        <FileSpreadsheet className="h-4 w-4 mr-2" />
                        Export as Excel
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        toast({
                          title: "Exporting as PDF",
                          description: "Your fulfillment data is being exported as PDF"
                        });
                      }}>
                        <FileText className="h-4 w-4 mr-2" />
                        Export as PDF
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <Printer className="h-4 w-4" />
                        Print Pick List
                        <ChevronDown className="h-4 w-4 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => {
                        toast({
                          title: "Printing combined pick list",
                          description: "Preparing combined pick list for printing"
                        });
                      }}>
                        <ClipboardList className="h-4 w-4 mr-2" />
                        Combined Pick List
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        toast({
                          title: "Printing pick lists by location",
                          description: "Preparing location-based pick lists for printing"
                        });
                      }}>
                        <Boxes className="h-4 w-4 mr-2" />
                        By Location
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        toast({
                          title: "Printing pick lists by order",
                          description: "Preparing order-based pick lists for printing"
                        });
                      }}>
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        By Order
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        toast({
                          title: "Exporting pick list",
                          description: "Your pick list is being exported as PDF"
                        });
                      }}>
                        <Download className="h-4 w-4 mr-2" />
                        Export as PDF
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <Printer className="h-4 w-4" />
                        Print Packing Slips
                        <ChevronDown className="h-4 w-4 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => {
                        toast({
                          title: "Printing all packing slips",
                          description: "Preparing all packing slips for printing"
                        });
                      }}>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        All Ready Orders
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        toast({
                          title: "Printing selected slips",
                          description: "Preparing selected packing slips for printing"
                        });
                      }}>
                        <ListFilter className="h-4 w-4 mr-2" />
                        Selected Orders
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        toast({
                          title: "Printing shipping labels",
                          description: "Preparing shipping labels for printing"
                        });
                      }}>
                        <Tag className="h-4 w-4 mr-2" />
                        Shipping Labels
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        toast({
                          title: "Printing invoices",
                          description: "Preparing invoices for printing"
                        });
                      }}>
                        <Receipt className="h-4 w-4 mr-2" />
                        Invoices
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        toast({
                          title: "Exporting documents",
                          description: "Your documents are being exported as PDF"
                        });
                      }}>
                        <Download className="h-4 w-4 mr-2" />
                        Export as PDF
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Dashboard cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center">
                      <div className="mr-4 bg-blue-100 p-3 rounded-lg">
                        <ClipboardList className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Ready to Pick</p>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {orders.filter(o => o.status === "Ready to Pick").length}
                        </h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center">
                      <div className="mr-4 bg-purple-100 p-3 rounded-lg">
                        <Package className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Ready to Pack</p>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {orders.filter(o => o.status === "Ready to Pack").length}
                        </h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center">
                      <div className="mr-4 bg-amber-100 p-3 rounded-lg">
                        <Truck className="h-6 w-6 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Ready to Ship</p>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {orders.filter(o => o.status === "Ready to Ship").length}
                        </h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center">
                      <div className="mr-4 bg-green-100 p-3 rounded-lg">
                        <CheckSquare className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Shipped Today</p>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {orders.filter(o => o.status === "Shipped" && o.shippedDate === new Date().toISOString().slice(0, 10)).length}
                        </h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Search and Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search by order number, customer name or status"
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full md:w-48">
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by Platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Platforms</SelectItem>
                      <SelectItem value="shopify">Shopify</SelectItem>
                      <SelectItem value="amazon">Amazon</SelectItem>
                      <SelectItem value="ebay">eBay</SelectItem>
                      <SelectItem value="etsy">Etsy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full md:w-48">
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by Date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Dates</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="yesterday">Yesterday</SelectItem>
                      <SelectItem value="last-week">Last 7 Days</SelectItem>
                      <SelectItem value="last-month">Last 30 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Order Tabs */}
              <Tabs defaultValue="all" onValueChange={setSelectedTab} className="mb-6">
                <TabsList>
                  <TabsTrigger value="all" className="flex gap-2">
                    <ShoppingBag className="h-4 w-4" />
                    <span>All Orders</span>
                  </TabsTrigger>
                  <TabsTrigger value="to-pick" className="flex gap-2">
                    <ClipboardList className="h-4 w-4" />
                    <span>To Pick</span>
                  </TabsTrigger>
                  <TabsTrigger value="to-pack" className="flex gap-2">
                    <Package className="h-4 w-4" />
                    <span>To Pack</span>
                  </TabsTrigger>
                  <TabsTrigger value="to-ship" className="flex gap-2">
                    <Truck className="h-4 w-4" />
                    <span>To Ship</span>
                  </TabsTrigger>
                  <TabsTrigger value="shipped" className="flex gap-2">
                    <CheckSquare className="h-4 w-4" />
                    <span>Shipped</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="mt-6">
                  {renderOrdersTable()}
                </TabsContent>
                <TabsContent value="to-pick" className="mt-6">
                  {renderOrdersTable()}
                </TabsContent>
                <TabsContent value="to-pack" className="mt-6">
                  {renderOrdersTable()}
                </TabsContent>
                <TabsContent value="to-ship" className="mt-6">
                  {renderOrdersTable()}
                </TabsContent>
                <TabsContent value="shipped" className="mt-6">
                  {renderOrdersTable()}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>

      {/* Picking Modal */}
      {selectedOrder && (
        <Dialog open={isPickingModalOpen} onOpenChange={setIsPickingModalOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Pick Items for Order {selectedOrder.orderNumber}</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Picking Progress</span>
                  <span>{selectedOrder.pickProgress || 0}%</span>
                </div>
                <Progress value={selectedOrder.pickProgress || 0} className="h-2" />
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead className="text-center">Quantity</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedOrder.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.sku}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-mono">
                            {item.location}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">{item.quantity}</TableCell>
                        <TableCell className="text-right">
                          {item.picked ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Picked</Badge>
                          ) : (
                            <Button 
                              size="sm" 
                              onClick={() => completePickItem(selectedOrder.id, item.id)}
                            >
                              Mark as Picked
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsPickingModalOpen(false)}>Cancel</Button>
              <Button 
                onClick={finishPicking} 
                disabled={!selectedOrder.items.every(item => item.picked)}
              >
                Complete Picking
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Packing Modal */}
      {selectedOrder && (
        <Dialog open={isPackingModalOpen} onOpenChange={setIsPackingModalOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Pack Items for Order {selectedOrder.orderNumber}</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Packing Progress</span>
                  <span>{selectedOrder.packProgress || 0}%</span>
                </div>
                <Progress value={selectedOrder.packProgress || 0} className="h-2" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Shipping Address</h3>
                  <p className="text-sm">
                    <strong>{selectedOrder.customerName}</strong><br />
                    123 Customer Street<br />
                    Anytown, State 12345<br />
                    United States
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Shipping Method</h3>
                  <p className="text-sm">
                    <strong>{selectedOrder.shippingMethod}</strong><br />
                    Est. Delivery: 3-5 business days
                  </p>
                </div>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead className="text-center">Quantity</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedOrder.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.sku}</TableCell>
                        <TableCell className="text-center">{item.quantity}</TableCell>
                        <TableCell className="text-right">
                          {item.packed ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Packed</Badge>
                          ) : (
                            <Button 
                              size="sm" 
                              onClick={() => completePackItem(selectedOrder.id, item.id)}
                            >
                              Mark as Packed
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsPackingModalOpen(false)}>Cancel</Button>
              <Button 
                onClick={finishPacking} 
                disabled={!selectedOrder.items.every(item => item.packed)}
              >
                Complete Packing
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );

  function renderOrdersTable() {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[16%]">
                <button className="flex items-center">
                  Order #
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
              </TableHead>
              <TableHead className="w-[18%]">
                <button className="flex items-center">
                  Customer
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
              </TableHead>
              <TableHead>
                <button className="flex items-center">
                  Platform
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
              </TableHead>
              <TableHead>
                <button className="flex items-center">
                  Date
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
              </TableHead>
              <TableHead>
                <button className="flex items-center">
                  Status
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
              </TableHead>
              <TableHead className="text-center">Items</TableHead>
              <TableHead className="text-right">
                <button className="flex items-center justify-end">
                  Total
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  No orders found.
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.orderNumber}</TableCell>
                  <TableCell>
                    <div>
                      <div>{order.customerName}</div>
                      <div className="text-sm text-gray-500">{order.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>{order.platform}</div>
                      <div className="text-sm text-gray-500">{order.storeName}</div>
                    </div>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    {getStatusBadge(order.status)}
                    {order.pickProgress > 0 && order.pickProgress < 100 && (
                      <div className="mt-1">
                        <Progress value={order.pickProgress} className="h-1" />
                      </div>
                    )}
                    {order.packProgress > 0 && order.packProgress < 100 && (
                      <div className="mt-1">
                        <Progress value={order.packProgress} className="h-1" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-center">{order.totalItems}</TableCell>
                  <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          {order.status === "Ready to Pick" && (
                            <DropdownMenuItem 
                              className="cursor-pointer"
                              onClick={() => startPicking(order)}
                            >
                              <ClipboardList className="h-4 w-4 mr-2" />
                              Start Picking
                            </DropdownMenuItem>
                          )}
                          {order.status === "Ready to Pack" && (
                            <DropdownMenuItem 
                              className="cursor-pointer"
                              onClick={() => startPacking(order)}
                            >
                              <Package className="h-4 w-4 mr-2" />
                              Start Packing
                            </DropdownMenuItem>
                          )}
                          {order.status === "Ready to Ship" && (
                            <DropdownMenuItem 
                              className="cursor-pointer"
                              onClick={() => shipOrder(order)}
                            >
                              <Truck className="h-4 w-4 mr-2" />
                              Ship Order
                            </DropdownMenuItem>
                          )}
                          {(order.status === "Shipped" || order.status === "Delivered") && (
                            <DropdownMenuItem className="cursor-pointer">
                              <Printer className="h-4 w-4 mr-2" />
                              Print Label
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
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