// table with patient data
"use client";

import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import {
	PaginatedPatientsResponseV1,
	PaginatedPatientsResponseV2,
	Patient,
} from "@/lib/api/type";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { PatientCard } from "./PatientCard";

type Props = {
	patientsData?: PaginatedPatientsResponseV1 | PaginatedPatientsResponseV2;
};

export function PatientTable({ patientsData }: Props) {
	const searchParams = useSearchParams();

	const { data, metadata, pagination, patients, total_records } =
		patientsData || {};

	const { hasNext, hasPrevious, total, totalPages } = pagination || {};

	const safeData: Patient[] = data || patients || [];
	const safeTotal = total || total_records || 0;

	const safePageNumber = parseInt(searchParams.get("page")!);
	const safeLimitNumber = parseInt(searchParams.get("limit")!);

	const safeTotalPage = totalPages || Math.ceil(safeTotal / safeLimitNumber);

	const handlePreiousClick = () => {
		if (hasPrevious || safePageNumber > 1) {
			const params = new URLSearchParams(searchParams);
			params.set("page", String(safePageNumber - 1));
			params.set("limit", String(safeLimitNumber));
			return `?${params.toString()}`;
		}
		return;
	};

	const handleNextClick = () => {
		if (hasNext || safePageNumber * safeLimitNumber < safeTotal) {
			const params = new URLSearchParams(searchParams);
			params.set("page", String(safePageNumber + 1));
			params.set("limit", String(safeLimitNumber));
			return `?${params.toString()}`;
		}
		return;
	};

	const renderPaginationLink = useCallback(
		() =>
			Array.from({ length: safeTotalPage }, (_, i) => i + 1).map(
				(pageNumber) => (
					<PaginationLink
						key={pageNumber}
						href={
							pageNumber === safePageNumber
								? undefined
								: `?page=${pageNumber}&limit=${safeLimitNumber}`
						}
						aria-current={pageNumber === safePageNumber ? "page" : undefined}
						className={
							pageNumber === safePageNumber
								? "pointer-events-none border-b-2"
								: ""
						}
					>
						{pageNumber}
					</PaginationLink>
				)
			),
		[safeLimitNumber, safePageNumber, safeTotalPage]
	);

	return (
		<div className='pb-20 space-y-6 w-full'>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full'>
				{safeData?.map((patient) => (
					<PatientCard key={patient.patient_id} patient={patient} />
				))}
			</div>

			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious href={handlePreiousClick()} />
					</PaginationItem>

					<PaginationItem>{renderPaginationLink()}</PaginationItem>

					<PaginationItem>
						<PaginationNext href={handleNextClick()} aria-disabled={!hasNext} />
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
}
