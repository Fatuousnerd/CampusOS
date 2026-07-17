"use client";

import Image from "next/image";
import { Item, ItemTitle } from "./ui/item";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import Link from "next/link";
import { LayoutDashboard, Calendar, ShoppingBag, Wrench } from "lucide-react";

const AppSidebar = () => {
  const { open } = useSidebar();
  return (
    <>
      <Sidebar collapsible="icon" variant="floating">
        <SidebarHeader>
          <Item variant={"muted"}>
            <Image src={"globe.svg"} alt="Logo" width={50} height={50} />
            {open && (
              <ItemTitle className="font-bold text-2xl">CampusOS</ItemTitle>
            )}
          </Item>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroupContent className="px-3">
            <SidebarMenu>
              {[
                { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
                {
                  name: "Marketplace",
                  path: "/marketplace",
                  icon: ShoppingBag,
                },
                { name: "Services", path: "/services", icon: Wrench },
                { name: "Events", path: "/events", icon: Calendar },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton className="capitalize" asChild>
                      <Link href={item.path}>
                        <Icon className="h-4 w-4" /> <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarContent>
        <SidebarFooter></SidebarFooter>
      </Sidebar>
    </>
  );
};

export default AppSidebar;
