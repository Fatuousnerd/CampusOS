import AppSidebar from "@/components/AppSidebar";
import Topbar from "@/components/Topbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <main className="flex flex-col flex-1">
        <Topbar />
        {children}
      </main>
    </SidebarProvider>
  );
}
