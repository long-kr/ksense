import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RiskCriteriaCards() {
	return (
		<div className='grid gap-6 md:grid-cols-3 '>
			{/* Blood Pressure */}
			<Card>
				<CardHeader>
					<CardTitle>Blood Pressure Risk</CardTitle>
				</CardHeader>
				<CardContent className='space-y-3 text-sm'>
					<p className='text-muted-foreground'>
						If systolic and diastolic differ, use the higher risk.
					</p>

					<ul className='space-y-2'>
						<li>
							<strong>Normal</strong>
							<div>Systolic &lt;120 AND Diastolic &lt;80</div>
							<div className='font-medium'>1 point</div>
						</li>

						<li>
							<strong>Elevated</strong>
							<div>Systolic 120–129 AND Diastolic &lt;80</div>
							<div className='font-medium'>2 points</div>
						</li>

						<li>
							<strong>Stage 1</strong>
							<div>Systolic 130–139 OR Diastolic 80–89</div>
							<div className='font-medium'>3 points</div>
						</li>

						<li>
							<strong>Stage 2</strong>
							<div>Systolic ≥140 OR Diastolic ≥90</div>
							<div className='font-medium'>4 points</div>
						</li>
					</ul>
				</CardContent>
			</Card>

			{/* Temperature */}
			<Card>
				<CardHeader>
					<CardTitle>Temperature Risk</CardTitle>
				</CardHeader>
				<CardContent className='space-y-3 text-sm'>
					<ul className='space-y-2'>
						<li>
							<strong>Normal</strong>
							<div>≤ 99.5°F</div>
							<div className='font-medium'>0 points</div>
						</li>

						<li>
							<strong>Low Fever</strong>
							<div>99.6–100.9°F</div>
							<div className='font-medium'>1 point</div>
						</li>

						<li>
							<strong>High Fever</strong>
							<div>≥ 101°F</div>
							<div className='font-medium'>2 points</div>
						</li>
					</ul>
				</CardContent>
			</Card>

			{/* Age */}
			<Card>
				<CardHeader>
					<CardTitle>Age Risk</CardTitle>
				</CardHeader>
				<CardContent className='space-y-3 text-sm'>
					<ul className='space-y-2'>
						<li>
							<strong>Under 40</strong>
							<div>&lt; 40 years</div>
							<div className='font-medium'>1 point</div>
						</li>

						<li>
							<strong>40–65</strong>
							<div>40–65 years (inclusive)</div>
							<div className='font-medium'>1 point</div>
						</li>

						<li>
							<strong>Over 65</strong>
							<div>&gt; 65 years</div>
							<div className='font-medium'>2 points</div>
						</li>
					</ul>
				</CardContent>
			</Card>
		</div>
	);
}
