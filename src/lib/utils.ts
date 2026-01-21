/**
 * Merge class names with tailwind-merge.
 */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Get a random toast message for a given toast type.
 */
type ToastType = "signIn" | "signUp" | "signOut";

interface ToastMessage {
	title: string;
	description: string;
}

const TOAST_MESSAGES: Record<ToastType, ToastMessage[]> = {
	signIn: [
		{ title: "Welcome back, legend", description: "We saved your seat." },
		{ title: "And… you're in", description: "Hope you brought snacks." },
		{
			title: "Login successful",
			description: "The gates are open. Don't trip.",
		},
		{ title: "Logged in fr", description: "As the prophecy foretold." },
		{ title: "It worked 👀", description: "No thoughts, just access." },
	],
	signUp: [
		{
			title: "You're one of us now",
			description: "No secret handshake required.",
		},
		{
			title: "Account created!",
			description: "A brand-new adventure unlocked.",
		},
		{
			title: "Welcome aboard",
			description: "We're legally allowed to be excited.",
		},
		{ title: "You did that", description: "Character development moment." },
		{ title: "Account unlocked 🔓", description: "New era just dropped." },
	],
	signOut: [
		{ title: "See you later", description: "Don't be a stranger." },
		{
			title: "You've logged out",
			description: "We'll be right here when you're back.",
		},
		{ title: "Logging off", description: "Touching grass (optional)." },
		{ title: "You escaped", description: "For now." },
		{ title: "Byeeee 👋", description: "Don't ghost us forever." },
	],
};

export function getRandomToast(type: ToastType): ToastMessage {
	const messages = TOAST_MESSAGES[type];
	const index = Math.floor(Math.random() * messages.length);
	return messages[index];
}
