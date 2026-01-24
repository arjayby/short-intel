"use client";

import { Link } from "@tanstack/react-router";
import {
	Bell,
	Bookmark,
	Eye,
	Flame,
	LayoutDashboard,
	LifeBuoy,
	Search,
	Send,
	TrendingUp,
} from "lucide-react";
import type * as React from "react";
import { NavMain } from "@/components/nav-main";
import { NavOrganize } from "@/components/nav-organize";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavNotification } from "./nav-notification";

const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	navMain: [
		{
			title: "Overview",
			url: "/overview",
			icon: LayoutDashboard,
			isActive: true,
		},
		{
			title: "Viral Shorts",
			url: "/viral-shorts",
			icon: Flame,
		},
		{
			title: "Rising Channels",
			url: "/rising-channels",
			icon: TrendingUp,
		},
		{
			title: "Discover",
			url: "/discover",
			icon: Search,
		},
	],
	organize: [
		{
			name: "Saved",
			url: "/saved",
			icon: Bookmark,
		},
		{
			name: "Monitor",
			url: "/monitor",
			icon: Eye,
		},
	],
	notifications: [
		{
			name: "Alerts",
			url: "/alerts",
			icon: Bell,
		},
	],
	navSecondary: [
		{
			title: "Support",
			url: "#",
			icon: LifeBuoy,
		},
		{
			title: "Feedback",
			url: "#",
			icon: Send,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar variant="inset" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<Link to="/" className="font-medium">
								<div className="flex justify-center items-center gap-2 md:justify-start">
									<img
										src="/src/logo.svg"
										alt="ShortIntel"
										className="size-8"
									/>
									<span className="text-md font-bold tracking-tighter font-mono">
										short-intel
									</span>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavOrganize organize={data.organize} />
				<NavNotification notifications={data.notifications} />
				<NavSecondary items={data.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
		</Sidebar>
	);
}
