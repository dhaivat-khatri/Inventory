import { Sidebar } from "@/components/Sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { 
  Warehouse, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  ArrowUpDown, 
  MapPin, 
  Package, 
  Truck, 
  BarChart4,
  MoreHorizontal
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";

export default function WarehousePage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("warehouses");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  // Mock data - In a real app this would come from API
  const warehouses = [
    {
      id: 1,
      name: "Main Warehouse",
      address: "123 Main St, City, State, 12345",
      type: "Central",
      status: "Active",
      inventory: 450,
      bins: 86,
      manager: "John Smith"
    },
    {
      id: 2,
      name: "East Coast Fulfillment",
      address: "456 Commerce Dr, New York, NY, 10001",
      type: "Fulfillment",
      status: "Active",
      inventory: 230,
      bins: 42,
      manager: "Jane White"
    },
    {
      id: 3,
      name: "West Distribution",
      address: "789 Pacific Blvd, Los Angeles, CA, 90001",
      type: "Distribution",
      status: "Active",
      inventory: 315,
      bins: 64,
      manager: "Mike Johnson"
    }
  ];

  const binLocations = [
    {
      id: 1,
      name: "A-1-1",
      warehouseId: 1,
      warehouseName: "Main Warehouse",
      zone: "A",
      aisle: "1",
      shelf: "1",
      capacity: 50,
      utilized: 42,
      itemCount: 3,
      status: "Active"
    },
    {
      id: 2,
      name: "A-1-2",
      warehouseId: 1,
      warehouseName: "Main Warehouse",
      zone: "A",
      aisle: "1",
      shelf: "2",
      capacity: 50,
      utilized: 16,
      itemCount: 1,
      status: "Active"
    },
    {
      id: 3,
      name: "B-3-4",
      warehouseId: 1,
      warehouseName: "Main Warehouse",
      zone: "B",
      aisle: "3",
      shelf: "4",
      capacity: 30,
      utilized: 30,
      itemCount: 2,
      status: "Full"
    },
    {
      id: 4,
      name: "A-2-1",
      warehouseId: 2,
      warehouseName: "East Coast Fulfillment",
      zone: "A",
      aisle: "2",
      shelf: "1",
      capacity: 40,
      utilized: 12,
      itemCount: 1,
      status: "Active"
    }
  ];

  const transferOrders = [
    {
      id: 1,
      number: "TO-2023-0001",
      sourceWarehouse: "Main Warehouse",
      destinationWarehouse: "East Coast Fulfillment",
      items: 12,
      status: "In Transit",
      createdDate: "2023-05-12",
      estimatedArrival: "2023-05-15"
    },
    {
      id: 2,
      number: "TO-2023-0002",
      sourceWarehouse: "Main Warehouse",
      destinationWarehouse: "West Distribution",
      items: 8,
      status: "Completed",
      createdDate: "2023-05-08",
      estimatedArrival: "2023-05-11"
    },
    {
      id: 3,
      number: "TO-2023-0003",
      sourceWarehouse: "West Distribution",
      destinationWarehouse: "East Coast Fulfillment",
      items: 15,
      status: "Pending",
      createdDate: "2023-05-14",
      estimatedArrival: "2023-05-18"
    }
  ];

  // Filter warehouses based on search
  const filteredWarehouses = warehouses.filter(warehouse =>
    warehouse.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    warehouse.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    warehouse.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter bin locations based on search
  const filteredBinLocations = binLocations.filter(bin =>
    bin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bin.warehouseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bin.zone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter transfer orders based on search
  const filteredTransferOrders = transferOrders.filter(order =>
    order.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.sourceWarehouse.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.destinationWarehouse.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Mock function for creating a new warehouse
  const createWarehouse = (warehouseData) => {
    console.log("Creating warehouse:", warehouseData);
    toast({
      title: "Warehouse created",
      description: `${warehouseData.name} has been added`
    });
    setIsCreateModalOpen(false);
  };

  // Initial form for new warehouse
  const [newWarehouse, setNewWarehouse] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    type: "Distribution",
    manager: "",
    phone: "",
    email: ""
  });

  return (
    <div className="flex h-screen overflow-hidden bg-[#F7FAFC]">
      <Sidebar />
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">Warehouse Management</h1>
                  <p className="mt-1 text-sm text-gray-500">
                    Manage warehouses, bin locations, and transfers
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Button 
                    onClick={() => setIsCreateModalOpen(true)} 
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Warehouse
                  </Button>
                </div>
              </div>

              {/* Dashboard cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center">
                      <div className="mr-4 bg-blue-100 p-3 rounded-lg">
                        <Warehouse className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Total Warehouses</p>
                        <h3 className="text-2xl font-bold text-gray-900">{warehouses.length}</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center">
                      <div className="mr-4 bg-green-100 p-3 rounded-lg">
                        <Package className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Total Bin Locations</p>
                        <h3 className="text-2xl font-bold text-gray-900">{binLocations.length}</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center">
                      <div className="mr-4 bg-purple-100 p-3 rounded-lg">
                        <Truck className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Active Transfers</p>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {transferOrders.filter(t => t.status === "In Transit").length}
                        </h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Search and Tabs */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search warehouses, bins or transfers"
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <Tabs defaultValue="warehouses" onValueChange={setSelectedTab} className="mb-6">
                <TabsList>
                  <TabsTrigger value="warehouses" className="flex gap-2">
                    <Warehouse className="h-4 w-4" />
                    <span>Warehouses</span>
                  </TabsTrigger>
                  <TabsTrigger value="bins" className="flex gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>Bin Locations</span>
                  </TabsTrigger>
                  <TabsTrigger value="transfers" className="flex gap-2">
                    <Truck className="h-4 w-4" />
                    <span>Transfer Orders</span>
                  </TabsTrigger>
                </TabsList>
                
                {/* Warehouses Tab */}
                <TabsContent value="warehouses" className="mt-6">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[30%]">Name</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-center">Items</TableHead>
                          <TableHead className="text-center">Bins</TableHead>
                          <TableHead>Manager</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredWarehouses.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-8">
                              No warehouses found.
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredWarehouses.map((warehouse) => (
                            <TableRow key={warehouse.id}>
                              <TableCell>
                                <div>
                                  <div className="font-medium">{warehouse.name}</div>
                                  <div className="text-sm text-gray-500">{warehouse.address}</div>
                                </div>
                              </TableCell>
                              <TableCell>{warehouse.type}</TableCell>
                              <TableCell>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  {warehouse.status}
                                </span>
                              </TableCell>
                              <TableCell className="text-center">{warehouse.inventory}</TableCell>
                              <TableCell className="text-center">{warehouse.bins}</TableCell>
                              <TableCell>{warehouse.manager}</TableCell>
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
                                    <DropdownMenuItem className="cursor-pointer">
                                      <MapPin className="h-4 w-4 mr-2" />
                                      View Bins
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer text-red-600">
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
                </TabsContent>
                
                {/* Bin Locations Tab */}
                <TabsContent value="bins" className="mt-6">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Bin Name</TableHead>
                          <TableHead>Warehouse</TableHead>
                          <TableHead>Zone/Aisle/Shelf</TableHead>
                          <TableHead className="text-center">Capacity</TableHead>
                          <TableHead className="text-center">Utilized</TableHead>
                          <TableHead className="text-center">Items</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredBinLocations.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center py-8">
                              No bin locations found.
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredBinLocations.map((bin) => (
                            <TableRow key={bin.id}>
                              <TableCell className="font-medium">{bin.name}</TableCell>
                              <TableCell>{bin.warehouseName}</TableCell>
                              <TableCell>{`${bin.zone}/${bin.aisle}/${bin.shelf}`}</TableCell>
                              <TableCell className="text-center">{bin.capacity}</TableCell>
                              <TableCell className="text-center">{bin.utilized}</TableCell>
                              <TableCell className="text-center">{bin.itemCount}</TableCell>
                              <TableCell>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  bin.status === 'Full' 
                                    ? 'bg-amber-100 text-amber-800' 
                                    : 'bg-green-100 text-green-800'
                                }`}>
                                  {bin.status}
                                </span>
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
                                    <DropdownMenuItem className="cursor-pointer">
                                      <Package className="h-4 w-4 mr-2" />
                                      View Items
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer text-red-600">
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
                </TabsContent>
                
                {/* Transfer Orders Tab */}
                <TabsContent value="transfers" className="mt-6">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order #</TableHead>
                          <TableHead>Source</TableHead>
                          <TableHead>Destination</TableHead>
                          <TableHead className="text-center">Items</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Created Date</TableHead>
                          <TableHead>ETA</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTransferOrders.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center py-8">
                              No transfer orders found.
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredTransferOrders.map((order) => (
                            <TableRow key={order.id}>
                              <TableCell className="font-medium">{order.number}</TableCell>
                              <TableCell>{order.sourceWarehouse}</TableCell>
                              <TableCell>{order.destinationWarehouse}</TableCell>
                              <TableCell className="text-center">{order.items}</TableCell>
                              <TableCell>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  order.status === 'Completed' 
                                    ? 'bg-green-100 text-green-800'
                                    : order.status === 'In Transit'
                                      ? 'bg-blue-100 text-blue-800'
                                      : 'bg-amber-100 text-amber-800'
                                }`}>
                                  {order.status}
                                </span>
                              </TableCell>
                              <TableCell>{order.createdDate}</TableCell>
                              <TableCell>{order.estimatedArrival}</TableCell>
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
                                    <DropdownMenuItem className="cursor-pointer">
                                      <Package className="h-4 w-4 mr-2" />
                                      View Items
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">
                                      <BarChart4 className="h-4 w-4 mr-2" />
                                      Track Shipment
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
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>

      {/* Create Warehouse Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Warehouse</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="name">Warehouse Name</Label>
                <Input
                  id="name"
                  value={newWarehouse.name}
                  onChange={(e) => setNewWarehouse({...newWarehouse, name: e.target.value})}
                  placeholder="Enter warehouse name"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="address">Street Address</Label>
                <Input
                  id="address"
                  value={newWarehouse.address}
                  onChange={(e) => setNewWarehouse({...newWarehouse, address: e.target.value})}
                  placeholder="Enter street address"
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={newWarehouse.city}
                  onChange={(e) => setNewWarehouse({...newWarehouse, city: e.target.value})}
                  placeholder="Enter city"
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={newWarehouse.state}
                  onChange={(e) => setNewWarehouse({...newWarehouse, state: e.target.value})}
                  placeholder="Enter state"
                />
              </div>
              <div>
                <Label htmlFor="zipCode">Zip Code</Label>
                <Input
                  id="zipCode"
                  value={newWarehouse.zipCode}
                  onChange={(e) => setNewWarehouse({...newWarehouse, zipCode: e.target.value})}
                  placeholder="Enter zip code"
                />
              </div>
              <div>
                <Label htmlFor="type">Warehouse Type</Label>
                <Select 
                  value={newWarehouse.type}
                  onValueChange={(value) => setNewWarehouse({...newWarehouse, type: value})}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Central">Central</SelectItem>
                    <SelectItem value="Distribution">Distribution</SelectItem>
                    <SelectItem value="Fulfillment">Fulfillment</SelectItem>
                    <SelectItem value="Storage">Storage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="manager">Warehouse Manager</Label>
                <Input
                  id="manager"
                  value={newWarehouse.manager}
                  onChange={(e) => setNewWarehouse({...newWarehouse, manager: e.target.value})}
                  placeholder="Enter manager name"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={newWarehouse.phone}
                  onChange={(e) => setNewWarehouse({...newWarehouse, phone: e.target.value})}
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newWarehouse.email}
                  onChange={(e) => setNewWarehouse({...newWarehouse, email: e.target.value})}
                  placeholder="Enter email address"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
            <Button type="submit" onClick={() => createWarehouse(newWarehouse)} disabled={!newWarehouse.name}>
              Create Warehouse
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}