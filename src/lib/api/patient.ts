import { api } from "./fetcher";
import { PaginatedPatientsResponse, RequestOptions } from "./type";

const PATH = "/patients";

type GetPatientsOptions = Omit<RequestOptions<undefined>, "path">;

export async function getPatients(options: GetPatientsOptions = {}) {
	return api.get<PaginatedPatientsResponse>(PATH, {
		cache: "no-store",
		...options,
	});
}
