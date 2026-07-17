"use client";

import { useState } from "react";
import ProductCard, { ProductType } from "@/components/marketplace/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, FilterX, SlidersHorizontal, ArrowUpDown } from "lucide-react";

// Mock products database for campus
const initialProducts: ProductType[] = [
  {
    id: 1,
    name: "Introduction to Algorithms (4th Edition)",
    desc: "Essential computer science textbook. In excellent condition, no highlighting or torn pages. Essential for class CS-301.",
    price: 450,
    category: "Books",
    condition: "Like New",
    seller: "Sarah Jenkins"
  },
  {
    id: 2,
    name: "Sony WH-CH710N Wireless Headphones",
    desc: "Active noise-canceling headphones, ideal for studying in the loud library. Battery lasts up to 35 hours. Charging cable included.",
    price: 2500,
    category: "Electronics",
    condition: "Good",
    seller: "James Mwangi"
  },
  {
    id: 3,
    name: "Calculus II Study Guide & Solved Sheets",
    desc: "Handwritten step-by-step solutions for Math-201. Contains mock exams, past formulas, and final summaries that saved my grade.",
    price: 200,
    category: "Books",
    condition: "Fair",
    seller: "Daniel Kim"
  },
  {
    id: 4,
    name: "Dorm Mini Electric Kettle (1.2L)",
    desc: "Compact stainless steel kettle with auto shut-off. Perfect for instant noodles, coffee, or tea in your room. Brand new, in original packaging.",
    price: 850,
    category: "Electronics",
    condition: "New",
    seller: "Alex Mercer"
  },
  {
    id: 5,
    name: "LED Desk Lamp with USB Charger",
    desc: "5 brightness modes, 3 color temperatures, and a built-in USB port to charge your phone while studying. Flexible neck design.",
    price: 600,
    category: "Electronics",
    condition: "Like New",
    seller: "Elena Rostova"
  },
  {
    id: 6,
    name: "North Face Fleece Zip-up Jacket",
    desc: "Size M. Extremely warm and comfortable for cold morning lectures. Only worn a few times, no stains or damages.",
    price: 1200,
    category: "Clothing",
    condition: "Good",
    seller: "Marcus Vance"
  },
  {
    id: 7,
    name: "Midea Compact Mini Fridge (4.4 Cu.Ft.)",
    desc: "Fits perfectly under standard dorm beds. Keeps drinks ice cold and has a small freezer compartment. Cleaned and ready for pickup.",
    price: 4500,
    category: "Electronics",
    condition: "Good",
    seller: "Chloe Bennett"
  },
  {
    id: 8,
    name: "Schwinn Mountain Bike (21-Speed)",
    desc: "Great for commuting across campus and beating the morning rush. Front suspension, hand brakes work perfectly. Comes with lock.",
    price: 8000,
    category: "Sports",
    condition: "Fair",
    seller: "Tyler Durden"
  },
  {
    id: 9,
    name: "Fitted Bedside Felt Pocket Organizer",
    desc: "Conveniently stores phone, tablet, glasses, and remotes next to your lofted dorm bed. Easy tuck-in installation. Brand new.",
    price: 350,
    category: "Housing",
    condition: "New",
    seller: "Emily Watson"
  }
];

const categories = ["All", "Books", "Electronics", "Clothing", "Housing", "Sports"];
const conditions = ["All", "New", "Like New", "Good", "Fair"];

export default function MarketplacePage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCondition, setSelectedCondition] = useState("All");
  const [sortBy, setSortBy] = useState<"none" | "low-high" | "high-low">("none");

  // Filtering logic
  const filteredProducts = initialProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || 
                          product.desc.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesCondition = selectedCondition === "All" || product.condition === selectedCondition;
    return matchesSearch && matchesCategory && matchesCondition;
  });

  // Sorting logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "low-high") return a.price - b.price;
    if (sortBy === "high-low") return b.price - a.price;
    return 0;
  });

  const resetFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setSelectedCondition("All");
    setSortBy("none");
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-8 space-y-6 animate-in fade-in duration-300">
      
      {/* Header section */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center justify-between border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Campus Marketplace</h1>
          <p className="text-muted-foreground mt-1">
            Buy and sell textbooks, dorm gear, electronics, and clothing directly within the student community.
          </p>
        </div>
      </div>

      {/* Control Panel: Search, Categories, Filters */}
      <div className="space-y-4 bg-muted/30 border border-border p-4 rounded-2xl">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search textbooks, mini fridges, kettles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-background border-border"
            />
          </div>
          
          {/* Controls */}
          <div className="flex gap-2 flex-wrap items-center">
            {/* Sorting trigger */}
            <div className="flex items-center gap-1.5 border border-border bg-background px-3 py-1.5 rounded-lg text-xs font-semibold text-foreground">
              <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Sort: </span>
              <select 
                value={sortBy} 
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-transparent font-bold focus:outline-none cursor-pointer"
              >
                <option value="none">Latest</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>

            {/* Condition select */}
            <div className="flex items-center gap-1.5 border border-border bg-background px-3 py-1.5 rounded-lg text-xs font-semibold text-foreground">
              <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Condition: </span>
              <select 
                value={selectedCondition} 
                onChange={(e: any) => setSelectedCondition(e.target.value)}
                className="bg-transparent font-bold focus:outline-none cursor-pointer"
              >
                {conditions.map((cond) => (
                  <option key={cond} value={cond}>{cond}</option>
                ))}
              </select>
            </div>

            {/* Clear Filters Button */}
            {(search || selectedCategory !== "All" || selectedCondition !== "All" || sortBy !== "none") && (
              <Button variant="ghost" size="sm" onClick={resetFilters} className="text-xs text-muted-foreground hover:text-foreground">
                <FilterX className="h-3.5 w-3.5" /> Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Category Pills */}
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

      {/* Product Display Count */}
      <div className="flex justify-between items-center text-xs text-muted-foreground px-1">
        <span>Showing {sortedProducts.length} items</span>
        {selectedCategory !== "All" && <span>Category: <strong>{selectedCategory}</strong></span>}
      </div>

      {/* Products Grid */}
      {sortedProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-border rounded-2xl bg-card">
          <SlidersHorizontal className="h-10 w-10 text-muted-foreground mb-3" />
          <h3 className="font-bold text-lg">No listings match your search</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm">
            Try checking spelling, selecting a different category, or resetting active filters.
          </p>
          <Button className="mt-4 rounded-full" size="sm" onClick={resetFilters}>
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
