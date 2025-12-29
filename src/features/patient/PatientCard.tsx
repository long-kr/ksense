"use client";

// components/patient-card.tsx
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Patient } from "@/lib/api/type";

type Props = {
	patient: Patient;
};

export function PatientCard({ patient }: Props) {
	return (
		<Card className='w-full max-w-md'>
			<CardHeader className='space-y-1'>
				<CardTitle className='flex items-center justify-between'>
					<span>{patient.name}</span>
					<Badge variant='outline'>{patient.patient_id}</Badge>
				</CardTitle>
				<p className='text-sm text-muted-foreground'>
					Visit date: {patient.visit_date}
				</p>
			</CardHeader>

			<CardContent className='space-y-4'>
				<div className='grid grid-cols-2 gap-4 text-sm'>
					<Info label='Age' value={`${patient.age}`} />
					<Info label='Gender' value={patient.gender} />
					<Info label='Blood Pressure' value={patient.blood_pressure} />
					<Info label='Temperature' value={`${patient.temperature} °F`} />
				</div>

				<div className='space-y-1'>
					<p className='text-sm font-medium'>Diagnosis</p>
					<p className='text-sm text-muted-foreground'>
						{patient?.diagnosis?.replaceAll("_", " ")}
					</p>
				</div>

				<div className='space-y-1'>
					<p className='text-sm font-medium'>Medications</p>
					<p className='text-sm text-muted-foreground'>{patient.medications}</p>
				</div>
			</CardContent>
		</Card>
	);
}

function Info({
	label,
	value = "N/A",
}: {
	label: string;
	value: string | undefined;
}) {
	return (
		<div className='flex flex-col'>
			<span className='text-xs text-muted-foreground'>{label}</span>
			<span className='font-medium'>{value}</span>
		</div>
	);
}
