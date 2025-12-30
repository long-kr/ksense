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

export function toInt(
	v: string | string[] | undefined | null,
	fallback: number
) {
	const raw = Array.isArray(v) ? v[0] : v;
	const n = Number(raw);
	return Number.isFinite(n) && n > 0 ? Math.floor(n) : fallback;
}

/**
 * Checks if a value is a finite number.
 * @param value - The value to check.
 * @returns True if the value is a finite number, false otherwise.
 * @example
 * ```typescript
 * isNumber(42); // returns true
 * isNumber(NaN); // returns false
 * isNumber(Infinity); // returns false
 * isNumber("42"); // returns false
 * isNumber(null); // returns false
 * ```
 */
export function isNumber(value: unknown): boolean {
	return typeof value === "number" && Number.isFinite(value);
}

/**
 * Parses a string to a number safely.
 * @param value - The string to parse.
 * @returns The parsed number, or null if parsing fails.
 * @example
 * ```typescript
 * parseNumeric("42"); // returns 42
 * parseNumeric("3.14"); // returns 3.14
 * parseNumeric("invalid"); // returns null
 * parseNumeric(""); // returns null
 * parseNumeric(null); // returns null
 * ```
 */

export function parseNumeric(value: unknown): number | null {
	if (typeof value !== "string") return null;
	if (value.trim() === "") return null;

	const n = Number(value);
	return Number.isFinite(n) ? n : null;
}
