// src/lib/api/type.ts

import { ApiError } from "./util";

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

export type RequestOptions<TBody> = {
	method?: HttpMethod;
	path: string;
	query?: Record<string, string | number | boolean | null | undefined>;
	headers?: HeadersInit;
	body?: TBody;
	signal?: AbortSignal;
	// If you want to skip JSON parsing (file downloads etc.)
	responseType?: "json" | "text" | "blob";
};

export type ApiResponse<T> = {
	status: boolean;
	data?: T;
	error?: ApiError;
};

export type PaginatedPatientsResponse = {
  data: Patient[]
  pagination: Pagination
  metadata: Metadata
}


export type Patient = {
  patient_id?: string
  name?: string
  age?: number
  gender?: "M" | "F"
  blood_pressure?: string
  temperature?: number
  visit_date?: string // ISO date string YYYY-MM-DD
  diagnosis?: string
  medications?: string
}

export type Pagination = {
  page?: number
  lpage?: number
  tpage?: number
  totalPpage?: number
  haspage?: boolean
  hasPrevpage?: boolean
}

export type Metadata = {
  timestamp?: string // ISO datetime
  version?: string
  requestId?: string
}

