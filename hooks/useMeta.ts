"use client";

import { useState, useEffect } from "react";

export function useMeta(userId?: string) {
  const [data, setData] = useState<{ role: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setData(null);
      setIsLoading(false);
      return;
    }
    // Mock user metadata retrieval
    const timer = setTimeout(() => {
      setData({ role: "student" });
      setIsLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [userId]);

  return { data, isLoading };
}
