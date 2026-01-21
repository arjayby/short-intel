import { createFileRoute, Link } from "@tanstack/react-router";
import { ColorBends } from "@/components/color-bends";
import { SignUpForm } from "@/components/sign-up-form";
import { authedMiddleware } from "@/middlewares/authed";

export const Route = createFileRoute("/sign-up")({
	component: RouteComponent,
	server: {
		middleware: [authedMiddleware],
	},
});

function RouteComponent() {
	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="relative flex flex-col gap-4 border-2 border-zinc-800 p-6 md:p-10">
				<div className="pointer-events-none absolute inset-0">
					<div className="absolute -left-px -top-px h-16 w-16 border-l-2 border-t-2 border-zinc-400" />
					<div className="absolute -right-px -top-px h-16 w-16 border-r-2 border-t-2 border-zinc-400" />
					<div className="absolute -bottom-px -left-px h-16 w-16 border-b-2 border-l-2 border-zinc-400" />
					<div className="absolute -bottom-px -right-px h-16 w-16 border-b-2 border-r-2 border-zinc-400" />
				</div>

				<div className="flex justify-center gap-2 md:justify-start">
					<Link to="/" className="flex items-center gap-2 font-medium">
						<img src="/src/logo.svg" alt="ShortIntel" className="size-8" />
						<span className="text-xl font-bold tracking-tighter font-mono">
							short-intel
						</span>
					</Link>
				</div>
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-xs">
						<SignUpForm />
					</div>
				</div>
			</div>
			<div className="relative hidden lg:block">
				<ColorBends
					rotation={0}
					speed={0.2}
					colors={["#85cc23"]}
					transparent
					autoRotate={0}
					scale={1}
					frequency={1}
					warpStrength={1}
					mouseInfluence={1}
					parallax={0.5}
					noise={0.1}
				/>
			</div>
		</div>
	);
}
