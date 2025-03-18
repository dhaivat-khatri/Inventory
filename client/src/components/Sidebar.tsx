import { cn } from "@/lib/utils";
import { Link, useLocation } from "wouter";
import { 
  Home,
  BoxesIcon,
  ShoppingBag,
  BarChart3Icon,
  Settings,
  Menu,
  PackageIcon,
  WarehouseIcon,
  TruckIcon,
  GlobeIcon,
  QrCodeIcon,
  TagIcon,
  Layers,
  ScanLine,
  Map,
  Lightbulb
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type SidebarProps = {
  className?: string;
};

export function Sidebar({ className }: SidebarProps) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const routes = [
    {
      label: "Home",
      icon: <Home className="w-6 h-6 mr-3" />,
      href: "/",
      active: location === "/"
    },
    {
      label: "Dashboard",
      icon: <Home className="w-6 h-6 mr-3" />,
      href: "/dashboard",
      active: location === "/dashboard"
    },
    {
      label: "Inventory",
      icon: <BoxesIcon className="w-6 h-6 mr-3" />,
      href: "/inventory",
      active: location === "/inventory"
    },
    {
      label: "Products",
      icon: <PackageIcon className="w-6 h-6 mr-3" />,
      href: "/products",
      active: location === "/products"
    },
    {
      label: "Warehouses",
      icon: <WarehouseIcon className="w-6 h-6 mr-3" />,
      href: "/warehouses",
      active: location === "/warehouses"
    },
    {
      label: "Orders",
      icon: <ShoppingBag className="w-6 h-6 mr-3" />,
      href: "/orders",
      active: location === "/orders"
    },
    {
      label: "Fulfillment",
      icon: <TruckIcon className="w-6 h-6 mr-3" />,
      href: "/fulfillment",
      active: location === "/fulfillment"
    },
    {
      label: "Analytics",
      icon: <BarChart3Icon className="w-6 h-6 mr-3" />,
      href: "/analytics",
      active: location === "/analytics"
    },
    {
      label: "Item Grouping",
      icon: <Layers className="w-6 h-6 mr-3" />,
      href: "/item-grouping",
      active: location === "/item-grouping"
    },
    {
      label: "Serial & Batch",
      icon: <ScanLine className="w-6 h-6 mr-3" />,
      href: "/serial-tracking",
      active: location === "/serial-tracking"
    },
    {
      label: "Price Lists",
      icon: <TagIcon className="w-6 h-6 mr-3" />,
      href: "/price-lists",
      active: location === "/price-lists"
    },
    {
      label: "Barcodes",
      icon: <QrCodeIcon className="w-6 h-6 mr-3" />,
      href: "/barcodes",
      active: location === "/barcodes"
    },
    {
      label: "Integrations",
      icon: <GlobeIcon className="w-6 h-6 mr-3" />,
      href: "/integrations",
      active: location === "/integrations"
    },
    {
      label: "Settings",
      icon: <Settings className="w-6 h-6 mr-3" />,
      href: "/settings",
      active: location === "/settings"
    },
    {
      label: "Roadmap",
      icon: <Map className="w-6 h-6 mr-3" />,
      href: "/roadmap",
      active: location === "/roadmap"
    }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-0 left-0 z-40 px-4 py-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMobileMenu}
          className="text-gray-500"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>
      
      {/* Sidebar container */}
      <div 
        className={cn(
          "fixed md:sticky left-0 top-0 z-30 h-screen w-64 bg-[#2D3748] text-white transition-transform md:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        {/* Logo/Brand */}
        <div className="flex items-center h-16 px-4 border-b border-gray-700">
          <span className="text-xl font-semibold text-white">InventoryHub</span>
        </div>
        
        {/* Navigation Links */}
        <div className="flex flex-col flex-grow overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors",
                  route.active 
                    ? "bg-gray-700 text-white" 
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                )}
              >
                {route.icon}
                {route.label}
              </Link>
            ))}
          </nav>
          
          {/* User Profile Section */}
          <div className="p-4 mt-auto border-t border-gray-700">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-[#4299E1] rounded-full flex items-center justify-center text-white font-semibold">
                  JS
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">John Smith</p>
                <p className="text-xs font-medium text-gray-300">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}

export default Sidebar;
