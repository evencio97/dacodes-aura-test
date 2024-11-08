/* Service for the integration with the Gemini AI API */
import { createClient, validateResponse } from "./axiosSevice";


const client = createClient({
    baseURL: import.meta.env?.VITE_CHAT_API_URL,
    headers: { 'Content-Type': 'application/json' }
});

export async function getResponse(query: string): Promise<any> {
    const response= await client.post("", { query });
    // Validate response
    validateResponse(response);
        
    return response.data;
}

export default {
    getResponse
};