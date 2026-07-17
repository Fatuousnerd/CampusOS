"use client";

import { useState } from "react";
import { useProfile } from "@/lib/zustand/profileStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Search,
  Calendar,
  MapPin,
  Clock,
  Ticket,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

interface EventType {
  id: number;
  title: string;
  desc: string;
  date: string;
  time: string;
  venue: string;
  category: "Academic" | "Party" | "Career" | "Sports" | "Club";
  price: number; // 0 for free
  priceText: string;
  slotsLeft: number;
}

const campusEvents: EventType[] = [
  {
    id: 101,
    title: "Campus Hackathon 2026",
    desc: "Join us for 24 hours of non-stop building, coding, designing, and pitching. KES 50,000 cash prizes, free food, mentor workshops, and exclusive sponsor swag!",
    date: "Saturday, July 18, 2026",
    time: "9:00 AM - Sunday 12:00 PM",
    venue: "Engineering Tech Hall Auditorium",
    category: "Academic",
    price: 0,
    priceText: "Free Entry",
    slotsLeft: 42,
  },
  {
    id: 102,
    title: "Neon Glow Welcome Party",
    desc: "Kickoff the new semester under blacklights! UV neon face paint booths, glowing bracelets, student DJs, mocktail bars, and local food trucks in the main quad.",
    date: "Friday, July 24, 2026",
    time: "8:00 PM - 12:00 AM",
    venue: "Main Campus Quad Plaza",
    category: "Party",
    price: 200,
    priceText: "KES 200",
    slotsLeft: 120,
  },
  {
    id: 103,
    title: "Tech & Engineering Career Fair",
    desc: "Connect directly with hiring managers from tech giants, local engineering firms, and high-growth startups. Bring printed resumes and dress business casual.",
    date: "Wednesday, August 2, 2026",
    time: "10:00 AM - 4:00 PM",
    venue: "Student Union Gymnasium",
    category: "Career",
    price: 0,
    priceText: "Free (RSVP Req.)",
    slotsLeft: 250,
  },
  {
    id: 104,
    title: "Inter-Hostel Football Derby Finals",
    desc: "The clash of the hostels! Mandela Hall vs Grace Hall in the campus league championship final. Match commentary, half-time snacks, and heavy rivalry.",
    date: "Sunday, July 26, 2026",
    time: "4:00 PM - 6:30 PM",
    venue: "Sports Complex Stadium Pitch A",
    category: "Sports",
    price: 0,
    priceText: "Free Attendance",
    slotsLeft: 300,
  },
  {
    id: 105,
    title: "Generative AI & LLMs Seminar",
    desc: "A technical dive into transformer architectures, pre-training models, and LLM fine-tuning methodologies. Special guest lecture from deepmind research partners.",
    date: "Thursday, July 30, 2026",
    time: "2:00 PM - 4:00 PM",
    venue: "Science Lecture Theatre 3",
    category: "Academic",
    price: 100,
    priceText: "KES 100",
    slotsLeft: 15,
  },
  {
    id: 106,
    title: "Sunset Acoustic Concert",
    desc: "Wind down with soft melodies. Acoustic singer-songwriter sets, cello-violin duos, and light jazz as the sun goes down. Blankets and beanbags provided.",
    date: "Wednesday, August 5, 2026",
    time: "6:00 PM - 8:30 PM",
    venue: "Lakefront Campus Amphitheatre",
    category: "Club",
    price: 150,
    priceText: "KES 150",
    slotsLeft: 60,
  },
];

const categories = ["All", "Academic", "Party", "Career", "Sports", "Club"];

export default function EventsPage() {
  const { rsvps, addRSVP, removeRSVP, balance, deduct } = useProfile();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Ticket Modal state
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [isTicketOpen, setIsTicketOpen] = useState(false);

  // Filter events
  const filteredEvents = campusEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.desc.toLowerCase().includes(search.toLowerCase()) ||
      event.venue.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRSVP = (event: EventType) => {
    const isRegistered = rsvps.includes(event.id);

    if (isRegistered) {
      // Un-register
      removeRSVP(event.id);
      toast.success(`Cancelled RSVP for ${event.title}`);
    } else {
      // Register
      if (event.price > 0) {
        if (balance < event.price) {
          toast.error(
            `Insufficient balance! This ticket costs KES ${event.price}.`,
          );
          return;
        }
        const success = deduct(event.price);
        if (!success) {
          toast.error("Failed to process transaction.");
          return;
        }
      }

      addRSVP(event.id);
      toast.success(`Successfully RSVP'd for ${event.title}!`);
      // Automatically open ticket
      setSelectedEvent(event);
      setIsTicketOpen(true);
    }
  };

  const getCategoryColor = (cat: EventType["category"]) => {
    switch (cat) {
      case "Academic":
        return "text-indigo-500 border-indigo-500/20 bg-indigo-500/10";
      case "Party":
        return "text-pink-500 border-pink-500/20 bg-pink-500/10";
      case "Career":
        return "text-blue-500 border-blue-500/20 bg-blue-500/10";
      case "Sports":
        return "text-emerald-500 border-emerald-500/20 bg-emerald-500/10";
      case "Club":
        return "text-purple-500 border-purple-500/20 bg-purple-500/10";
    }
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-8 space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center justify-between border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            Campus Events Directory
          </h1>
          <p className="text-muted-foreground mt-1">
            Book tickets to hackathons, welcome parties, sports finals, and
            career networking seminars.
          </p>
        </div>
      </div>

      {/* Control Panel: Search & Categories */}
      <div className="space-y-4 bg-muted/30 border border-border p-4 rounded-2xl">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search event title, key speakers, or venues..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-background border-border"
            />
          </div>
        </div>

        {/* Category filters */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none border-t border-border/50 pt-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border shrink-0 ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-background text-muted-foreground border-border hover:bg-accent hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Events List Grid */}
      {filteredEvents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-border rounded-2xl bg-card">
          <Calendar className="h-10 w-10 text-muted-foreground mb-3" />
          <h3 className="font-bold text-lg">No events match your criteria</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm">
            Try resetting categories or updating your search query to discover
            other campus schedules.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => {
            const isRegistered = rsvps.includes(event.id);
            return (
              <Card
                key={event.id}
                className={`flex flex-col justify-between hover:shadow-md transition-all duration-300 bg-card border-border rounded-2xl overflow-hidden h-[420px] relative ${
                  isRegistered ? "ring-2 ring-primary/40 bg-primary/1" : ""
                }`}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <Badge
                      variant="outline"
                      className={`capitalize font-bold text-[10px] ${getCategoryColor(event.category)}`}
                    >
                      {event.category}
                    </Badge>
                    <span className="text-xs font-extrabold text-primary font-sans">
                      {event.priceText}
                    </span>
                  </div>
                  <CardTitle className="font-extrabold text-lg text-foreground mt-3 line-clamp-1 leading-tight">
                    {event.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-1 pb-4 space-y-4">
                  <CardDescription className="text-xs leading-relaxed text-muted-foreground line-clamp-3">
                    {event.desc}
                  </CardDescription>

                  <div className="space-y-2.5 pt-2 text-xs border-t border-border/40 text-muted-foreground font-semibold">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-foreground truncate">
                        {event.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary shrink-0" />
                      <span className="truncate">{event.venue}</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex gap-2 p-4 border-t border-border bg-muted/10">
                  {isRegistered ? (
                    <>
                      <Button
                        variant="outline"
                        className="flex-1 rounded-full text-xs font-bold flex items-center gap-1 bg-background hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
                        onClick={() => handleRSVP(event)}
                      >
                        Cancel RSVP
                      </Button>
                      <Button
                        className="flex-1 rounded-full text-xs font-bold flex items-center gap-1"
                        onClick={() => {
                          setSelectedEvent(event);
                          setIsTicketOpen(true);
                        }}
                      >
                        <Ticket className="h-3.5 w-3.5" /> View Ticket
                      </Button>
                    </>
                  ) : (
                    <Button
                      className="w-full rounded-full font-bold flex items-center justify-center gap-1.5"
                      onClick={() => handleRSVP(event)}
                    >
                      <Ticket className="h-4 w-4" /> RSVP to Event
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}

      {/* Ticket Details Glassmorphic Dialog */}
      <Dialog open={isTicketOpen} onOpenChange={setIsTicketOpen}>
        <DialogContent className="sm:max-w-sm bg-background border border-border p-0 overflow-hidden rounded-3xl shadow-xl">
          {selectedEvent && (
            <div className="flex flex-col">
              {/* Ticket Top: Event summary */}
              <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-white/5 opacity-80" />
                <div className="absolute -right-12 -top-12 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

                <Ticket className="h-8 w-8 mx-auto mb-2 text-white/90 animate-bounce" />
                <span className="text-[10px] tracking-widest font-black uppercase text-indigo-200">
                  Campus Pass Ticket
                </span>
                <DialogTitle className="text-xl font-black mt-1 leading-tight text-white">
                  {selectedEvent.title}
                </DialogTitle>
                <div className="mt-2.5 inline-flex items-center gap-1 bg-white/15 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20 text-[9px] font-bold">
                  <CheckCircle className="h-3 w-3 text-green-400" /> RSVP
                  REGISTERED
                </div>
              </div>

              {/* Ticket Middle: Tear-strip divider */}
              <div className="relative h-4 bg-muted/30 border-y border-dashed border-border/80 flex items-center justify-between px-3">
                <div className="absolute -left-3 h-6 w-6 rounded-full bg-background border-r border-border/80" />
                <div className="absolute -right-3 h-6 w-6 rounded-full bg-background border-l border-border/80" />
                <div className="w-full border-t border-dashed border-border/60 mx-1" />
              </div>

              {/* Ticket Bottom: Details and QR Code */}
              <div className="p-6 bg-card space-y-5 text-xs text-foreground">
                <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-left">
                  <div>
                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">
                      Attendee
                    </span>
                    <span className="font-extrabold text-foreground text-sm">
                      Alex Mercer
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">
                      Student ID
                    </span>
                    <span className="font-mono text-foreground font-semibold">
                      CS-2023-8941
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">
                      Venue Coordinates
                    </span>
                    <span className="font-semibold text-foreground flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />{" "}
                      {selectedEvent.venue}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">
                      Date
                    </span>
                    <span className="font-semibold text-foreground mt-0.5 flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-primary shrink-0" />{" "}
                      {selectedEvent.date.split(", ")[1]}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">
                      Arrival Time
                    </span>
                    <span className="font-semibold text-foreground mt-0.5 flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-primary shrink-0" />{" "}
                      {selectedEvent.time.split(" - ")[0]}
                    </span>
                  </div>
                </div>

                {/* QR Code */}
                <div className="pt-4 border-t border-border flex flex-col items-center gap-3">
                  <div className="p-3 bg-white border-2 border-primary/20 rounded-xl flex items-center justify-center">
                    {/* Simulated barcode lines */}
                    <div className="flex gap-[3px] items-stretch h-14 w-44">
                      {Array.from({ length: 28 }).map((_, i) => (
                        <div
                          key={i}
                          className={`bg-black rounded-sm ${
                            i % 4 === 0
                              ? "w-[1px]"
                              : i % 5 === 0
                                ? "w-[3px]"
                                : i % 3 === 0
                                  ? "w-[2px]"
                                  : "w-[1px]"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <code className="font-mono text-[9px] text-muted-foreground tracking-widest bg-muted/65 px-2 py-0.5 rounded border border-border">
                    TKT-E{selectedEvent.id}-AM8941
                  </code>
                </div>

                <Button
                  onClick={() => setIsTicketOpen(false)}
                  className="w-full rounded-full font-bold h-10 mt-2 flex items-center justify-center gap-1.5"
                >
                  Done
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
