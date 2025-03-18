import { Sidebar } from "@/components/Sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart, 
  LineChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  BarChart as ChartIcon, 
  Layers, 
  TrendingUp, 
  DollarSign, 
  Package, 
  ShoppingCart, 
  Truck, 
  RefreshCcw, 
  Calendar, 
  Download,
  FileText,
  FileSpreadsheet,
  ChevronDown,
  Filter,
  ArrowRight
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

// Mock Data
const salesData = [
  { month: 'Jan', sales: 4000, orders: 240, units: 1200 },
  { month: 'Feb', sales: 3000, orders: 198, units: 980 },
  { month: 'Mar', sales: 5000, orders: 280, units: 1500 },
  { month: 'Apr', sales: 2780, orders: 190, units: 890 },
  { month: 'May', sales: 1890, orders: 140, units: 700 },
  { month: 'Jun', sales: 2390, orders: 160, units: 820 },
  { month: 'Jul', sales: 3490, orders: 210, units: 1050 },
  { month: 'Aug', sales: 4000, orders: 240, units: 1200 },
  { month: 'Sep', sales: 2000, orders: 120, units: 600 },
  { month: 'Oct', sales: 2780, orders: 190, units: 890 },
  { month: 'Nov', sales: 1890, orders: 140, units: 700 },
  { month: 'Dec', sales: 4000, orders: 240, units: 1200 }
];

const dailySalesData = [
  { day: '1', sales: 400 },
  { day: '2', sales: 300 },
  { day: '3', sales: 500 },
  { day: '4', sales: 278 },
  { day: '5', sales: 189 },
  { day: '6', sales: 239 },
  { day: '7', sales: 349 },
  { day: '8', sales: 400 },
  { day: '9', sales: 200 },
  { day: '10', sales: 278 },
  { day: '11', sales: 189 },
  { day: '12', sales: 400 },
  { day: '13', sales: 300 },
  { day: '14', sales: 500 },
  { day: '15', sales: 278 },
  { day: '16', sales: 189 },
  { day: '17', sales: 239 },
  { day: '18', sales: 349 },
  { day: '19', sales: 400 },
  { day: '20', sales: 200 },
  { day: '21', sales: 278 },
  { day: '22', sales: 189 },
  { day: '23', sales: 400 },
  { day: '24', sales: 300 },
  { day: '25', sales: 500 },
  { day: '26', sales: 278 },
  { day: '27', sales: 189 },
  { day: '28', sales: 239 },
  { day: '29', sales: 349 },
  { day: '30', sales: 400 }
];

const platformSalesData = [
  { name: 'Shopify', value: 4000 },
  { name: 'Amazon', value: 3000 },
  { name: 'eBay', value: 2000 },
  { name: 'Etsy', value: 1000 },
  { name: 'WooCommerce', value: 500 }
];

const categorySalesData = [
  { name: 'Apparel', value: 3500 },
  { name: 'Electronics', value: 2500 },
  { name: 'Home Goods', value: 2000 },
  { name: 'Beauty', value: 1000 },
  { name: 'Food', value: 500 }
];

const topSellingProducts = [
  { id: 1, rank: 1, name: 'Cotton T-Shirt', sku: 'TS-001-BLK', category: 'Apparel', units: 150, revenue: 4497.00 },
  { id: 2, rank: 2, name: 'Wireless Headphones', sku: 'HP-330-BLK', category: 'Electronics', units: 75, revenue: 4499.25 },
  { id: 3, rank: 3, name: 'Leather Wallet', sku: 'WAL-220-BRN', category: 'Accessories', units: 90, revenue: 4499.10 },
  { id: 4, rank: 4, name: 'Ceramic Coffee Mug', sku: 'MUG-101-WHT', category: 'Home Goods', units: 225, revenue: 4497.75 },
  { id: 5, rank: 5, name: 'Bluetooth Speaker', sku: 'SPK-550-BLK', category: 'Electronics', units: 30, revenue: 4499.70 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("last-30-days");
  const [selectedTab, setSelectedTab] = useState("overview");
  const [isCustomDateModalOpen, setIsCustomDateModalOpen] = useState(false);
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [displayDateRange, setDisplayDateRange] = useState("Last 30 days");
  const { toast } = useToast();
  
  // Handle custom date selection
  const applyCustomDateRange = () => {
    if (!customStartDate || !customEndDate) {
      toast({
        title: "Invalid date range",
        description: "Please select both start and end dates",
        variant: "destructive"
      });
      return;
    }
    
    // Check if end date is after start date
    if (new Date(customEndDate) < new Date(customStartDate)) {
      toast({
        title: "Invalid date range",
        description: "End date must be after start date",
        variant: "destructive"
      });
      return;
    }
    
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };
    
    setDisplayDateRange(`${formatDate(customStartDate)} - ${formatDate(customEndDate)}`);
    setIsCustomDateModalOpen(false);
    toast({
      title: "Date range updated",
      description: "Analytics data has been updated for your selected date range"
    });
  };
  
  // Handle refresh action
  const refreshData = () => {
    toast({
      title: "Data refreshed",
      description: "Analytics data has been refreshed"
    });
  };
  
  // Handle date range selection
  const handleDateRangeChange = (value: string) => {
    setDateRange(value);
    
    if (value === "custom") {
      setIsCustomDateModalOpen(true);
    } else {
      // Set display text based on selection
      const displayMap: Record<string, string> = {
        "today": "Today",
        "yesterday": "Yesterday",
        "last-7-days": "Last 7 days",
        "last-30-days": "Last 30 days",
        "this-month": "This month",
        "last-month": "Last month",
        "this-year": "This year"
      };
      
      setDisplayDateRange(displayMap[value] || "Last 30 days");
    }
  };
  
  // Handle export functionality
  const handleExport = (format: string) => {
    toast({
      title: `Exporting analytics as ${format}`,
      description: "Your download will begin shortly"
    });
  };
  
  return (
    <div className="flex h-screen overflow-hidden bg-[#F7FAFC]">
      <Sidebar />
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">Analytics Dashboard</h1>
                  <p className="mt-1 text-sm text-gray-500">
                    View sales and inventory performance metrics
                  </p>
                  <div className="mt-2">
                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                      <Calendar className="mr-1 h-3 w-3" />
                      {displayDateRange}
                    </span>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-3">
                  <Select
                    value={dateRange}
                    onValueChange={handleDateRangeChange}
                  >
                    <SelectTrigger className="w-[180px]">
                      <Calendar className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Select date range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="yesterday">Yesterday</SelectItem>
                      <SelectItem value="last-7-days">Last 7 days</SelectItem>
                      <SelectItem value="last-30-days">Last 30 days</SelectItem>
                      <SelectItem value="this-month">This month</SelectItem>
                      <SelectItem value="last-month">Last month</SelectItem>
                      <SelectItem value="this-year">This year</SelectItem>
                      <SelectItem value="custom">Custom range</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={refreshData}
                  >
                    <RefreshCcw className="h-4 w-4" />
                    Refresh
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Export <ChevronDown className="h-4 w-4 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleExport('csv')}>
                        <FileSpreadsheet className="mr-2 h-4 w-4" />
                        <span>CSV</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleExport('excel')}>
                        <FileSpreadsheet className="mr-2 h-4 w-4" />
                        <span>Excel</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleExport('pdf')}>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>PDF</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              {/* Custom Date Range Modal */}
              <Dialog open={isCustomDateModalOpen} onOpenChange={setIsCustomDateModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Select Date Range</DialogTitle>
                    <DialogDescription>
                      Choose a custom date range for your analytics data
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="start-date">Start Date</Label>
                      <Input 
                        id="start-date" 
                        type="date" 
                        value={customStartDate}
                        onChange={(e) => setCustomStartDate(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="end-date">End Date</Label>
                      <Input 
                        id="end-date" 
                        type="date"
                        value={customEndDate}
                        onChange={(e) => setCustomEndDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCustomDateModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={applyCustomDateRange}>
                      Apply Range
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Total Sales</p>
                        <h3 className="text-2xl font-bold text-gray-900">$34,340.00</h3>
                        <p className="text-sm text-green-600 mt-1 flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +12.5% from last period
                        </p>
                      </div>
                      <div className="p-2 bg-blue-100 rounded-md">
                        <DollarSign className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Total Orders</p>
                        <h3 className="text-2xl font-bold text-gray-900">2,148</h3>
                        <p className="text-sm text-green-600 mt-1 flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +8.2% from last period
                        </p>
                      </div>
                      <div className="p-2 bg-green-100 rounded-md">
                        <ShoppingCart className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Units Sold</p>
                        <h3 className="text-2xl font-bold text-gray-900">10,732</h3>
                        <p className="text-sm text-green-600 mt-1 flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +15.1% from last period
                        </p>
                      </div>
                      <div className="p-2 bg-purple-100 rounded-md">
                        <Package className="h-5 w-5 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Avg. Order Value</p>
                        <h3 className="text-2xl font-bold text-gray-900">$159.87</h3>
                        <p className="text-sm text-green-600 mt-1 flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +4.3% from last period
                        </p>
                      </div>
                      <div className="p-2 bg-amber-100 rounded-md">
                        <ChartIcon className="h-5 w-5 text-amber-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="overview" onValueChange={setSelectedTab} className="mb-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="products">Products</TabsTrigger>
                  <TabsTrigger value="channels">Sales Channels</TabsTrigger>
                </TabsList>
                
                {/* Overview Tab */}
                <TabsContent value="overview" className="mt-6 space-y-6">
                  <Card className="col-span-2">
                    <CardHeader>
                      <CardTitle>Sales Overview</CardTitle>
                      <CardDescription>Monthly sales performance across all channels</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={salesData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip formatter={(value) => `$${value}`} />
                            <Legend />
                            <Bar dataKey="sales" name="Sales ($)" fill="#4299E1" />
                            <Bar dataKey="orders" name="Orders" fill="#48BB78" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Sales by Platform</CardTitle>
                        <CardDescription>Revenue distribution across platforms</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={platformSalesData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                              >
                                {platformSalesData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip formatter={(value) => `$${value}`} />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Sales by Category</CardTitle>
                        <CardDescription>Revenue distribution across product categories</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={categorySalesData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                              >
                                {categorySalesData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip formatter={(value) => `$${value}`} />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Performance</CardTitle>
                      <CardDescription>Daily sales for the last 30 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={dailySalesData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip formatter={(value) => `$${value}`} />
                            <Legend />
                            <Line type="monotone" dataKey="sales" name="Sales ($)" stroke="#4299E1" strokeWidth={2} activeDot={{ r: 8 }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Products Tab */}
                <TabsContent value="products" className="mt-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Top Selling Products</CardTitle>
                      <CardDescription>Best performing products by revenue</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Rank</TableHead>
                              <TableHead>Product</TableHead>
                              <TableHead>SKU</TableHead>
                              <TableHead>Category</TableHead>
                              <TableHead className="text-right">Units Sold</TableHead>
                              <TableHead className="text-right">Revenue</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {topSellingProducts.map((product) => (
                              <TableRow key={product.id}>
                                <TableCell className="font-medium">{product.rank}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.sku}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell className="text-right">{product.units}</TableCell>
                                <TableCell className="text-right">${product.revenue.toFixed(2)}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Product Performance by Category</CardTitle>
                      <CardDescription>Units sold by product category</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={categorySalesData} 
                            layout="vertical"
                            margin={{ top: 20, right: 30, left: 70, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis type="category" dataKey="name" />
                            <Tooltip formatter={(value) => `$${value}`} />
                            <Legend />
                            <Bar dataKey="value" name="Revenue ($)" fill="#4299E1" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Channels Tab */}
                <TabsContent value="channels" className="mt-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Sales by Channel</CardTitle>
                      <CardDescription>Revenue comparison across sales channels</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={platformSalesData}
                            layout="vertical"
                            margin={{ top: 20, right: 30, left: 70, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis type="category" dataKey="name" />
                            <Tooltip formatter={(value) => `$${value}`} />
                            <Legend />
                            <Bar dataKey="value" name="Revenue ($)" fill="#4299E1" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Channel Growth</CardTitle>
                        <CardDescription>Month-over-month growth by channel</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="rounded-md border">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Platform</TableHead>
                                <TableHead className="text-right">Revenue</TableHead>
                                <TableHead className="text-right">Growth</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell>Shopify</TableCell>
                                <TableCell className="text-right">$4,000.00</TableCell>
                                <TableCell className="text-right text-green-600">+15.2%</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Amazon</TableCell>
                                <TableCell className="text-right">$3,000.00</TableCell>
                                <TableCell className="text-right text-green-600">+8.7%</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>eBay</TableCell>
                                <TableCell className="text-right">$2,000.00</TableCell>
                                <TableCell className="text-right text-red-600">-2.3%</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Etsy</TableCell>
                                <TableCell className="text-right">$1,000.00</TableCell>
                                <TableCell className="text-right text-green-600">+22.1%</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>WooCommerce</TableCell>
                                <TableCell className="text-right">$500.00</TableCell>
                                <TableCell className="text-right text-green-600">+5.4%</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Channel KPIs</CardTitle>
                        <CardDescription>Key performance indicators by channel</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="rounded-md border">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Platform</TableHead>
                                <TableHead className="text-right">Orders</TableHead>
                                <TableHead className="text-right">AOV</TableHead>
                                <TableHead className="text-right">Conversion</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell>Shopify</TableCell>
                                <TableCell className="text-right">240</TableCell>
                                <TableCell className="text-right">$166.67</TableCell>
                                <TableCell className="text-right">3.2%</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Amazon</TableCell>
                                <TableCell className="text-right">180</TableCell>
                                <TableCell className="text-right">$166.67</TableCell>
                                <TableCell className="text-right">2.8%</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>eBay</TableCell>
                                <TableCell className="text-right">120</TableCell>
                                <TableCell className="text-right">$166.67</TableCell>
                                <TableCell className="text-right">1.9%</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Etsy</TableCell>
                                <TableCell className="text-right">60</TableCell>
                                <TableCell className="text-right">$166.67</TableCell>
                                <TableCell className="text-right">3.5%</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>WooCommerce</TableCell>
                                <TableCell className="text-right">30</TableCell>
                                <TableCell className="text-right">$166.67</TableCell>
                                <TableCell className="text-right">2.1%</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}