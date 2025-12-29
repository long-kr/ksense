import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 *  Converts a string or array of strings to an integer.
 *  Safe to use with query parameters.
 * @param v : string | string[] | undefined
 * @param fallback : number
 * @returns : number
 * @example
 * ```typescript
 * toInt("42", 10); // returns 42
 * toInt(["100"], 10); // returns 100
 * toInt(undefined, 10); // returns 10
 * toInt("invalid", 10); // returns 10
 * ```
 */

export function toInt(v: string | string[] | undefined, fallback: number) {
	const raw = Array.isArray(v) ? v[0] : v;
	const n = Number(raw);
	return Number.isFinite(n) && n > 0 ? Math.floor(n) : fallback;
}
