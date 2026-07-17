"use client";

import Link from "next/link";
import { useProfile } from "@/lib/zustand/profileStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  QrCode,
  ArrowUpRight,
  ShoppingBag,
  Calendar,
  Wrench,
  Bell,
  Sparkles,
  Zap,
  TrendingUp,
  BookOpen
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Dashboard() {
  const { name, major, classYear, studentId, balance, avatar, rsvps, activeOrders, topUp } = useProfile();

  // Top Up dialog state
  const [topUpAmount, setTopUpAmount] = useState("");
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // QR Modal state
  const [isQrOpen, setIsQrOpen] = useState(false);

  const handleTopUp = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(topUpAmount);
    if (isNaN(amt) || amt <= 0) {
      toast.error("Please enter a valid amount to top up.");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      topUp(amt);
      setIsProcessing(false);
      setIsTopUpOpen(false);
      setTopUpAmount("");
      toast.success(`Successfully recharged KES ${amt.toLocaleString()} to Campus Card!`);
    }, 1200);
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            Welcome back, {name.split(" ")[0]}! <Sparkles className="h-6 w-6 text-primary animate-pulse" />
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your digital identity, services, and campus life in one dashboard.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full border border-border">
          <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary">Student Account</Badge>
          <span>Term: Fall 2026</span>
        </div>
      </div>

      {/* Main Grid: Card & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Glassmorphic Virtual Student ID Card */}
        <div className="lg:col-span-2 flex flex-col justify-between">
          <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 border border-white/10 h-64 flex flex-col justify-between">
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="absolute -right-16 -top-16 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

            {/* Top row */}
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs uppercase tracking-widest text-indigo-200 font-bold">CampusOS Smart ID</span>
                <h2 className="text-2xl font-black tracking-tight mt-1">UNIVERSITY CARD</h2>
              </div>
              <div className="bg-white/15 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[10px] font-bold tracking-wider flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-ping" />
                ACTIVE NFC
              </div>
            </div>

            {/* Middle row: Avatar & Info */}
            <div className="flex items-center gap-4 my-2">
              <div className="h-16 w-16 rounded-full border-2 border-white/40 overflow-hidden bg-white/20 backdrop-blur-md flex-shrink-0 relative group-hover:border-white/80 transition-all">
                <img src={avatar} alt="Avatar" className="h-full w-full object-cover" />
              </div>
              <div>
                <h3 className="text-xl font-bold leading-none">{name}</h3>
                <p className="text-xs text-indigo-100 mt-1">{major} | {classYear}</p>
                <code className="text-[10px] text-white/70 bg-black/20 px-1.5 py-0.5 rounded mt-1.5 inline-block font-mono">ID: {studentId}</code>
              </div>
            </div>

            {/* Bottom Row: Balance & Action Button */}
            <div className="flex justify-between items-end border-t border-white/15 pt-3">
              <div>
                <span className="text-[10px] text-indigo-200 font-bold uppercase tracking-wider block">Campus balance</span>
                <span className="text-2xl font-black font-sans">
                  {balance.toLocaleString("en-US", {
                    style: "currency",
                    currency: "KES",
                    minimumFractionDigits: 0
                  })}
                </span>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/35 border border-white/20 text-white rounded-full font-bold flex items-center gap-1 px-3 py-1.5 text-xs shadow-none backdrop-blur-sm"
                  onClick={() => setIsQrOpen(true)}
                >
                  <QrCode className="h-4 w-4" /> NFC QR Code
                </Button>
                <Button 
                  size="sm" 
                  className="bg-white text-indigo-700 hover:bg-indigo-50 rounded-full font-extrabold flex items-center gap-1 px-3 py-1.5 text-xs shadow-md"
                  onClick={() => setIsTopUpOpen(true)}
                >
                  <ArrowUpRight className="h-4 w-4 text-indigo-700 font-bold" /> Top Up
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Quick Overview Card */}
        <Card className="bg-card border-border shadow-sm flex flex-col justify-between">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold text-foreground">Active Coordinates</CardTitle>
              <Zap className="h-5 w-5 text-indigo-500 animate-bounce" />
            </div>
            <CardDescription>
              Status reports of requested bookings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-1">
            {activeOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <p className="text-xs text-muted-foreground">No active orders or service requests.</p>
              </div>
            ) : (
              <div className="space-y-3.5">
                {activeOrders.slice(0, 2).map((order) => (
                  <div key={order.id} className="p-2.5 border border-border/80 rounded-xl bg-muted/30">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-xs text-foreground leading-tight">{order.serviceName}</h4>
                        <span className="text-[10px] text-muted-foreground block mt-0.5">Booked at {order.createdAt}</span>
                      </div>
                      <Badge variant="outline" className={`text-[10px] border px-1.5 ${
                        order.status === "In Progress" ? "bg-amber-500/10 border-amber-500/20 text-amber-500" :
                        order.status === "Completed" ? "bg-green-500/10 border-green-500/20 text-green-500" :
                        "bg-blue-500/10 border-blue-500/20 text-blue-500"
                      }`}>
                        {order.status}
                      </Badge>
                    </div>
                    <div className="mt-2.5 space-y-1">
                      <div className="flex justify-between text-[10px] text-muted-foreground">
                        <span>Progress</span>
                        <span>{order.progress}%</span>
                      </div>
                      <Progress value={order.progress} className="h-1.5 bg-border" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter className="pt-0 border-t border-border mt-auto">
            <Link href="/services" className="w-full text-center text-xs text-primary font-bold hover:underline pt-3.5 block">
              Manage Services & Tracker →
            </Link>
          </CardFooter>
        </Card>
      </div>

      {/* Grid: Navigation & Notifications Feed */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Navigation Categories */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-1.5">
            <TrendingUp className="h-5 w-5 text-indigo-500" /> Campus OS Applications
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Marketplace Card */}
            <Card className="hover:scale-[1.025] hover:shadow-md transition-all duration-300 cursor-pointer bg-card border-border flex flex-col justify-between group relative">
              <Link href="/marketplace" className="absolute inset-0" />
              <CardHeader className="pb-2">
                <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <CardTitle className="text-base font-bold mt-3">Marketplace</CardTitle>
                <CardDescription className="text-xs">
                  Buy & sell gear, books, and electronics from other students.
                </CardDescription>
              </CardHeader>
              <CardFooter className="pt-2 text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Browse Deals →
              </CardFooter>
            </Card>

            {/* Services Card */}
            <Card className="hover:scale-[1.025] hover:shadow-md transition-all duration-300 cursor-pointer bg-card border-border flex flex-col justify-between group relative">
              <Link href="/services" className="absolute inset-0" />
              <CardHeader className="pb-2">
                <div className="h-10 w-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-all">
                  <Wrench className="h-5 w-5" />
                </div>
                <CardTitle className="text-base font-bold mt-3">Services</CardTitle>
                <CardDescription className="text-xs">
                  Schedule campus laundry, catering meal preps, and printing.
                </CardDescription>
              </CardHeader>
              <CardFooter className="pt-2 text-xs font-bold text-amber-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Book Services →
              </CardFooter>
            </Card>

            {/* Events Card */}
            <Card className="hover:scale-[1.025] hover:shadow-md transition-all duration-300 cursor-pointer bg-card border-border flex flex-col justify-between group relative">
              <Link href="/events" className="absolute inset-0" />
              <CardHeader className="pb-2">
                <div className="h-10 w-10 bg-pink-500/10 rounded-xl flex items-center justify-center text-pink-600 group-hover:bg-pink-500 group-hover:text-white transition-all">
                  <Calendar className="h-5 w-5" />
                </div>
                <CardTitle className="text-base font-bold mt-3">Events & RSVPs</CardTitle>
                <CardDescription className="text-xs">
                  Discover campus hackathons, parties, and book QR tickets.
                </CardDescription>
              </CardHeader>
              <CardFooter className="pt-2 text-xs font-bold text-pink-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explore Events →
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Notifications and Campus Feed */}
        <Card className="bg-card border-border shadow-sm flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
              <Bell className="h-4 w-4 text-primary" /> Campus OS Feed
            </CardTitle>
            <CardDescription>
              Real-time updates and hot deals on campus.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-1">
            <div className="space-y-3">
              
              {/* Notification 1 */}
              <div className="flex gap-3 text-xs leading-normal border-b border-border/50 pb-2">
                <div className="h-7 w-7 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-500 flex-shrink-0 mt-0.5">
                  <Calendar className="h-3.5 w-3.5" />
                </div>
                <div>
                  <span className="font-bold text-foreground">Upcoming Hackathon</span>
                  <p className="text-muted-foreground text-[11px] mt-0.5">Campus Hackathon 2026 is scheduled for tomorrow at 9 AM. Total prize: KES 50,000!</p>
                  <Link href="/events" className="text-[10px] text-primary font-bold hover:underline block mt-1">RSVP Now</Link>
                </div>
              </div>

              {/* Notification 2 */}
              <div className="flex gap-3 text-xs leading-normal border-b border-border/50 pb-2">
                <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                  <ShoppingBag className="h-3.5 w-3.5" />
                </div>
                <div>
                  <span className="font-bold text-foreground">Trending Books</span>
                  <p className="text-muted-foreground text-[11px] mt-0.5">Student Alex listing: &quot;Intro to Algorithms&quot; textbook is currently KES 450.</p>
                  <Link href="/marketplace" className="text-[10px] text-primary font-bold hover:underline block mt-1">View Listing</Link>
                </div>
              </div>

              {/* Notification 3 */}
              <div className="flex gap-3 text-xs leading-normal">
                <div className="h-7 w-7 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500 flex-shrink-0 mt-0.5">
                  <BookOpen className="h-3.5 w-3.5" />
                </div>
                <div>
                  <span className="font-bold text-foreground">RSVP Stats</span>
                  <p className="text-muted-foreground text-[11px] mt-0.5">You are currently RSVP&apos;d to {rsvps.length} event(s).</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* NFC QR Code scanning modal */}
      <Dialog open={isQrOpen} onOpenChange={setIsQrOpen}>
        <DialogContent className="sm:max-w-xs bg-background border border-border text-center py-6 flex flex-col items-center">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-foreground">Campus Smart NFC ID</DialogTitle>
            <DialogDescription className="text-xs">
              Scan this QR code at campus dining halls, laundry hubs, or event check-ins to authenticate.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 p-4 bg-white rounded-xl border-4 border-indigo-600 flex items-center justify-center shadow-inner">
            {/* Custom mock QR code */}
            <div className="grid grid-cols-5 gap-1.5 w-40 h-40">
              {Array.from({ length: 25 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`rounded-sm ${(i * 3) % 2 === 0 || i % 7 === 0 || i === 0 || i === 4 || i === 20 || i === 24 ? "bg-black" : "bg-transparent"}`} 
                />
              ))}
            </div>
          </div>
          <div className="mt-4 text-xs font-mono bg-muted py-1 px-3 rounded text-muted-foreground border border-border">
            CS-2023-8941 // ALEX MERCER
          </div>
          <Button onClick={() => setIsQrOpen(false)} className="mt-6 w-full rounded-full font-semibold">
            Close Smart Card
          </Button>
        </DialogContent>
      </Dialog>

      {/* Top Up Dialog */}
      <Dialog open={isTopUpOpen} onOpenChange={(open) => !isProcessing && setIsTopUpOpen(open)}>
        <DialogContent className="sm:max-w-sm bg-background border border-border">
          <form onSubmit={handleTopUp} className="space-y-4">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-foreground">Recharge Campus Card</DialogTitle>
              <DialogDescription>
                Top up your digital balance instantly to pay for catering, marketplace items, or services.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-foreground">Recharge Amount (KES)</Label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-muted-foreground text-sm">KES</span>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={topUpAmount}
                    onChange={(e) => setTopUpAmount(e.target.value)}
                    required
                    disabled={isProcessing}
                    className="pl-12 bg-background border-border"
                  />
                </div>
              </div>

              {/* Preset buttons */}
              <div className="grid grid-cols-4 gap-2">
                {[150, 300, 500, 1000].map((amt) => (
                  <Button
                    key={amt}
                    type="button"
                    variant="outline"
                    size="sm"
                    className="rounded-full text-xs font-bold"
                    onClick={() => setTopUpAmount(amt.toString())}
                    disabled={isProcessing}
                  >
                    +{amt}
                  </Button>
                ))}
              </div>

              <div className="bg-muted/50 p-3 rounded-lg flex justify-between items-center text-xs border border-border">
                <span className="text-muted-foreground">Current Balance:</span>
                <span className="font-bold text-foreground">
                  {balance.toLocaleString("en-US", {
                    style: "currency",
                    currency: "KES",
                    minimumFractionDigits: 0
                  })}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-border pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsTopUpOpen(false)}
                disabled={isProcessing}
                className="rounded-full"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isProcessing || !topUpAmount || parseFloat(topUpAmount) <= 0}
                className="rounded-full font-bold"
              >
                {isProcessing ? "Processing..." : "Recharge"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
