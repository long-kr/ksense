// src/lib/api/util.ts

import { ApiErrorShape } from "./type";

/**
 * Custom error class for API-related errors.
 * Extends the base Error class with additional properties for HTTP status, URL, and response data.
 */
export class ApiError extends Error {
	status: number;
	url: string;
	data?: ApiErrorShape | unknown;

	constructor(args: {
		status: number;
		url: string;
		message: string;
		data?: unknown;
	}) {
		super(args.message);
		this.name = "ApiError";
		this.status = args.status;
		this.url = args.url;
		this.data = args.data;
	}
}

/**
 * Creates an AbortController that triggers after a specified timeout or when an external signal aborts.
 * @param signal - Optional external AbortSignal to listen to
 * @param timeoutMs - Timeout duration in milliseconds
 * @returns An object containing the AbortSignal and a cleanup function to clear resources
 */
export function withTimeout(
	signal: AbortSignal | undefined,
	timeoutMs: number
) {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), timeoutMs);

	const onAbort = () => controller.abort();
	if (signal) signal.addEventListener("abort", onAbort, { once: true });

	const cleanup = () => {
		clearTimeout(timeout);
		if (signal) signal.removeEventListener("abort", onAbort);
	};

	return { signal: controller.signal, cleanup };
}

/**
 * Safely attempts to parse a Response as JSON.
 * Only parses if the content-type header indicates JSON.
 * @param res - The Response object to parse
 * @returns The parsed JSON object if successful, undefined otherwise
 */
export async function safeParseJson(res: Response) {
	const contentType = res.headers.get("content-type") || "";

	if (!contentType.includes("application/json")) return undefined;

	try {
		return await res.json();
	} catch {
		return undefined;
	}
}
