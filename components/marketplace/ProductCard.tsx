"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/zustand/cartStore";
import { Badge } from "../ui/badge";
import { toast } from "sonner";

export interface ProductType {
  id: number;
  name: string;
  desc: string;
  price: number;
  category: string;
  condition: "New" | "Like New" | "Good" | "Fair";
  seller: string;
}

const ProductCard = ({ product }: { product: ProductType }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      desc: product.desc,
      price: product.price,
      category: product.category
    });
    toast.success(`Added ${product.name} to cart!`);
  };

  const getConditionColor = (cond: ProductType["condition"]) => {
    switch (cond) {
      case "New": return "bg-green-500/10 border-green-500/20 text-green-500";
      case "Like New": return "bg-blue-500/10 border-blue-500/20 text-blue-500";
      case "Good": return "bg-amber-500/10 border-amber-500/20 text-amber-500";
      case "Fair": return "bg-zinc-500/10 border-zinc-500/20 text-zinc-500";
    }
  };

  return (
    <Card className="relative flex flex-col justify-between h-96 group hover:shadow-lg hover:scale-[1.01] transition-all duration-300 bg-card border-border overflow-hidden rounded-2xl">
      <Link href={`/marketplace/${product.id}`} className="absolute inset-0 -z-10" />
      
      {/* Visual Product Box header */}
      <CardHeader className="h-40 p-0 relative overflow-hidden bg-muted/40 flex items-center justify-center border-b border-border">
        {/* Abstract Gradient Background for visual pop */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-indigo-500/5 group-hover:scale-105 transition-transform duration-500" />
        <div className="text-4xl font-extrabold text-primary/30 tracking-widest uppercase select-none group-hover:scale-110 transition-transform duration-500">
          {product.name.substring(0, 3)}
        </div>
        
        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <Badge variant="outline" className={`${getConditionColor(product.condition)} font-bold text-[10px] px-2 py-0.5 border`}>
            {product.condition}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="text-[10px] bg-background/80 border border-border text-foreground font-semibold px-2 py-0.5">
            {product.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-2 p-4 flex-1">
        <div className="flex justify-between items-start gap-1">
          <CardTitle className="font-bold text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </CardTitle>
        </div>
        <CardDescription className="text-xs text-muted-foreground line-clamp-2 mt-1">
          {product.desc}
        </CardDescription>
        <div className="mt-auto pt-2 text-[10px] text-muted-foreground flex items-center gap-1.5 border-t border-border/40">
          <span>Seller: <strong className="text-foreground">{product.seller}</strong></span>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-4 p-4 border-t border-border/55 bg-muted/10">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Price</span>
          <span className="font-extrabold text-lg text-foreground leading-none">
            {product.price.toLocaleString("en-US", {
              style: "currency",
              currency: "KES",
              minimumFractionDigits: 0
            })}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Button 
            size="sm"
            className="rounded-full font-bold shadow-sm"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="h-3.5 w-3.5" /> Buy
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
