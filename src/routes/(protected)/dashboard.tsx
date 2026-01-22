import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/(protected)/dashboard")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();

	async function handleSignOut() {
		await authClient.signOut(
			{},
			{
				onSuccess: () => {
					toast.info("Sign out Successful.");
					navigate({ to: "/sign-in" });
				},
			},
		);
	}

	return (
		<div>
			Hello "/dashboard/"!<Button onClick={handleSignOut}>Sign Out</Button>
		</div>
	);
}
