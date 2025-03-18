import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  ShoppingCart, 
  Package, 
  Truck, 
  BarChart, 
  Repeat, 
  Warehouse, 
  Store, 
  ShoppingBag, 
  FileText, 
  Layers,
  Check,
  ArrowLeft
} from "lucide-react";

export default function FeatureListPage() {
  // Define feature categories and their items
  const featureCategories = [
    {
      title: "Purchasing",
      icon: <ShoppingCart className="h-6 w-6 text-red-500" />,
      color: "bg-red-100",
      features: [
        "Purchase orders", 
        "Purchase receives", 
        "Vendor payments", 
        "Purchase planning", 
        "Supplier management", 
        "Cost tracking"
      ]
    },
    {
      title: "Warehousing",
      icon: <Warehouse className="h-6 w-6 text-orange-500" />,
      color: "bg-orange-100",
      features: [
        "Multi-warehouse management", 
        "Transfer orders", 
        "Picklists", 
        "Bin Locations", 
        "Wave picking", 
        "Packing stations"
      ]
    },
    {
      title: "Order fulfillment",
      icon: <Truck className="h-6 w-6 text-pink-500" />,
      color: "bg-pink-100",
      features: [
        "Backorders and Dropshipments", 
        "Packaging and shipping", 
        "Post-shipment tracking", 
        "Package geometry", 
        "Carrier integration", 
        "Delivery notifications"
      ]
    },
    {
      title: "Inventory",
      icon: <Package className="h-6 w-6 text-blue-500" />,
      color: "bg-blue-100",
      features: [
        "Item grouping and bundling", 
        "Serial and batch tracking", 
        "Price Lists", 
        "Inventory Adjustments", 
        "Barcode generation and scanning", 
        "Low stock alerts"
      ]
    },
    {
      title: "Order management",
      icon: <ShoppingBag className="h-6 w-6 text-purple-500" />,
      color: "bg-purple-100",
      features: [
        "Sales order management", 
        "Multichannel selling", 
        "Invoicing", 
        "Sales returns", 
        "Customer management", 
        "Promotions and discounts"
      ]
    },
    {
      title: "Automation and analytics",
      icon: <BarChart className="h-6 w-6 text-green-500" />,
      color: "bg-green-100",
      features: [
        "Email and field update", 
        "Webhooks and custom functions", 
        "Reporting", 
        "Advanced analytics", 
        "Data export", 
        "Custom dashboards"
      ]
    }
  ];

  // Additional categories for industry solutions
  const industrySolutions = [
    {
      title: "Retail",
      icon: <Store className="h-6 w-6 text-red-600" />,
      color: "bg-red-100",
      description: "Point-of-sale integration, merchandise planning, staff management"
    },
    {
      title: "Ecommerce",
      icon: <ShoppingBag className="h-6 w-6 text-blue-600" />,
      color: "bg-blue-100",
      description: "Marketplace integrations, listing management, returns processing"
    },
    {
      title: "Manufacturing",
      icon: <Layers className="h-6 w-6 text-purple-600" />,
      color: "bg-purple-100",
      description: "Bill of materials, work orders, production scheduling"
    },
    {
      title: "Wholesale",
      icon: <FileText className="h-6 w-6 text-green-600" />,
      color: "bg-green-100",
      description: "Bulk ordering, volume pricing, purchase agreements"
    }
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#F7FAFC]">
      <Sidebar />
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="mb-6">
                <Button variant="outline" className="flex items-center gap-2" asChild>
                  <Link href="/">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                  </Link>
                </Button>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">Complete Feature List</h1>
                  <p className="mt-1 text-sm text-gray-500">
                    Comprehensive inventory management features to power your business
                  </p>
                </div>
                <Button className="mt-4 md:mt-0" asChild>
                  <Link href="/pricing">View Pricing Plans</Link>
                </Button>
              </div>

              {/* Feature Categories Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {featureCategories.map((category, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-6">
                        <div className={`mr-4 ${category.color} p-3 rounded-lg`}>
                          {category.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                      </div>
                      <ul className="space-y-3">
                        {category.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Industry Solutions Section */}
              <div className="mb-12">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Industry-Specific Solutions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {industrySolutions.map((solution, index) => (
                    <div key={index} className="flex p-4 rounded-lg border border-gray-200">
                      <div className={`${solution.color} p-3 rounded-lg mr-4`}>
                        {solution.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{solution.title}</h3>
                        <p className="text-gray-600 mt-1">{solution.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <div className="bg-[#2D3748] text-white rounded-lg p-8 mb-12">
                <div className="md:flex md:items-center md:justify-between">
                  <div className="md:w-2/3">
                    <h2 className="text-2xl font-bold">Ready to streamline your inventory management?</h2>
                    <p className="mt-2 text-gray-300">
                      Join thousands of businesses that use our platform to manage inventory across multiple channels.
                    </p>
                  </div>
                  <div className="mt-6 md:mt-0">
                    <Button className="bg-white text-[#2D3748] hover:bg-gray-100" size="lg" asChild>
                      <Link href="/dashboard">
                        Try it now
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="mb-12">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">How does multi-platform integration work?</h3>
                    <p className="text-gray-600 mt-2">
                      Our platform connects directly to your e-commerce platforms through secure APIs. We automatically sync inventory levels, orders, and product information in real-time.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Can I manage multiple warehouses?</h3>
                    <p className="text-gray-600 mt-2">
                      Yes, our multi-warehouse feature allows you to track inventory across different physical locations, transfer stock between warehouses, and fulfill orders from the optimal location.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Is barcode scanning supported?</h3>
                    <p className="text-gray-600 mt-2">
                      Yes, our system supports barcode generation and scanning for efficient inventory management. You can use mobile devices or dedicated scanners to update inventory in real-time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}