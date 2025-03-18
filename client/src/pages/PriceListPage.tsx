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
  Store,
  Tag,
  Percent,
  DollarSign,
  ChevronDown,
  Filter,
  CheckCircle2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface PriceList {
  id: number;
  name: string;
  type: 'Sales' | 'Purchases';
  discountType: 'Markup' | 'Markdown';
  discountValue: number;
  roundingMethod: string;
  description?: string;
  items: PriceListItem[];
}

interface PriceListItem {
  id: number;
  itemId: number;
  itemName: string;
  sku: string;
  regularPrice: number;
  adjustedPrice: number;
}

export default function PriceListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedPriceList, setSelectedPriceList] = useState<PriceList | null>(null);
  const { toast } = useToast();

  // New price list form state
  const [newPriceList, setNewPriceList] = useState({
    name: "",
    type: "Purchases",
    discountType: "Markdown",
    discountValue: 5,
    roundingMethod: "Nearest whole number",
    description: ""
  });

  // Mock data for price lists
  const priceLists: PriceList[] = [
    {
      id: 1,
      name: "Vendor Items Discount",
      type: "Purchases",
      discountType: "Markdown",
      discountValue: 5,
      roundingMethod: "Nearest whole number",
      description: "Discounted price list from Vendor",
      items: [
        { id: 1, itemId: 1, itemName: "Cotton T-Shirt", sku: "TS-001-BLK", regularPrice: 29.99, adjustedPrice: 28.49 },
        { id: 2, itemId: 2, itemName: "Leather Wallet", sku: "WAL-220-BRN", regularPrice: 49.99, adjustedPrice: 47.49 },
        { id: 3, itemId: 3, itemName: "Ceramic Coffee Mug", sku: "MUG-101-WHT", regularPrice: 19.99, adjustedPrice: 18.99 }
      ]
    },
    {
      id: 2,
      name: "Premium Products Markup",
      type: "Sales",
      discountType: "Markup",
      discountValue: 10,
      roundingMethod: "Nearest whole number",
      description: "Markup for premium product line",
      items: [
        { id: 4, itemId: 4, itemName: "Wireless Headphones", sku: "HP-330-BLK", regularPrice: 59.99, adjustedPrice: 65.99 },
        { id: 5, itemId: 5, itemName: "Bluetooth Speaker", sku: "SPK-550-BLK", regularPrice: 149.99, adjustedPrice: 164.99 }
      ]
    },
    {
      id: 3,
      name: "Bulk Purchase Discount",
      type: "Purchases",
      discountType: "Markdown",
      discountValue: 8,
      roundingMethod: "Nearest whole number",
      description: "Discount for bulk purchases from suppliers",
      items: [
        { id: 6, itemId: 6, itemName: "Office Paper (500 sheets)", sku: "PAP-001-WHT", regularPrice: 12.99, adjustedPrice: 11.95 },
        { id: 7, itemId: 7, itemName: "Ballpoint Pens (Pack of 12)", sku: "PEN-002-BLU", regularPrice: 8.99, adjustedPrice: 8.27 }
      ]
    }
  ];

  // Filter price lists based on search
  const filteredPriceLists = priceLists.filter(priceList => 
    priceList.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    priceList.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    priceList.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Create price list handler
  const handleCreatePriceList = () => {
    // In a real app, this would call the mutation
    console.log("Creating price list:", newPriceList);
    toast({
      title: "Price list created",
      description: `${newPriceList.name} has been created successfully`
    });
    setIsCreateModalOpen(false);
    resetPriceListForm();
  };

  const resetPriceListForm = () => {
    setNewPriceList({
      name: "",
      type: "Purchases",
      discountType: "Markdown",
      discountValue: 5,
      roundingMethod: "Nearest whole number",
      description: ""
    });
  };

  const viewPriceListItems = (priceList: PriceList) => {
    setSelectedPriceList(priceList);
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
                  <h1 className="text-2xl font-semibold text-gray-900">Price Lists</h1>
                  <p className="mt-1 text-sm text-gray-500">
                    Keep track of prices for items purchased from multiple vendors
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Button 
                    onClick={() => setIsCreateModalOpen(true)} 
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Create Price List
                  </Button>
                </div>
              </div>

              {/* Info Card */}
              <Card className="mb-6 bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-100">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-amber-800 mb-2">Price lists can be helpful for vendor relations</h3>
                  <p className="text-amber-700">Price lists help you to keep track of prices of items purchased from multiple vendors. Create separate price lists for different suppliers or product categories.</p>
                </CardContent>
              </Card>

              {/* Search and filter */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search price lists"
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full md:w-48">
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="purchases">Purchases</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Main Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Price Lists Table */}
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle>Price Lists</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {filteredPriceLists.length === 0 ? (
                        <div className="text-center py-4 text-gray-500">
                          No price lists found
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {filteredPriceLists.map((priceList) => (
                            <div 
                              key={priceList.id}
                              className={`p-3 rounded-md border cursor-pointer hover:bg-gray-50 transition-colors ${
                                selectedPriceList?.id === priceList.id ? 'bg-blue-50 border-blue-200' : ''
                              }`}
                              onClick={() => viewPriceListItems(priceList)}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium truncate">{priceList.name}</h3>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="outline" className={
                                      priceList.type === 'Sales' 
                                        ? 'border-green-500 text-green-600' 
                                        : 'border-blue-500 text-blue-600'
                                    }>
                                      {priceList.type}
                                    </Badge>
                                    <span className="text-xs text-gray-500">
                                      {priceList.discountType === 'Markup' ? '+' : '-'}{priceList.discountValue}%
                                    </span>
                                  </div>
                                </div>
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
                                      <CheckCircle2 className="h-4 w-4 mr-2" />
                                      Apply to Items
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer text-red-600">
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                              <p className="text-xs text-gray-500 mt-1 truncate">
                                {priceList.description || 'No description'}
                              </p>
                              <div className="text-xs text-gray-500 mt-2">
                                {priceList.items.length} items
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Price List Items */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle>
                        {selectedPriceList ? `${selectedPriceList.name} - Items` : 'Select a price list to view items'}
                      </CardTitle>
                      {selectedPriceList && (
                        <CardDescription>
                          {selectedPriceList.discountType === 'Markup' ? 'Marked up' : 'Marked down'} by {selectedPriceList.discountValue}%
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      {!selectedPriceList ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                          <Tag className="h-12 w-12 text-gray-300 mb-4" />
                          <h3 className="text-lg font-medium text-gray-900">No price list selected</h3>
                          <p className="text-gray-500 mt-1 max-w-sm">
                            Select a price list from the left panel to view its items and pricing details
                          </p>
                        </div>
                      ) : (
                        <div className="rounded-md border">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>
                                  <button className="flex items-center">
                                    Item
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                  </button>
                                </TableHead>
                                <TableHead>
                                  <button className="flex items-center">
                                    SKU
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                  </button>
                                </TableHead>
                                <TableHead className="text-right">
                                  <button className="flex items-center justify-end">
                                    Regular Price
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                  </button>
                                </TableHead>
                                <TableHead className="text-right">
                                  <button className="flex items-center justify-end">
                                    Adjusted Price
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                  </button>
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {selectedPriceList.items.length === 0 ? (
                                <TableRow>
                                  <TableCell colSpan={4} className="text-center py-8">
                                    No items in this price list
                                  </TableCell>
                                </TableRow>
                              ) : (
                                selectedPriceList.items.map((item) => (
                                  <TableRow key={item.id}>
                                    <TableCell className="font-medium">
                                      {item.itemName}
                                    </TableCell>
                                    <TableCell>{item.sku}</TableCell>
                                    <TableCell className="text-right">${item.regularPrice.toFixed(2)}</TableCell>
                                    <TableCell className={`text-right font-medium ${
                                      selectedPriceList.discountType === 'Markup' 
                                        ? 'text-red-600' 
                                        : 'text-green-600'
                                    }`}>
                                      ${item.adjustedPrice.toFixed(2)}
                                    </TableCell>
                                  </TableRow>
                                ))
                              )}
                            </TableBody>
                          </Table>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Create Price List Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Create New Price List</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-4">
              <div>
                <Label htmlFor="name" className="text-right">
                  Price List Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={newPriceList.name}
                  onChange={(e) => setNewPriceList({...newPriceList, name: e.target.value})}
                  placeholder="Enter price list name"
                />
              </div>
              
              <div>
                <Label>Type</Label>
                <RadioGroup 
                  value={newPriceList.type} 
                  onValueChange={(value) => setNewPriceList({...newPriceList, type: value as 'Sales' | 'Purchases'})}
                  className="flex gap-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Sales" id="sales" />
                    <Label htmlFor="sales" className="cursor-pointer">Sales</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Purchases" id="purchases" />
                    <Label htmlFor="purchases" className="cursor-pointer">Purchases</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label>Item Rate</Label>
                <RadioGroup 
                  value={newPriceList.discountType} 
                  onValueChange={(value) => setNewPriceList({...newPriceList, discountType: value as 'Markup' | 'Markdown'})}
                  className="flex gap-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Markup" id="markup" />
                    <Label htmlFor="markup" className="cursor-pointer">Markup by a percentage</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Markdown" id="markdown" />
                    <Label htmlFor="markdown" className="cursor-pointer">Markdown by a percentage</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label htmlFor="percentage" className="text-right">
                  Percentage <span className="text-red-500">*</span>
                </Label>
                <div className="flex items-center mt-1">
                  <div className="relative w-24">
                    <Input
                      id="percentage"
                      type="number"
                      min="0"
                      max="100"
                      value={newPriceList.discountValue}
                      onChange={(e) => setNewPriceList({...newPriceList, discountValue: parseFloat(e.target.value)})}
                      className="pr-8"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <Percent className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="rounding">Round Off To</Label>
                <Select 
                  value={newPriceList.roundingMethod}
                  onValueChange={(value) => setNewPriceList({...newPriceList, roundingMethod: value})}
                >
                  <SelectTrigger id="rounding">
                    <SelectValue placeholder="Select rounding method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nearest whole number">Nearest whole number</SelectItem>
                    <SelectItem value="Nearest decimal">Nearest decimal (0.1)</SelectItem>
                    <SelectItem value="Nearest cent">Nearest cent (0.01)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newPriceList.description}
                  onChange={(e) => setNewPriceList({...newPriceList, description: e.target.value})}
                  placeholder="Discounted price list from Vendor"
                  rows={2}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleCreatePriceList} 
              disabled={!newPriceList.name || newPriceList.discountValue <= 0}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}