import { PatientTable } from "@/features";
import { getPatients } from "@/lib/api/patient";
import { toInt } from "@/lib/util";

type Props = {
	searchParams: Promise<{
		page?: string;
		limit?: string;
	}>;
};

export default async function PatientsPage({ searchParams }: Props) {
	const searchParamsResolved = await searchParams;
	const page = toInt(searchParamsResolved.page, 1);
	const limit = toInt(searchParamsResolved.limit, 8);
	const res = await getPatients({
		query: { page, limit },
	});

	return (
		<div className='font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20'>
			<main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
				<h1 className='text-3xl font-bold'>KSense Patient Dashboard</h1>

				{/* Patient Table */}
				<PatientTable patientsData={res} />
			</main>
		</div>
	);
}
