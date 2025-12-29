import { api } from "./fetcher";
import { PaginatedPatientsResponse } from "./type";

const PATH = '/patients';

export async function getPatients() {
    try {
      const data = api.get<{ patients: PaginatedPatientsResponse[] }>(PATH);
      
    } catch (error) {
      
    }

}