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

export type PaginatedPatientsResponseV1 = {
	data: Patient[];
	pagination: Pagination;
	metadata: Metadata;
};

type Gender = "M" | "F";

export type Patient = {
	patient_id?: string;
	name?: string;
	age?: number;
	gender?: Gender;
	blood_pressure?: string;
	temperature?: number;
	visit_date?: string; // ISO date string YYYY-MM-DD
	diagnosis?: string;
	medications?: string;
};

export type Pagination = {
	page?: number;
	limit?: number;
	total?: number;
	totalPages?: number;
	hasNext?: boolean;
	hasPrevious?: boolean;
};

export type Metadata = {
	timestamp?: string; // ISO datetime
	version?: string;
	requestId?: string;
};

export type PaginatedPatientsResponseV2 = {
	patients?: Patient[];
	count?: number;
	total_records?: number;
	current_page?: number;
	per_page?: number;
};
