import { api } from "./fetcher";
import {
	PaginatedPatientsResponseV1,
	PaginatedPatientsResponseV2,
	RequestOptions,
} from "./type";

const PATH = "/patients";

type GetPatientsOptions = Omit<RequestOptions<undefined>, "path">;

export async function getPatients(options: GetPatientsOptions = {}) {
	return api.get<PaginatedPatientsResponseV1 | PaginatedPatientsResponseV2>(
		PATH,
		{
			cache: "default",
			...options,
		}
	);
}
