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
}

const TOAST_MESSAGES: Record<ToastType, ToastMessage[]> = {
	signIn: [{ title: "Access Authorized" }],
	signUp: [{ title: "Account Created" }],
	signOut: [{ title: "Session Ended" }],
};

export function getAuthToastMessage(type: ToastType): ToastMessage {
	const messages = TOAST_MESSAGES[type];
	return messages[0];
}
