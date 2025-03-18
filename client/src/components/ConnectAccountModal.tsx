import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Zap,
  ShoppingBag,
  Store
} from "lucide-react";
import { 
  SiAmazon,
  SiEtsy,
  SiShopify,
  SiEbay,
  SiWoocommerce
} from "react-icons/si";

const formSchema = z.object({
  name: z.string().min(1, "Store name is required"),
  platform: z.string().min(1, "Platform is required"),
  apiKey: z.string().min(1, "API token is required"),
});

type ConnectAccountModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ConnectAccountModal({ open, onOpenChange }: ConnectAccountModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Get platforms for dropdown
  const { data: platformsData } = useQuery({
    queryKey: ['/api/platforms'],
    enabled: open,
  });
  
  const platforms = platformsData?.platforms || ["Shopify", "Amazon", "Etsy", "WooCommerce", "eBay"];
  
  // Form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      platform: "",
      apiKey: "",
    },
  });
  
  // Connect account mutation
  const connectAccountMutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      return apiRequest('POST', '/api/accounts', values);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['/api/accounts'] });
      queryClient.invalidateQueries({ queryKey: ['/api/metrics'] });
      
      toast({
        title: "Account connected",
        description: "Your account has been successfully connected",
      });
      
      form.reset();
      onOpenChange(false);
    },
    onError: (error) => {
      toast({
        title: "Failed to connect account",
        description: error.message || "An error occurred while connecting your account",
        variant: "destructive",
      });
    },
  });
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    connectAccountMutation.mutate(values);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <DialogTitle className="text-lg">Connect New Account</DialogTitle>
              <DialogDescription className="mt-2">
                Connect a new e-commerce platform to sync your inventory.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <Tabs defaultValue="direct" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="direct" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Quick Connect
            </TabsTrigger>
            <TabsTrigger value="manual" className="flex items-center gap-2">
              <Store className="h-4 w-4" />
              Manual Setup
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="direct" className="space-y-4">
            <div className="text-sm text-gray-600 mb-2">
              Choose a platform to connect directly:
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-2">
              <Button 
                variant="outline" 
                className="flex-col h-24 w-full gap-2 hover:bg-blue-50 hover:border-blue-200"
                onClick={() => {
                  form.setValue("platform", "Amazon");
                  form.setValue("name", "My Amazon Store");
                }}
              >
                <SiAmazon className="h-8 w-8 text-[#FF9900]" />
                <span>Amazon</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex-col h-24 w-full gap-2 hover:bg-blue-50 hover:border-blue-200"
                onClick={() => {
                  form.setValue("platform", "Shopify");
                  form.setValue("name", "My Shopify Store");
                }}
              >
                <SiShopify className="h-8 w-8 text-[#7AB55C]" />
                <span>Shopify</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex-col h-24 w-full gap-2 hover:bg-blue-50 hover:border-blue-200"
                onClick={() => {
                  form.setValue("platform", "Etsy");
                  form.setValue("name", "My Etsy Shop");
                }}
              >
                <SiEtsy className="h-8 w-8 text-[#F16521]" />
                <span>Etsy</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex-col h-24 w-full gap-2 hover:bg-blue-50 hover:border-blue-200"
                onClick={() => {
                  form.setValue("platform", "eBay");
                  form.setValue("name", "My eBay Store");
                }}
              >
                <SiEbay className="h-8 w-8 text-[#E53238]" />
                <span>eBay</span>
              </Button>
            </div>
            
            <div className="pt-4">
              <FormField
                control={form.control}
                name="apiKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>API Credentials</FormLabel>
                    <FormControl>
                      <div className="relative flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          Token
                        </span>
                        <Input
                          type="password"
                          className="rounded-l-none"
                          placeholder="Enter your API token"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <p className="text-xs text-gray-500 mt-1">
                      Your API credentials are encrypted and securely stored.
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <DialogFooter className="mt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                disabled={connectAccountMutation.isPending}
              >
                Cancel
              </Button>
              <Button 
                onClick={form.handleSubmit(onSubmit)}
                disabled={connectAccountMutation.isPending || !form.watch("platform") || !form.watch("apiKey")}
              >
                {connectAccountMutation.isPending ? "Connecting..." : "Connect"}
              </Button>
            </DialogFooter>
          </TabsContent>
          
          <TabsContent value="manual">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="platform"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Platform</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select platform" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {platforms.map((platform) => (
                            <SelectItem key={platform} value={platform}>
                              {platform}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Store Name</FormLabel>
                      <FormControl>
                        <Input placeholder="My Store" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="apiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Credentials</FormLabel>
                      <FormControl>
                        <div className="relative flex rounded-md shadow-sm">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            Token
                          </span>
                          <Input
                            type="password"
                            className="rounded-l-none"
                            placeholder="Enter your API token"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <p className="text-xs text-gray-500 mt-1">
                        Your API credentials are encrypted and securely stored.
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter className="mt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => onOpenChange(false)}
                    disabled={connectAccountMutation.isPending}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    disabled={connectAccountMutation.isPending}
                  >
                    {connectAccountMutation.isPending ? "Connecting..." : "Connect"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default ConnectAccountModal;
