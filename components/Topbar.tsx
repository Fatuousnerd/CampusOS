"use client";

import Link from "next/link";
import { ItemTitle } from "./ui/item";
import { ShoppingBag, Sun, Moon, Trash2, Plus, Minus, CheckCircle, CreditCard, Home, Phone } from "lucide-react";
import { useCart } from "@/lib/zustand/cartStore";
import { useProfile } from "@/lib/zustand/profileStore";
import { useTheme } from "@/hooks/useTheme";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from "./ui/sheet";
import { Button } from "./ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";

const Topbar = () => {
  const { items, addToCart, removeFromCart, updateQuantity, clearCart, getTotalItems, getTotalPrice } = useCart();
  const { balance, deduct, addOrder } = useProfile();
  const { theme, toggleTheme } = useTheme();

  // Checkout dialog state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [dormRoom, setDormRoom] = useState("");
  const [phone, setPhone] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dormRoom || !phone) {
      toast.error("Please fill in all delivery details");
      return;
    }

    const total = getTotalPrice();
    if (balance < total) {
      toast.error("Insufficient Campus Card balance! Please top up on the dashboard.");
      return;
    }

    setIsCheckingOut(true);
    setTimeout(() => {
      const success = deduct(total);
      if (success) {
        // Log individual orders in profile store
        items.forEach((item) => {
          addOrder({
            serviceName: `Marketplace Purchase: ${item.name} (x${item.quantity})`,
            price: item.price * item.quantity,
            category: "marketplace",
            details: `Delivery to Room ${dormRoom}. Phone: ${phone}`
          });
        });

        setIsCheckingOut(false);
        setIsSuccess(true);
        clearCart();
        toast.success("Order placed successfully!");
      } else {
        setIsCheckingOut(false);
        toast.error("Failed to process transaction.");
      }
    }, 1500);
  };

  const closeSuccess = () => {
    setIsSuccess(false);
    setIsCheckoutOpen(false);
    setDormRoom("");
    setPhone("");
  };

  return (
    <div className="w-full h-16 bg-background/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between py-2 px-6 sm:px-10 border-b border-border transition-colors duration-200">
      <ItemTitle className="font-bold text-2xl tracking-tight bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
        <Link href={"/dashboard"}>CampusOS</Link>
      </ItemTitle>

      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full hover:bg-accent hover:text-accent-foreground"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-400" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
        </Button>

        {/* Shopping Cart Drawer */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="relative rounded-full border-border bg-background hover:bg-accent hover:text-accent-foreground"
            >
              <ShoppingBag className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground animate-bounce">
                  {getTotalItems()}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-background border-l border-border">
            <SheetHeader className="pb-4 border-b border-border">
              <SheetTitle className="text-xl font-bold flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" /> Shopping Cart
              </SheetTitle>
              <SheetDescription>
                Review items added from the Campus Marketplace.
              </SheetDescription>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center p-6">
                  <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4 text-muted-foreground">
                    <ShoppingBag className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-lg">Your cart is empty</h3>
                  <p className="text-sm text-muted-foreground mt-1 max-w-[240px]">
                    Browse the Campus Marketplace and add dorm essentials, books, or gear!
                  </p>
                  <SheetClose asChild>
                    <Button className="mt-6 font-medium rounded-full" size="sm">
                      Go to Marketplace
                    </Button>
                  </SheetClose>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-3 rounded-lg border border-border bg-card/50 hover:bg-card transition-all">
                    <div className="h-16 w-16 bg-muted rounded-md flex-shrink-0 flex items-center justify-center overflow-hidden font-bold text-primary border border-border">
                      {item.name.substring(0, 2)}
                    </div>
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <h4 className="font-semibold text-sm truncate text-foreground">{item.name}</h4>
                        <p className="text-xs text-muted-foreground truncate">{item.desc}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-sm text-foreground">
                          {(item.price * item.quantity).toLocaleString("en-US", {
                            style: "currency",
                            currency: "KES",
                            minimumFractionDigits: 0
                          })}
                        </span>
                        <div className="flex items-center gap-1.5 border border-border rounded-lg bg-background p-0.5">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="text-xs font-bold w-5 text-center text-foreground">{item.quantity}</span>
                          <button
                            onClick={() => addToCart(item)}
                            className="p-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => removeFromCart(item.id)}
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 self-start"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <SheetFooter className="mt-auto border-t border-border pt-4 flex flex-col gap-3">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-foreground">
                      {getTotalPrice().toLocaleString("en-US", {
                        style: "currency",
                        currency: "KES",
                        minimumFractionDigits: 0
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold">
                    <span className="text-foreground">Total</span>
                    <span className="text-primary">
                      {getTotalPrice().toLocaleString("en-US", {
                        style: "currency",
                        currency: "KES",
                        minimumFractionDigits: 0
                      })}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-2 w-full">
                  <Button variant="outline" className="rounded-full" onClick={clearCart}>
                    Clear
                  </Button>
                  <Button
                    className="rounded-full font-semibold"
                    onClick={() => setIsCheckoutOpen(true)}
                  >
                    Checkout
                  </Button>
                </div>
              </SheetFooter>
            )}
          </SheetContent>
        </Sheet>
      </div>

      {/* Checkout Dialog */}
      <Dialog open={isCheckoutOpen} onOpenChange={(open) => !isCheckingOut && !isSuccess && setIsCheckoutOpen(open)}>
        <DialogContent className="sm:max-w-md bg-background border border-border">
          {isSuccess ? (
            <div className="flex flex-col items-center text-center py-6">
              <CheckCircle className="h-16 w-16 text-green-500 animate-pulse mb-4" />
              <DialogTitle className="text-2xl font-bold text-foreground">Order Confirmed!</DialogTitle>
              <DialogDescription className="mt-2 text-sm text-muted-foreground max-w-xs">
                Your order is placed. The amount has been deducted from your Student Card.
              </DialogDescription>
              <div className="mt-6 bg-card border border-border rounded-lg p-3 w-full text-left space-y-1.5 text-xs text-foreground">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Deliver To:</span>
                  <span className="font-semibold">Room {dormRoom}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone Contact:</span>
                  <span className="font-semibold">{phone}</span>
                </div>
                <div className="flex justify-between border-t border-border/55 pt-1.5 mt-1.5 text-sm font-semibold">
                  <span className="text-foreground font-bold">Payment Method:</span>
                  <span className="text-primary font-bold">CampusOS Digital ID</span>
                </div>
              </div>
              <Button onClick={closeSuccess} className="mt-6 w-full rounded-full font-semibold">
                Back to Campus Dashboard
              </Button>
            </div>
          ) : (
            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-foreground">Campus Checkout</DialogTitle>
                <DialogDescription>
                  Enter your campus coordinates for delivery and pay using your Student ID Card.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="dorm" className="flex items-center gap-1.5">
                    <Home className="h-4 w-4 text-muted-foreground" /> Dorm Room & Hall
                  </Label>
                  <Input
                    id="dorm"
                    placeholder="e.g. Room 402B, Mandela Hall"
                    value={dormRoom}
                    onChange={(e) => setDormRoom(e.target.value)}
                    required
                    disabled={isCheckingOut}
                    className="bg-background border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-1.5">
                    <Phone className="h-4 w-4 text-muted-foreground" /> Phone Number
                  </Label>
                  <Input
                    id="phone"
                    placeholder="e.g. +254 712 345678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    disabled={isCheckingOut}
                    className="bg-background border-border"
                  />
                </div>

                <div className="bg-muted/50 p-4 rounded-xl space-y-2 border border-border">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <CreditCard className="h-4 w-4" /> Campus Card Balance:
                    </span>
                    <span className="font-bold text-foreground">
                      {balance.toLocaleString("en-US", {
                        style: "currency",
                        currency: "KES",
                        minimumFractionDigits: 0
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-t border-border pt-2 mt-1">
                    <span className="text-muted-foreground font-semibold">Total Order Cost:</span>
                    <span className="font-bold text-primary">
                      {getTotalPrice().toLocaleString("en-US", {
                        style: "currency",
                        currency: "KES",
                        minimumFractionDigits: 0
                      })}
                    </span>
                  </div>
                  {balance < getTotalPrice() && (
                    <p className="text-xs text-destructive font-semibold text-center mt-2">
                      ⚠️ Insufficient balance! Top up KES {(getTotalPrice() - balance)} on the main dashboard.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t border-border pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCheckoutOpen(false)}
                  disabled={isCheckingOut}
                  className="rounded-full"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isCheckingOut || balance < getTotalPrice()}
                  className="rounded-full font-bold flex items-center gap-2"
                >
                  {isCheckingOut ? (
                    <>Processing...</>
                  ) : (
                    <>Pay with Student Card</>
                  )}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Topbar;
