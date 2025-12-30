import { api } from "./fetcher";

const PATH = "/submit-assessment";

export type SubmitData = {
	high_risk_patients: string[];
	fever_patients: string[];
	data_quality_issues: string[];
};

export async function submitAlertData(data: SubmitData) {
	return await api.post<unknown, SubmitData>(PATH, data);
}
