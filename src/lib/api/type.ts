// src/lib/api/type.ts

import { ApiError } from "./helper";

export enum HttpMethod {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	PATCH = "PATCH",
	DELETE = "DELETE",
}

export type ApiErrorShape = {
	message?: string;
	error?: string;
	details?: unknown;
	code?: string;
};

export type FetcherOptions = {
	baseUrl?: string;
	headers?: HeadersInit;
	timeoutMs?: number;
	next?: RequestInit["next"];
	cache?: RequestInit["cache"];
};

export type RequestOptions<TBody> = Omit<RequestInit, "body"> & {
	method?: HttpMethod;
	path: string;
	query?: Record<string, string | number | boolean | null | undefined>;
	headers?: HeadersInit;
	body?: TBody;
	signal?: AbortSignal;
	responseType?: "json";
};

export type ApiResponse<T> = {
	data?: T;
	error?: ApiError;
};
