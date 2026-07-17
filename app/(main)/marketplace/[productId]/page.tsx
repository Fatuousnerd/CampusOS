"use client";

import { useParams, useRouter } from "next/navigation";
import { useCart } from "@/lib/zustand/cartStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ArrowLeft,
  ShoppingBag,
  MessageSquare,
  Shield,
  Send,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Mock products database matching the list in marketplace page
const mockProducts = [
  {
    id: 1,
    name: "Introduction to Algorithms (4th Edition)",
    desc: "Essential computer science textbook. In excellent condition, no highlighting or torn pages. Essential for class CS-301. Covers advanced graph networks, matrix multiplication, dynamic programming, and heaps. Very hard to find at the campus store!",
    price: 450,
    category: "Books",
    condition: "Like New" as const,
    seller: "Sarah Jenkins",
    sellerPhone: "+254 701 445588",
    dorm: "Grace Hall, Rm 102",
  },
  {
    id: 2,
    name: "Sony WH-CH710N Wireless Headphones",
    desc: "Active noise-canceling headphones, ideal for studying in the loud library. Battery lasts up to 35 hours. Charging cable included. Clean ear pads, works flawlessly. Only selling because I upgraded.",
    price: 2500,
    category: "Electronics",
    condition: "Good" as const,
    seller: "James Mwangi",
    sellerPhone: "+254 711 223344",
    dorm: "Mandela Hall, Rm 304",
  },
  {
    id: 3,
    name: "Calculus II Study Guide & Solved Sheets",
    desc: "Handwritten step-by-step solutions for Math-201. Contains mock exams, past formulas, and final summaries that saved my grade. Written in neat calligraphy. Contains tips on integration by parts, Taylor series, and volume of solids.",
    price: 200,
    category: "Books",
    condition: "Fair" as const,
    seller: "Daniel Kim",
    sellerPhone: "+254 722 556677",
    dorm: "Winston Churchill Hall, Rm 009",
  },
  {
    id: 4,
    name: "Dorm Mini Electric Kettle (1.2L)",
    desc: "Compact stainless steel kettle with auto shut-off. Perfect for instant noodles, coffee, or tea in your room. Brand new, in original packaging. Has a cool indicator light.",
    price: 850,
    category: "Electronics",
    condition: "New" as const,
    seller: "Alex Mercer",
    sellerPhone: "+254 733 889900",
    dorm: "Timbuktu Hostel, Rm 42",
  },
  {
    id: 5,
    name: "LED Desk Lamp with USB Charger",
    desc: "5 brightness modes, 3 color temperatures, and a built-in USB port to charge your phone while studying. Flexible neck design. Touch control pad, energy efficient.",
    price: 600,
    category: "Electronics",
    condition: "Like New" as const,
    seller: "Elena Rostova",
    sellerPhone: "+254 744 112233",
    dorm: "Grace Hall, Rm 221",
  },
  {
    id: 6,
    name: "North Face Fleece Zip-up Jacket",
    desc: "Size M. Extremely warm and comfortable for cold morning lectures. Only worn a few times, no stains or damages. Dark blue color, machine washable.",
    price: 1200,
    category: "Clothing",
    condition: "Good" as const,
    seller: "Marcus Vance",
    sellerPhone: "+254 755 443322",
    dorm: "Mandela Hall, Rm 115",
  },
  {
    id: 7,
    name: "Midea Compact Mini Fridge (4.4 Cu.Ft.)",
    desc: "Fits perfectly under standard dorm beds. Keeps drinks ice cold and has a small freezer compartment. Cleaned and ready for pickup. Energy star certified.",
    price: 4500,
    category: "Electronics",
    condition: "Good" as const,
    seller: "Chloe Bennett",
    sellerPhone: "+254 766 887766",
    dorm: "Pioneer Hostel, Rm 211",
  },
  {
    id: 8,
    name: "Schwinn Mountain Bike (21-Speed)",
    desc: "Great for commuting across campus and beating the morning rush. Front suspension, hand brakes work perfectly. Comes with lock and security cable.",
    price: 8000,
    category: "Sports",
    condition: "Fair" as const,
    seller: "Tyler Durden",
    sellerPhone: "+254 777 990011",
    dorm: "Basement Dorm, Rm B12",
  },
  {
    id: 9,
    name: "Fitted Bedside Felt Pocket Organizer",
    desc: "Conveniently stores phone, tablet, glasses, and remotes next to your lofted dorm bed. Easy tuck-in installation. Brand new. Dark gray heavy-duty felt.",
    price: 350,
    category: "Housing",
    condition: "New" as const,
    seller: "Emily Watson",
    sellerPhone: "+254 788 110022",
    dorm: "Grace Hall, Rm 310",
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const productId = parseInt(params?.productId as string);
  const product = mockProducts.find((p) => p.id === productId);

  // Chat interface simulator state
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [isSending, setIsSending] = useState(false);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <h2 className="text-2xl font-bold text-foreground">
          Product Not Found
        </h2>
        <p className="text-muted-foreground mt-2">
          The product you are trying to view does not exist or has been sold.
        </p>
        <Button
          onClick={() => router.push("/marketplace")}
          className="mt-4 rounded-full"
        >
          Back to Marketplace
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      desc: product.desc,
      price: product.price,
      category: product.category,
    });
    toast.success(`Added ${product.name} to cart!`);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    setIsSending(true);
    const userMsg = chatMessage;
    setChatHistory((prev) => [...prev, `You: ${userMsg}`]);
    setChatMessage("");

    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        `${product.seller}: Hey! Yes, it's still available. I can meet you at the Student Union building or outside my dorm (${product.dorm}) around 4:00 PM today. Let me know!`,
      ]);
      setIsSending(false);
      toast.success(`Message sent to ${product.seller}!`);
    }, 1000);
  };

  return (
    <div className="flex-1 w-full max-w-6xl mx-auto p-4 sm:p-8 space-y-6 animate-in fade-in duration-300">
      {/* Back button */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/marketplace")}
          className="rounded-full text-xs text-muted-foreground hover:text-foreground flex items-center gap-1.5"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Marketplace
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left columns: Details & description */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-card border-border rounded-2xl overflow-hidden shadow-sm">
            <div className="h-64 sm:h-80 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 flex items-center justify-center border-b border-border relative">
              <span className="text-7xl font-black text-primary/10 tracking-widest uppercase select-none">
                {product.name.substring(0, 3)}
              </span>
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge
                  variant="outline"
                  className="bg-primary/10 border-primary/20 text-primary font-bold"
                >
                  {product.category}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-amber-500/10 border-amber-500/20 text-amber-500 font-bold"
                >
                  {product.condition}
                </Badge>
              </div>
            </div>

            <CardContent className="p-6 space-y-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight leading-tight">
                  {product.name}
                </h1>
                <div className="mt-2 text-2xl font-black text-primary">
                  {product.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "KES",
                    minimumFractionDigits: 0,
                  })}
                </div>
              </div>

              <div className="border-t border-border/60 pt-4">
                <h3 className="font-bold text-sm text-foreground mb-2">
                  Item Description
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {product.desc}
                </p>
              </div>

              <div className="flex gap-2.5 pt-4">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 rounded-full font-bold h-11 flex items-center justify-center gap-2 shadow"
                >
                  <ShoppingBag className="h-4 w-4" /> Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Secure trade warnings */}
          <Card className="bg-muted/30 border border-border/80 rounded-2xl p-4 flex gap-3 text-xs leading-normal">
            <Shield className="h-5 w-5 text-indigo-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-foreground">
                Secure Campus Trading Guide
              </h4>
              <p className="text-muted-foreground text-[11px] mt-0.5">
                Always meet in public, well-lit spaces on campus (e.g. library
                lobbies, dining halls, or Student Union buildings). Inspect the
                item thoroughly before making card or balance payments.
              </p>
            </div>
          </Card>
        </div>

        {/* Right column: Seller info & messaging */}
        <div className="space-y-6">
          {/* Seller Card */}
          <Card className="bg-card border-border rounded-2xl shadow-sm overflow-hidden">
            <CardHeader className="border-b border-border bg-muted/20">
              <CardTitle className="text-base font-bold">
                Seller Information
              </CardTitle>
              <CardDescription>
                Verify coordinates to organize pickup.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary text-base">
                  {product.seller.substring(0, 2)}
                </div>
                <div>
                  <h4 className="font-bold text-foreground">
                    {product.seller}
                  </h4>
                  <span className="text-xs text-muted-foreground">
                    Student Seller
                  </span>
                </div>
              </div>

              <div className="space-y-2 border-t border-border pt-4 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Coordinates:</span>
                  <span className="font-semibold text-foreground">
                    {product.dorm}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone Contact:</span>
                  <span className="font-semibold text-foreground">
                    {product.sellerPhone}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chat Simulator */}
          <Card className="bg-card border-border rounded-2xl shadow-sm overflow-hidden flex flex-col h-80">
            <CardHeader className="border-b border-border p-3 bg-muted/10">
              <CardTitle className="text-xs font-bold flex items-center gap-1.5 text-foreground">
                <MessageSquare className="h-3.5 w-3.5 text-primary" /> Chat with{" "}
                {product.seller.split(" ")[0]}
              </CardTitle>
            </CardHeader>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2.5 text-xs">
              {chatHistory.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground text-[11px] p-4">
                  <p>
                    Send a message to schedule a pickup or negotiate the price.
                  </p>
                </div>
              ) : (
                chatHistory.map((msg, index) => {
                  const isUser = msg.startsWith("You:");
                  const sender = isUser ? "You" : product.seller.split(" ")[0];
                  const text = isUser
                    ? msg.substring(4)
                    : msg.substring(product.seller.length + 2);
                  return (
                    <div
                      key={index}
                      className={`flex flex-col max-w-[85%] p-2 rounded-xl border leading-relaxed ${
                        isUser
                          ? "ml-auto bg-primary border-primary/20 text-primary-foreground rounded-br-none"
                          : "bg-muted border-border text-foreground rounded-bl-none"
                      }`}
                    >
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider block mb-0.5 ${
                          isUser
                            ? "text-primary-foreground/75"
                            : "text-muted-foreground"
                        }`}
                      >
                        {sender}
                      </span>
                      <span>{text}</span>
                    </div>
                  );
                })
              )}
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSendMessage}
              className="border-t border-border p-2 bg-muted/20 flex gap-2"
            >
              <input
                type="text"
                placeholder="Type a message..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                disabled={isSending}
                className="flex-1 bg-background border border-border rounded-full px-3 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary disabled:opacity-50"
              />
              <Button
                type="submit"
                size="icon"
                className="rounded-full shrink-0 h-7 w-7"
                disabled={isSending || !chatMessage.trim()}
              >
                <Send className="h-3 w-3" />
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
