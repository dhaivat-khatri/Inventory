import { Sidebar } from "@/components/Sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import {
  Package,
  QrCode,
  Barcode,
  Printer,
  Search,
  Download,
  Plus,
  UploadCloud,
  Settings,
  Layers,
  Scan,
  ScanLine
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

export default function BarcodePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("generate");
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);
  const [isBulkDialogOpen, setIsBulkDialogOpen] = useState(false);
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);
  const { toast } = useToast();

  // States for barcode generation
  const [barcodeType, setBarcodeType] = useState("CODE128");
  const [generateFor, setGenerateFor] = useState("single");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [includePrice, setIncludePrice] = useState(true);
  const [includeProductName, setIncludeProductName] = useState(true);

  // States for barcode settings
  const [barcodeSettings, setBarcodeSettings] = useState({
    defaultType: "CODE128",
    labelWidth: 3,
    labelHeight: 1.5,
    fontSize: 12,
    showPrice: true,
    showName: true,
    showSku: true,
    paperSize: "A4"
  });

  // Fetch inventory items
  const { data: inventory = [], isLoading: isInventoryLoading } = useQuery({
    queryKey: ['/api/inventory'],
    refetchInterval: 5000,
  });

  // Mock data for recently generated barcodes
  const recentBarcodes = [
    { id: 1, productName: "Cotton T-Shirt", sku: "TS-001-BLK", type: "CODE128", generatedDate: "2023-10-01", printCount: 5 },
    { id: 2, productName: "Wireless Headphones", sku: "HP-330-BLK", type: "QR", generatedDate: "2023-09-28", printCount: 3 },
    { id: 3, productName: "Leather Wallet", sku: "WAL-220-BRN", type: "CODE39", generatedDate: "2023-09-25", printCount: 8 },
    { id: 4, productName: "Ceramic Coffee Mug", sku: "MUG-101-WHT", type: "EAN-13", generatedDate: "2023-09-20", printCount: 12 },
    { id: 5, productName: "Bluetooth Speaker", sku: "SPK-550-BLK", type: "UPC-A", generatedDate: "2023-09-15", printCount: 4 }
  ];

  const handleGenerateBarcodes = () => {
    // In a real app, this would call the API
    toast({
      title: "Barcodes generated",
      description: generateFor === "single" 
        ? `Barcode generated for the selected product` 
        : `Barcodes generated for ${inventory.length} products`,
    });
    setIsGenerateDialogOpen(false);
  };

  const handleBulkUpload = () => {
    // In a real app, this would handle file upload
    toast({
      title: "File uploaded",
      description: "Your barcode data file has been uploaded and processed",
    });
    setIsBulkDialogOpen(false);
  };

  const handleSaveSettings = () => {
    // In a real app, this would save settings to the API
    toast({
      title: "Settings saved",
      description: "Your barcode settings have been updated",
    });
    setIsSettingsDialogOpen(false);
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
                  <h1 className="text-2xl font-semibold text-gray-900">Barcode Management</h1>
                  <p className="mt-1 text-sm text-gray-500">
                    Generate and manage barcodes for your inventory items
                  </p>
                </div>
                <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
                  <Button 
                    onClick={() => setIsGenerateDialogOpen(true)} 
                    className="flex items-center gap-2"
                  >
                    <Barcode className="h-4 w-4" />
                    Generate Barcodes
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsBulkDialogOpen(true)}
                    className="flex items-center gap-2"
                  >
                    <UploadCloud className="h-4 w-4" />
                    Bulk Upload
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsSettingsDialogOpen(true)}
                    className="flex items-center gap-2"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Button>
                </div>
              </div>

              {/* Hero Section with an intro to barcodes */}
              <Card className="mb-8 bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-100">
                <CardContent className="p-6 md:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <h2 className="text-2xl font-bold text-amber-800 mb-4">
                        Breathe new life into your business with barcode inventory management
                      </h2>
                      <p className="text-amber-700 mb-6">
                        All businesses, whether big or small, require smart management. Introduce barcode-based
                        inventory management to improve your accuracy and efficiency, streamline your fulfillment
                        process, and free up more time.
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 text-amber-700">
                          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Improved Accuracy</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-amber-700">
                          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Faster Processing</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-amber-700">
                          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Error Reduction</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-amber-700">
                          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Time Saving</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="bg-white p-8 rounded-lg shadow-sm">
                        <Barcode className="h-24 w-24 text-amber-600 mx-auto" />
                        <p className="text-center mt-2 text-amber-700 font-medium">Bar Code Scanning</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tabs for different barcode operations */}
              <Tabs defaultValue="generate" onValueChange={setSelectedTab} className="mb-6">
                <TabsList>
                  <TabsTrigger value="generate" className="flex gap-2">
                    <Barcode className="h-4 w-4" />
                    <span>Generate Barcodes</span>
                  </TabsTrigger>
                  <TabsTrigger value="scan" className="flex gap-2">
                    <ScanLine className="h-4 w-4" />
                    <span>Scan & Search</span>
                  </TabsTrigger>
                  <TabsTrigger value="history" className="flex gap-2">
                    <Layers className="h-4 w-4" />
                    <span>Recent Barcodes</span>
                  </TabsTrigger>
                </TabsList>
                
                {/* Generate Barcodes Tab */}
                <TabsContent value="generate" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="md:col-span-2">
                      <CardHeader>
                        <CardTitle>Quick Generate</CardTitle>
                        <CardDescription>
                          Generate barcodes for selected products or items
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div>
                            <Label htmlFor="product">Select Product</Label>
                            <Select>
                              <SelectTrigger id="product">
                                <SelectValue placeholder="Choose a product" />
                              </SelectTrigger>
                              <SelectContent>
                                {!isInventoryLoading && inventory.map((item: any) => (
                                  <SelectItem key={item.id} value={item.id.toString()}>
                                    {item.name} ({item.sku})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label htmlFor="barcodeType">Barcode Type</Label>
                            <Select defaultValue="CODE128">
                              <SelectTrigger id="barcodeType">
                                <SelectValue placeholder="Select barcode type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="CODE128">CODE 128</SelectItem>
                                <SelectItem value="CODE39">CODE 39</SelectItem>
                                <SelectItem value="EAN13">EAN-13</SelectItem>
                                <SelectItem value="UPC">UPC-A</SelectItem>
                                <SelectItem value="QR">QR Code</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                              <Switch id="include-price" defaultChecked />
                              <Label htmlFor="include-price">Include Price</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch id="include-name" defaultChecked />
                              <Label htmlFor="include-name">Include Product Name</Label>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="copies">Number of Copies</Label>
                              <Input 
                                id="copies" 
                                type="number" 
                                min="1" 
                                defaultValue="1"
                              />
                            </div>
                            <div>
                              <Label htmlFor="labelSize">Label Size</Label>
                              <Select defaultValue="standard">
                                <SelectTrigger id="labelSize">
                                  <SelectValue placeholder="Select size" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="small">Small (1.5" x 1")</SelectItem>
                                  <SelectItem value="standard">Standard (3" x 1.5")</SelectItem>
                                  <SelectItem value="large">Large (4" x 2")</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div className="flex gap-3">
                            <Button className="flex items-center gap-2">
                              <Barcode className="h-4 w-4" />
                              Generate
                            </Button>
                            <Button variant="outline" className="flex items-center gap-2">
                              <Printer className="h-4 w-4" />
                              Print Preview
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Barcode Preview</CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col items-center justify-center pt-4 pb-8">
                        <div className="border border-gray-200 p-4 rounded-md w-[200px]">
                          <div className="text-center mb-2 text-sm text-gray-700">Cotton T-Shirt</div>
                          <div className="flex justify-center">
                            <svg className="h-16" viewBox="0 0 200 80">
                              {/* This is a placeholder for an actual barcode SVG */}
                              <rect x="20" y="10" width="4" height="60" fill="black" />
                              <rect x="28" y="10" width="2" height="60" fill="black" />
                              <rect x="34" y="10" width="6" height="60" fill="black" />
                              <rect x="44" y="10" width="4" height="60" fill="black" />
                              <rect x="52" y="10" width="8" height="60" fill="black" />
                              <rect x="64" y="10" width="2" height="60" fill="black" />
                              <rect x="68" y="10" width="6" height="60" fill="black" />
                              <rect x="78" y="10" width="4" height="60" fill="black" />
                              <rect x="84" y="10" width="2" height="60" fill="black" />
                              <rect x="90" y="10" width="8" height="60" fill="black" />
                              <rect x="100" y="10" width="2" height="60" fill="black" />
                              <rect x="104" y="10" width="6" height="60" fill="black" />
                              <rect x="114" y="10" width="4" height="60" fill="black" />
                              <rect x="122" y="10" width="2" height="60" fill="black" />
                              <rect x="128" y="10" width="8" height="60" fill="black" />
                              <rect x="140" y="10" width="2" height="60" fill="black" />
                              <rect x="144" y="10" width="6" height="60" fill="black" />
                              <rect x="154" y="10" width="4" height="60" fill="black" />
                              <rect x="162" y="10" width="2" height="60" fill="black" />
                              <rect x="168" y="10" width="4" height="60" fill="black" />
                              <rect x="176" y="10" width="4" height="60" fill="black" />
                            </svg>
                          </div>
                          <div className="text-center mt-2 text-xs text-gray-600">TS-001-BLK</div>
                          <div className="text-center mt-1 font-bold">$29.99</div>
                        </div>
                        <div className="mt-4 text-sm text-gray-500 text-center">
                          CODE 128 format
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                {/* Scan & Search Tab */}
                <TabsContent value="scan" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Scan Barcodes</CardTitle>
                      <CardDescription>
                        Scan barcodes to quickly find items in your inventory
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                          <Scan className="h-16 w-16 text-gray-400 mb-4" />
                          <h3 className="text-lg font-medium text-gray-900">Ready to Scan</h3>
                          <p className="text-sm text-gray-500 text-center mt-2 max-w-md">
                            Connect a barcode scanner to your device and scan any product barcode to quickly locate it in your inventory.
                          </p>
                          <div className="mt-6">
                            <Input
                              placeholder="Or enter barcode manually here"
                              className="text-center"
                            />
                          </div>
                          <Button className="mt-4">Search</Button>
                        </div>
                        
                        <div className="bg-white rounded-md border p-4 mt-6">
                          <h3 className="text-md font-medium text-gray-900 mb-2">Scan History</h3>
                          <div className="text-sm text-gray-500">
                            Recent scans will appear here
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Recent Barcodes Tab */}
                <TabsContent value="history" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recently Generated Barcodes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Product</TableHead>
                              <TableHead>SKU</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Generated On</TableHead>
                              <TableHead className="text-center">Print Count</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {recentBarcodes.map((barcode) => (
                              <TableRow key={barcode.id}>
                                <TableCell className="font-medium">{barcode.productName}</TableCell>
                                <TableCell>{barcode.sku}</TableCell>
                                <TableCell>{barcode.type}</TableCell>
                                <TableCell>{barcode.generatedDate}</TableCell>
                                <TableCell className="text-center">{barcode.printCount}</TableCell>
                                <TableCell className="text-right space-x-2">
                                  <Button variant="outline" size="sm" className="inline-flex items-center gap-1">
                                    <Printer className="h-3.5 w-3.5" />
                                    Print
                                  </Button>
                                  <Button variant="outline" size="sm" className="inline-flex items-center gap-1">
                                    <Download className="h-3.5 w-3.5" />
                                    Download
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

            </div>
          </div>
        </main>
      </div>

      {/* Generate Barcodes Dialog */}
      <Dialog open={isGenerateDialogOpen} onOpenChange={setIsGenerateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Generate Barcodes</DialogTitle>
            <DialogDescription>
              Create barcodes for your inventory items
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="generateFor">Generate For</Label>
                <Select 
                  value={generateFor}
                  onValueChange={setGenerateFor}
                >
                  <SelectTrigger id="generateFor">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single Product</SelectItem>
                    <SelectItem value="multiple">Multiple Products</SelectItem>
                    <SelectItem value="all">All Products</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {generateFor === "single" && (
                <div>
                  <Label htmlFor="product">Select Product</Label>
                  <Select 
                    value={selectedProduct}
                    onValueChange={setSelectedProduct}
                  >
                    <SelectTrigger id="product">
                      <SelectValue placeholder="Choose a product" />
                    </SelectTrigger>
                    <SelectContent>
                      {!isInventoryLoading && inventory.map((item: any) => (
                        <SelectItem key={item.id} value={item.id.toString()}>
                          {item.name} ({item.sku})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <div>
                <Label htmlFor="barcodeType">Barcode Type</Label>
                <Select 
                  value={barcodeType}
                  onValueChange={setBarcodeType}
                >
                  <SelectTrigger id="barcodeType">
                    <SelectValue placeholder="Select barcode type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CODE128">CODE 128</SelectItem>
                    <SelectItem value="CODE39">CODE 39</SelectItem>
                    <SelectItem value="EAN13">EAN-13</SelectItem>
                    <SelectItem value="UPC">UPC-A</SelectItem>
                    <SelectItem value="QR">QR Code</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="include-price-dialog" 
                  checked={includePrice}
                  onCheckedChange={setIncludePrice}
                />
                <Label htmlFor="include-price-dialog">Include Price</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="include-name-dialog" 
                  checked={includeProductName}
                  onCheckedChange={setIncludeProductName}
                />
                <Label htmlFor="include-name-dialog">Include Product Name</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsGenerateDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleGenerateBarcodes} 
              disabled={generateFor === "single" && !selectedProduct}
            >
              Generate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Upload Dialog */}
      <Dialog open={isBulkDialogOpen} onOpenChange={setIsBulkDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Bulk Upload Barcodes</DialogTitle>
            <DialogDescription>
              Upload a file with barcode data for multiple products
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
              <UploadCloud className="h-10 w-10 text-gray-400 mb-4" />
              <p className="text-sm text-gray-500 text-center">
                Drag and drop your CSV or Excel file here, or click to browse
              </p>
              <Button variant="outline" className="mt-4">
                Browse Files
              </Button>
              <p className="text-xs text-gray-400 mt-2">
                Supported formats: .csv, .xlsx (max 10MB)
              </p>
            </div>
            
            <div className="mt-4">
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Download Sample Template
              </a>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBulkDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleBulkUpload}>
              Upload and Process
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Barcode Settings Dialog */}
      <Dialog open={isSettingsDialogOpen} onOpenChange={setIsSettingsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Barcode Settings</DialogTitle>
            <DialogDescription>
              Configure default settings for barcode generation
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="defaultType">Default Barcode Type</Label>
                <Select 
                  value={barcodeSettings.defaultType}
                  onValueChange={(value) => setBarcodeSettings({...barcodeSettings, defaultType: value})}
                >
                  <SelectTrigger id="defaultType">
                    <SelectValue placeholder="Select default type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CODE128">CODE 128</SelectItem>
                    <SelectItem value="CODE39">CODE 39</SelectItem>
                    <SelectItem value="EAN13">EAN-13</SelectItem>
                    <SelectItem value="UPC">UPC-A</SelectItem>
                    <SelectItem value="QR">QR Code</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="labelWidth">Label Width (inches)</Label>
                  <Input
                    id="labelWidth"
                    type="number"
                    step="0.1"
                    value={barcodeSettings.labelWidth}
                    onChange={(e) => setBarcodeSettings({...barcodeSettings, labelWidth: parseFloat(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="labelHeight">Label Height (inches)</Label>
                  <Input
                    id="labelHeight"
                    type="number"
                    step="0.1"
                    value={barcodeSettings.labelHeight}
                    onChange={(e) => setBarcodeSettings({...barcodeSettings, labelHeight: parseFloat(e.target.value)})}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="fontSize">Font Size (pt)</Label>
                <Input
                  id="fontSize"
                  type="number"
                  value={barcodeSettings.fontSize}
                  onChange={(e) => setBarcodeSettings({...barcodeSettings, fontSize: parseInt(e.target.value)})}
                />
              </div>
              
              <div>
                <Label htmlFor="paperSize">Paper Size</Label>
                <Select 
                  value={barcodeSettings.paperSize}
                  onValueChange={(value) => setBarcodeSettings({...barcodeSettings, paperSize: value})}
                >
                  <SelectTrigger id="paperSize">
                    <SelectValue placeholder="Select paper size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A4">A4</SelectItem>
                    <SelectItem value="Letter">Letter</SelectItem>
                    <SelectItem value="Legal">Legal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="show-price" 
                    checked={barcodeSettings.showPrice}
                    onCheckedChange={(checked) => setBarcodeSettings({...barcodeSettings, showPrice: checked})}
                  />
                  <Label htmlFor="show-price">Show Price by Default</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="show-name" 
                    checked={barcodeSettings.showName}
                    onCheckedChange={(checked) => setBarcodeSettings({...barcodeSettings, showName: checked})}
                  />
                  <Label htmlFor="show-name">Show Product Name by Default</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="show-sku" 
                    checked={barcodeSettings.showSku}
                    onCheckedChange={(checked) => setBarcodeSettings({...barcodeSettings, showSku: checked})}
                  />
                  <Label htmlFor="show-sku">Show SKU by Default</Label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSettingsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveSettings}>
              Save Settings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}