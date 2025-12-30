import {
	PaginatedPatientsResponseV1,
	PaginatedPatientsResponseV2,
} from "@/features/patient/type";
import { api } from "./fetcher";
import { RequestOptions } from "./type";

const PATH = "/patients";

type GetPatientsOptions = Omit<RequestOptions<undefined>, "path">;

export async function getPatients(options: GetPatientsOptions = {}) {
	return await api.get<
		PaginatedPatientsResponseV1 | PaginatedPatientsResponseV2
	>(PATH, { ...options });
}
