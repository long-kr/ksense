// table with patient data
"use client";

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { PaginatedPatientsResponse } from "@/lib/api/type";
import { PatientCard } from "./PatientCard";

type Props = {
	patientsData: PaginatedPatientsResponse;
};

export function PatientTable({ patientsData }: Props) {
	const { data, metadata, pagination } = patientsData || {};
	const { page, hasNext, hasPrevious, limit, total, totalPages } =
		pagination || {};

	console.log("Test");

	return (
		<div className='pb-20 space-y-6 w-full'>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full'>
				{data?.map((patient) => (
					<PatientCard key={patient.patient_id} patient={patient} />
				))}
			</div>

			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious href='#' />
					</PaginationItem>

					<PaginationItem>
						<PaginationLink href='#'>1</PaginationLink>
					</PaginationItem>

					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>

					<PaginationItem>
						<PaginationNext href='#' />
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
}
