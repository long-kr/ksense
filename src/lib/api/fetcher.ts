/**
 * Creates a configured HTTP fetcher instance with utility methods for making API requests.
 *
 * @param config - Optional configuration for the fetcher
 * @param config.baseUrl - Base URL for all requests. Defaults to NEXT_PUBLIC_API_BASE_URL environment variable or empty string
 * @param config.timeoutMs - Request timeout in milliseconds. Defaults to 15000ms (15 seconds)
 * @param config.headers - Default headers to include in all requests
 * @param config.next - Next.js specific fetch options for caching and revalidation
 * @param config.cache - Cache control options for fetch requests
 *
 * @returns An object containing the following methods:
 * - `request<TResponse, TBody>`: Generic method for making HTTP requests
 * - `get<T>`: Shorthand for GET requests
 * - `post<T, B>`: Shorthand for POST requests with body
 * - `put<T, B>`: Shorthand for PUT requests with body
 *
 * @throws {ApiError} When the HTTP response is not OK (status >= 400)
 *
 * @example
 * ```typescript
 * const fetcher = createFetcher({ baseUrl: 'https://api.example.com' });
 * const data = await fetcher.get<User>('/users/123');
 * ```
 */

// src/lib/fetcher.ts

import { ApiError, safeParseJson, withTimeout } from "./helper";
import {
	ApiErrorShape,
	FetcherOptions,
	HttpMethod,
	RequestOptions,
} from "./type";

export function createFetcher(config: FetcherOptions = {}) {
	const baseUrl = config.baseUrl ?? process.env.KSENSE_BASE_URL ?? "";
	const timeoutMs = config.timeoutMs ?? 15 * 1000;
	const defaultHeaders = config.headers;

	async function request<TResponse, TBody = unknown>(
		opts: RequestOptions<TBody>,
		retryCount = 3
	): Promise<TResponse> {
		const method = opts.method ?? "GET";

		const qs = opts.query
			? `?${new URLSearchParams(
					Object.fromEntries(
						Object.entries(opts.query).filter(([, v]) => v != null)
					) as Record<string, string>
			  ).toString()}`
			: "";

		const url = `${baseUrl}${opts.path.startsWith("/") ? "" : "/"}${
			opts.path
		}${qs}`;

		const headers = new Headers({
			...defaultHeaders,
			...opts.headers,
		});

		const hasBody = opts.body !== undefined && method !== "GET";

		if (hasBody && !headers.has("content-type")) {
			headers.set("content-type", "application/json");
		}

		const { signal: timedSignal, cleanup } = withTimeout(
			opts.signal,
			timeoutMs
		);

		try {
			const res = await fetch(url, {
				method,
				headers,
				body: hasBody ? JSON.stringify(opts.body) : undefined,
				signal: timedSignal,
				next: config.next,
				cache: config.cache,
			});

			if (!res.ok) {
				console.log("res not ok", res.status);
				if (retryCount > 0 && res.status === 429) {
					// Handle rate limiting
					console.log("rate limited, retrying...", retryCount);
					await retryDelayCountDown(3000);
					return request<TResponse, TBody>(opts, retryCount - 1);
				}

				if (retryCount > 0 && res.status >= 500) {
					// Retry on server errors
					console.log("res not ok, retrying...", retryCount);
					await retryDelayCountDown(500);
					return request<TResponse, TBody>(opts, retryCount - 1);
				}

				const data = await safeParseJson(res);
				const message =
					(data as ApiErrorShape | undefined)?.message ||
					(data as ApiErrorShape | undefined)?.error ||
					`Request failed with status ${res.status}`;

				throw new ApiError({ status: res.status, url, message, data });
			}

			return (await res.json()) as TResponse;
		} finally {
			cleanup();
		}
	}

	return {
		request,
		get: <T>(
			path: string,
			opts?: Omit<RequestOptions<never>, "path" | "method" | "body">
		) => request<T>({ ...opts, path, method: HttpMethod.GET }),
		post: <T, B>(
			path: string,
			body: B,
			opts?: Omit<RequestOptions<B>, "path" | "method" | "body">
		) => request<T, B>({ ...opts, path, method: HttpMethod.POST, body }),
		put: <T, B>(
			path: string,
			body: B,
			opts?: Omit<RequestOptions<B>, "path" | "method" | "body">
		) => request<T, B>({ ...opts, path, method: HttpMethod.PUT, body }),
	};
}

const retryDelayCountDown = (delayMs: number) =>
	new Promise((resolve) => setTimeout(resolve, delayMs));

export const api = createFetcher({
	timeoutMs: 15 * 1000,
	headers: {
		"x-api-key": process.env.KSENSE_API_KEY || "",
	},
});
