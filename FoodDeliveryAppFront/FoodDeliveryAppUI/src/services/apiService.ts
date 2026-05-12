import { api } from "./api";

export const apiService = {
    async get<T>(endpoint: string): Promise<T> {
        const response = await api.get<T>(endpoint);
        return response.data;
    },

    async post<TRequest, TResponse>(
        endpoint: string,
        data: TRequest
    ): Promise<TResponse> {
        const response = await api.post<TResponse>(endpoint, data);
        return response.data;
    },
};