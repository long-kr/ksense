export type RiskResult = {
	label: string;
	points: number;
	severity: "low" | "medium" | "high" | "critical" | "invalid";
};

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

export type PaginatedPatientsResponseV2 = {
	patients?: Patient[];
	count?: number;
	total_records?: number;
	current_page?: number;
	per_page?: number;
};

export type PaginatedPatientsResponseV1 = {
	data: Patient[];
	pagination: Pagination;
	metadata: Metadata;
};
export type Gender = "M" | "F";

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
