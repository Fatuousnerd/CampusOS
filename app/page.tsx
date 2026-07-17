"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ShoppingBag,
  Wrench,
  Calendar,
  ArrowRight,
  Sparkles,
  Shield,
  Smartphone,
  Zap,
  Check,
  TrendingUp,
  CreditCard,
  QrCode,
  Users,
  Sun,
  Moon,
  Coffee,
  Shirt,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";

export default function LandingPage() {
  const { theme, toggleTheme } = useTheme();
  // const [cardTapped, setCardTapped] = useState(false);
  const [simulatedStatus, setSimulatedStatus] = useState("idle"); // idle, scanning, success

  const triggerTapSimulation = () => {
    if (simulatedStatus !== "idle") return;
    setSimulatedStatus("scanning");
    setTimeout(() => {
      setSimulatedStatus("success");
      setTimeout(() => {
        setSimulatedStatus("idle");
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 relative overflow-hidden font-sans">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[10%] w-[35%] h-[50%] rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-[120px]" />
        <div className="absolute top-[5%] right-[5%] w-[40%] h-[45%] rounded-full bg-gradient-to-br from-pink-500/10 to-indigo-500/20 blur-[130px]" />
        <div className="absolute top-[300px] left-[30%] w-[25%] h-[25%] rounded-full bg-purple-500/10 blur-[90px]" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none z-0 opacity-70" />

      {/* Header Navigation */}
      <header className="relative z-10 w-full border-b border-border/40 bg-background/60 backdrop-blur-md sticky top-0 transition-colors">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-md">
              <span className="text-white font-black text-sm">C</span>
            </div>
            <span className="font-extrabold text-xl bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
              CampusOS
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a
              href="#features"
              className="hover:text-foreground transition-colors"
            >
              Apps & Features
            </a>
            <a
              href="#nfc-wallet"
              className="hover:text-foreground transition-colors"
            >
              Smart NFC Card
            </a>
            <a
              href="#statistics"
              className="hover:text-foreground transition-colors"
            >
              Campus Stats
            </a>
          </nav>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            <Link href="/auth">
              <Button
                variant="ghost"
                className="rounded-full text-xs font-semibold"
              >
                Sign In
              </Button>
            </Link>

            <Link href="/dashboard">
              <Button className="rounded-full text-xs font-bold px-5 bg-indigo-600 text-white hover:bg-indigo-500 shadow-md">
                Launch App
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-24 md:pt-28 md:pb-32 flex flex-col items-center text-center">
        {/* Version Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-6 animate-fade-in">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Next-Gen Student Hub</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-foreground max-w-4xl leading-tight">
          The Modern Operating System for{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            Campus Life
          </span>
        </h1>

        {/* Hero Description */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl font-normal leading-relaxed">
          Unlock a seamless campus experience. Trade items on the marketplace,
          book smart services, and access event tickets—all powered by your
          unified student identity.
        </p>

        {/* Hero CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="rounded-full font-bold text-sm px-8 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/20 text-white flex items-center gap-2 hover:-translate-y-0.5 transition-all duration-300"
            >
              Enter Dashboard <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>

          <Link href="/auth">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full font-semibold text-sm px-8 py-6 border-border hover:bg-muted"
            >
              Create Account
            </Button>
          </Link>
        </div>

        {/* Interactive Student ID Card Mockup Preview */}
        <div className="mt-16 w-full max-w-3xl px-4 perspective-1000 group">
          <div className="relative mx-auto rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 text-white shadow-2xl transition-all duration-500 transform hover:rotate-y-6 hover:scale-[1.02] border border-white/10 max-w-xl h-72 sm:h-80 flex flex-col justify-between overflow-hidden">
            {/* Holographic glowing animations */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.15),transparent_60%)] pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none transform translate-x-12 -translate-y-12" />

            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-indigo-200 font-extrabold">
                  CampusOS Virtual Passport
                </span>
                <h2 className="text-xl sm:text-3xl font-black tracking-tight mt-1">
                  STUDENT ID
                </h2>
              </div>
              <div className="bg-white/15 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/20 text-[10px] font-extrabold tracking-wider flex items-center gap-1.5 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-green-400 animate-ping" />
                NFC SECURE
              </div>
            </div>

            <div className="flex items-center gap-5 my-2">
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl border-2 border-white/40 overflow-hidden bg-white/20 backdrop-blur-md flex-shrink-0 relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                  alt="Student Avatar"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-left">
                <h3 className="text-lg sm:text-2xl font-bold leading-none">
                  Alex Mercer
                </h3>
                <p className="text-xs text-indigo-100 mt-1.5">
                  Computer Science | Class of 2027
                </p>
                <code className="text-[10px] text-white/80 bg-black/20 px-2 py-0.5 rounded mt-2 inline-block font-mono">
                  ID: CS-2023-8941
                </code>
              </div>
            </div>

            <div className="flex justify-between items-end border-t border-white/15 pt-4">
              <div className="text-left">
                <span className="text-[9px] text-indigo-200 font-extrabold uppercase tracking-wider block">
                  Campus Card balance
                </span>
                <span className="text-2xl sm:text-3xl font-black">
                  KES 2,450.00
                </span>
              </div>
              <div className="flex gap-2">
                <div className="bg-white/10 backdrop-blur-sm p-2 rounded-xl border border-white/10 flex items-center justify-center">
                  <QrCode className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-2 rounded-xl border border-white/10 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features / Applications Section */}
      <section
        id="features"
        className="relative z-10 py-24 border-t border-border/40 bg-muted/20"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              One Digital Ecosystem, Three Core Apps
            </h2>
            <p className="mt-4 text-muted-foreground text-sm sm:text-base">
              Everything you need to navigate your day-to-day student routine is
              built directly into our responsive modular client dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {/* Marketplace Card */}
            <Card className="border border-border/60 bg-card hover:shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none group-hover:bg-primary/10 transition-colors" />
              <CardHeader className="pb-4">
                <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl font-bold">
                  Campus Marketplace
                </CardTitle>
                <CardDescription className="text-sm mt-1">
                  Ditch third-party sites. Trade textbook copies, room gear, or
                  appliances directly with fellow students. Safe, instant,
                  card-authenticated.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 flex-1">
                {/* Mini Mock Marketplace items */}
                <div className="p-3 border border-border/80 rounded-xl bg-muted/40 text-xs flex justify-between items-center">
                  <span className="font-semibold text-foreground">
                    Calculus Stewart 9th Ed
                  </span>
                  <span className="font-bold text-primary">KES 800</span>
                </div>
                <div className="p-3 border border-border/80 rounded-xl bg-muted/40 text-xs flex justify-between items-center">
                  <span className="font-semibold text-foreground">
                    Dorm Refrigerator (Used)
                  </span>
                  <span className="font-bold text-primary">KES 9,500</span>
                </div>
              </CardContent>
              <CardFooter className="pt-4 border-t border-border/40 mt-6">
                <Link href="/marketplace" className="w-full">
                  <Button
                    variant="ghost"
                    className="w-full justify-between font-bold text-xs rounded-lg group-hover:bg-muted"
                  >
                    Explore Listings{" "}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Services Card */}
            <Card className="border border-border/60 bg-card hover:shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/10 transition-colors" />
              <CardHeader className="pb-4">
                <div className="h-12 w-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-600 mb-4 group-hover:scale-110 transition-transform">
                  <Wrench className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl font-bold">
                  Smart Student Services
                </CardTitle>
                <CardDescription className="text-sm mt-1">
                  Book campus laundry, order meal plans, or trigger remote dorm
                  print jobs in seconds. Track statuses real-time.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 flex-1">
                {/* Mini Mock Services lists */}
                <div className="p-3 border border-border/80 rounded-xl bg-muted/40 text-xs flex items-center gap-3">
                  <div className="h-7 w-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600">
                    <Shirt className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between font-semibold">
                      <span>Laundry Service</span>
                      <span className="text-[10px] text-amber-500">
                        85% Processed
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-3 border border-border/80 rounded-xl bg-muted/40 text-xs flex items-center gap-3">
                  <div className="h-7 w-7 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-600">
                    <Coffee className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between font-semibold">
                      <span>Lunch Meal Prep</span>
                      <span className="text-[10px] text-green-500">
                        Ready for Pick Up
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-4 border-t border-border/40 mt-6">
                <Link href="/services" className="w-full">
                  <Button
                    variant="ghost"
                    className="w-full justify-between font-bold text-xs rounded-lg group-hover:bg-muted"
                  >
                    Book Services{" "}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Events Card */}
            <Card className="border border-border/60 bg-card hover:shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-pink-500/10 transition-colors" />
              <CardHeader className="pb-4">
                <div className="h-12 w-12 bg-pink-500/10 rounded-2xl flex items-center justify-center text-pink-600 mb-4 group-hover:scale-110 transition-transform">
                  <Calendar className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl font-bold">
                  Events & RSVPs
                </CardTitle>
                <CardDescription className="text-sm mt-1">
                  Discover hacking sprints, sports events, and parties. Secure
                  free tickets, manage invitations, and scan check-in QR
                  credentials.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 flex-1">
                {/* Mini Mock Events listings */}
                <div className="p-3 border border-border/80 rounded-xl bg-muted/40 text-xs flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-foreground">
                      Annual Hackathon 2026
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      Tomorrow, 9:00 AM
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 font-bold text-[9px]">
                    RSVP ACTIVE
                  </span>
                </div>
                <div className="p-3 border border-border/80 rounded-xl bg-muted/40 text-xs flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-foreground">
                      Engineering BBQ Social
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      July 20th, 6:00 PM
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 font-bold text-[9px]">
                    214 Attending
                  </span>
                </div>
              </CardContent>
              <CardFooter className="pt-4 border-t border-border/40 mt-6">
                <Link href="/events" className="w-full">
                  <Button
                    variant="ghost"
                    className="w-full justify-between font-bold text-xs rounded-lg group-hover:bg-muted"
                  >
                    Explore RSVPs{" "}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Interactive tap section */}
      <section
        id="nfc-wallet"
        className="relative z-10 py-24 border-t border-border/40 bg-background overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/5 text-green-600 dark:text-green-400 text-xs font-semibold">
              <Shield className="h-3.5 w-3.5" />
              <span>Smart NFC Technology</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              A Unified Smart ID Wallet. Tap and Go.
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              The CampusOS wallet functions as your digital keycard. Access
              dining halls, confirm laundry bookings, authenticate purchases, or
              get admitted to hackathons by simply generating your NFC QR.
            </p>
            <div className="space-y-3.5">
              <div className="flex gap-3">
                <div className="h-6 w-6 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-600 flex-shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5 font-black" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  Zero hardware dependencies: works on any smartphone
                </span>
              </div>
              <div className="flex gap-3">
                <div className="h-6 w-6 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-600 flex-shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5 font-black" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  Secure cryptographical handshakes protect campus funds
                </span>
              </div>
              <div className="flex gap-3">
                <div className="h-6 w-6 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-600 flex-shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5 font-black" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  Auto-refresh QR codes block double-spend operations
                </span>
              </div>
            </div>
            <div className="pt-2">
              <Button
                onClick={triggerTapSimulation}
                disabled={simulatedStatus === "scanning"}
                className="rounded-full font-bold text-sm bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md"
              >
                {simulatedStatus === "idle" && "Simulate Card Tap"}
                {simulatedStatus === "scanning" && "Scanning Near NFC..."}
                {simulatedStatus === "success" && "Transaction Successful! ✅"}
              </Button>
            </div>
          </div>

          <div className="flex justify-center relative">
            {/* Mock Reader device */}
            <div className="w-80 h-96 rounded-[40px] bg-slate-900 border-8 border-slate-800 shadow-2xl relative p-6 flex flex-col items-center justify-between text-white overflow-hidden">
              {/* Inner screen content */}
              <div className="w-full flex justify-between items-center text-[10px] font-bold text-slate-400">
                <span>CAMPUS TERMINAL #14</span>
                <span>ONLINE</span>
              </div>

              {simulatedStatus === "idle" && (
                <div className="flex flex-col items-center text-center my-auto space-y-4">
                  <Smartphone className="h-16 w-16 text-slate-500 animate-pulse" />
                  <p className="text-xs text-slate-400 font-semibold max-w-[180px]">
                    Hold card close to reader or tap button to initiate
                    handshake
                  </p>
                </div>
              )}

              {simulatedStatus === "scanning" && (
                <div className="flex flex-col items-center text-center my-auto space-y-6">
                  <div className="h-20 w-20 rounded-full border-4 border-t-indigo-500 border-indigo-500/20 animate-spin flex items-center justify-center">
                    <Zap className="h-8 w-8 text-indigo-400 animate-bounce" />
                  </div>
                  <p className="text-xs text-indigo-400 font-bold tracking-widest uppercase">
                    Syncing...
                  </p>
                </div>
              )}

              {simulatedStatus === "success" && (
                <div className="flex flex-col items-center text-center my-auto space-y-4 animate-in zoom-in duration-300">
                  <div className="h-16 w-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/20">
                    <Check className="h-8 w-8 text-white stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-white">
                      Payment Received
                    </h4>
                    <p className="text-[11px] text-green-400 mt-1 font-bold">
                      Deducted: KES 300.00
                    </p>
                  </div>
                  <div className="text-[9px] font-mono bg-slate-800 text-slate-400 px-3 py-1 rounded">
                    REF: NFC-9841-A
                  </div>
                </div>
              )}

              {/* Bottom NFC target sign */}
              <div className="w-full border-t border-slate-800 pt-4 flex flex-col items-center space-y-1 bg-slate-900/80">
                <div className="h-2 w-12 rounded bg-slate-800" />
                <span className="text-[8px] font-extrabold tracking-widest text-slate-500 uppercase">
                  NFC READER FIELD
                </span>
              </div>
            </div>

            {/* Absolute positioning background glow based on state */}
            <div
              className={`absolute inset-0 w-80 h-96 rounded-[40px] pointer-events-none blur-2xl transition-opacity duration-500 -z-10 ${
                simulatedStatus === "scanning"
                  ? "bg-indigo-500/20 opacity-100"
                  : simulatedStatus === "success"
                    ? "bg-green-500/20 opacity-100"
                    : "opacity-0"
              }`}
            />
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section
        id="statistics"
        className="relative z-10 py-20 border-t border-border/40 bg-muted/20"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="p-8 border border-border/60 bg-card rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="h-10 w-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-600 mx-auto mb-4">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-foreground">
                15,000+
              </h3>
              <p className="text-sm text-muted-foreground mt-2 font-medium">
                Active Students Authenticated
              </p>
            </div>
            <div className="p-8 border border-border/60 bg-card rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mx-auto mb-4">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-foreground">
                KES 1.2M+
              </h3>
              <p className="text-sm text-muted-foreground mt-2 font-medium">
                Peer Transactions Completed
              </p>
            </div>
            <div className="p-8 border border-border/60 bg-card rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="h-10 w-10 bg-green-500/10 rounded-xl flex items-center justify-center text-green-600 mx-auto mb-4">
                <Shield className="h-5 w-5" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-foreground">
                99.9%
              </h3>
              <p className="text-sm text-muted-foreground mt-2 font-medium">
                Campus Uptime Maintained
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/40 py-12 bg-background transition-colors">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-extrabold text-xs">C</span>
            </div>
            <span className="font-extrabold text-base bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
              CampusOS
            </span>
          </div>

          <p className="text-muted-foreground text-center md:text-left">
            &copy; 2026 CampusOS Inc. Engineered for campus developers and
            students.
          </p>

          <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground">
            <Link href="/dashboard" className="hover:text-foreground">
              Dashboard
            </Link>
            <span>&bull;</span>
            <Link href="/auth" className="hover:text-foreground">
              Sign In
            </Link>
            <span>&bull;</span>
            <a href="#" className="hover:text-foreground">
              Github
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
