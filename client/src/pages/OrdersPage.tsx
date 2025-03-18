import { Sidebar } from "@/components/Sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  ShoppingBag,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Download,
  Printer,
  ClipboardCheck,
  ArrowUpDown,
  CheckCircle2,
  Clock,
  CircleDashed,
  XCircle,
  Package,
  RefreshCcw,
  Truck,
  DollarSign,
  ExternalLink as Export,
  CheckCircle,
  ChevronDown,
  FileText,
  FileSpreadsheet,
  Receipt,
  Tag,
  ClipboardList
} from "lucide-react";

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const { toast } = useToast();

  // Mock data - In a real app this would come from API
  const orders = [
    {
      id: 1001,
      orderNumber: "ORD-10034",
      customerName: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      date: "2023-05-15",
      platform: "Shopify",
      storeName: "My Shopify Store",
      status: "Pending",
      paymentStatus: "Paid",
      fulfillmentStatus: "Unfulfilled",
      totalItems: 3,
      total: 129.97,
      shippingMethod: "Standard Ground",
      shippingAddress: {
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip: "12345",
        country: "USA"
      },
      items: [
        { id: 1, name: "Cotton T-Shirt", sku: "TS-001-BLK", quantity: 1, price: 29.99 },
        { id: 2, name: "Leather Wallet", sku: "WAL-220-BRN", quantity: 1, price: 49.99 },
        { id: 3, name: "Ceramic Coffee Mug", sku: "MUG-101-WHT", quantity: 1, price: 49.99 }
      ]
    },
    {
      id: 1002,
      orderNumber: "ORD-10035",
      customerName: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 (555) 234-5678",
      date: "2023-05-15",
      platform: "Amazon",
      storeName: "My Amazon Store",
      status: "Processing",
      paymentStatus: "Paid",
      fulfillmentStatus: "Partial",
      totalItems: 2,
      total: 78.98,
      shippingMethod: "Express",
      shippingAddress: {
        street: "456 Oak Ave",
        city: "Sometown",
        state: "NY",
        zip: "54321",
        country: "USA"
      },
      items: [
        { id: 1, name: "Wireless Headphones", sku: "HP-330-BLK", quantity: 1, price: 59.99 },
        { id: 2, name: "Bamboo Cutting Board", sku: "CB-440-NAT", quantity: 1, price: 18.99 }
      ]
    },
    {
      id: 1003,
      orderNumber: "ORD-10036",
      customerName: "Robert Johnson",
      email: "robert.j@example.com",
      phone: "+1 (555) 345-6789",
      date: "2023-05-14",
      platform: "eBay",
      storeName: "My eBay Store",
      status: "Completed",
      paymentStatus: "Paid",
      fulfillmentStatus: "Fulfilled",
      totalItems: 1,
      total: 149.99,
      shippingMethod: "Standard Ground",
      trackingNumber: "1Z999AA10123456784",
      carrier: "UPS",
      shippingAddress: {
        street: "789 Pine Ln",
        city: "Othertown",
        state: "TX",
        zip: "67890",
        country: "USA"
      },
      items: [
        { id: 1, name: "Bluetooth Speaker", sku: "SPK-550-BLK", quantity: 1, price: 149.99 }
      ]
    },
    {
      id: 1004,
      orderNumber: "ORD-10037",
      customerName: "Emily Williams",
      email: "emily.w@example.com",
      phone: "+1 (555) 456-7890",
      date: "2023-05-14",
      platform: "Etsy",
      storeName: "My Etsy Store",
      status: "Shipped",
      paymentStatus: "Paid",
      fulfillmentStatus: "Fulfilled",
      totalItems: 3,
      total: 87.97,
      shippingMethod: "Standard Ground",
      trackingNumber: "9400123456123456781011",
      carrier: "USPS",
      shippingAddress: {
        street: "101 Maple Dr",
        city: "Lasttown",
        state: "FL",
        zip: "13579",
        country: "USA"
      },
      items: [
        { id: 1, name: "Ceramic Coffee Mug", sku: "MUG-101-WHT", quantity: 1, price: 19.99 },
        { id: 2, name: "Canvas Print", sku: "ART-660-LRG", quantity: 1, price: 39.99 },
        { id: 3, name: "Scented Candle", sku: "CNL-770-VAN", quantity: 1, price: 27.99 }
      ]
    },
    {
      id: 1005,
      orderNumber: "ORD-10038",
      customerName: "Michael Brown",
      email: "michael.b@example.com",
      phone: "+1 (555) 567-8901",
      date: "2023-05-13",
      platform: "Shopify",
      storeName: "My Shopify Store",
      status: "Cancelled",
      paymentStatus: "Refunded",
      fulfillmentStatus: "Cancelled",
      totalItems: 2,
      total: 108.98,
      shippingMethod: "Expedited",
      shippingAddress: {
        street: "202 Birch Blvd",
        city: "Newtown",
        state: "WA",
        zip: "24680",
        country: "USA"
      },
      items: [
        { id: 1, name: "Leather Belt", sku: "BLT-880-BRN", quantity: 1, price: 49.99 },
        { id: 2, name: "Sunglasses", sku: "SG-990-BLK", quantity: 1, price: 58.99 }
      ]
    },
    {
      id: 1006,
      orderNumber: "ORD-10039",
      customerName: "Sarah Davis",
      email: "sarah.d@example.com",
      phone: "+1 (555) 678-9012",
      date: "2023-05-13",
      platform: "Amazon",
      storeName: "My Amazon Store",
      status: "Delivered",
      paymentStatus: "Paid",
      fulfillmentStatus: "Fulfilled",
      totalItems: 4,
      total: 214.96,
      shippingMethod: "Two-Day",
      trackingNumber: "1Z999AA10123456784",
      carrier: "UPS",
      deliveredDate: "2023-05-15",
      shippingAddress: {
        street: "303 Cedar Ct",
        city: "Oldtown",
        state: "IL",
        zip: "97531",
        country: "USA"
      },
      items: [
        { id: 1, name: "Wireless Headphones", sku: "HP-330-BLK", quantity: 1, price: 59.99 },
        { id: 2, name: "Bluetooth Speaker", sku: "SPK-550-BLK", quantity: 1, price: 149.99 },
        { id: 3, name: "Phone Case", sku: "PC-100-BLK", quantity: 1, price: 24.99 },
        { id: 4, name: "Screen Protector", sku: "SP-110-CLR", quantity: 1, price: 19.99 }
      ]
    },
    {
      id: 1007,
      orderNumber: "ORD-10040",
      customerName: "David Miller",
      email: "david.m@example.com",
      phone: "+1 (555) 789-0123",
      date: "2023-05-12",
      platform: "eBay",
      storeName: "My eBay Store",
      status: "Refunded",
      paymentStatus: "Refunded",
      fulfillmentStatus: "Returned",
      totalItems: 1,
      total: 199.99,
      shippingMethod: "Express",
      trackingNumber: "9400123456123456781234",
      carrier: "USPS",
      shippingAddress: {
        street: "404 Elm St",
        city: "Somewhere",
        state: "MI",
        zip: "46802",
        country: "USA"
      },
      items: [
        { id: 1, name: "Tablet Stand", sku: "TS-220-ALU", quantity: 1, price: 199.99 }
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
    if (selectedTab === "pending") return matchesSearch && order.status === "Pending";
    if (selectedTab === "processing") return matchesSearch && order.status === "Processing";
    if (selectedTab === "completed") return matchesSearch && (order.status === "Completed" || order.status === "Shipped" || order.status === "Delivered");
    if (selectedTab === "cancelled") return matchesSearch && (order.status === "Cancelled" || order.status === "Refunded");
    
    return matchesSearch;
  });

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsOrderDetailsOpen(true);
  };

  const handleStatusUpdate = (orderId, newStatus) => {
    // In a real app, this would call an API
    console.log(`Updating order ${orderId} to ${newStatus}`);
    toast({
      title: "Order status updated",
      description: `Order status has been updated to ${newStatus}`
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">{status}</Badge>;
      case "Processing":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{status}</Badge>;
      case "Completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{status}</Badge>;
      case "Shipped":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">{status}</Badge>;
      case "Delivered":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{status}</Badge>;
      case "Cancelled":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{status}</Badge>;
      case "Refunded":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getFulfillmentBadge = (status) => {
    switch (status) {
      case "Unfulfilled":
        return <Badge variant="outline" className="border-amber-500 text-amber-700">{status}</Badge>;
      case "Partial":
        return <Badge variant="outline" className="border-blue-500 text-blue-700">{status}</Badge>;
      case "Fulfilled":
        return <Badge variant="outline" className="border-green-500 text-green-700">{status}</Badge>;
      case "Cancelled":
      case "Returned":
        return <Badge variant="outline" className="border-red-500 text-red-700">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentBadge = (status) => {
    switch (status) {
      case "Paid":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{status}</Badge>;
      case "Pending":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">{status}</Badge>;
      case "Failed":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{status}</Badge>;
      case "Refunded":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "Processing":
        return <CircleDashed className="h-5 w-5 text-blue-500" />;
      case "Completed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "Shipped":
        return <Truck className="h-5 w-5 text-purple-500" />;
      case "Delivered":
        return <Package className="h-5 w-5 text-green-500" />;
      case "Cancelled":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "Refunded":
        return <RefreshCcw className="h-5 w-5 text-red-500" />;
      default:
        return <ShoppingBag className="h-5 w-5 text-gray-500" />;
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
                  <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
                  <p className="mt-1 text-sm text-gray-500">
                    Manage orders from all your sales channels
                  </p>
                </div>
                <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="flex items-center gap-2" variant="outline">
                        <Download className="h-4 w-4" />
                        Export Orders
                        <ChevronDown className="h-4 w-4 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => {
                        toast({
                          title: "Exporting as CSV",
                          description: "Your orders are being exported as CSV"
                        });
                        
                        // Create a simulated delay for generating the file
                        setTimeout(() => {
                          // Simulate creating a download URL
                          const dummyDataUrl = "#";
                          
                          // Create a download link and trigger it
                          const downloadLink = document.createElement('a');
                          downloadLink.href = dummyDataUrl;
                          downloadLink.download = `orders-export-${new Date().toISOString().slice(0, 10)}.csv`;
                          downloadLink.click();
                          
                          toast({
                            title: "CSV Export complete",
                            description: "Your orders have been exported and downloaded as CSV"
                          });
                        }, 1000);
                      }}>
                        <FileText className="h-4 w-4 mr-2" />
                        Export as CSV
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        toast({
                          title: "Exporting as Excel",
                          description: "Your orders are being exported as Excel file"
                        });
                        
                        // Create a simulated delay for generating the file
                        setTimeout(() => {
                          // Simulate creating a download URL
                          const dummyDataUrl = "#";
                          
                          // Create a download link and trigger it
                          const downloadLink = document.createElement('a');
                          downloadLink.href = dummyDataUrl;
                          downloadLink.download = `orders-export-${new Date().toISOString().slice(0, 10)}.xlsx`;
                          downloadLink.click();
                          
                          toast({
                            title: "Excel Export complete",
                            description: "Your orders have been exported and downloaded as Excel file"
                          });
                        }, 1200);
                      }}>
                        <FileSpreadsheet className="h-4 w-4 mr-2" />
                        Export as Excel
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        toast({
                          title: "Exporting as PDF",
                          description: "Your orders are being exported as PDF"
                        });
                        
                        // Create a simulated delay for generating the file
                        setTimeout(() => {
                          // Simulate creating a download URL
                          const dummyDataUrl = "#";
                          
                          // Create a download link and trigger it
                          const downloadLink = document.createElement('a');
                          downloadLink.href = dummyDataUrl;
                          downloadLink.download = `orders-export-${new Date().toISOString().slice(0, 10)}.pdf`;
                          downloadLink.click();
                          
                          toast({
                            title: "PDF Export complete",
                            description: "Your orders have been exported and downloaded as PDF"
                          });
                        }, 1500);
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
                        Print
                        <ChevronDown className="h-4 w-4 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => {
                        toast({
                          title: "Generating invoice PDF",
                          description: "Preparing invoices for download and printing"
                        });
                        // Create a simulated delay for generating the file
                        setTimeout(() => {
                          // Simulate creating a download URL
                          const dummyPdfUrl = "#";
                          
                          // Create a download link and trigger it
                          const downloadLink = document.createElement('a');
                          downloadLink.href = dummyPdfUrl;
                          downloadLink.download = `invoices-batch-${new Date().toISOString().slice(0, 10)}.pdf`;
                          downloadLink.click();
                          
                          toast({
                            title: "Invoice PDF ready",
                            description: "Your invoices have been downloaded and are ready for printing"
                          });
                        }, 1500);
                      }}>
                        <Receipt className="h-4 w-4 mr-2" />
                        Print Invoices
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        toast({
                          title: "Generating shipping labels",
                          description: "Preparing shipping labels for download and printing"
                        });
                        // Create a simulated delay for generating the file
                        setTimeout(() => {
                          // Simulate creating a download URL
                          const dummyPdfUrl = "#";
                          
                          // Create a download link and trigger it
                          const downloadLink = document.createElement('a');
                          downloadLink.href = dummyPdfUrl;
                          downloadLink.download = `shipping-labels-${new Date().toISOString().slice(0, 10)}.pdf`;
                          downloadLink.click();
                          
                          toast({
                            title: "Shipping labels ready",
                            description: "Your shipping labels have been downloaded and are ready for printing"
                          });
                        }, 1200);
                      }}>
                        <Tag className="h-4 w-4 mr-2" />
                        Print Shipping Labels
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        toast({
                          title: "Generating packing slips",
                          description: "Preparing packing slips for download and printing"
                        });
                        // Create a simulated delay for generating the file
                        setTimeout(() => {
                          // Simulate creating a download URL
                          const dummyPdfUrl = "#";
                          
                          // Create a download link and trigger it
                          const downloadLink = document.createElement('a');
                          downloadLink.href = dummyPdfUrl;
                          downloadLink.download = `packing-slips-${new Date().toISOString().slice(0, 10)}.pdf`;
                          downloadLink.click();
                          
                          toast({
                            title: "Packing slips ready",
                            description: "Your packing slips have been downloaded and are ready for printing"
                          });
                        }, 1000);
                      }}>
                        <ClipboardList className="h-4 w-4 mr-2" />
                        Print Packing Slips
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Order stats cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center">
                      <div className="mr-4 bg-amber-100 p-3 rounded-lg">
                        <Clock className="h-6 w-6 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Pending</p>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {orders.filter(o => o.status === "Pending").length}
                        </h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center">
                      <div className="mr-4 bg-blue-100 p-3 rounded-lg">
                        <CircleDashed className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Processing</p>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {orders.filter(o => o.status === "Processing").length}
                        </h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center">
                      <div className="mr-4 bg-green-100 p-3 rounded-lg">
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Completed</p>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {orders.filter(o => ["Completed", "Shipped", "Delivered"].includes(o.status)).length}
                        </h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center">
                      <div className="mr-4 bg-red-100 p-3 rounded-lg">
                        <XCircle className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Cancelled/Refunded</p>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {orders.filter(o => ["Cancelled", "Refunded"].includes(o.status)).length}
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
                      placeholder="Search by order number, customer or status"
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full md:w-48">
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Platform" />
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
                      <SelectValue placeholder="Date Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="yesterday">Yesterday</SelectItem>
                      <SelectItem value="last-7-days">Last 7 days</SelectItem>
                      <SelectItem value="last-30-days">Last 30 days</SelectItem>
                      <SelectItem value="this-month">This month</SelectItem>
                      <SelectItem value="last-month">Last month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full md:w-48">
                  <Button variant="outline" className="w-full flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    More Filters
                  </Button>
                </div>
              </div>

              {/* Order Tabs */}
              <Tabs defaultValue="all" onValueChange={setSelectedTab} className="mb-6">
                <TabsList>
                  <TabsTrigger value="all" className="flex gap-2">
                    <ShoppingBag className="h-4 w-4" />
                    <span>All Orders</span>
                  </TabsTrigger>
                  <TabsTrigger value="pending" className="flex gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Pending</span>
                  </TabsTrigger>
                  <TabsTrigger value="processing" className="flex gap-2">
                    <CircleDashed className="h-4 w-4" />
                    <span>Processing</span>
                  </TabsTrigger>
                  <TabsTrigger value="completed" className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Completed</span>
                  </TabsTrigger>
                  <TabsTrigger value="cancelled" className="flex gap-2">
                    <XCircle className="h-4 w-4" />
                    <span>Cancelled</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="mt-6">
                  {renderOrdersTable()}
                </TabsContent>
                <TabsContent value="pending" className="mt-6">
                  {renderOrdersTable()}
                </TabsContent>
                <TabsContent value="processing" className="mt-6">
                  {renderOrdersTable()}
                </TabsContent>
                <TabsContent value="completed" className="mt-6">
                  {renderOrdersTable()}
                </TabsContent>
                <TabsContent value="cancelled" className="mt-6">
                  {renderOrdersTable()}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <Dialog open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen}>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {getStatusIcon(selectedOrder.status)}
                Order {selectedOrder.orderNumber}
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Order Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Status:</span>
                    <span className="text-sm font-medium">{getStatusBadge(selectedOrder.status)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Payment Status:</span>
                    <span className="text-sm font-medium">{getPaymentBadge(selectedOrder.paymentStatus)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Fulfillment Status:</span>
                    <span className="text-sm font-medium">{getFulfillmentBadge(selectedOrder.fulfillmentStatus)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Date:</span>
                    <span className="text-sm font-medium">{selectedOrder.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Platform:</span>
                    <span className="text-sm font-medium">{selectedOrder.platform}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Store:</span>
                    <span className="text-sm font-medium">{selectedOrder.storeName}</span>
                  </div>
                  {selectedOrder.trackingNumber && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Tracking:</span>
                      <span className="text-sm font-medium">{selectedOrder.trackingNumber} ({selectedOrder.carrier})</span>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Customer Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Name:</span>
                    <span className="text-sm font-medium">{selectedOrder.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Email:</span>
                    <span className="text-sm font-medium">{selectedOrder.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Phone:</span>
                    <span className="text-sm font-medium">{selectedOrder.phone}</span>
                  </div>
                  <h3 className="text-sm font-medium text-gray-500 mt-4">Shipping Address</h3>
                  <div className="text-sm">
                    {selectedOrder.customerName}<br />
                    {selectedOrder.shippingAddress.street}<br />
                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zip}<br />
                    {selectedOrder.shippingAddress.country}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Shipping Method:</span>
                    <span className="text-sm font-medium">{selectedOrder.shippingMethod}</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3">Order Items</h3>
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
                    {selectedOrder.items.map((item) => (
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
                      <TableCell className="text-right font-medium">${selectedOrder.total.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={4} className="text-right font-medium">Shipping</TableCell>
                      <TableCell className="text-right font-medium">$0.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={4} className="text-right font-medium">Tax</TableCell>
                      <TableCell className="text-right font-medium">$0.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={4} className="text-right font-medium text-lg">Total</TableCell>
                      <TableCell className="text-right font-bold text-lg">${selectedOrder.total.toFixed(2)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
            <DialogFooter className="flex justify-between sm:justify-between">
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Printer className="h-4 w-4" />
                  Print
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
              <div className="flex gap-2">
                {selectedOrder.status === "Pending" && (
                  <Button className="flex items-center gap-2" onClick={() => handleStatusUpdate(selectedOrder.id, "Processing")}>
                    <CheckCircle className="h-4 w-4" />
                    Mark as Processing
                  </Button>
                )}
                {selectedOrder.status === "Processing" && (
                  <Button className="flex items-center gap-2" onClick={() => handleStatusUpdate(selectedOrder.id, "Completed")}>
                    <CheckCircle className="h-4 w-4" />
                    Mark as Completed
                  </Button>
                )}
                {selectedOrder.status === "Pending" && (
                  <Button variant="outline" className="flex items-center gap-2 text-red-600 hover:text-red-700">
                    <XCircle className="h-4 w-4" />
                    Cancel Order
                  </Button>
                )}
              </div>
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
                  Date
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
                  Status
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
              </TableHead>
              <TableHead>Fulfillment</TableHead>
              <TableHead>Payment</TableHead>
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
                <TableCell colSpan={9} className="text-center py-8">
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
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.platform}</TableCell>
                  <TableCell>
                    {getStatusBadge(order.status)}
                  </TableCell>
                  <TableCell>
                    {getFulfillmentBadge(order.fulfillmentStatus)}
                  </TableCell>
                  <TableCell>
                    {getPaymentBadge(order.paymentStatus)}
                  </TableCell>
                  <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer" onClick={() => viewOrderDetails(order)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Printer className="h-4 w-4 mr-2" />
                          Print Invoice
                        </DropdownMenuItem>
                        {order.status === "Pending" && (
                          <DropdownMenuItem 
                            className="cursor-pointer"
                            onClick={() => handleStatusUpdate(order.id, "Processing")}
                          >
                            <CircleDashed className="h-4 w-4 mr-2" />
                            Mark as Processing
                          </DropdownMenuItem>
                        )}
                        {order.status === "Processing" && (
                          <DropdownMenuItem 
                            className="cursor-pointer"
                            onClick={() => handleStatusUpdate(order.id, "Completed")}
                          >
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Mark as Completed
                          </DropdownMenuItem>
                        )}
                        {order.status === "Pending" && (
                          <DropdownMenuItem 
                            className="cursor-pointer text-red-600"
                            onClick={() => handleStatusUpdate(order.id, "Cancelled")}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Cancel Order
                          </DropdownMenuItem>
                        )}
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