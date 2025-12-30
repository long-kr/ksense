import { isNumber, parseNumeric } from "@/lib/utils";
import { Patient, RiskResult } from "./type";

//docs
/**
 * Determines the blood pressure risk category based on systolic and diastolic values.
 * @param bp - A string representing blood pressure in the format "systolic/diastolic".
 * @returns An object containing the risk label, points, and severity level.
 * @example
 * ```typescript
 * getBloodPressureRisk("120/80");
 * // returns { label: "Normal", points: 0, severity: "low" }
 *
 * getBloodPressureRisk("135/85");
 * // returns { label: "Stage 1", points: 2, severity: "high" }
 *
 * getBloodPressureRisk("150/95");
 * // returns { label: "Stage 2", points: 3, severity: "critical" }
 *
 * getBloodPressureRisk("invalid");
 * // returns { label: "N/A", points: -1, severity: "invalid" }
 * ```
 */
export function getBloodPressureRisk(bp?: string): RiskResult {
	if (!bp) return { label: "N/A", points: -1, severity: "invalid" };

	const [sys, dia] = bp.split("/").map(parseNumeric);

	if (!sys || !dia || !isNumber(sys) || !isNumber(dia)) {
		return { label: "N/A", points: -1, severity: "invalid" };
	}

	if (sys >= 140 || dia >= 90)
		return { label: "Stage 2", points: 3, severity: "critical" };

	if ((sys >= 130 && sys <= 139) || (dia >= 80 && dia <= 89))
		return { label: "Stage 1", points: 2, severity: "high" };

	if ((sys >= 120 && sys <= 129) || dia < 80)
		return { label: "Elevated", points: 1, severity: "medium" };

	if (sys < 120 || dia < 80)
		return { label: "Normal", points: 0, severity: "low" };

	return { label: "N/A", points: -1, severity: "invalid" };
}

/**
 * Determines the temperature risk category based on the provided temperature in Fahrenheit.
 * @param temp - A number representing the temperature in Fahrenheit.
 * @returns An object containing the risk label, points, and severity level.
 * @example
 * ```typescript
 * getTemperatureRisk(98.6);
 * // returns { label: "Normal", points: 0, severity: "low" }
 *
 * getTemperatureRisk(100.4);
 * // returns { label: "Low Fever", points: 1, severity: "medium" }
 *
 * getTemperatureRisk(102.2);
 * // returns { label: "High Fever", points: 2, severity: "high" }
 *
 * getTemperatureRisk(undefined);
 * // returns { label: "N/A", points: -1, severity: "invalid" }
 * ```
 */
export function getTemperatureRisk(temp?: number): RiskResult {
	if (!temp || !isNumber(temp))
		return { label: "N/A", points: -1, severity: "invalid" };

	if (temp <= 99.5) return { label: "Normal", points: 0, severity: "low" };

	if (temp > 99.5 && temp < 101)
		return { label: "Low Fever", points: 1, severity: "medium" };

	if (temp >= 101) return { label: "High Fever", points: 2, severity: "high" };

	return { label: "N/A", points: -1, severity: "invalid" };
}

/**
 * Determines the age risk category based on the provided age.
 * @param age - A number representing the age in years.
 * @returns An object containing the risk label, points, and severity level.
 * @example
 * ```typescript
 * getAgeRisk(30);
 * // returns { label: "Under 40", points: 0, severity: "low" }
 *
 * getAgeRisk(50);
 * // returns { label: "Over 40", points: 1, severity: "medium" }
 *
 * getAgeRisk(70);
 * // returns { label: "Over 65", points: 2, severity: "high" }
 *
 * getAgeRisk(undefined);
 * // returns { label: "N/A", points: -1, severity: "invalid" }
 * ```
 */
export function getAgeRisk(age?: number): RiskResult {
	if (!age || !isNumber(age)) {
		return { label: "N/A", points: -1, severity: "invalid" };
	}

	if (age > 40 && age < 65)
		return { label: "Over 40", points: 1, severity: "medium" };

	if (age > 65) return { label: "Over 65", points: 2, severity: "high" };

	return { label: "Under 40", points: 0, severity: "low" };
}

/**
 * Generates alert labels based on the patient's vital signs and age.
 * @param patient - An object containing patient information including blood pressure, temperature, and age.
 * @returns An array of alert strings indicating risk factors.
 * @example
 * ```typescript
 * const patient = {
 *   blood_pressure: "150/95",
 *   temperature: 102.2,
 *   age: 70
 * };
 *
 * getAlert(patient);
 * // returns ["fever", "high_risk"]
 *
 * const invalidPatient = {
 *   blood_pressure: "invalid",
 *   temperature: undefined,
 *   age: null
 * };
 *
 * getAlert(invalidPatient);
 * // returns ["invalid"]
 * ```
 */
export function getAlert(patient: Patient): string[] {
	const bp = getBloodPressureRisk(patient.blood_pressure);
	const temp = getTemperatureRisk(patient.temperature);
	const ageRisk = getAgeRisk(patient.age);

	const result = [];

	if (temp.points >= 1) result.push("fever");

	if (bp.points === -1 || temp.points === -1 || ageRisk.points === -1) {
		result.push("invalid");
		return result;
	}

	const total = bp.points + temp.points + ageRisk.points;

	if (total >= 4) result.push("high_risk");

	return result;
}
