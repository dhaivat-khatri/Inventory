import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Lightbulb, 
  Database, 
  Webhook, 
  BarChart4, 
  Package, 
  MoveHorizontal, 
  Activity, 
  RefreshCw, 
  LineChart, 
  Trophy,
  Calendar,
  Clock,
  CheckCircle2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function RoadmapPage() {
  const { toast } = useToast();
  const [view, setView] = useState<'card' | 'timeline'>('card');

  const handleVote = (feature: string) => {
    toast({
      title: "Feature vote recorded",
      description: `Thanks for voting on "${feature}"! We'll prioritize based on user interest.`
    });
  };
  
  const features = [
    {
      id: 1,
      title: "PostgreSQL database integration for persistent storage",
      description: "Replace in-memory storage with a PostgreSQL database for reliable, persistent data storage across all inventory items and accounts.",
      icon: <Database className="h-6 w-6 text-blue-500" />,
      status: "in-progress",
      eta: "Q2 2023",
      priority: "high",
      category: "infrastructure"
    },
    {
      id: 2,
      title: "Real-time updates using webhooks from inventory platforms",
      description: "Implement webhook listeners for supported platforms to receive real-time inventory updates when changes occur on external platforms.",
      icon: <Webhook className="h-6 w-6 text-purple-500" />,
      status: "planned",
      eta: "Q2 2023",
      priority: "high",
      category: "integration"
    },
    {
      id: 3,
      title: "Advanced analytics and reporting features",
      description: "Enhanced dashboard with customizable reports, trend analysis, and predictive inventory insights to optimize your stock levels.",
      icon: <BarChart4 className="h-6 w-6 text-indigo-500" />,
      status: "planned",
      eta: "Q3 2023",
      priority: "medium",
      category: "analytics"
    },
    {
      id: 4,
      title: "Bulk inventory management operations",
      description: "Perform operations on multiple inventory items simultaneously, including price updates, category changes, and stock adjustments.",
      icon: <Package className="h-6 w-6 text-orange-500" />,
      status: "in-progress",
      eta: "Q2 2023",
      priority: "high",
      category: "management"
    },
    {
      id: 5,
      title: "Interactive drag-and-drop inventory sorting",
      description: "Intuitive drag-and-drop interface for organizing inventory categories, creating bundles, and managing product relationships.",
      icon: <MoveHorizontal className="h-6 w-6 text-pink-500" />,
      status: "researching",
      eta: "Q3 2023",
      priority: "medium",
      category: "ux"
    },
    {
      id: 6,
      title: "Animated inventory status indicators with color-coded health metrics",
      description: "Visual indicators that show inventory health with animated color-coded metrics for immediate stock level assessment.",
      icon: <Activity className="h-6 w-6 text-green-500" />,
      status: "planned",
      eta: "Q2 2023",
      priority: "medium",
      category: "ux"
    },
    {
      id: 7,
      title: "One-click inventory synchronization between platforms",
      description: "Synchronize inventory levels, prices, and product details across all connected platforms with a single click.",
      icon: <RefreshCw className="h-6 w-6 text-cyan-500" />,
      status: "planned",
      eta: "Q3 2023",
      priority: "high",
      category: "integration"
    },
    {
      id: 8,
      title: "Personalized inventory insights dashboard",
      description: "Custom dashboard that shows personalized insights and recommendations based on your inventory patterns and sales history.",
      icon: <LineChart className="h-6 w-6 text-blue-500" />,
      status: "planned",
      eta: "Q4 2023",
      priority: "medium",
      category: "analytics"
    },
    {
      id: 9,
      title: "Gamified inventory management with achievement badges",
      description: "Earn badges and rewards for maintaining optimal inventory levels, quick fulfillment times, and other inventory management best practices.",
      icon: <Trophy className="h-6 w-6 text-amber-500" />,
      status: "researching",
      eta: "Q4 2023",
      priority: "low",
      category: "engagement"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "planned":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Planned</Badge>;
      case "in-progress":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">In Progress</Badge>;
      case "researching":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Researching</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High Priority</Badge>;
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Medium Priority</Badge>;
      case "low":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Low Priority</Badge>;
      default:
        return null;
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "infrastructure":
        return <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-100">Infrastructure</Badge>;
      case "integration":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Integration</Badge>;
      case "analytics":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Analytics</Badge>;
      case "management":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Management</Badge>;
      case "ux":
        return <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-100">UX</Badge>;
      case "engagement":
        return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Engagement</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{category}</Badge>;
    }
  };

  // Group features by status for timeline view
  const inProgressFeatures = features.filter(f => f.status === "in-progress");
  const plannedFeatures = features.filter(f => f.status === "planned");
  const researchingFeatures = features.filter(f => f.status === "researching");
  const completedFeatures = features.filter(f => f.status === "completed");

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold text-gray-900">Feature Roadmap</h1>
                <Button
                  variant="outline"
                  className="flex items-center"
                  onClick={() => window.open("https://forms.gle/feedback", "_blank")}
                >
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Suggest a Feature
                </Button>
              </div>
              <p className="text-gray-600 mb-8">
                Here's what we're working on to make your inventory management experience even better. Vote on features you'd like to see prioritized!
              </p>

              <div className="mb-6">
                <Tabs defaultValue="card" onValueChange={(value) => setView(value as 'card' | 'timeline')}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="card">Card View</TabsTrigger>
                    <TabsTrigger value="timeline">Timeline View</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="card">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {features.map((feature) => (
                        <Card key={feature.id} className="overflow-hidden">
                          <CardContent className="p-6">
                            <div className="flex items-start mb-4">
                              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mr-4 shrink-0">
                                {feature.icon}
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900">{feature.title}</h3>
                                <div className="flex items-center mt-1 space-x-2">
                                  {getStatusBadge(feature.status)}
                                  <span className="text-sm text-gray-500">Est. {feature.eta}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {getPriorityBadge(feature.priority)}
                              {getCategoryBadge(feature.category)}
                            </div>
                            <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
                            <div className="flex justify-between items-center">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-xs"
                                onClick={() => handleVote(feature.title)}
                              >
                                Vote for this feature
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="timeline">
                    <div className="space-y-8">
                      {inProgressFeatures.length > 0 && (
                        <div>
                          <div className="flex items-center mb-4">
                            <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center mr-2">
                              <Clock className="h-4 w-4 text-amber-800" />
                            </div>
                            <h2 className="text-xl font-medium">In Progress</h2>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {inProgressFeatures.map(feature => (
                              <Card key={feature.id} className="overflow-hidden border-l-4 border-amber-400">
                                <CardContent className="p-4">
                                  <div className="flex gap-2 items-center mb-2">
                                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                                      {feature.icon}
                                    </div>
                                    <h3 className="font-medium">{feature.title}</h3>
                                  </div>
                                  <div className="flex flex-wrap gap-2 mb-3">
                                    <Badge className="bg-gray-100 text-gray-800">Est. {feature.eta}</Badge>
                                    {getPriorityBadge(feature.priority)}
                                  </div>
                                  <p className="text-sm text-gray-600">{feature.description}</p>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      )}

                      {plannedFeatures.length > 0 && (
                        <div>
                          <div className="flex items-center mb-4">
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                              <Calendar className="h-4 w-4 text-blue-800" />
                            </div>
                            <h2 className="text-xl font-medium">Planned</h2>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {plannedFeatures.map(feature => (
                              <Card key={feature.id} className="overflow-hidden border-l-4 border-blue-400">
                                <CardContent className="p-4">
                                  <div className="flex gap-2 items-center mb-2">
                                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                                      {feature.icon}
                                    </div>
                                    <h3 className="font-medium">{feature.title}</h3>
                                  </div>
                                  <div className="flex flex-wrap gap-2 mb-3">
                                    <Badge className="bg-gray-100 text-gray-800">Est. {feature.eta}</Badge>
                                    {getPriorityBadge(feature.priority)}
                                  </div>
                                  <p className="text-sm text-gray-600">{feature.description}</p>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      )}

                      {researchingFeatures.length > 0 && (
                        <div>
                          <div className="flex items-center mb-4">
                            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                              <Lightbulb className="h-4 w-4 text-purple-800" />
                            </div>
                            <h2 className="text-xl font-medium">Researching</h2>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {researchingFeatures.map(feature => (
                              <Card key={feature.id} className="overflow-hidden border-l-4 border-purple-400">
                                <CardContent className="p-4">
                                  <div className="flex gap-2 items-center mb-2">
                                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                                      {feature.icon}
                                    </div>
                                    <h3 className="font-medium">{feature.title}</h3>
                                  </div>
                                  <div className="flex flex-wrap gap-2 mb-3">
                                    <Badge className="bg-gray-100 text-gray-800">Est. {feature.eta}</Badge>
                                    {getPriorityBadge(feature.priority)}
                                  </div>
                                  <p className="text-sm text-gray-600">{feature.description}</p>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      )}

                      {completedFeatures.length > 0 && (
                        <div>
                          <div className="flex items-center mb-4">
                            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                              <CheckCircle2 className="h-4 w-4 text-green-800" />
                            </div>
                            <h2 className="text-xl font-medium">Completed</h2>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {completedFeatures.map(feature => (
                              <Card key={feature.id} className="overflow-hidden border-l-4 border-green-400">
                                <CardContent className="p-4">
                                  <div className="flex gap-2 items-center mb-2">
                                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                                      {feature.icon}
                                    </div>
                                    <h3 className="font-medium">{feature.title}</h3>
                                  </div>
                                  <div className="flex flex-wrap gap-2 mb-3">
                                    <Badge className="bg-gray-100 text-gray-800">Completed</Badge>
                                  </div>
                                  <p className="text-sm text-gray-600">{feature.description}</p>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}