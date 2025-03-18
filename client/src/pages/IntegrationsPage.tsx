import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  ArrowLeft,
  ExternalLink,
  Search,
  Check
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

// Integration category and items definition
const integrationCategories = [
  {
    title: "Marketplaces",
    integrations: [
      {
        name: "Amazon",
        logo: "https://cdn.worldvectorlogo.com/logos/amazon-icon-1.svg",
        description: "Sync Amazon orders and update stock levels."
      },
      {
        name: "eBay",
        logo: "https://cdn.worldvectorlogo.com/logos/ebay-1.svg",
        description: "Selling and fulfilling orders on eBay made easy."
      },
      {
        name: "Etsy",
        logo: "https://cdn.worldvectorlogo.com/logos/etsy-1.svg",
        description: "Streamline inventory levels and sync orders."
      },
      {
        name: "Walmart",
        logo: "https://cdn.worldvectorlogo.com/logos/walmart-icon.svg",
        description: "Connect to Walmart Marketplace for expanded reach."
      },
      {
        name: "Shopify",
        logo: "https://cdn.worldvectorlogo.com/logos/shopify.svg",
        description: "Integrate with your Shopify store for seamless inventory."
      },
      {
        name: "WooCommerce",
        logo: "https://cdn.worldvectorlogo.com/logos/woocommerce.svg",
        description: "Connect your WordPress store with WooCommerce."
      }
    ]
  },
  {
    title: "Shipping",
    integrations: [
      {
        name: "USPS",
        logo: "https://cdn.worldvectorlogo.com/logos/united-states-postal-service-3.svg",
        description: "Print shipping labels and track USPS shipments."
      },
      {
        name: "FedEx",
        logo: "https://cdn.worldvectorlogo.com/logos/fedex-express-6.svg",
        description: "Integrate with FedEx for shipping and tracking."
      },
      {
        name: "UPS",
        logo: "https://cdn.worldvectorlogo.com/logos/ups-1.svg",
        description: "Connect UPS for discounted rates and easy shipping."
      },
      {
        name: "ShipStation",
        logo: "https://cdn.worldvectorlogo.com/logos/shipstation.svg", 
        description: "Centralize all your shipping through ShipStation."
      }
    ]
  },
  {
    title: "Accounting",
    integrations: [
      {
        name: "QuickBooks",
        logo: "https://cdn.worldvectorlogo.com/logos/quickbooks-2.svg",
        description: "Sync inventory data with QuickBooks for accounting."
      },
      {
        name: "Xero",
        logo: "https://cdn.worldvectorlogo.com/logos/xero-1.svg",
        description: "Connect your Xero accounting software."
      },
      {
        name: "Sage",
        logo: "https://cdn.worldvectorlogo.com/logos/sage-3.svg",
        description: "Integrate with Sage for financial management."
      }
    ]
  },
  {
    title: "Analytics",
    integrations: [
      {
        name: "Google Analytics",
        logo: "https://cdn.worldvectorlogo.com/logos/google-analytics-4.svg",
        description: "Track inventory performance with Google Analytics."
      },
      {
        name: "Power BI",
        logo: "https://cdn.worldvectorlogo.com/logos/power-bi.svg",
        description: "Create custom dashboards with Power BI."
      },
      {
        name: "Tableau",
        logo: "https://cdn.worldvectorlogo.com/logos/tableau-logo.svg",
        description: "Visualize your inventory data with Tableau."
      }
    ]
  }
];

export default function IntegrationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter integrations based on search query
  const filteredCategories = integrationCategories.map(category => {
    const filteredIntegrations = category.integrations.filter(integration => 
      integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    return {
      ...category,
      integrations: filteredIntegrations
    };
  }).filter(category => category.integrations.length > 0);

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
                  <h1 className="text-2xl font-semibold text-gray-900">Integrations</h1>
                  <p className="mt-1 text-sm text-gray-500">
                    Connect your inventory with 25+ platforms and services
                  </p>
                </div>
                
                <div className="mt-4 md:mt-0 w-full md:w-64">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      type="text"
                      placeholder="Search integrations"
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Marketplace Feature Banner */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg px-6 py-8 mb-10 text-white">
                <div className="md:flex md:items-center md:justify-between">
                  <div className="md:w-2/3">
                    <h2 className="text-2xl font-bold">Multichannel Sync</h2>
                    <p className="mt-2 text-white text-opacity-90">
                      Automatically keep stock levels and orders in sync across all platforms in real-time.
                      No more overselling or manual updates.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-4">
                      <div className="flex items-center">
                        <Check className="h-5 w-5 mr-2 text-green-300" />
                        <span>Real-time sync</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-5 w-5 mr-2 text-green-300" />
                        <span>Automatic order routing</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-5 w-5 mr-2 text-green-300" />
                        <span>Multi-warehouse support</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 md:mt-0">
                    <Button className="bg-white text-blue-600 hover:bg-gray-100" size="lg" asChild>
                      <Link href="/dashboard">
                        Connect Now
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Integration Categories */}
              {filteredCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-12">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">{category.title}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.integrations.map((integration, integrationIndex) => (
                      <Card key={integrationIndex} className="overflow-hidden hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mr-4">
                              <img src={integration.logo} alt={integration.name} className="h-12 w-12" />
                            </div>
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">{integration.name}</h3>
                              <p className="mt-1 text-sm text-gray-600">{integration.description}</p>
                              <div className="mt-4">
                                <Button variant="outline" size="sm" className="text-blue-600" asChild>
                                  <Link href="/dashboard">
                                    Connect
                                    <ExternalLink className="ml-2 h-3 w-3" />
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}

              {/* No Results State */}
              {filteredCategories.length === 0 && (
                <div className="text-center py-12">
                  <div className="mx-auto h-12 w-12 text-gray-400">
                    <Search className="h-12 w-12" />
                  </div>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No integrations found</h3>
                  <p className="mt-1 text-gray-500">Try adjusting your search term or browse all integrations.</p>
                  <div className="mt-6">
                    <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
                  </div>
                </div>
              )}

              {/* Request Integration Section */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <div className="md:flex md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Don't see what you're looking for?</h3>
                    <p className="mt-1 text-gray-600">Request a new integration and we'll add it to our roadmap.</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <Button variant="outline" asChild>
                      <Link href="/contact">Request Integration</Link>
                    </Button>
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