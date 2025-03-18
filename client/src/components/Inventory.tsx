import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Package,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  AlertCircle
} from "lucide-react";
import StatusBadge from "@/components/ui/status-badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";

export function Inventory() {
  const [platformFilter, setPlatformFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Fetch inventory items
  const { 
    data: inventoryItems, 
    isLoading: inventoryLoading 
  } = useQuery({
    queryKey: ['/api/inventory'],
  });
  
  // Fetch accounts for platform filter
  const { 
    data: accounts
  } = useQuery({
    queryKey: ['/api/accounts'],
  });
  
  // Fetch status options
  const { 
    data: statusesData
  } = useQuery({
    queryKey: ['/api/statuses'],
  });
  
  const statuses = statusesData?.statuses || ["In Stock", "Low Stock", "Out of Stock"];
  
  // Delete mutation
  const deleteItemMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest('DELETE', `/api/inventory/${id}`, null);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/inventory'] });
      queryClient.invalidateQueries({ queryKey: ['/api/metrics'] });
      toast({
        title: "Item deleted",
        description: "The inventory item has been successfully deleted",
      });
      setDeleteItemId(null);
    },
    onError: (error) => {
      toast({
        title: "Failed to delete item",
        description: error.message || "An error occurred while deleting the item",
        variant: "destructive",
      });
    },
  });
  
  // Handle delete confirmation
  const handleDelete = () => {
    if (deleteItemId !== null) {
      deleteItemMutation.mutate(deleteItemId);
    }
  };
  
  // Filter inventory items
  const filteredItems = inventoryItems ? inventoryItems.filter(item => {
    // Filter by platform
    if (platformFilter !== "All" && item.platform !== platformFilter) {
      return false;
    }
    
    // Filter by status
    if (statusFilter !== "All" && item.status !== statusFilter) {
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
  
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // Generate page numbers for pagination
  const pageNumbers = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    if (currentPage <= 3) {
      pageNumbers.push(1, 2, 3, 4, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pageNumbers.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
  }
  
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Inventory</h1>
          <Button as={Link} href="/inventory/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
        
        {/* Filters */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-1 max-w-md rounded-md shadow-sm">
            <div className="relative flex-grow focus-within:z-10">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                className="pl-10"
                placeholder="Search inventory"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to first page when searching
                }}
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Select
              value={platformFilter}
              onValueChange={(value) => {
                setPlatformFilter(value);
                setCurrentPage(1); // Reset to first page when filtering
              }}
            >
              <SelectTrigger className="w-[180px]">
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
            
            <Select
              value={statusFilter}
              onValueChange={(value) => {
                setStatusFilter(value);
                setCurrentPage(1); // Reset to first page when filtering
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                {statuses.map(status => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Inventory Table */}
        <div className="mt-6">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="w-1/3">Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Available</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-20">Actions</TableHead>
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
                      <TableCell><Skeleton className="h-8 w-16" /></TableCell>
                    </TableRow>
                  ))
                ) : currentItems.length > 0 ? (
                  // Inventory items
                  currentItems.map((item) => (
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
                        <div className="text-sm text-gray-900">{item.quantity}</div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={item.status} />
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            asChild
                          >
                            <Link href={`/inventory/${item.id}`}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeleteItemId(item.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  // Empty state
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex flex-col items-center">
                        <AlertCircle className="h-12 w-12 text-gray-300 mb-3" />
                        <h3 className="text-lg font-medium text-gray-900 mb-1">No inventory items found</h3>
                        <p className="text-gray-500 max-w-sm mb-4">
                          {inventoryItems && inventoryItems.length > 0 
                            ? 'Try adjusting your filters to find what you\'re looking for'
                            : 'Add your first inventory item to get started'}
                        </p>
                        {inventoryItems && inventoryItems.length > 0 ? (
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              onClick={() => {
                                setPlatformFilter("All");
                                setStatusFilter("All");
                                setSearchQuery("");
                              }}
                            >
                              Clear Filters
                            </Button>
                            <Button as={Link} href="/inventory/new">
                              <Plus className="h-4 w-4 mr-2" />
                              Add Item
                            </Button>
                          </div>
                        ) : (
                          <Button as={Link} href="/inventory/new">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Item
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          {!inventoryLoading && filteredItems.length > 0 && (
            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => paginate(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                  
                  {pageNumbers.map((number, i) => (
                    <PaginationItem key={i}>
                      {number === '...' ? (
                        <span className="px-4 py-2">...</span>
                      ) : (
                        <PaginationLink
                          onClick={() => paginate(number as number)}
                          isActive={currentPage === number}
                        >
                          {number}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteItemId !== null} onOpenChange={(open) => !open && setDeleteItemId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              inventory item from all connected platforms.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              {deleteItemMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default Inventory;
