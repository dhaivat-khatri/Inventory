import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ShoppingCart, 
  Package, 
  Truck, 
  BarChart, 
  Repeat, 
  Warehouse, 
  Store, 
  ShoppingBag, 
  Factory, 
  Globe,
  ChevronRight
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-[#2D3748] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="md:w-2/3">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Multi-platform inventory management
            </h1>
            <p className="mt-6 text-xl">
              Centralize your inventory across all platforms. Track, manage, and optimize your stock from one intuitive dashboard.
            </p>
            <div className="mt-10 flex gap-4">
              <Button className="py-6 px-8 text-lg" asChild>
                <Link href="/login">Get Started</Link>
              </Button>
              <Button variant="outline" className="py-6 px-8 text-lg bg-transparent border-white text-white hover:bg-white hover:text-[#2D3748]" asChild>
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-full md:w-1/2 h-full">
          <div className="h-full bg-[url('/inventory-hero.svg')] bg-no-repeat bg-right-bottom opacity-10"></div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-16 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Comprehensive Features
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Everything you need to manage inventory across multiple platforms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Purchasing */}
            <Card className="overflow-hidden border-t-4 border-t-red-400">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="mr-4 bg-red-100 p-3 rounded-lg">
                    <ShoppingCart className="h-6 w-6 text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Purchasing</h3>
                </div>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="ml-2">Purchase orders</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="ml-2">Purchase receives</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="ml-2">Vendor payments</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Warehousing */}
            <Card className="overflow-hidden border-t-4 border-t-orange-400">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="mr-4 bg-orange-100 p-3 rounded-lg">
                    <Warehouse className="h-6 w-6 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Warehousing</h3>
                </div>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="ml-2">Multi-warehouse management</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="ml-2">Transfer orders</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="ml-2">Bin Locations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Order fulfillment */}
            <Card className="overflow-hidden border-t-4 border-t-pink-400">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="mr-4 bg-pink-100 p-3 rounded-lg">
                    <Truck className="h-6 w-6 text-pink-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Order fulfillment</h3>
                </div>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="ml-2">Backorders and Dropshipments</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="ml-2">Packaging and shipping</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="ml-2">Post-shipment tracking</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Inventory */}
            <Card className="overflow-hidden border-t-4 border-t-blue-400">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="mr-4 bg-blue-100 p-3 rounded-lg">
                    <Package className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Inventory</h3>
                </div>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="ml-2">Item grouping and bundling</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="ml-2">Serial and batch tracking</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="ml-2">Barcode generation and scanning</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Order management */}
            <Card className="overflow-hidden border-t-4 border-t-purple-400">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="mr-4 bg-purple-100 p-3 rounded-lg">
                    <ShoppingBag className="h-6 w-6 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Order management</h3>
                </div>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="ml-2">Sales order management</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="ml-2">Multichannel selling</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="ml-2">Invoicing and sales returns</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Automation and analytics */}
            <Card className="overflow-hidden border-t-4 border-t-green-400">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="mr-4 bg-green-100 p-3 rounded-lg">
                    <BarChart className="h-6 w-6 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Automation and analytics</h3>
                </div>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="ml-2">Email and field update</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="ml-2">Webhooks and custom functions</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="ml-2">Advanced reporting</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <Button className="py-6 px-8 text-lg" asChild>
              <Link href="/features">
                View all features
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Industry Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Solutions for Every Industry
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Tailored features that adapt to your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Industries</h3>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-100">
                      <Store className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Retail</h4>
                    <p className="mt-1 text-gray-500">Boost retail sales, reduce costs</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100">
                      <Globe className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Ecommerce</h4>
                    <p className="mt-1 text-gray-500">Sell across channels, sell smart</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-100">
                      <Factory className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Manufacturing</h4>
                    <p className="mt-1 text-gray-500">Multiple stages, made easy</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100">
                      <Truck className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Dropshipping</h4>
                    <p className="mt-1 text-gray-500">Sit back, gain visibility</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Use Cases</h3>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-100">
                      <Package className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Inventory control</h4>
                    <p className="mt-1 text-gray-500">Manage and track items, end-to-end</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-100">
                      <Warehouse className="h-6 w-6 text-indigo-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Warehouse management</h4>
                    <p className="mt-1 text-gray-500">Control stock across locations</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-pink-100">
                      <Repeat className="h-6 w-6 text-pink-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Multi-channel selling</h4>
                    <p className="mt-1 text-gray-500">Sync stock and streamline sales</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-yellow-100">
                      <ShoppingBag className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Order fulfillment</h4>
                    <p className="mt-1 text-gray-500">Pick, pack, and ship centrally</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Integrations Section */}
      <div className="py-16 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Powerful Integrations
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Connect with your favorite marketplaces and tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-6 flex">
              <div className="flex-shrink-0 mr-4">
                <img src="https://cdn.worldvectorlogo.com/logos/amazon-icon-1.svg" alt="Amazon" className="h-14 w-14" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Amazon</h3>
                <p className="mt-2 text-gray-600">Sync Amazon orders and update stock levels.</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 flex">
              <div className="flex-shrink-0 mr-4">
                <img src="https://cdn.worldvectorlogo.com/logos/ebay-1.svg" alt="eBay" className="h-14 w-14" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">eBay</h3>
                <p className="mt-2 text-gray-600">Selling and fulfilling orders on eBay made easy.</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 flex">
              <div className="flex-shrink-0 mr-4">
                <img src="https://cdn.worldvectorlogo.com/logos/etsy-1.svg" alt="Etsy" className="h-14 w-14" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Etsy</h3>
                <p className="mt-2 text-gray-600">Streamline inventory levels and sync orders.</p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Button className="py-6 px-8 text-lg" asChild>
              <Link href="/integrations">
                View all integrations
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#2D3748]">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-blue-300">Join thousands of businesses today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Button className="py-6 px-8 text-lg" asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Button variant="outline" className="py-6 px-8 text-lg bg-white text-[#2D3748] hover:bg-gray-100" asChild>
                <Link href="/demo">Request Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">&copy; 2023 InventoryHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}