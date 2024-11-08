import axios, { CreateAxiosDefaults, AxiosResponse } from "axios";


export function createClient(config?: CreateAxiosDefaults) {
    return axios.create(config);
}

export function validateResponse(res: AxiosResponse) {
    if (res.status !== 200) throw new Error();
    if (!res.data) throw new Error();
    return true;
}

export default {
    createClient,
    validateResponse
};