import type * as React from "react";

import { cn } from "@/lib/utils";

function Card({
	className,
	size = "default",
	decorations = false,
	children,
	...props
}: React.ComponentProps<"div"> & {
	size?: "default" | "sm";
	decorations?: boolean;
}) {
	return (
		<div
			data-slot="card"
			data-size={size}
			className={cn(
				"ring-foreground/10 bg-card text-card-foreground gap-4 overflow-hidden rounded-lg py-4 has-[data-slot=card-footer]:pb-0 text-xs/relaxed ring-1 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 *:[img:first-child]:rounded-t-lg *:[img:last-child]:rounded-b-lg group/card flex flex-col relative",
				decorations && "rounded-none overflow-visible",
				className,
			)}
			{...props}
		>
			{children}
			{decorations && (
				<div className={cn("absolute -left-px -top-px z-10")}>
					<div className="relative">
						<div className="bg-muted-foreground w-px h-[7.87px] rounded-full absolute top-0" />
						<div className="bg-muted-foreground w-[7.87px] h-px rounded-full absolute left-0" />
					</div>
				</div>
			)}

			{decorations && (
				<div className={cn("absolute right-0 -top-px z-10")}>
					<div className="relative">
						<div className="bg-muted-foreground w-px h-[7.87px] rounded-full absolute top-0" />
						<div className="bg-muted-foreground w-[7.87px] h-px rounded-full absolute -left-1.75" />
					</div>
				</div>
			)}

			{decorations && (
				<div className={cn("absolute -left-px bottom-0 z-10")}>
					<div className="relative">
						<div className="bg-muted-foreground w-px h-[7.87px] rounded-full absolute -top-1.75" />
						<div className="bg-muted-foreground w-[7.87px] h-px rounded-full absolute left-0" />
					</div>
				</div>
			)}

			{decorations && (
				<div className={cn("absolute right-0 bottom-0 z-10")}>
					<div className="relative">
						<div className="bg-muted-foreground w-px h-[7.87px] rounded-full absolute -top-1.75" />
						<div className="bg-muted-foreground w-[7.87px] h-px rounded-full absolute -left-1.75" />
					</div>
				</div>
			)}
		</div>
	);
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-header"
			className={cn(
				"gap-1 rounded-t-xl px-6 group-data-[size=sm]/card:px-4 [.border-b]:pb-6 group-data-[size=sm]/card:[.border-b]:pb-4 group/card-header @container/card-header grid auto-rows-min items-start has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]",
				className,
			)}
			{...props}
		/>
	);
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-title"
			className={cn(
				"text-base leading-normal font-medium group-data-[size=sm]/card:text-sm",
				className,
			)}
			{...props}
		/>
	);
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-description"
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	);
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-action"
			className={cn(
				"col-start-2 row-span-2 row-start-1 self-start justify-self-end",
				className,
			)}
			{...props}
		/>
	);
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-content"
			className={cn("px-6 group-data-[size=sm]/card:px-4", className)}
			{...props}
		/>
	);
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-footer"
			className={cn(
				"rounded-b-xl px-6 group-data-[size=sm]/card:px-4 [.border-t]:pt-6 group-data-[size=sm]/card:[.border-t]:pt-4 flex items-center",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardAction,
	CardDescription,
	CardContent,
};
