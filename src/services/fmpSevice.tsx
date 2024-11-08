/* Service for the integration with the Financial Modeling Prep API */
import { createClient, validateResponse } from "./axiosSevice";
import { FMPCompanyI } from "../interfaces/company";


const client = createClient({
    baseURL: import.meta.env?.VITE_FMP_API_URL || "https://financialmodelingprep.com/api/v3/",
    headers: { 'Content-Type': 'application/json' },
    params: { apikey: import.meta.env.VITE_FMP_API_KEY }
});

export async function searchCompanies(query: string): Promise<FMPCompanyI[]> {
    const response= await client.get(`/search`, {params: { query, limit: 20 }});
    // Validate response
    validateResponse(response);
        
    return response.data;
}

export async function getCompanyInfo(symbol: string) {
    const response= await client.get(`/profile/${symbol}`);
    // Validate response
    validateResponse(response);

    return response.data?.[0];
}

export default {
    searchCompanies,
    getCompanyInfo
};