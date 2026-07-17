"use client";

import { useEffect, useState } from "react";
import { useProfile, ServiceOrder } from "@/lib/zustand/profileStore";
import ServiceCard, { ServiceType } from "@/components/services/ServiceCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Clock, Play, Sparkles, HelpCircle, Truck, RefreshCw } from "lucide-react";
import { toast } from "sonner";

// Services Catalog
const servicesList: ServiceType[] = [
  {
    id: "serv-laundry-wash",
    name: "Dorm Laundry (Wash & Dry)",
    desc: "Send your laundry to our student-run washing hub. We wash, dry, and fold your items. Turnaround is under 4 hours.",
    priceRate: "KES 50 / kg",
    basePrice: 50,
    category: "laundry"
  },
  {
    id: "serv-laundry-dry",
    name: "Express Dry Cleaning",
    desc: "Suits, coats, silk dresses, or delicate gear dry-cleaned professionally. Returned in hangers inside protective plastic sleeves.",
    priceRate: "KES 150 / piece",
    basePrice: 150,
    category: "laundry"
  },
  {
    id: "serv-catering-standard",
    name: "Standard Campus Meal",
    desc: "Hot, freshly prepared meal from campus dining halls delivered directly to your dorm room. Includes starter, main dish, and dessert.",
    priceRate: "KES 300 / meal",
    basePrice: 300,
    category: "catering"
  },
  {
    id: "serv-catering-late",
    name: "Midnight Snack Delivery",
    desc: "Late-night study fuel. Burgers, fries, milkshakes, or hot wings delivered to study rooms or hostel rooms from 10 PM to 3 AM.",
    priceRate: "KES 250 / order",
    basePrice: 250,
    category: "catering"
  },
  {
    id: "serv-printing-laser",
    name: "Laser Document Printing",
    desc: "High-quality black & white or color laser printing. Upload your lecture notes or dissertation and pick it up at the Student Union printer box.",
    priceRate: "KES 5 / page",
    basePrice: 5,
    category: "printing"
  },
  {
    id: "serv-cleaning-dorm",
    name: "Suite Cleaning & Dusting",
    desc: "Student-run deep cleaning service. We dust desks, sweep floors, vacuum rugs, empty trash bins, and clean shared dorm bathrooms.",
    priceRate: "KES 600 / session",
    basePrice: 600,
    category: "cleaning"
  }
];

const categories = ["All", "laundry", "catering", "printing", "cleaning"];

export default function ServicesPage() {
  const { activeOrders, updateOrderStatus } = useProfile();
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filtering catalog
  const filteredServices = servicesList.filter((service) => {
    return selectedCategory === "All" || service.category === selectedCategory;
  });

  // Real-time Order Progress Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      activeOrders.forEach((order) => {
        if (order.status !== "Completed" && order.status !== "Cancelled") {
          const nextProgress = Math.min(100, order.progress + 15);
          let nextStatus: ServiceOrder["status"] = order.status;

          if (nextProgress >= 100) {
            nextStatus = "Completed";
            toast.success(`Service Completed: ${order.serviceName} is now ready!`);
          } else if (nextProgress >= 40) {
            nextStatus = "In Progress";
          }

          updateOrderStatus(order.id, nextStatus, nextProgress);
        }
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [activeOrders, updateOrderStatus]);

  const getStatusIcon = (status: ServiceOrder["status"]) => {
    switch (status) {
      case "Pending": return <Clock className="h-4 w-4 text-blue-500 animate-pulse" />;
      case "In Progress": return <RefreshCw className="h-4 w-4 text-amber-500 animate-spin" />;
      case "Completed": return <CheckCircle2 className="h-4 w-4 text-green-500 animate-bounce" />;
      case "Cancelled": return <HelpCircle className="h-4 w-4 text-zinc-400" />;
    }
  };

  const getStatusBadgeClass = (status: ServiceOrder["status"]) => {
    switch (status) {
      case "Pending": return "bg-blue-500/10 border-blue-500/20 text-blue-500";
      case "In Progress": return "bg-amber-500/10 border-amber-500/20 text-amber-500";
      case "Completed": return "bg-green-500/10 border-green-500/20 text-green-500";
      case "Cancelled": return "bg-zinc-500/10 border-zinc-500/20 text-zinc-500";
    }
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-8 space-y-6 animate-in fade-in duration-300">
      
      {/* Page Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center justify-between border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            Campus Services Hub <Sparkles className="h-6 w-6 text-amber-500 animate-pulse" />
          </h1>
          <p className="text-muted-foreground mt-1">
            Request on-demand student laundry, order catered food, mock print files, or schedule suite cleaning.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Services Catalog */}
        <div className="lg:col-span-2 space-y-6">
          {/* Category filters */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-border/50 pb-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border capitalize shrink-0 ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-muted text-muted-foreground border-border hover:bg-accent hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid of Catalog Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>

        {/* Right Column: Live Track Coordinate Panel */}
        <div className="space-y-6">
          <Card className="bg-card border-border rounded-2xl shadow-sm sticky top-20">
            <CardHeader className="border-b border-border pb-4 bg-muted/20">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-foreground flex items-center gap-1.5">
                  <Truck className="h-5 w-5 text-primary" /> Active Service Tracker
                </CardTitle>
                <Badge variant="outline" className="text-[10px] bg-primary/10 border-primary/25 text-primary font-bold">
                  LIVE GPS MOCK
                </Badge>
              </div>
              <CardDescription className="text-xs">
                Real-time tracking of active student service orders. Progress increments 15% every 5 seconds.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {activeOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground text-xs p-4 border border-dashed border-border rounded-xl">
                  <Clock className="h-8 w-8 text-muted-foreground/60 mb-2" />
                  <h4 className="font-bold">No active service requests</h4>
                  <p className="mt-1">Book a laundry, printing, or food package to start tracking live progress.</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                  {activeOrders.map((order) => (
                    <div key={order.id} className="p-3 border border-border rounded-xl bg-muted/20 hover:bg-muted/30 transition-all space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-sm text-foreground leading-tight">{order.serviceName}</h4>
                          <span className="text-[10px] text-muted-foreground block mt-1">Booked: {order.createdAt}</span>
                        </div>
                        <Badge variant="outline" className={`text-[10px] font-bold border px-2 py-0.5 flex items-center gap-1 ${getStatusBadgeClass(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span>{order.status}</span>
                        </Badge>
                      </div>

                      <p className="text-[11px] text-muted-foreground italic bg-background/50 p-2 rounded-lg border border-border/50">
                        {order.details}
                      </p>

                      {order.status !== "Cancelled" && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] text-muted-foreground">
                            <span>Completing order...</span>
                            <span>{order.progress}%</span>
                          </div>
                          <Progress value={order.progress} className="h-1.5 bg-border" />
                        </div>
                      )}

                      <div className="flex justify-between items-center text-[10px] text-muted-foreground border-t border-border/50 pt-2 mt-1">
                        <span>Paid: <strong>KES {order.price}</strong></span>
                        <span className="font-mono text-[9px] text-muted-foreground/80">{order.id}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
