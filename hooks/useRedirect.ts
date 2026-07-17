"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "./useUser";
import { useMeta } from "./useMeta";
import { useLoading } from "@/lib/zustand/stores";

export function useRedirect(redirectPath?: string) {
  const router = useRouter();
  const pathname = usePathname();

  const { user } = useUser();
  const { data: meta, isLoading: metaLoading } = useMeta(user?.id);
  const userLoading = useLoading((s) => s.loading.user);

  useEffect(() => {
    if (userLoading || metaLoading) return;

    if (!user) {
      router.push(redirectPath ?? "/auth");
      return;
    }

    if (pathname === "/auth") {
      router.push("/chat");
      return;
    }
  }, [user, meta, userLoading, metaLoading, pathname, redirectPath, router]);
}
