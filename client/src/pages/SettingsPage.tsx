import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import StatusBadge from "@/components/ui/status-badge";

export default function SettingsPage() {
  const [deleteAccountId, setDeleteAccountId] = useState<number | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Fetch accounts
  const { 
    data: accounts, 
    isLoading 
  } = useQuery({
    queryKey: ['/api/accounts'],
  });
  
  // Delete account mutation
  const deleteAccountMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest('DELETE', `/api/accounts/${id}`, null);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/accounts'] });
      queryClient.invalidateQueries({ queryKey: ['/api/metrics'] });
      toast({
        title: "Account deleted",
        description: "The account has been successfully disconnected",
      });
      setDeleteAccountId(null);
    },
    onError: (error) => {
      toast({
        title: "Failed to delete account",
        description: error.message || "An error occurred while disconnecting the account",
        variant: "destructive",
      });
    },
  });
  
  // Handle delete confirmation
  const handleDelete = () => {
    if (deleteAccountId !== null) {
      deleteAccountMutation.mutate(deleteAccountId);
    }
  };
  
  return (
    <div className="flex h-screen overflow-hidden bg-[#F7FAFC]">
      <Sidebar />
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
              
              <div className="mt-6">
                <Tabs defaultValue="accounts">
                  <TabsList className="mb-4">
                    <TabsTrigger value="accounts">Accounts</TabsTrigger>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="accounts">
                    <Card>
                      <CardHeader>
                        <CardTitle>Connected Accounts</CardTitle>
                        <CardDescription>
                          Manage your connected e-commerce platform accounts
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {isLoading ? (
                          <div className="text-center py-4">Loading accounts...</div>
                        ) : accounts && accounts.length > 0 ? (
                          <div className="space-y-4">
                            {accounts.map((account) => (
                              <div key={account.id} className="p-4 border rounded-lg flex justify-between items-center">
                                <div>
                                  <div className="font-medium">{account.name}</div>
                                  <div className="text-sm text-gray-500 flex items-center gap-2">
                                    <span>{account.platform}</span>
                                    <span>•</span>
                                    <StatusBadge status={account.isActive ? "Synced" : "Syncing..."} />
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setDeleteAccountId(account.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-red-500 mr-1" />
                                  Disconnect
                                </Button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            No accounts connected
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="profile">
                    <Card>
                      <CardHeader>
                        <CardTitle>Profile Settings</CardTitle>
                        <CardDescription>
                          Update your profile information
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-8 text-gray-500">
                          Profile settings will be available in a future update
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="preferences">
                    <Card>
                      <CardHeader>
                        <CardTitle>Preferences</CardTitle>
                        <CardDescription>
                          Customize your inventory management experience
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-8 text-gray-500">
                          Preference settings will be available in a future update
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      {/* Delete Account Confirmation Dialog */}
      <AlertDialog open={deleteAccountId !== null} onOpenChange={(open) => !open && setDeleteAccountId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Disconnect Account?</AlertDialogTitle>
            <AlertDialogDescription>
              This will disconnect the account and remove all associated inventory items.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              {deleteAccountMutation.isPending ? "Disconnecting..." : "Disconnect"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
