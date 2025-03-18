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
  Search,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  ArrowUpDown,
  Box,
  QrCode,
  Layers,
  Tag,
  CircleCheck,
  Filter,
  ChevronDown,
  Info,
  AlertCircle,
  Clock
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";

// Common interfaces
interface SerialNumber {
  id: number;
  number: string;
  itemId: number;
  itemName: string;
  status: 'Available' | 'Allocated' | 'Sold' | 'Returned';
  createdDate: string;
  expiryDate?: string;
  notes?: string;
}

interface BatchNumber {
  id: number;
  batchId: string;
  itemId: number;
  itemName: string;
  manufactureDate: string;
  expiryDate: string;
  quantity: number;
  remainingQuantity: number;
  location: string;
  notes?: string;
}

export default function SerialTrackingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSerialModalOpen, setIsSerialModalOpen] = useState(false);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedTab, setSelectedTab] = useState("serials");
  const { toast } = useToast();

  // New serial/batch form states
  const [newSerial, setNewSerial] = useState({
    number: "",
    itemId: "",
    status: "Available",
    notes: "",
    expiryDate: ""
  });

  const [newBatch, setNewBatch] = useState({
    batchId: "",
    itemId: "",
    manufactureDate: "",
    expiryDate: "",
    quantity: 1,
    location: "",
    notes: ""
  });

  // Mock data - In a real app this would come from API
  const serialNumbers: SerialNumber[] = [
    {
      id: 1, 
      number: "SN-0001", 
      itemId: 1, 
      itemName: "Wireless Headphones",
      status: "Available", 
      createdDate: "2023-08-15",
      expiryDate: "2025-08-15",
      notes: "Premium quality headphones"
    },
    {
      id: 2, 
      number: "SN-0002", 
      itemId: 1, 
      itemName: "Wireless Headphones",
      status: "Sold", 
      createdDate: "2023-08-10",
      expiryDate: "2025-08-10"
    },
    {
      id: 3, 
      number: "SN-0003", 
      itemId: 2, 
      itemName: "Bluetooth Speaker",
      status: "Available", 
      createdDate: "2023-07-20"
    },
    {
      id: 4, 
      number: "SN-0004", 
      itemId: 3, 
      itemName: "Laptop",
      status: "Allocated", 
      createdDate: "2023-09-05"
    },
    {
      id: 5, 
      number: "SN-0005", 
      itemId: 3, 
      itemName: "Laptop",
      status: "Returned", 
      createdDate: "2023-06-12",
      notes: "Minor scratches on the cover"
    }
  ];

  const batchNumbers: BatchNumber[] = [
    {
      id: 1,
      batchId: "BATCH-001",
      itemId: 4,
      itemName: "Inhaler (200 doses)",
      manufactureDate: "2023-05-01",
      expiryDate: "2025-05-01",
      quantity: 50,
      remainingQuantity: 42,
      location: "Warehouse A, Shelf 3"
    },
    {
      id: 2,
      batchId: "BATCH-002",
      itemId: 5,
      itemName: "Pain Relief Tablets",
      manufactureDate: "2023-06-15",
      expiryDate: "2024-06-15",
      quantity: 100,
      remainingQuantity: 78,
      location: "Warehouse A, Shelf 4"
    },
    {
      id: 3,
      batchId: "BATCH-003",
      itemId: 4,
      itemName: "Inhaler (200 doses)",
      manufactureDate: "2023-07-01",
      expiryDate: "2025-07-01",
      quantity: 30,
      remainingQuantity: 30,
      location: "Warehouse B, Shelf 1"
    }
  ];

  // Fetch inventory items
  const { data: inventory = [], isLoading: isInventoryLoading } = useQuery({
    queryKey: ['/api/inventory'],
    refetchInterval: 5000,
  });

  // Filter serial numbers based on search
  const filteredSerialNumbers = serialNumbers.filter(serial => 
    serial.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    serial.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    serial.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter batch numbers based on search
  const filteredBatchNumbers = batchNumbers.filter(batch => 
    batch.batchId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    batch.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    batch.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Create serial number
  const handleCreateSerial = () => {
    console.log("Creating serial:", newSerial);
    // In a real app this would call the mutation
    toast({
      title: "Serial number created",
      description: `Serial number ${newSerial.number} has been added`
    });
    setIsSerialModalOpen(false);
    resetSerialForm();
  };

  // Create batch number
  const handleCreateBatch = () => {
    console.log("Creating batch:", newBatch);
    // In a real app this would call the mutation
    toast({
      title: "Batch created",
      description: `Batch ${newBatch.batchId} has been added`
    });
    setIsBatchModalOpen(false);
    resetBatchForm();
  };

  const resetSerialForm = () => {
    setNewSerial({
      number: "",
      itemId: "",
      status: "Available",
      notes: "",
      expiryDate: ""
    });
  };

  const resetBatchForm = () => {
    setNewBatch({
      batchId: "",
      itemId: "",
      manufactureDate: "",
      expiryDate: "",
      quantity: 1,
      location: "",
      notes: ""
    });
  };

  const viewSerialDetails = (serial: SerialNumber) => {
    setSelectedItem(serial);
    setIsDetailsModalOpen(true);
  };

  const viewBatchDetails = (batch: BatchNumber) => {
    setSelectedItem(batch);
    setIsDetailsModalOpen(true);
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
                  <h1 className="text-2xl font-semibold text-gray-900">Serial & Batch Tracking</h1>
                  <p className="mt-1 text-sm text-gray-500">
                    Keep an eye on your products with real-time tracking
                  </p>
                </div>
                <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={() => setIsSerialModalOpen(true)} 
                    className="flex items-center gap-2"
                  >
                    <QrCode className="h-4 w-4" />
                    Add Serial Number
                  </Button>
                  <Button 
                    onClick={() => setIsBatchModalOpen(true)} 
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Layers className="h-4 w-4" />
                    Add Batch
                  </Button>
                </div>
              </div>

              {/* Alert for upcoming expirations */}
              <Card className="mb-6 border-amber-200 bg-amber-50">
                <CardContent className="p-4 flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-amber-800">Upcoming Expirations</p>
                    <p className="text-sm text-amber-700">2 batches of "Pain Relief Tablets" are expiring within 30 days. <a href="#" className="underline font-medium">View details</a></p>
                  </div>
                </CardContent>
              </Card>

              {/* Search bar */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search by serial/batch number or product name"
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full md:w-48">
                  <Button variant="outline" className="w-full flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="serials" onValueChange={setSelectedTab} className="mb-6">
                <TabsList>
                  <TabsTrigger value="serials" className="flex gap-2">
                    <QrCode className="h-4 w-4" />
                    <span>Serial Numbers</span>
                  </TabsTrigger>
                  <TabsTrigger value="batches" className="flex gap-2">
                    <Layers className="h-4 w-4" />
                    <span>Batch Tracking</span>
                  </TabsTrigger>
                </TabsList>
                
                {/* Serial Numbers Tab */}
                <TabsContent value="serials" className="mt-6">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>
                            <button className="flex items-center">
                              Serial Number
                              <ArrowUpDown className="ml-2 h-4 w-4" />
                            </button>
                          </TableHead>
                          <TableHead>
                            <button className="flex items-center">
                              Product
                              <ArrowUpDown className="ml-2 h-4 w-4" />
                            </button>
                          </TableHead>
                          <TableHead>
                            <button className="flex items-center">
                              Status
                              <ArrowUpDown className="ml-2 h-4 w-4" />
                            </button>
                          </TableHead>
                          <TableHead>
                            <button className="flex items-center">
                              Created Date
                              <ArrowUpDown className="ml-2 h-4 w-4" />
                            </button>
                          </TableHead>
                          <TableHead>
                            <button className="flex items-center">
                              Expiry Date
                              <ArrowUpDown className="ml-2 h-4 w-4" />
                            </button>
                          </TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredSerialNumbers.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-8">
                              No serial numbers found.
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredSerialNumbers.map((serial) => (
                            <TableRow key={serial.id}>
                              <TableCell className="font-medium">{serial.number}</TableCell>
                              <TableCell>{serial.itemName}</TableCell>
                              <TableCell>
                                <Badge className={`
                                  ${serial.status === 'Available' ? 'bg-green-100 text-green-800' : ''}
                                  ${serial.status === 'Allocated' ? 'bg-blue-100 text-blue-800' : ''}
                                  ${serial.status === 'Sold' ? 'bg-purple-100 text-purple-800' : ''}
                                  ${serial.status === 'Returned' ? 'bg-amber-100 text-amber-800' : ''}
                                `}>
                                  {serial.status}
                                </Badge>
                              </TableCell>
                              <TableCell>{serial.createdDate}</TableCell>
                              <TableCell>{serial.expiryDate || "-"}</TableCell>
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
                                      onClick={() => viewSerialDetails(serial)}
                                    >
                                      <Info className="h-4 w-4 mr-2" />
                                      View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">
                                      <Edit className="h-4 w-4 mr-2" />
                                      Edit
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
                
                {/* Batch Tracking Tab */}
                <TabsContent value="batches" className="mt-6">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>
                            <button className="flex items-center">
                              Batch Number
                              <ArrowUpDown className="ml-2 h-4 w-4" />
                            </button>
                          </TableHead>
                          <TableHead>
                            <button className="flex items-center">
                              Product
                              <ArrowUpDown className="ml-2 h-4 w-4" />
                            </button>
                          </TableHead>
                          <TableHead className="text-center">
                            <button className="flex items-center justify-center">
                              Quantity
                              <ArrowUpDown className="ml-2 h-4 w-4" />
                            </button>
                          </TableHead>
                          <TableHead className="text-center">
                            <button className="flex items-center justify-center">
                              Remaining
                              <ArrowUpDown className="ml-2 h-4 w-4" />
                            </button>
                          </TableHead>
                          <TableHead>
                            <button className="flex items-center">
                              Manufacturing Date
                              <ArrowUpDown className="ml-2 h-4 w-4" />
                            </button>
                          </TableHead>
                          <TableHead>
                            <button className="flex items-center">
                              Expiry Date
                              <ArrowUpDown className="ml-2 h-4 w-4" />
                            </button>
                          </TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredBatchNumbers.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-8">
                              No batches found.
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredBatchNumbers.map((batch) => (
                            <TableRow key={batch.id}>
                              <TableCell className="font-medium">{batch.batchId}</TableCell>
                              <TableCell>{batch.itemName}</TableCell>
                              <TableCell className="text-center">{batch.quantity}</TableCell>
                              <TableCell className="text-center">
                                {batch.remainingQuantity}
                                {batch.remainingQuantity < 0.25 * batch.quantity && (
                                  <span className="ml-2 inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                                )}
                              </TableCell>
                              <TableCell>{batch.manufactureDate}</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  {batch.expiryDate}
                                  {new Date(batch.expiryDate) <= new Date(new Date().setDate(new Date().getDate() + 30)) && (
                                    <Clock className="ml-2 h-4 w-4 text-amber-500" />
                                  )}
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
                                    <DropdownMenuItem 
                                      className="cursor-pointer"
                                      onClick={() => viewBatchDetails(batch)}
                                    >
                                      <Info className="h-4 w-4 mr-2" />
                                      View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">
                                      <Edit className="h-4 w-4 mr-2" />
                                      Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">
                                      <Tag className="h-4 w-4 mr-2" />
                                      Adjust Quantity
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
              </Tabs>
            </div>
          </div>
        </main>
      </div>

      {/* Add Serial Number Modal */}
      <Dialog open={isSerialModalOpen} onOpenChange={setIsSerialModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Serial Number</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-4">
              <div>
                <Label htmlFor="item">Product</Label>
                <Select 
                  value={newSerial.itemId}
                  onValueChange={(value) => setNewSerial({...newSerial, itemId: value})}
                >
                  <SelectTrigger id="item">
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {!isInventoryLoading && inventory.map((item: any) => (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="serialnumber">Serial Number</Label>
                <Input
                  id="serialnumber"
                  value={newSerial.number}
                  onChange={(e) => setNewSerial({...newSerial, number: e.target.value})}
                  placeholder="Enter serial number"
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={newSerial.status}
                  onValueChange={(value: any) => setNewSerial({...newSerial, status: value})}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Allocated">Allocated</SelectItem>
                    <SelectItem value="Sold">Sold</SelectItem>
                    <SelectItem value="Returned">Returned</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="expirydate">Expiry Date (Optional)</Label>
                <Input
                  id="expirydate"
                  type="date"
                  value={newSerial.expiryDate}
                  onChange={(e) => setNewSerial({...newSerial, expiryDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={newSerial.notes}
                  onChange={(e) => setNewSerial({...newSerial, notes: e.target.value})}
                  placeholder="Add any additional notes here"
                  rows={3}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSerialModalOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleCreateSerial} 
              disabled={!newSerial.itemId || !newSerial.number}
            >
              Add Serial Number
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Batch Modal */}
      <Dialog open={isBatchModalOpen} onOpenChange={setIsBatchModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Batch</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-4">
              <div>
                <Label htmlFor="batchItem">Product</Label>
                <Select 
                  value={newBatch.itemId}
                  onValueChange={(value) => setNewBatch({...newBatch, itemId: value})}
                >
                  <SelectTrigger id="batchItem">
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {!isInventoryLoading && inventory.map((item: any) => (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="batchId">Batch Number</Label>
                <Input
                  id="batchId"
                  value={newBatch.batchId}
                  onChange={(e) => setNewBatch({...newBatch, batchId: e.target.value})}
                  placeholder="Enter batch number"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="manufactureDate">Manufacturing Date</Label>
                  <Input
                    id="manufactureDate"
                    type="date"
                    value={newBatch.manufactureDate}
                    onChange={(e) => setNewBatch({...newBatch, manufactureDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={newBatch.expiryDate}
                    onChange={(e) => setNewBatch({...newBatch, expiryDate: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={newBatch.quantity}
                    onChange={(e) => setNewBatch({...newBatch, quantity: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newBatch.location}
                    onChange={(e) => setNewBatch({...newBatch, location: e.target.value})}
                    placeholder="Warehouse location"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="batchNotes">Notes (Optional)</Label>
                <Textarea
                  id="batchNotes"
                  value={newBatch.notes}
                  onChange={(e) => setNewBatch({...newBatch, notes: e.target.value})}
                  placeholder="Add any additional notes here"
                  rows={3}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBatchModalOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleCreateBatch} 
              disabled={!newBatch.itemId || !newBatch.batchId || !newBatch.manufactureDate || !newBatch.expiryDate}
            >
              Add Batch
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Details Modal */}
      {selectedItem && (
        <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {selectedTab === "serials" ? "Serial Number Details" : "Batch Details"}
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              {selectedTab === "serials" ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-500">Serial Number</Label>
                    <p className="font-medium">{selectedItem.number}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Status</Label>
                    <p>
                      <Badge className={`
                        ${selectedItem.status === 'Available' ? 'bg-green-100 text-green-800' : ''}
                        ${selectedItem.status === 'Allocated' ? 'bg-blue-100 text-blue-800' : ''}
                        ${selectedItem.status === 'Sold' ? 'bg-purple-100 text-purple-800' : ''}
                        ${selectedItem.status === 'Returned' ? 'bg-amber-100 text-amber-800' : ''}
                      `}>
                        {selectedItem.status}
                      </Badge>
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Product</Label>
                    <p className="font-medium">{selectedItem.itemName}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Created Date</Label>
                    <p className="font-medium">{selectedItem.createdDate}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Expiry Date</Label>
                    <p className="font-medium">{selectedItem.expiryDate || "-"}</p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm text-gray-500">Notes</Label>
                    <p className="font-medium">{selectedItem.notes || "-"}</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-500">Batch Number</Label>
                    <p className="font-medium">{selectedItem.batchId}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Product</Label>
                    <p className="font-medium">{selectedItem.itemName}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Quantity</Label>
                    <p className="font-medium">{selectedItem.quantity}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Remaining</Label>
                    <p className="font-medium">{selectedItem.remainingQuantity}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Manufacturing Date</Label>
                    <p className="font-medium">{selectedItem.manufactureDate}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Expiry Date</Label>
                    <p className="font-medium">{selectedItem.expiryDate}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Location</Label>
                    <p className="font-medium">{selectedItem.location}</p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm text-gray-500">Notes</Label>
                    <p className="font-medium">{selectedItem.notes || "-"}</p>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDetailsModalOpen(false)}>Close</Button>
              <Button>Edit Details</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}