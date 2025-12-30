"use client";

// components/patient-card.tsx
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import clsx from "clsx";
import { Patient } from "./type";
import { getAlert } from "./utils";

type Props = {
	patient: Patient;
};

export function PatientCard({ patient }: Props) {
	const alerts = getAlert(patient);

	return (
		<Card className='w-full max-w-md min-h-108'>
			<CardHeader className='space-y-1'>
				<CardTitle>{patient.name}</CardTitle>

				<Badge variant='outline'>{patient.patient_id}</Badge>

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

			<CardContent className='text-sm flex flex-col gap-2'>
				<CardTitle>Risk Summary</CardTitle>

				<div className='flex gap-2'>
					{alerts.map((alert) => (
						<Badge
							key={alert}
							className={clsx(
								alert === "invalid"
									? "bg-gray-100 text-gray-700"
									: "bg-red-100 text-red-700"
							)}
						>
							{alert === "invalid"
								? "Invalid Data"
								: alert.replaceAll("_", " ").toUpperCase()}
						</Badge>
					))}
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
