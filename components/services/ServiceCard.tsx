"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useProfile } from "@/lib/zustand/profileStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Shirt,
  Utensils,
  Printer,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

export interface ServiceType {
  id: string;
  name: string;
  desc: string;
  priceRate: string;
  basePrice: number;
  category: "laundry" | "catering" | "printing" | "cleaning";
}

const ServiceCard = ({ service }: { service: ServiceType }) => {
  const { balance, deduct, addOrder } = useProfile();
  const [isOpen, setIsOpen] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  // Custom Form fields based on category
  const [quantity, setQuantity] = useState(1); // weight in kg for laundry, pages for printing, meals for catering
  const [laundryScent, setLaundryScent] = useState("Lavender");
  const [dietType, setDietType] = useState("Regular");
  const [printingColor, setPrintingColor] = useState("Black & White");
  const [cleaningDormSize, setCleaningDormSize] = useState("Single Room");
  const [instructions, setInstructions] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [fileUploaded, setFileUploaded] = useState(false);

  // Compute live price estimate
  const getPriceEstimate = () => {
    if (service.category === "laundry") return service.basePrice * quantity; // price per kg
    if (service.category === "printing")
      return service.basePrice * quantity * (printingColor === "Color" ? 2 : 1); // price per page
    if (service.category === "catering") return service.basePrice * quantity; // price per meal
    if (service.category === "cleaning")
      return (
        service.basePrice * (cleaningDormSize === "Shared Suite" ? 1.5 : 1)
      ); // base price
    return service.basePrice;
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const finalPrice = getPriceEstimate();

    if (balance < finalPrice) {
      toast.error(
        "Insufficient Campus Card balance! Please top up on the dashboard.",
      );
      return;
    }

    setIsBooking(true);
    setTimeout(() => {
      const success = deduct(finalPrice);
      if (success) {
        let details = "";
        if (service.category === "laundry") {
          details = `${quantity}kg Load, ${laundryScent} scent. Instruction: ${instructions || "None"}`;
        } else if (service.category === "printing") {
          details = `File: Document.pdf (${quantity} pages, ${printingColor}).`;
        } else if (service.category === "catering") {
          details = `${quantity} Meal(s), ${dietType} Diet. Time: ${deliveryTime}`;
        } else if (service.category === "cleaning") {
          details = `${cleaningDormSize} Cleaning. Date: ${deliveryDate} at ${deliveryTime}`;
        }

        // Add order to profile state
        addOrder({
          serviceName: service.name,
          price: finalPrice,
          category: service.category,
          details: details,
        });

        setIsBooking(false);
        setIsOpen(false);
        toast.success(
          `Booked ${service.name} successfully! Check the tracker.`,
        );

        // Reset forms
        setQuantity(1);
        setInstructions("");
        setFileUploaded(false);
      } else {
        setIsBooking(false);
        toast.error("Failed to deduct balance.");
      }
    }, 1200);
  };

  const getIcon = () => {
    switch (service.category) {
      case "laundry":
        return <Shirt className="h-6 w-6 text-blue-500" />;
      case "catering":
        return <Utensils className="h-6 w-6 text-amber-500" />;
      case "printing":
        return <Printer className="h-6 w-6 text-emerald-500" />;
      case "cleaning":
        return <Sparkles className="h-6 w-6 text-purple-500" />;
    }
  };

  const getThemeColor = () => {
    switch (service.category) {
      case "laundry":
        return "text-blue-500 border-blue-500/20 bg-blue-500/10";
      case "catering":
        return "text-amber-600 border-amber-500/20 bg-amber-500/10";
      case "printing":
        return "text-emerald-500 border-emerald-500/20 bg-emerald-500/10";
      case "cleaning":
        return "text-purple-500 border-purple-500/20 bg-purple-500/10";
    }
  };

  return (
    <Card className="flex flex-col justify-between h-[340px] group hover:shadow-md hover:scale-[1.01] transition-all duration-300 bg-card border-border rounded-2xl overflow-hidden">
      {/* Service Header */}
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div
            className={`p-3 rounded-xl border ${getThemeColor()} flex items-center justify-center`}
          >
            {getIcon()}
          </div>
          <Badge
            variant="outline"
            className={`capitalize font-bold text-[10px] ${getThemeColor()}`}
          >
            {service.category}
          </Badge>
        </div>
        <CardTitle className="font-extrabold text-xl text-foreground mt-4 leading-tight group-hover:text-primary transition-colors">
          {service.name}
        </CardTitle>
      </CardHeader>

      {/* Description */}
      <CardContent className="flex-1 pb-4">
        <CardDescription className="text-xs text-muted-foreground leading-normal line-clamp-3">
          {service.desc}
        </CardDescription>
      </CardContent>

      {/* Cost & Booking trigger */}
      <CardFooter className="flex items-center justify-between p-4 border-t border-border bg-muted/10">
        <div className="flex flex-col">
          <span className="text-[9px] uppercase font-bold tracking-wider text-muted-foreground">
            Price Rate
          </span>
          <span className="font-extrabold text-base text-foreground">
            {service.priceRate}
          </span>
        </div>

        <Dialog
          open={isOpen}
          onOpenChange={(open) => !isBooking && setIsOpen(open)}
        >
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="rounded-full font-bold shadow-sm flex items-center gap-1"
            >
              Book Now
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-background border border-border">
            <form onSubmit={handleBooking} className="space-y-4">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold flex items-center gap-2">
                  <span
                    className={`p-1.5 rounded-lg border ${getThemeColor()}`}
                  >
                    {getIcon()}
                  </span>
                  Book {service.name}
                </DialogTitle>
                <DialogDescription>
                  Configure booking parameters. Payment will deduct from your
                  Campus ID balance.
                </DialogDescription>
              </DialogHeader>

              {/* Form Customization based on category */}
              <div className="space-y-4 py-2 text-xs">
                {/* LAUNDRY FORM */}
                {service.category === "laundry" && (
                  <>
                    <div className="space-y-2">
                      <Label
                        htmlFor="weight"
                        className="text-foreground font-semibold"
                      >
                        Laundry Weight Estimate (kg)
                      </Label>
                      <div className="flex items-center gap-3">
                        <Input
                          id="weight"
                          type="number"
                          min="1"
                          max="15"
                          value={quantity}
                          onChange={(e) =>
                            setQuantity(
                              Math.max(1, parseInt(e.target.value) || 1),
                            )
                          }
                          className="w-24 bg-background border-border text-center font-bold"
                        />
                        <span className="text-muted-foreground">
                          Estimated KES {service.basePrice} per kg
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="scent"
                        className="text-foreground font-semibold"
                      >
                        Scent Option
                      </Label>
                      <select
                        id="scent"
                        value={laundryScent}
                        onChange={(e) => setLaundryScent(e.target.value)}
                        className="w-full bg-background border border-border rounded-lg p-2 text-foreground focus:outline-none focus:border-primary font-semibold"
                      >
                        <option value="Lavender">💜 Lavender Scent</option>
                        <option value="Fresh Breeze">
                          💙 Fresh Breeze Scent
                        </option>
                        <option value="Citrus Zest">
                          💛 Citrus Zest Scent
                        </option>
                        <option value="Unscented">
                          🤍 Unscented (Sensitive Skin)
                        </option>
                      </select>
                    </div>
                  </>
                )}

                {/* CATERING FORM */}
                {service.category === "catering" && (
                  <>
                    <div className="space-y-2">
                      <Label
                        htmlFor="meals"
                        className="text-foreground font-semibold"
                      >
                        Number of Meals
                      </Label>
                      <div className="flex items-center gap-3">
                        <Input
                          id="meals"
                          type="number"
                          min="1"
                          max="10"
                          value={quantity}
                          onChange={(e) =>
                            setQuantity(
                              Math.max(1, parseInt(e.target.value) || 1),
                            )
                          }
                          className="w-24 bg-background border-border text-center font-bold"
                        />
                        <span className="text-muted-foreground">
                          KES {service.basePrice} per meal
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="diet"
                        className="text-foreground font-semibold"
                      >
                        Dietary Restrictions
                      </Label>
                      <select
                        id="diet"
                        value={dietType}
                        onChange={(e) => setDietType(e.target.value)}
                        className="w-full bg-background border border-border rounded-lg p-2 text-foreground focus:outline-none focus:border-primary font-semibold"
                      >
                        <option value="Regular">Regular Dining Plan</option>
                        <option value="Vegetarian">Vegetarian Plan</option>
                        <option value="Vegan">Vegan (Plant-Based)</option>
                        <option value="Halal">Halal Certified</option>
                        <option value="Gluten-Free">Gluten-Free</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="time"
                        className="text-foreground font-semibold"
                      >
                        Delivery Time Slot
                      </Label>
                      <select
                        id="time"
                        value={deliveryTime}
                        onChange={(e) => setDeliveryTime(e.target.value)}
                        className="w-full bg-background border border-border rounded-lg p-2 text-foreground focus:outline-none focus:border-primary font-semibold"
                      >
                        <option value="">Select time slot</option>
                        <option value="12:00 PM - 1:00 PM">
                          Lunch (12:00 PM - 1:00 PM)
                        </option>
                        <option value="1:00 PM - 2:00 PM">
                          Lunch (1:00 PM - 2:00 PM)
                        </option>
                        <option value="6:00 PM - 7:00 PM">
                          Dinner (6:00 PM - 7:00 PM)
                        </option>
                        <option value="7:00 PM - 8:00 PM">
                          Dinner (7:00 PM - 8:00 PM)
                        </option>
                      </select>
                    </div>
                  </>
                )}

                {/* PRINTING FORM */}
                {service.category === "printing" && (
                  <>
                    <div className="space-y-2.5">
                      <Label className="text-foreground font-semibold">
                        Upload Document File
                      </Label>
                      <div className="flex items-center gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setFileUploaded(true);
                            toast.success(
                              "File 'Lecture_Notes.pdf' uploaded successfully!",
                            );
                          }}
                          className={`flex-1 font-semibold rounded-lg ${fileUploaded ? "bg-green-500/10 border-green-500/25 text-green-500" : ""}`}
                        >
                          {fileUploaded
                            ? "✓ Lecture_Notes.pdf"
                            : "Choose PDF/Word File"}
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label
                          htmlFor="pages"
                          className="text-foreground font-semibold"
                        >
                          Page Count
                        </Label>
                        <Input
                          id="pages"
                          type="number"
                          min="1"
                          value={quantity}
                          onChange={(e) =>
                            setQuantity(
                              Math.max(1, parseInt(e.target.value) || 1),
                            )
                          }
                          className="bg-background border-border text-center font-bold"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="color"
                          className="text-foreground font-semibold"
                        >
                          Coloring
                        </Label>
                        <select
                          id="color"
                          value={printingColor}
                          onChange={(e) => setPrintingColor(e.target.value)}
                          className="w-full bg-background border border-border rounded-lg p-2 text-foreground focus:outline-none focus:border-primary font-semibold"
                        >
                          <option value="Black & White">
                            Black & White (KES {service.basePrice}/pg)
                          </option>
                          <option value="Color">
                            Color (KES {service.basePrice * 2}/pg)
                          </option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {/* DORM CLEANING FORM */}
                {service.category === "cleaning" && (
                  <>
                    <div className="space-y-2">
                      <Label
                        htmlFor="dormsize"
                        className="text-foreground font-semibold"
                      >
                        Dorm Layout Size
                      </Label>
                      <select
                        id="dormsize"
                        value={cleaningDormSize}
                        onChange={(e) => setCleaningDormSize(e.target.value)}
                        className="w-full bg-background border border-border rounded-lg p-2 text-foreground focus:outline-none focus:border-primary font-semibold"
                      >
                        <option value="Single Room">
                          Single Room (Standard: KES {service.basePrice})
                        </option>
                        <option value="Shared Suite">
                          Shared Suite / Double (+50%: KES{" "}
                          {service.basePrice * 1.5})
                        </option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label
                          htmlFor="date"
                          className="text-foreground font-semibold"
                        >
                          Select Date
                        </Label>
                        <Input
                          id="date"
                          type="date"
                          value={deliveryDate}
                          onChange={(e) => setDeliveryDate(e.target.value)}
                          className="bg-background border-border"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="cleantime"
                          className="text-foreground font-semibold"
                        >
                          Select Time
                        </Label>
                        <Input
                          id="cleantime"
                          type="time"
                          value={deliveryTime}
                          onChange={(e) => setDeliveryTime(e.target.value)}
                          className="bg-background border-border"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Additional instructions */}
                <div className="space-y-2">
                  <Label
                    htmlFor="instructions"
                    className="text-foreground font-semibold"
                  >
                    Additional Special Requests
                  </Label>
                  <Input
                    id="instructions"
                    placeholder="e.g. Leave package outside door, call when arrived..."
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="bg-background border-border"
                  />
                </div>

                {/* Payment Overview */}
                <div className="bg-muted/50 p-4 rounded-xl border border-border space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">
                      Estimated Cost:
                    </span>
                    <span className="font-extrabold text-base text-primary">
                      {getPriceEstimate().toLocaleString("en-US", {
                        style: "currency",
                        currency: "KES",
                        minimumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-muted-foreground border-t border-border/50 pt-2 mt-1">
                    <span>Smart Card Balance:</span>
                    <span>
                      {balance.toLocaleString("en-US", {
                        style: "currency",
                        currency: "KES",
                        minimumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                  {balance < getPriceEstimate() && (
                    <div className="flex items-center gap-1 text-[10px] text-destructive font-bold justify-center mt-2.5">
                      <AlertTriangle className="h-3.5 w-3.5" /> Insufficient
                      balance to authorize booking.
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t border-border pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  disabled={isBooking}
                  className="rounded-full"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={
                    isBooking ||
                    balance < getPriceEstimate() ||
                    (service.category === "printing" && !fileUploaded)
                  }
                  className="rounded-full font-bold"
                >
                  {isBooking ? "Authorizing..." : "Confirm Booking"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
